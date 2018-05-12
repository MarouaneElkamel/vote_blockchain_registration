package com.insat.pfa.service.impl;

import com.insat.pfa.service.AllowedToVoteService;
import com.insat.pfa.domain.AllowedToVote;
import com.insat.pfa.repository.AllowedToVoteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing AllowedToVote.
 */
@Service
@Transactional
public class AllowedToVoteServiceImpl implements AllowedToVoteService {

    private final Logger log = LoggerFactory.getLogger(AllowedToVoteServiceImpl.class);

    private final AllowedToVoteRepository allowedToVoteRepository;

    public AllowedToVoteServiceImpl(AllowedToVoteRepository allowedToVoteRepository) {
        this.allowedToVoteRepository = allowedToVoteRepository;
    }

    /**
     * Save a allowedToVote.
     *
     * @param allowedToVote the entity to save
     * @return the persisted entity
     */
    @Override
    public AllowedToVote save(AllowedToVote allowedToVote) {
        log.debug("Request to save AllowedToVote : {}", allowedToVote);
        return allowedToVoteRepository.save(allowedToVote);
    }

    /**
     * Get all the allowedToVotes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AllowedToVote> findAll() {
        log.debug("Request to get all AllowedToVotes");
        return allowedToVoteRepository.findAll();
    }

    /**
     * Get one allowedToVote by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AllowedToVote findOne(Long id) {
        log.debug("Request to get AllowedToVote : {}", id);
        return allowedToVoteRepository.findOne(id);
    }

    /**
     * Delete the allowedToVote by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AllowedToVote : {}", id);
        allowedToVoteRepository.delete(id);
    }
}
