package com.sopt.demoday.api.common.error;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

	@ExceptionHandler(ApiException.class)
	public ResponseEntity<ErrorResponse> handleApiException(final ApiException exception) {
		final ErrorResponse response = new ErrorResponse(
			exception.getErrorCode(),
			exception.getMessage(),
			exception.getDetails()
		);

		return ResponseEntity.status(exception.getStatus()).body(response);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(
		final MethodArgumentNotValidException exception
	) {
		final Map<String, Object> details = exception.getBindingResult()
			.getFieldErrors()
			.stream()
			.collect(java.util.stream.Collectors.toMap(
				FieldError::getField,
				fieldError -> fieldError.getDefaultMessage() == null ? "Invalid value" : fieldError.getDefaultMessage(),
				(existing, replacement) -> existing
			));

		final ErrorResponse response = new ErrorResponse(
			"VALIDATION_ERROR",
			"Validation failed",
			details
		);

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}
}
