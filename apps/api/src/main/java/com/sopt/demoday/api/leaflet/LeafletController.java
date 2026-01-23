package com.sopt.demoday.api.leaflet;

import com.sopt.demoday.api.auth.service.AuthService;
import com.sopt.demoday.api.auth.service.SessionCookieService;
import com.sopt.demoday.api.common.error.ErrorResponse;
import com.sopt.demoday.api.leaflet.code.StampCode;
import com.sopt.demoday.api.leaflet.dto.LeafletClaimRequest;
import com.sopt.demoday.api.leaflet.dto.LeafletProgressResponse;
import com.sopt.demoday.api.leaflet.dto.LeafletStampCodeResponse;
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
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Leaflet", description = "Leaflet stamp progress/claim")
@SecurityRequirement(name = "SessionCookie")
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

	@Operation(
		summary = "Get leaflet progress",
		description = "Returns completed stamp keys for current participant."
	)
	@ApiResponses({
		@ApiResponse(
			responseCode = "200",
			description = "OK",
			content = @Content(
				mediaType = "application/json",
				schema = @Schema(implementation = LeafletProgressResponse.class)
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
	@GetMapping("/api/leaflet/progress")
	public ResponseEntity<LeafletProgressResponse> progress(@Parameter(hidden = true) final HttpServletRequest request) {
		final Participant participant = requireParticipant(request);
		return ResponseEntity.ok(leafletService.getProgress(participant.getId()));
	}

	@Operation(
		summary = "Claim a stamp",
		description = "Claims a stamp by code (e.g. QR link). Duplicate claims are rejected."
	)
	@ApiResponses({
		@ApiResponse(
			responseCode = "200",
			description = "OK",
			content = @Content(
				mediaType = "application/json",
				schema = @Schema(implementation = LeafletProgressResponse.class)
			)
		),
		@ApiResponse(
			responseCode = "400",
			description = "Bad Request",
			content = @Content(
				mediaType = "application/json",
				schema = @Schema(implementation = ErrorResponse.class)
			)
		),
		@ApiResponse(
			responseCode = "401",
			description = "Unauthorized",
			content = @Content(
				mediaType = "application/json",
				schema = @Schema(implementation = ErrorResponse.class)
			)
		),
		@ApiResponse(
			responseCode = "404",
			description = "Invalid code",
			content = @Content(
				mediaType = "application/json",
				schema = @Schema(implementation = ErrorResponse.class)
			)
		),
		@ApiResponse(
			responseCode = "409",
			description = "Already claimed",
			content = @Content(
				mediaType = "application/json",
				schema = @Schema(implementation = ErrorResponse.class)
			)
		)
	})
	@PostMapping("/api/leaflet/claim")
	public ResponseEntity<LeafletProgressResponse> claim(
		@Valid @RequestBody final LeafletClaimRequest requestBody,
		@Parameter(hidden = true) final HttpServletRequest request
	) {
		final Participant participant = requireParticipant(request);
		return ResponseEntity.ok(leafletService.claim(participant, requestBody.code()));
	}

	@Operation(
		summary = "Get stamp code for current team",
		description = "Returns the current team's stamp code for generating a booth QR."
	)
	@ApiResponses({
		@ApiResponse(
			responseCode = "200",
			description = "OK",
			content = @Content(
				mediaType = "application/json",
				schema = @Schema(implementation = LeafletStampCodeResponse.class)
			)
		),
		@ApiResponse(
			responseCode = "401",
			description = "Unauthorized",
			content = @Content(
				mediaType = "application/json",
				schema = @Schema(implementation = ErrorResponse.class)
			)
		),
		@ApiResponse(
			responseCode = "404",
			description = "Not Found",
			content = @Content(
				mediaType = "application/json",
				schema = @Schema(implementation = ErrorResponse.class)
			)
		)
	})
	@GetMapping("/api/leaflet/stamp-code")
	public ResponseEntity<LeafletStampCodeResponse> stampCode(
		@Parameter(hidden = true) final HttpServletRequest request
	) {
		final Participant participant = requireParticipant(request);

		final String stampKey = participant.getTeamKey();
		if (!LeafletStampKeys.ALLOWLIST.contains(stampKey)) {
			return ResponseEntity.notFound().build();
		}

		final StampCode stampCode = leafletService.getAvailableStampCodeByStampKey(stampKey);
		return ResponseEntity.ok(new LeafletStampCodeResponse(stampCode.getCode(), stampCode.getStampKey()));
	}

	private Participant requireParticipant(final HttpServletRequest request) {
		final String rawToken = cookieService.extractRawToken(request).orElse(null);
		return authService.requireCurrentParticipant(rawToken);
	}
}
