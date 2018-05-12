package com.insat.pfa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.insat.pfa.domain.NotAllowedToVote;
import com.insat.pfa.service.NotAllowedToVoteService;
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
 * REST controller for managing NotAllowedToVote.
 */
@RestController
@RequestMapping("/api")
public class NotAllowedToVoteResource {

    private final Logger log = LoggerFactory.getLogger(NotAllowedToVoteResource.class);

    private static final String ENTITY_NAME = "notAllowedToVote";

    private final NotAllowedToVoteService notAllowedToVoteService;

    public NotAllowedToVoteResource(NotAllowedToVoteService notAllowedToVoteService) {
        this.notAllowedToVoteService = notAllowedToVoteService;
    }

    /**
     * POST  /not-allowed-to-votes : Create a new notAllowedToVote.
     *
     * @param notAllowedToVote the notAllowedToVote to create
     * @return the ResponseEntity with status 201 (Created) and with body the new notAllowedToVote, or with status 400 (Bad Request) if the notAllowedToVote has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/not-allowed-to-votes")
    @Timed
    public ResponseEntity<NotAllowedToVote> createNotAllowedToVote(@RequestBody NotAllowedToVote notAllowedToVote) throws URISyntaxException {
        log.debug("REST request to save NotAllowedToVote : {}", notAllowedToVote);
        if (notAllowedToVote.getId() != null) {
            throw new BadRequestAlertException("A new notAllowedToVote cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NotAllowedToVote result = notAllowedToVoteService.save(notAllowedToVote);
        return ResponseEntity.created(new URI("/api/not-allowed-to-votes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /not-allowed-to-votes : Updates an existing notAllowedToVote.
     *
     * @param notAllowedToVote the notAllowedToVote to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated notAllowedToVote,
     * or with status 400 (Bad Request) if the notAllowedToVote is not valid,
     * or with status 500 (Internal Server Error) if the notAllowedToVote couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/not-allowed-to-votes")
    @Timed
    public ResponseEntity<NotAllowedToVote> updateNotAllowedToVote(@RequestBody NotAllowedToVote notAllowedToVote) throws URISyntaxException {
        log.debug("REST request to update NotAllowedToVote : {}", notAllowedToVote);
        if (notAllowedToVote.getId() == null) {
            return createNotAllowedToVote(notAllowedToVote);
        }
        NotAllowedToVote result = notAllowedToVoteService.save(notAllowedToVote);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, notAllowedToVote.getId().toString()))
            .body(result);
    }

    /**
     * GET  /not-allowed-to-votes : get all the notAllowedToVotes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of notAllowedToVotes in body
     */
    @GetMapping("/not-allowed-to-votes")
    @Timed
    public List<NotAllowedToVote> getAllNotAllowedToVotes() {
        log.debug("REST request to get all NotAllowedToVotes");
        return notAllowedToVoteService.findAll();
        }

    /**
     * GET  /not-allowed-to-votes/:id : get the "id" notAllowedToVote.
     *
     * @param id the id of the notAllowedToVote to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the notAllowedToVote, or with status 404 (Not Found)
     */
    @GetMapping("/not-allowed-to-votes/{id}")
    @Timed
    public ResponseEntity<NotAllowedToVote> getNotAllowedToVote(@PathVariable Long id) {
        log.debug("REST request to get NotAllowedToVote : {}", id);
        NotAllowedToVote notAllowedToVote = notAllowedToVoteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(notAllowedToVote));
    }

    /**
     * DELETE  /not-allowed-to-votes/:id : delete the "id" notAllowedToVote.
     *
     * @param id the id of the notAllowedToVote to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/not-allowed-to-votes/{id}")
    @Timed
    public ResponseEntity<Void> deleteNotAllowedToVote(@PathVariable Long id) {
        log.debug("REST request to delete NotAllowedToVote : {}", id);
        notAllowedToVoteService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
