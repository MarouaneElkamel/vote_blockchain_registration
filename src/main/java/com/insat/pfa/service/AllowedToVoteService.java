package com.insat.pfa.service;

import com.insat.pfa.domain.AllowedToVote;
import java.util.List;

/**
 * Service Interface for managing AllowedToVote.
 */
public interface AllowedToVoteService {

    /**
     * Save a allowedToVote.
     *
     * @param allowedToVote the entity to save
     * @return the persisted entity
     */
    AllowedToVote save(AllowedToVote allowedToVote);

    /**
     * Get all the allowedToVotes.
     *
     * @return the list of entities
     */
    List<AllowedToVote> findAll();

    /**
     * Get the "id" allowedToVote.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AllowedToVote findOne(Long id);

    /**
     * Delete the "id" allowedToVote.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
