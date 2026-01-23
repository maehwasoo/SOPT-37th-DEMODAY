package com.sopt.demoday.api.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(
	@NotBlank(message = "teamKey is required")
	@Size(max = 64, message = "teamKey must be <= 64 characters")
	String teamKey,

	@NotBlank(message = "name is required")
	@Size(max = 64, message = "name must be <= 64 characters")
	String name
) {
}
