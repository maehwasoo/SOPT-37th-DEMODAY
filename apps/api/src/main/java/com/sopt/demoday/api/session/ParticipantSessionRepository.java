package com.sopt.demoday.api.session;

import java.time.OffsetDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantSessionRepository extends JpaRepository<ParticipantSession, Long> {

	Optional<ParticipantSession> findByTokenHashAndRevokedAtIsNullAndExpiresAtAfter(String tokenHash, OffsetDateTime now);

	Optional<ParticipantSession> findByTokenHash(String tokenHash);
}
