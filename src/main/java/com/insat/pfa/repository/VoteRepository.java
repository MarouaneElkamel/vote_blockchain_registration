package com.insat.pfa.repository;

import com.insat.pfa.domain.Vote;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Vote entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    @Query("select vote from Vote vote where vote.owner.login = ?#{principal.username}")
    List<Vote> findByOwnerIsCurrentUser();
    @Query("select distinct vote from Vote vote left join fetch vote.voters")
    List<Vote> findAllWithEagerRelationships();

    @Query("select vote from Vote vote left join fetch vote.voters where vote.id =:id")
    Vote findOneWithEagerRelationships(@Param("id") Long id);

}
