package com.sopt.demoday.api.auth;

import com.sopt.demoday.api.support.IntegrationTestSupport;

import jakarta.servlet.http.Cookie;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class AuthApiTest extends IntegrationTestSupport {

	@Autowired
	private WebApplicationContext webApplicationContext;

	private MockMvc mockMvc;

	@BeforeEach
	void setUp() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
	}

	@Test
	void login_then_me_returns_participant() throws Exception {
		final MvcResult loginResult = mockMvc.perform(
				post("/api/auth/login")
					.contentType(MediaType.APPLICATION_JSON)
					.content("{\"teamKey\":\"external\",\"name\":\"홍길동\"}")
			)
			.andExpect(status().isOk())
			.andExpect(header().string("Set-Cookie", containsString("sid=")))
			.andExpect(jsonPath("$.teamKey", is("external")))
			.andExpect(jsonPath("$.name", is("홍길동")))
			.andReturn();

		final String setCookie = loginResult.getResponse().getHeader("Set-Cookie");
		final String rawToken = setCookie.split(";", 2)[0].split("=", 2)[1];
		final Cookie sidCookie = new Cookie("sid", rawToken);

		mockMvc.perform(get("/api/me").cookie(sidCookie))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.teamKey", is("external")))
			.andExpect(jsonPath("$.name", is("홍길동")));
	}

	@Test
	void me_without_cookie_returns_401() throws Exception {
		mockMvc.perform(get("/api/me"))
			.andExpect(status().isUnauthorized())
			.andExpect(jsonPath("$.errorCode", is("AUTH_UNAUTHORIZED")));
	}

	@Test
	void logout_clears_cookie() throws Exception {
		final MvcResult loginResult = mockMvc.perform(
				post("/api/auth/login")
					.contentType(MediaType.APPLICATION_JSON)
					.content("{\"teamKey\":\"external\",\"name\":\"홍길동\"}")
			)
			.andExpect(status().isOk())
			.andReturn();

		final String setCookie = loginResult.getResponse().getHeader("Set-Cookie");
		final String rawToken = setCookie.split(";", 2)[0].split("=", 2)[1];
		final Cookie sidCookie = new Cookie("sid", rawToken);

		mockMvc.perform(post("/api/auth/logout").cookie(sidCookie))
			.andExpect(status().isNoContent())
			.andExpect(header().string("Set-Cookie", containsString("Max-Age=0")));
	}
}
