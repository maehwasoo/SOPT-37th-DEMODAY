package com.sopt.demoday.api.health;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Health", description = "Health checks")
@RestController
public class HealthController {

	@Operation(summary = "Health check", description = "Returns ok when API is healthy.")
	@GetMapping("/api/health")
	public String health() {
		return "ok";
	}

}
