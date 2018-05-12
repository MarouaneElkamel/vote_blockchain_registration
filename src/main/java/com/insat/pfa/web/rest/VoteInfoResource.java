package com.insat.pfa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.insat.pfa.domain.VoteInfo;
import com.insat.pfa.service.VoteInfoService;
import com.insat.pfa.web.rest.errors.BadRequestAlertException;
import com.insat.pfa.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing VoteInfo.
 */
@RestController
@RequestMapping("/api")
public class VoteInfoResource {

    private final Logger log = LoggerFactory.getLogger(VoteInfoResource.class);

    private static final String ENTITY_NAME = "voteInfo";

    private final VoteInfoService voteInfoService;

    public VoteInfoResource(VoteInfoService voteInfoService) {
        this.voteInfoService = voteInfoService;
    }

    /**
     * POST  /vote-infos : Create a new voteInfo.
     *
     * @param voteInfo the voteInfo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new voteInfo, or with status 400 (Bad Request) if the voteInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vote-infos")
    @Timed
    public ResponseEntity<VoteInfo> createVoteInfo(@Valid @RequestBody VoteInfo voteInfo) throws URISyntaxException {
        log.debug("REST request to save VoteInfo : {}", voteInfo);
        if (voteInfo.getId() != null) {
            throw new BadRequestAlertException("A new voteInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VoteInfo result = voteInfoService.save(voteInfo);
        return ResponseEntity.created(new URI("/api/vote-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vote-infos : Updates an existing voteInfo.
     *
     * @param voteInfo the voteInfo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated voteInfo,
     * or with status 400 (Bad Request) if the voteInfo is not valid,
     * or with status 500 (Internal Server Error) if the voteInfo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vote-infos")
    @Timed
    public ResponseEntity<VoteInfo> updateVoteInfo(@Valid @RequestBody VoteInfo voteInfo) throws URISyntaxException {
        log.debug("REST request to update VoteInfo : {}", voteInfo);
        if (voteInfo.getId() == null) {
            return createVoteInfo(voteInfo);
        }
        VoteInfo result = voteInfoService.save(voteInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, voteInfo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vote-infos : get all the voteInfos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of voteInfos in body
     */
    @GetMapping("/vote-infos")
    @Timed
    public List<VoteInfo> getAllVoteInfos() {
        log.debug("REST request to get all VoteInfos");
        return voteInfoService.findAll();
        }

    /**
     * GET  /vote-infos/:id : get the "id" voteInfo.
     *
     * @param id the id of the voteInfo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the voteInfo, or with status 404 (Not Found)
     */
    @GetMapping("/vote-infos/{id}")
    @Timed
    public ResponseEntity<VoteInfo> getVoteInfo(@PathVariable Long id) {
        log.debug("REST request to get VoteInfo : {}", id);
        VoteInfo voteInfo = voteInfoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(voteInfo));
    }

    /**
     * DELETE  /vote-infos/:id : delete the "id" voteInfo.
     *
     * @param id the id of the voteInfo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vote-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteVoteInfo(@PathVariable Long id) {
        log.debug("REST request to delete VoteInfo : {}", id);
        voteInfoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
