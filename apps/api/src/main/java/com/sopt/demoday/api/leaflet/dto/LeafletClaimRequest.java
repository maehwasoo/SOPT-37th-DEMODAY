package com.sopt.demoday.api.leaflet.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LeafletClaimRequest(
	@NotBlank(message = "code is required")
	@Size(max = 64, message = "code must be <= 64 characters")
	String code
) {
}
