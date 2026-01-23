package com.sopt.demoday.api.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(
	@Schema(description = "Team key", example = "team-a")
	@NotBlank(message = "teamKey is required")
	@Size(max = 64, message = "teamKey must be <= 64 characters")
	String teamKey,

	@Schema(description = "Participant name", example = "홍길동")
	@NotBlank(message = "name is required")
	@Size(max = 64, message = "name must be <= 64 characters")
	String name
) {
}
