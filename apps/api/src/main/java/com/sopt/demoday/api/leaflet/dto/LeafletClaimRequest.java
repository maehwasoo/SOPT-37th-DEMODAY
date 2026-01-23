package com.sopt.demoday.api.leaflet.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LeafletClaimRequest(
	@Schema(description = "Stamp claim code (e.g. from QR link)", example = "EXAMPLE_CODE_123")
	@NotBlank(message = "code is required")
	@Size(max = 64, message = "code must be <= 64 characters")
	String code
) {
}
