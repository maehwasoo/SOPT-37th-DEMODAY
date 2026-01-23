package com.sopt.demoday.api.participant;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

	Optional<Participant> findByTeamKeyAndName(String teamKey, String name);
}
