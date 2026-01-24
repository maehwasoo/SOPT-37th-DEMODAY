package com.sopt.demoday.api.common.error;

import java.util.Map;

import org.springframework.http.HttpStatus;

public class ApiException extends RuntimeException {

	private final HttpStatus status;
	private final String errorCode;
	private final Map<String, Object> details;

	public ApiException(final HttpStatus status, final String errorCode, final String message) {
		this(status, errorCode, message, Map.of());
	}

	public ApiException(
		final HttpStatus status,
		final String errorCode,
		final String message,
		final Map<String, Object> details
	) {
		super(message);
		this.status = status;
		this.errorCode = errorCode;
		this.details = details == null ? Map.of() : details;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public Map<String, Object> getDetails() {
		return details;
	}
}
