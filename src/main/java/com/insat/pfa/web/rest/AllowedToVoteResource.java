package com.insat.pfa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.insat.pfa.domain.AllowedToVote;
import com.insat.pfa.service.AllowedToVoteService;
import com.insat.pfa.web.rest.errors.BadRequestAlertException;
import com.insat.pfa.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AllowedToVote.
 */
@RestController
@RequestMapping("/api")
public class AllowedToVoteResource {

    private final Logger log = LoggerFactory.getLogger(AllowedToVoteResource.class);

    private static final String ENTITY_NAME = "allowedToVote";

    private final AllowedToVoteService allowedToVoteService;

    public AllowedToVoteResource(AllowedToVoteService allowedToVoteService) {
        this.allowedToVoteService = allowedToVoteService;
    }

    /**
     * POST  /allowed-to-votes : Create a new allowedToVote.
     *
     * @param allowedToVote the allowedToVote to create
     * @return the ResponseEntity with status 201 (Created) and with body the new allowedToVote, or with status 400 (Bad Request) if the allowedToVote has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/allowed-to-votes")
    @Timed
    public ResponseEntity<AllowedToVote> createAllowedToVote(@RequestBody AllowedToVote allowedToVote) throws URISyntaxException {
        log.debug("REST request to save AllowedToVote : {}", allowedToVote);
        if (allowedToVote.getId() != null) {
            throw new BadRequestAlertException("A new allowedToVote cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AllowedToVote result = allowedToVoteService.save(allowedToVote);
        return ResponseEntity.created(new URI("/api/allowed-to-votes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /allowed-to-votes : Updates an existing allowedToVote.
     *
     * @param allowedToVote the allowedToVote to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated allowedToVote,
     * or with status 400 (Bad Request) if the allowedToVote is not valid,
     * or with status 500 (Internal Server Error) if the allowedToVote couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/allowed-to-votes")
    @Timed
    public ResponseEntity<AllowedToVote> updateAllowedToVote(@RequestBody AllowedToVote allowedToVote) throws URISyntaxException {
        log.debug("REST request to update AllowedToVote : {}", allowedToVote);
        if (allowedToVote.getId() == null) {
            return createAllowedToVote(allowedToVote);
        }
        AllowedToVote result = allowedToVoteService.save(allowedToVote);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, allowedToVote.getId().toString()))
            .body(result);
    }

    /**
     * GET  /allowed-to-votes : get all the allowedToVotes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of allowedToVotes in body
     */
    @GetMapping("/allowed-to-votes")
    @Timed
    public List<AllowedToVote> getAllAllowedToVotes() {
        log.debug("REST request to get all AllowedToVotes");
        return allowedToVoteService.findAll();
        }

    /**
     * GET  /allowed-to-votes/:id : get the "id" allowedToVote.
     *
     * @param id the id of the allowedToVote to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the allowedToVote, or with status 404 (Not Found)
     */
    @GetMapping("/allowed-to-votes/{id}")
    @Timed
    public ResponseEntity<AllowedToVote> getAllowedToVote(@PathVariable Long id) {
        log.debug("REST request to get AllowedToVote : {}", id);
        AllowedToVote allowedToVote = allowedToVoteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(allowedToVote));
    }

    /**
     * DELETE  /allowed-to-votes/:id : delete the "id" allowedToVote.
     *
     * @param id the id of the allowedToVote to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/allowed-to-votes/{id}")
    @Timed
    public ResponseEntity<Void> deleteAllowedToVote(@PathVariable Long id) {
        log.debug("REST request to delete AllowedToVote : {}", id);
        allowedToVoteService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
