package com.sopt.demoday.api.common.error;

import java.util.Map;

import io.swagger.v3.oas.annotations.media.Schema;

public record ErrorResponse(
	@Schema(description = "Application-specific error code", example = "AUTH_UNAUTHORIZED")
	String errorCode,

	@Schema(description = "Human-readable message", example = "Unauthorized")
	String message,

	@Schema(description = "Additional details (e.g. validation errors)", example = "{\"field\":\"reason\"}")
	Map<String, Object> details
) {
}
