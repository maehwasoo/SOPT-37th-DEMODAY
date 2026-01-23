package com.sopt.demoday.api.leaflet.dto;

import java.util.List;

public record LeafletProgressResponse(
	int totalCount,
	int completedCount,
	List<String> completedStampKeys
) {
}
