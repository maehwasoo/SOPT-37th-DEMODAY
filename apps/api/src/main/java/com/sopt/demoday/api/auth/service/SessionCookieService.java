package com.sopt.demoday.api.auth.service;

import java.util.Arrays;
import java.util.Optional;

import com.sopt.demoday.api.auth.config.SessionSettings;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class SessionCookieService {

	private final SessionSettings settings;

	public SessionCookieService(final SessionSettings settings) {
		this.settings = settings;
	}

	public Optional<String> extractRawToken(final HttpServletRequest request) {
		final Cookie[] cookies = request.getCookies();
		if (cookies == null) {
			return Optional.empty();
		}

		return Arrays.stream(cookies)
			.filter(cookie -> settings.getCookieName().equals(cookie.getName()))
			.map(Cookie::getValue)
			.filter(value -> value != null && !value.isBlank())
			.findFirst();
	}

	public ResponseCookie newSessionCookie(final String rawToken) {
		return ResponseCookie.from(settings.getCookieName(), rawToken)
			.httpOnly(true)
			.secure(settings.isCookieSecure())
			.sameSite(settings.getCookieSameSite())
			.path("/")
			.maxAge(settings.getSessionTtl())
			.build();
	}

	public ResponseCookie clearSessionCookie() {
		return ResponseCookie.from(settings.getCookieName(), "")
			.httpOnly(true)
			.secure(settings.isCookieSecure())
			.sameSite(settings.getCookieSameSite())
			.path("/")
			.maxAge(0)
			.build();
	}
}
