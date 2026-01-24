package com.sopt.demoday.api.leaflet;

import java.time.OffsetDateTime;
import java.util.List;

import com.sopt.demoday.api.common.error.ApiException;
import com.sopt.demoday.api.leaflet.claim.StampClaim;
import com.sopt.demoday.api.leaflet.claim.StampClaimRepository;
import com.sopt.demoday.api.leaflet.code.StampCode;
import com.sopt.demoday.api.leaflet.code.StampCodeRepository;
import com.sopt.demoday.api.leaflet.dto.LeafletProgressResponse;
import com.sopt.demoday.api.participant.Participant;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LeafletService {

	private final StampCodeRepository stampCodeRepository;
	private final StampClaimRepository stampClaimRepository;

	public LeafletService(
		final StampCodeRepository stampCodeRepository,
		final StampClaimRepository stampClaimRepository
	) {
		this.stampCodeRepository = stampCodeRepository;
		this.stampClaimRepository = stampClaimRepository;
	}

	@Transactional(readOnly = true)
	public LeafletProgressResponse getProgress(final Long participantId) {
		final List<String> completedStampKeys = stampClaimRepository
			.findAllByParticipant_IdOrderByClaimedAtAsc(participantId)
			.stream()
			.map(StampClaim::getStampKey)
			.distinct()
			.toList();

		return new LeafletProgressResponse(
			LeafletStampKeys.TOTAL_COUNT,
			completedStampKeys.size(),
			completedStampKeys
		);
	}

	@Transactional(readOnly = true)
	public StampCode getAvailableStampCodeByStampKey(final String stampKey) {
		final OffsetDateTime now = OffsetDateTime.now();

		return stampCodeRepository.findAllByStampKeyOrderByCreatedAtDesc(stampKey)
			.stream()
			.filter(value -> value.isAvailable(now))
			.findFirst()
			.orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "LEAFLET_CODE_NOT_FOUND", "Invalid code"));
	}

	@Transactional
	public LeafletProgressResponse claim(final Participant participant, final String codeInput) {
		final String code = codeInput == null ? "" : codeInput.trim();
		if (code.isBlank()) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "LEAFLET_INVALID_INPUT", "code is required");
		}

		final OffsetDateTime now = OffsetDateTime.now();

		final StampCode stampCode = stampCodeRepository.findById(code)
			.filter(value -> value.isAvailable(now))
			.orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "LEAFLET_CODE_NOT_FOUND", "Invalid code"));

		final String stampKey = stampCode.getStampKey();

		if (stampClaimRepository.existsByParticipant_IdAndStampKey(participant.getId(), stampKey)) {
			throw new ApiException(HttpStatus.CONFLICT, "LEAFLET_CLAIM_DUPLICATE", "Already claimed");
		}

		try {
			stampClaimRepository.save(new StampClaim(participant, stampKey));
		} catch (final DataIntegrityViolationException exception) {
			throw new ApiException(HttpStatus.CONFLICT, "LEAFLET_CLAIM_DUPLICATE", "Already claimed");
		}

		return getProgress(participant.getId());
	}
}
