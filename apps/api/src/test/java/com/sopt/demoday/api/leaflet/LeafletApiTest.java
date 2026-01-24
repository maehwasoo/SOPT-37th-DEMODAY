package com.sopt.demoday.api.leaflet;

import java.time.OffsetDateTime;

import com.sopt.demoday.api.leaflet.code.StampCode;
import com.sopt.demoday.api.leaflet.code.StampCodeRepository;
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

class LeafletApiTest extends IntegrationTestSupport {

	@Autowired
	private WebApplicationContext webApplicationContext;

	@Autowired
	private StampCodeRepository stampCodeRepository;

	private MockMvc mockMvc;

	@BeforeEach
	void setUp() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
	}

	@Test
	void progress_without_cookie_returns_401() throws Exception {
		mockMvc.perform(get("/api/leaflet/progress"))
			.andExpect(status().isUnauthorized())
			.andExpect(jsonPath("$.errorCode", is("AUTH_UNAUTHORIZED")));
	}

	@Test
	void claim_invalid_code_returns_404() throws Exception {
		final Cookie sid = loginCookie();

		mockMvc.perform(
				post("/api/leaflet/claim")
					.cookie(sid)
					.contentType(MediaType.APPLICATION_JSON)
					.content("{\"code\":\"INVALID\"}")
			)
			.andExpect(status().isNotFound())
			.andExpect(jsonPath("$.errorCode", is("LEAFLET_CODE_NOT_FOUND")));
	}

	@Test
	void claim_valid_code_returns_updated_progress_and_duplicate_is_409() throws Exception {
		stampCodeRepository.save(new StampCode("CODE-AMP", "amp", true, null));

		final Cookie sid = loginCookie();

		mockMvc.perform(
				post("/api/leaflet/claim")
					.cookie(sid)
					.contentType(MediaType.APPLICATION_JSON)
					.content("{\"code\":\"CODE-AMP\"}")
			)
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.totalCount", is(12)))
			.andExpect(jsonPath("$.completedCount", is(1)))
			.andExpect(jsonPath("$.completedStampKeys[0]", is("amp")));

		mockMvc.perform(get("/api/leaflet/progress").cookie(sid))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.completedCount", is(1)));

		mockMvc.perform(
				post("/api/leaflet/claim")
					.cookie(sid)
					.contentType(MediaType.APPLICATION_JSON)
					.content("{\"code\":\"CODE-AMP\"}")
			)
			.andExpect(status().isConflict())
			.andExpect(jsonPath("$.errorCode", is("LEAFLET_CLAIM_DUPLICATE")));
	}

	@Test
	void claim_expired_code_returns_404() throws Exception {
		stampCodeRepository.save(new StampCode(
			"CODE-EXPIRED",
			"amp",
			true,
			OffsetDateTime.now().minusSeconds(1)
		));

		final Cookie sid = loginCookie();

		mockMvc.perform(
				post("/api/leaflet/claim")
					.cookie(sid)
					.contentType(MediaType.APPLICATION_JSON)
					.content("{\"code\":\"CODE-EXPIRED\"}")
			)
			.andExpect(status().isNotFound())
			.andExpect(jsonPath("$.errorCode", is("LEAFLET_CODE_NOT_FOUND")));
	}

	private Cookie loginCookie() throws Exception {
		final MvcResult loginResult = mockMvc.perform(
				post("/api/auth/login")
					.contentType(MediaType.APPLICATION_JSON)
					.content("{\"teamKey\":\"external\",\"name\":\"홍길동\"}")
			)
			.andExpect(status().isOk())
			.andExpect(header().string("Set-Cookie", containsString("sid=")))
			.andReturn();

		final String setCookie = loginResult.getResponse().getHeader("Set-Cookie");
		final String rawToken = setCookie.split(";", 2)[0].split("=", 2)[1];
		return new Cookie("sid", rawToken);
	}
}
