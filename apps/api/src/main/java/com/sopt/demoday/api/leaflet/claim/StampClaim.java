package com.sopt.demoday.api.leaflet.claim;

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
@Table(name = "stamp_claim")
public class StampClaim {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "participant_id", nullable = false)
	private Participant participant;

	@Column(name = "stamp_key", nullable = false, length = 32)
	private String stampKey;

	@Column(name = "claimed_at", nullable = false)
	private OffsetDateTime claimedAt;

	protected StampClaim() {
	}

	public StampClaim(final Participant participant, final String stampKey) {
		this.participant = participant;
		this.stampKey = stampKey;
		this.claimedAt = OffsetDateTime.now();
	}

	public String getStampKey() {
		return stampKey;
	}

	public OffsetDateTime getClaimedAt() {
		return claimedAt;
	}
}
