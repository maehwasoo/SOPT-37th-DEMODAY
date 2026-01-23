package com.sopt.demoday.api.auth.service;

import java.time.OffsetDateTime;

import com.sopt.demoday.api.auth.config.SessionSettings;
import com.sopt.demoday.api.common.error.ApiException;
import com.sopt.demoday.api.participant.Participant;
import com.sopt.demoday.api.participant.ParticipantRepository;
import com.sopt.demoday.api.session.ParticipantSession;
import com.sopt.demoday.api.session.ParticipantSessionRepository;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

	private final ParticipantRepository participantRepository;
	private final ParticipantSessionRepository participantSessionRepository;
	private final SessionTokenService tokenService;
	private final SessionSettings sessionSettings;

	public AuthService(
		final ParticipantRepository participantRepository,
		final ParticipantSessionRepository participantSessionRepository,
		final SessionTokenService tokenService,
		final SessionSettings sessionSettings
	) {
		this.participantRepository = participantRepository;
		this.participantSessionRepository = participantSessionRepository;
		this.tokenService = tokenService;
		this.sessionSettings = sessionSettings;
	}

	@Transactional
	public LoginResult login(final String teamKeyInput, final String nameInput) {
		final String teamKey = teamKeyInput == null ? "" : teamKeyInput.trim();
		final String name = nameInput == null ? "" : nameInput.trim();

		if (teamKey.isBlank() || name.isBlank()) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "AUTH_INVALID_INPUT", "teamKey and name are required");
		}

		final Participant participant = findOrCreateParticipant(teamKey, name);

		final String rawToken = tokenService.newRawToken();
		final String tokenHash = tokenService.hashToken(rawToken);

		final OffsetDateTime now = OffsetDateTime.now();
		final OffsetDateTime expiresAt = now.plusSeconds(sessionSettings.getSessionTtl().toSeconds());
		final ParticipantSession session = new ParticipantSession(participant, tokenHash, expiresAt);
		participantSessionRepository.save(session);

		return new LoginResult(participant, rawToken);
	}

	@Transactional(readOnly = true)
	public Participant requireCurrentParticipant(final String rawToken) {
		if (rawToken == null || rawToken.isBlank()) {
			throw new ApiException(HttpStatus.UNAUTHORIZED, "AUTH_UNAUTHORIZED", "Unauthorized");
		}

		final String tokenHash = tokenService.hashToken(rawToken);
		final OffsetDateTime now = OffsetDateTime.now();

		final ParticipantSession session = participantSessionRepository
			.findByTokenHashAndRevokedAtIsNullAndExpiresAtAfter(tokenHash, now)
			.orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "AUTH_UNAUTHORIZED", "Unauthorized"));

		return session.getParticipant();
	}

	@Transactional
	public void logout(final String rawToken) {
		if (rawToken == null || rawToken.isBlank()) {
			return;
		}

		final String tokenHash = tokenService.hashToken(rawToken);
		participantSessionRepository.findByTokenHash(tokenHash)
			.ifPresent(session -> {
				if (!session.isActive(OffsetDateTime.now())) {
					return;
				}
				session.revoke(OffsetDateTime.now());
				participantSessionRepository.save(session);
			});
	}

	private Participant findOrCreateParticipant(final String teamKey, final String name) {
		return participantRepository.findByTeamKeyAndName(teamKey, name)
			.orElseGet(() -> createParticipant(teamKey, name));
	}

	private Participant createParticipant(final String teamKey, final String name) {
		try {
			return participantRepository.save(new Participant(teamKey, name));
		} catch (final DataIntegrityViolationException exception) {
			return participantRepository.findByTeamKeyAndName(teamKey, name)
				.orElseThrow(() -> exception);
		}
	}

	public record LoginResult(
		Participant participant,
		String rawToken
	) {
	}
}
