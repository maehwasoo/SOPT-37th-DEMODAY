package com.sopt.demoday.api.auth.dto;

import com.sopt.demoday.api.participant.Participant;

public record ParticipantResponse(
	Long id,
	String teamKey,
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
