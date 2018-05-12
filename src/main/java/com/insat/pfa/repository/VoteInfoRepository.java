package com.insat.pfa.repository;

import com.insat.pfa.domain.VoteInfo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the VoteInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VoteInfoRepository extends JpaRepository<VoteInfo, Long> {

    @Query("select vote_info from VoteInfo vote_info where vote_info.owner.login = ?#{principal.username}")
    List<VoteInfo> findByOwnerIsCurrentUser();
    @Query("select distinct vote_info from VoteInfo vote_info left join fetch vote_info.electeds left join fetch vote_info.voters")
    List<VoteInfo> findAllWithEagerRelationships();

    @Query("select vote_info from VoteInfo vote_info left join fetch vote_info.electeds left join fetch vote_info.voters where vote_info.id =:id")
    VoteInfo findOneWithEagerRelationships(@Param("id") Long id);

}
