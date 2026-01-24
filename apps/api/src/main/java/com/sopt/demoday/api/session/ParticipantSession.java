package com.sopt.demoday.api.session;

import java.time.OffsetDateTime;

import com.sopt.demoday.api.participant.Participant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "participant_session")
public class ParticipantSession {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "participant_id", nullable = false)
	private Participant participant;

	@Column(name = "token_hash", nullable = false, length = 128)
	private String tokenHash;

	@Column(name = "created_at", nullable = false)
	private OffsetDateTime createdAt;

	@Column(name = "expires_at", nullable = false)
	private OffsetDateTime expiresAt;

	@Column(name = "revoked_at")
	private OffsetDateTime revokedAt;

	protected ParticipantSession() {
	}

	public ParticipantSession(final Participant participant, final String tokenHash, final OffsetDateTime expiresAt) {
		this.participant = participant;
		this.tokenHash = tokenHash;
		this.createdAt = OffsetDateTime.now();
		this.expiresAt = expiresAt;
	}

	public Long getId() {
		return id;
	}

	public Participant getParticipant() {
		return participant;
	}

	public String getTokenHash() {
		return tokenHash;
	}

	public OffsetDateTime getExpiresAt() {
		return expiresAt;
	}

	public OffsetDateTime getRevokedAt() {
		return revokedAt;
	}

	public boolean isActive(final OffsetDateTime now) {
		return revokedAt == null && expiresAt.isAfter(now);
	}

	public void revoke(final OffsetDateTime now) {
		this.revokedAt = now;
	}
}
