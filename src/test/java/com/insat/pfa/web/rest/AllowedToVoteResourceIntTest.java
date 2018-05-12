package com.insat.pfa.web.rest;

import com.insat.pfa.VoteApp;

import com.insat.pfa.domain.AllowedToVote;
import com.insat.pfa.repository.AllowedToVoteRepository;
import com.insat.pfa.service.AllowedToVoteService;
import com.insat.pfa.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.insat.pfa.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AllowedToVoteResource REST controller.
 *
 * @see AllowedToVoteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VoteApp.class)
public class AllowedToVoteResourceIntTest {

    @Autowired
    private AllowedToVoteRepository allowedToVoteRepository;

    @Autowired
    private AllowedToVoteService allowedToVoteService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAllowedToVoteMockMvc;

    private AllowedToVote allowedToVote;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AllowedToVoteResource allowedToVoteResource = new AllowedToVoteResource(allowedToVoteService);
        this.restAllowedToVoteMockMvc = MockMvcBuilders.standaloneSetup(allowedToVoteResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AllowedToVote createEntity(EntityManager em) {
        AllowedToVote allowedToVote = new AllowedToVote();
        return allowedToVote;
    }

    @Before
    public void initTest() {
        allowedToVote = createEntity(em);
    }

    @Test
    @Transactional
    public void createAllowedToVote() throws Exception {
        int databaseSizeBeforeCreate = allowedToVoteRepository.findAll().size();

        // Create the AllowedToVote
        restAllowedToVoteMockMvc.perform(post("/api/allowed-to-votes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(allowedToVote)))
            .andExpect(status().isCreated());

        // Validate the AllowedToVote in the database
        List<AllowedToVote> allowedToVoteList = allowedToVoteRepository.findAll();
        assertThat(allowedToVoteList).hasSize(databaseSizeBeforeCreate + 1);
        AllowedToVote testAllowedToVote = allowedToVoteList.get(allowedToVoteList.size() - 1);
    }

    @Test
    @Transactional
    public void createAllowedToVoteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = allowedToVoteRepository.findAll().size();

        // Create the AllowedToVote with an existing ID
        allowedToVote.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAllowedToVoteMockMvc.perform(post("/api/allowed-to-votes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(allowedToVote)))
            .andExpect(status().isBadRequest());

        // Validate the AllowedToVote in the database
        List<AllowedToVote> allowedToVoteList = allowedToVoteRepository.findAll();
        assertThat(allowedToVoteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAllowedToVotes() throws Exception {
        // Initialize the database
        allowedToVoteRepository.saveAndFlush(allowedToVote);

        // Get all the allowedToVoteList
        restAllowedToVoteMockMvc.perform(get("/api/allowed-to-votes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(allowedToVote.getId().intValue())));
    }

    @Test
    @Transactional
    public void getAllowedToVote() throws Exception {
        // Initialize the database
        allowedToVoteRepository.saveAndFlush(allowedToVote);

        // Get the allowedToVote
        restAllowedToVoteMockMvc.perform(get("/api/allowed-to-votes/{id}", allowedToVote.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(allowedToVote.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAllowedToVote() throws Exception {
        // Get the allowedToVote
        restAllowedToVoteMockMvc.perform(get("/api/allowed-to-votes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAllowedToVote() throws Exception {
        // Initialize the database
        allowedToVoteService.save(allowedToVote);

        int databaseSizeBeforeUpdate = allowedToVoteRepository.findAll().size();

        // Update the allowedToVote
        AllowedToVote updatedAllowedToVote = allowedToVoteRepository.findOne(allowedToVote.getId());
        // Disconnect from session so that the updates on updatedAllowedToVote are not directly saved in db
        em.detach(updatedAllowedToVote);

        restAllowedToVoteMockMvc.perform(put("/api/allowed-to-votes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAllowedToVote)))
            .andExpect(status().isOk());

        // Validate the AllowedToVote in the database
        List<AllowedToVote> allowedToVoteList = allowedToVoteRepository.findAll();
        assertThat(allowedToVoteList).hasSize(databaseSizeBeforeUpdate);
        AllowedToVote testAllowedToVote = allowedToVoteList.get(allowedToVoteList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingAllowedToVote() throws Exception {
        int databaseSizeBeforeUpdate = allowedToVoteRepository.findAll().size();

        // Create the AllowedToVote

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAllowedToVoteMockMvc.perform(put("/api/allowed-to-votes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(allowedToVote)))
            .andExpect(status().isCreated());

        // Validate the AllowedToVote in the database
        List<AllowedToVote> allowedToVoteList = allowedToVoteRepository.findAll();
        assertThat(allowedToVoteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAllowedToVote() throws Exception {
        // Initialize the database
        allowedToVoteService.save(allowedToVote);

        int databaseSizeBeforeDelete = allowedToVoteRepository.findAll().size();

        // Get the allowedToVote
        restAllowedToVoteMockMvc.perform(delete("/api/allowed-to-votes/{id}", allowedToVote.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AllowedToVote> allowedToVoteList = allowedToVoteRepository.findAll();
        assertThat(allowedToVoteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AllowedToVote.class);
        AllowedToVote allowedToVote1 = new AllowedToVote();
        allowedToVote1.setId(1L);
        AllowedToVote allowedToVote2 = new AllowedToVote();
        allowedToVote2.setId(allowedToVote1.getId());
        assertThat(allowedToVote1).isEqualTo(allowedToVote2);
        allowedToVote2.setId(2L);
        assertThat(allowedToVote1).isNotEqualTo(allowedToVote2);
        allowedToVote1.setId(null);
        assertThat(allowedToVote1).isNotEqualTo(allowedToVote2);
    }
}
