package com.sopt.demoday.api.leaflet.claim;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StampClaimRepository extends JpaRepository<StampClaim, Long> {

	List<StampClaim> findAllByParticipant_IdOrderByClaimedAtAsc(Long participantId);

	boolean existsByParticipant_IdAndStampKey(Long participantId, String stampKey);
}
