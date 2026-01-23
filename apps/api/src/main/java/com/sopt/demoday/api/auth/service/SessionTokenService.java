package com.sopt.demoday.api.auth.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.stereotype.Component;

@Component
public class SessionTokenService {

	private static final int TOKEN_BYTES = 32;

	private final SecureRandom random = new SecureRandom();

	public String newRawToken() {
		final byte[] bytes = new byte[TOKEN_BYTES];
		random.nextBytes(bytes);

		return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
	}

	public String hashToken(final String rawToken) {
		try {
			final MessageDigest digest = MessageDigest.getInstance("SHA-256");
			final byte[] hashed = digest.digest(rawToken.getBytes(StandardCharsets.UTF_8));
			return toHex(hashed);
		} catch (final NoSuchAlgorithmException exception) {
			throw new IllegalStateException("SHA-256 not available", exception);
		}
	}

	private static String toHex(final byte[] bytes) {
		final StringBuilder builder = new StringBuilder(bytes.length * 2);
		for (final byte value : bytes) {
			builder.append(String.format("%02x", value));
		}
		return builder.toString();
	}
}
