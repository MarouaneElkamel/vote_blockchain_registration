package com.insat.pfa.repository;

import com.insat.pfa.domain.AllowedToVote;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AllowedToVote entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AllowedToVoteRepository extends JpaRepository<AllowedToVote, Long> {

}
