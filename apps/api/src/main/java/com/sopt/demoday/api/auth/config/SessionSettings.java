package com.sopt.demoday.api.auth.config;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SessionSettings {

	private final String cookieName;
	private final boolean cookieSecure;
	private final String cookieSameSite;
	private final Duration sessionTtl;

	public SessionSettings(
		@Value("${app.session.cookie-name:sid}") final String cookieName,
		@Value("${app.session.cookie-secure:false}") final boolean cookieSecure,
		@Value("${app.session.cookie-samesite:Lax}") final String cookieSameSite,
		@Value("${app.session.ttl-seconds:2592000}") final long sessionTtlSeconds
	) {
		this.cookieName = cookieName;
		this.cookieSecure = cookieSecure;
		this.cookieSameSite = cookieSameSite;
		this.sessionTtl = Duration.ofSeconds(sessionTtlSeconds);
	}

	public String getCookieName() {
		return cookieName;
	}

	public boolean isCookieSecure() {
		return cookieSecure;
	}

	public String getCookieSameSite() {
		return cookieSameSite;
	}

	public Duration getSessionTtl() {
		return sessionTtl;
	}
}
