package com.insat.pfa.service;

import com.insat.pfa.domain.NotAllowedToVote;
import java.util.List;

/**
 * Service Interface for managing NotAllowedToVote.
 */
public interface NotAllowedToVoteService {

    /**
     * Save a notAllowedToVote.
     *
     * @param notAllowedToVote the entity to save
     * @return the persisted entity
     */
    NotAllowedToVote save(NotAllowedToVote notAllowedToVote);

    /**
     * Get all the notAllowedToVotes.
     *
     * @return the list of entities
     */
    List<NotAllowedToVote> findAll();

    /**
     * Get the "id" notAllowedToVote.
     *
     * @param id the id of the entity
     * @return the entity
     */
    NotAllowedToVote findOne(Long id);

    /**
     * Delete the "id" notAllowedToVote.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
