package com.insat.pfa.service.impl;

import com.insat.pfa.service.NotAllowedToVoteService;
import com.insat.pfa.domain.NotAllowedToVote;
import com.insat.pfa.repository.NotAllowedToVoteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing NotAllowedToVote.
 */
@Service
@Transactional
public class NotAllowedToVoteServiceImpl implements NotAllowedToVoteService {

    private final Logger log = LoggerFactory.getLogger(NotAllowedToVoteServiceImpl.class);

    private final NotAllowedToVoteRepository notAllowedToVoteRepository;

    public NotAllowedToVoteServiceImpl(NotAllowedToVoteRepository notAllowedToVoteRepository) {
        this.notAllowedToVoteRepository = notAllowedToVoteRepository;
    }

    /**
     * Save a notAllowedToVote.
     *
     * @param notAllowedToVote the entity to save
     * @return the persisted entity
     */
    @Override
    public NotAllowedToVote save(NotAllowedToVote notAllowedToVote) {
        log.debug("Request to save NotAllowedToVote : {}", notAllowedToVote);
        return notAllowedToVoteRepository.save(notAllowedToVote);
    }

    /**
     * Get all the notAllowedToVotes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<NotAllowedToVote> findAll() {
        log.debug("Request to get all NotAllowedToVotes");
        return notAllowedToVoteRepository.findAll();
    }

    /**
     * Get one notAllowedToVote by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public NotAllowedToVote findOne(Long id) {
        log.debug("Request to get NotAllowedToVote : {}", id);
        return notAllowedToVoteRepository.findOne(id);
    }

    /**
     * Delete the notAllowedToVote by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete NotAllowedToVote : {}", id);
        notAllowedToVoteRepository.delete(id);
    }
}
