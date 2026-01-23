package com.sopt.demoday.api.leaflet;

import com.sopt.demoday.api.auth.service.AuthService;
import com.sopt.demoday.api.auth.service.SessionCookieService;
import com.sopt.demoday.api.leaflet.dto.LeafletClaimRequest;
import com.sopt.demoday.api.leaflet.dto.LeafletProgressResponse;
import com.sopt.demoday.api.participant.Participant;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LeafletController {

	private final AuthService authService;
	private final SessionCookieService cookieService;
	private final LeafletService leafletService;

	public LeafletController(
		final AuthService authService,
		final SessionCookieService cookieService,
		final LeafletService leafletService
	) {
		this.authService = authService;
		this.cookieService = cookieService;
		this.leafletService = leafletService;
	}

	@GetMapping("/api/leaflet/progress")
	public ResponseEntity<LeafletProgressResponse> progress(final HttpServletRequest request) {
		final Participant participant = requireParticipant(request);
		return ResponseEntity.ok(leafletService.getProgress(participant.getId()));
	}

	@PostMapping("/api/leaflet/claim")
	public ResponseEntity<LeafletProgressResponse> claim(
		@Valid @RequestBody final LeafletClaimRequest requestBody,
		final HttpServletRequest request
	) {
		final Participant participant = requireParticipant(request);
		return ResponseEntity.ok(leafletService.claim(participant, requestBody.code()));
	}

	private Participant requireParticipant(final HttpServletRequest request) {
		final String rawToken = cookieService.extractRawToken(request).orElse(null);
		return authService.requireCurrentParticipant(rawToken);
	}
}
