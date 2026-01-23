package com.sopt.demoday.api.leaflet.code;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StampCodeRepository extends JpaRepository<StampCode, String> {
	List<StampCode> findAllByStampKeyOrderByCreatedAtDesc(String stampKey);
}
