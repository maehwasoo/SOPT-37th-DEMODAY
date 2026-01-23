package com.sopt.demoday.api.auth.controller;

import com.sopt.demoday.api.auth.dto.ParticipantResponse;
import com.sopt.demoday.api.auth.service.AuthService;
import com.sopt.demoday.api.auth.service.SessionCookieService;
import com.sopt.demoday.api.participant.Participant;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MeController {

	private final AuthService authService;
	private final SessionCookieService cookieService;

	public MeController(final AuthService authService, final SessionCookieService cookieService) {
		this.authService = authService;
		this.cookieService = cookieService;
	}

	@GetMapping("/api/me")
	public ResponseEntity<ParticipantResponse> me(final HttpServletRequest request) {
		final String rawToken = cookieService.extractRawToken(request).orElse(null);
		final Participant participant = authService.requireCurrentParticipant(rawToken);

		return ResponseEntity.ok(ParticipantResponse.from(participant));
	}
}
