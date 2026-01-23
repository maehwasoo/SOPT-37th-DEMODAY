package com.sopt.demoday.api.leaflet.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

public record LeafletProgressResponse(
	@Schema(description = "Total stamp count (fixed allowlist size)", example = "12")
	int totalCount,

	@Schema(description = "Completed stamp count", example = "3")
	int completedCount,

	@Schema(description = "Completed stamp key list", example = "[\"amp\",\"carena\",\"makers\"]")
	List<String> completedStampKeys
) {
}
