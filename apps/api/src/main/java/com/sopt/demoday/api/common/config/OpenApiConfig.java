package com.sopt.demoday.api.common.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
	info = @Info(
		title = "SOPT Demoday API",
		description = "SOPT 37th Demoday API",
		version = "v1"
	),
	servers = {
		@Server(url = "http://localhost:8080", description = "Local"),
		@Server(url = "https://api.sopt-demoday.org", description = "Production")
	}
)
@SecurityScheme(
	name = "SessionCookie",
	type = SecuritySchemeType.APIKEY,
	in = SecuritySchemeIn.COOKIE,
	paramName = "sid",
	description = "HttpOnly session cookie. Cookie name can be changed via app.session.cookie-name."
)
public class OpenApiConfig {
}
