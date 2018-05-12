package com.insat.pfa.service.impl;

import com.insat.pfa.service.VoteInfoService;
import com.insat.pfa.domain.VoteInfo;
import com.insat.pfa.repository.VoteInfoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing VoteInfo.
 */
@Service
@Transactional
public class VoteInfoServiceImpl implements VoteInfoService {

    private final Logger log = LoggerFactory.getLogger(VoteInfoServiceImpl.class);

    private final VoteInfoRepository voteInfoRepository;

    public VoteInfoServiceImpl(VoteInfoRepository voteInfoRepository) {
        this.voteInfoRepository = voteInfoRepository;
    }

    /**
     * Save a voteInfo.
     *
     * @param voteInfo the entity to save
     * @return the persisted entity
     */
    @Override
    public VoteInfo save(VoteInfo voteInfo) {
        log.debug("Request to save VoteInfo : {}", voteInfo);
        return voteInfoRepository.save(voteInfo);
    }

    /**
     * Get all the voteInfos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<VoteInfo> findAll() {
        log.debug("Request to get all VoteInfos");
        return voteInfoRepository.findAllWithEagerRelationships();
    }

    /**
     * Get one voteInfo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public VoteInfo findOne(Long id) {
        log.debug("Request to get VoteInfo : {}", id);
        return voteInfoRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the voteInfo by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete VoteInfo : {}", id);
        voteInfoRepository.delete(id);
    }
}
