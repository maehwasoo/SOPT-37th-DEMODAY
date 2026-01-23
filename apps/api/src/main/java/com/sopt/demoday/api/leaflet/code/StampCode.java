package com.sopt.demoday.api.leaflet.code;

import java.time.OffsetDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "stamp_code")
public class StampCode {

	@Id
	@Column(name = "code", nullable = false, length = 64)
	private String code;

	@Column(name = "stamp_key", nullable = false, length = 32)
	private String stampKey;

	@Column(name = "enabled", nullable = false)
	private boolean enabled;

	@Column(name = "expires_at")
	private OffsetDateTime expiresAt;

	@Column(name = "created_at", nullable = false)
	private OffsetDateTime createdAt;

	protected StampCode() {
	}

	public StampCode(final String code, final String stampKey, final boolean enabled, final OffsetDateTime expiresAt) {
		this.code = code;
		this.stampKey = stampKey;
		this.enabled = enabled;
		this.expiresAt = expiresAt;
		this.createdAt = OffsetDateTime.now();
	}

	public String getCode() {
		return code;
	}

	public String getStampKey() {
		return stampKey;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public OffsetDateTime getExpiresAt() {
		return expiresAt;
	}

	public boolean isAvailable(final OffsetDateTime now) {
		if (!enabled) {
			return false;
		}

		if (expiresAt == null) {
			return true;
		}

		return expiresAt.isAfter(now);
	}
}
