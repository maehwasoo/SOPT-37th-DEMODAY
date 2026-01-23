package com.sopt.demoday.api.auth.dto;

import com.sopt.demoday.api.participant.Participant;

import io.swagger.v3.oas.annotations.media.Schema;

public record ParticipantResponse(
	@Schema(description = "Participant id", example = "1")
	Long id,

	@Schema(description = "Team key", example = "team-a")
	String teamKey,

	@Schema(description = "Participant name", example = "홍길동")
	String name
) {

	public static ParticipantResponse from(final Participant participant) {
		return new ParticipantResponse(
			participant.getId(),
			participant.getTeamKey(),
			participant.getName()
		);
	}
}
