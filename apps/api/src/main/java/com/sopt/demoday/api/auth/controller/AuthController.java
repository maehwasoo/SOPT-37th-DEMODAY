package com.sopt.demoday.api.auth.controller;

import com.sopt.demoday.api.auth.dto.LoginRequest;
import com.sopt.demoday.api.auth.dto.ParticipantResponse;
import com.sopt.demoday.api.auth.service.AuthService;
import com.sopt.demoday.api.auth.service.SessionCookieService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

	private final AuthService authService;
	private final SessionCookieService cookieService;

	public AuthController(final AuthService authService, final SessionCookieService cookieService) {
		this.authService = authService;
		this.cookieService = cookieService;
	}

	@PostMapping("/api/auth/login")
	public ResponseEntity<ParticipantResponse> login(@Valid @RequestBody final LoginRequest request) {
		final AuthService.LoginResult result = authService.login(request.teamKey(), request.name());
		final ResponseCookie cookie = cookieService.newSessionCookie(result.rawToken());

		return ResponseEntity.ok()
			.header(HttpHeaders.SET_COOKIE, cookie.toString())
			.body(ParticipantResponse.from(result.participant()));
	}

	@PostMapping("/api/auth/logout")
	public ResponseEntity<Void> logout(final HttpServletRequest request) {
		final String rawToken = cookieService.extractRawToken(request).orElse(null);
		authService.logout(rawToken);

		final ResponseCookie cookie = cookieService.clearSessionCookie();
		return ResponseEntity.noContent()
			.header(HttpHeaders.SET_COOKIE, cookie.toString())
			.build();
	}
}
