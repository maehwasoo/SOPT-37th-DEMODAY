package com.sopt.demoday.api.common.error;

import java.util.Map;

public record ErrorResponse(
	String errorCode,
	String message,
	Map<String, Object> details
) {
}
