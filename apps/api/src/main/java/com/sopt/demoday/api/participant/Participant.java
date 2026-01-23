package com.sopt.demoday.api.participant;

import java.time.OffsetDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "participant")
public class Participant {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "team_key", nullable = false, length = 64)
	private String teamKey;

	@Column(name = "name", nullable = false, length = 64)
	private String name;

	@Column(name = "created_at", nullable = false)
	private OffsetDateTime createdAt;

	protected Participant() {
	}

	public Participant(final String teamKey, final String name) {
		this.teamKey = teamKey;
		this.name = name;
		this.createdAt = OffsetDateTime.now();
	}

	public Long getId() {
		return id;
	}

	public String getTeamKey() {
		return teamKey;
	}

	public String getName() {
		return name;
	}

	public OffsetDateTime getCreatedAt() {
		return createdAt;
	}
}
