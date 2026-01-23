package com.sopt.demoday.api.auth.controller;

import com.sopt.demoday.api.auth.dto.ParticipantResponse;
import com.sopt.demoday.api.auth.service.AuthService;
import com.sopt.demoday.api.auth.service.SessionCookieService;
import com.sopt.demoday.api.common.error.ErrorResponse;
import com.sopt.demoday.api.participant.Participant;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Auth", description = "Login/logout session")
@RestController
public class MeController {

	private final AuthService authService;
	private final SessionCookieService cookieService;

	public MeController(final AuthService authService, final SessionCookieService cookieService) {
		this.authService = authService;
		this.cookieService = cookieService;
	}

	@Operation(
		summary = "Get current participant",
		description = "Returns current participant info from session cookie."
	)
	@SecurityRequirement(name = "SessionCookie")
	@ApiResponses({
		@ApiResponse(
			responseCode = "200",
			description = "OK",
			content = @Content(
				mediaType = "application/json",
				schema = @Schema(implementation = ParticipantResponse.class)
			)
		),
		@ApiResponse(
			responseCode = "401",
			description = "Unauthorized",
			content = @Content(
				mediaType = "application/json",
				schema = @Schema(implementation = ErrorResponse.class)
			)
		)
	})
	@GetMapping("/api/me")
	public ResponseEntity<ParticipantResponse> me(@Parameter(hidden = true) final HttpServletRequest request) {
		final String rawToken = cookieService.extractRawToken(request).orElse(null);
		final Participant participant = authService.requireCurrentParticipant(rawToken);

		return ResponseEntity.ok(ParticipantResponse.from(participant));
	}
}
