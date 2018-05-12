package com.insat.pfa.repository;

import com.insat.pfa.domain.NotAllowedToVote;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the NotAllowedToVote entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotAllowedToVoteRepository extends JpaRepository<NotAllowedToVote, Long> {

}
