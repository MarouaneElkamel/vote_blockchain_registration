package com.insat.pfa.service;

import com.insat.pfa.domain.Vote;
import java.util.List;

/**
 * Service Interface for managing Vote.
 */
public interface VoteService {

    /**
     * Save a vote.
     *
     * @param vote the entity to save
     * @return the persisted entity
     */
    Vote save(Vote vote);

    /**
     * Get all the votes.
     *
     * @return the list of entities
     */
    List<Vote> findAll();

    /**
     * Get the "id" vote.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Vote findOne(Long id);

    /**
     * Delete the "id" vote.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
