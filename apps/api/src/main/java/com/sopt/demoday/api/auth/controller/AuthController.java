package com.sopt.demoday.api.auth.controller;

import com.sopt.demoday.api.auth.dto.LoginRequest;
import com.sopt.demoday.api.auth.dto.ParticipantResponse;
import com.sopt.demoday.api.auth.service.AuthService;
import com.sopt.demoday.api.auth.service.SessionCookieService;
import com.sopt.demoday.api.common.error.ErrorResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Auth", description = "Login/logout session")
@RestController
public class AuthController {

	private final AuthService authService;
	private final SessionCookieService cookieService;

	public AuthController(final AuthService authService, final SessionCookieService cookieService) {
		this.authService = authService;
		this.cookieService = cookieService;
	}

	@Operation(
		summary = "Login",
		description = "Login with teamKey and name. Sets HttpOnly session cookie (sid by default)."
	)
	@ApiResponses({
		@ApiResponse(
			responseCode = "200",
			description = "OK",
			headers = {
				@Header(name = "Set-Cookie", description = "Session cookie (HttpOnly)")
			},
			content = @Content(
				mediaType = "application/json",
				schema = @Schema(implementation = ParticipantResponse.class)
			)
		),
		@ApiResponse(
			responseCode = "400",
			description = "Bad Request",
			content = @Content(
				mediaType = "application/json",
				schema = @Schema(implementation = ErrorResponse.class)
			)
		)
	})
	@PostMapping("/api/auth/login")
	public ResponseEntity<ParticipantResponse> login(@Valid @RequestBody final LoginRequest request) {
		final AuthService.LoginResult result = authService.login(request.teamKey(), request.name());
		final ResponseCookie cookie = cookieService.newSessionCookie(result.rawToken());

		return ResponseEntity.ok()
			.header(HttpHeaders.SET_COOKIE, cookie.toString())
			.body(ParticipantResponse.from(result.participant()));
	}

	@Operation(
		summary = "Logout",
		description = "Clear session cookie. Always returns 204."
	)
	@ApiResponses({
		@ApiResponse(
			responseCode = "204",
			description = "No Content",
			headers = {
				@Header(name = "Set-Cookie", description = "Cleared session cookie (HttpOnly)")
			}
		)
	})
	@PostMapping("/api/auth/logout")
	public ResponseEntity<Void> logout(@Parameter(hidden = true) final HttpServletRequest request) {
		final String rawToken = cookieService.extractRawToken(request).orElse(null);
		authService.logout(rawToken);

		final ResponseCookie cookie = cookieService.clearSessionCookie();
		return ResponseEntity.noContent()
			.header(HttpHeaders.SET_COOKIE, cookie.toString())
			.build();
	}
}
