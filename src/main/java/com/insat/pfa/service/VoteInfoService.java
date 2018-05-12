package com.insat.pfa.service;

import com.insat.pfa.domain.VoteInfo;
import java.util.List;

/**
 * Service Interface for managing VoteInfo.
 */
public interface VoteInfoService {

    /**
     * Save a voteInfo.
     *
     * @param voteInfo the entity to save
     * @return the persisted entity
     */
    VoteInfo save(VoteInfo voteInfo);

    /**
     * Get all the voteInfos.
     *
     * @return the list of entities
     */
    List<VoteInfo> findAll();

    /**
     * Get the "id" voteInfo.
     *
     * @param id the id of the entity
     * @return the entity
     */
    VoteInfo findOne(Long id);

    /**
     * Delete the "id" voteInfo.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
