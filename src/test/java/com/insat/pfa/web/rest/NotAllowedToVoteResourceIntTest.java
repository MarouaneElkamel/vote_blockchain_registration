package com.insat.pfa.web.rest;

import com.insat.pfa.VoteApp;

import com.insat.pfa.domain.NotAllowedToVote;
import com.insat.pfa.repository.NotAllowedToVoteRepository;
import com.insat.pfa.service.NotAllowedToVoteService;
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
 * Test class for the NotAllowedToVoteResource REST controller.
 *
 * @see NotAllowedToVoteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VoteApp.class)
public class NotAllowedToVoteResourceIntTest {

    @Autowired
    private NotAllowedToVoteRepository notAllowedToVoteRepository;

    @Autowired
    private NotAllowedToVoteService notAllowedToVoteService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNotAllowedToVoteMockMvc;

    private NotAllowedToVote notAllowedToVote;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NotAllowedToVoteResource notAllowedToVoteResource = new NotAllowedToVoteResource(notAllowedToVoteService);
        this.restNotAllowedToVoteMockMvc = MockMvcBuilders.standaloneSetup(notAllowedToVoteResource)
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
    public static NotAllowedToVote createEntity(EntityManager em) {
        NotAllowedToVote notAllowedToVote = new NotAllowedToVote();
        return notAllowedToVote;
    }

    @Before
    public void initTest() {
        notAllowedToVote = createEntity(em);
    }

    @Test
    @Transactional
    public void createNotAllowedToVote() throws Exception {
        int databaseSizeBeforeCreate = notAllowedToVoteRepository.findAll().size();

        // Create the NotAllowedToVote
        restNotAllowedToVoteMockMvc.perform(post("/api/not-allowed-to-votes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notAllowedToVote)))
            .andExpect(status().isCreated());

        // Validate the NotAllowedToVote in the database
        List<NotAllowedToVote> notAllowedToVoteList = notAllowedToVoteRepository.findAll();
        assertThat(notAllowedToVoteList).hasSize(databaseSizeBeforeCreate + 1);
        NotAllowedToVote testNotAllowedToVote = notAllowedToVoteList.get(notAllowedToVoteList.size() - 1);
    }

    @Test
    @Transactional
    public void createNotAllowedToVoteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = notAllowedToVoteRepository.findAll().size();

        // Create the NotAllowedToVote with an existing ID
        notAllowedToVote.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNotAllowedToVoteMockMvc.perform(post("/api/not-allowed-to-votes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notAllowedToVote)))
            .andExpect(status().isBadRequest());

        // Validate the NotAllowedToVote in the database
        List<NotAllowedToVote> notAllowedToVoteList = notAllowedToVoteRepository.findAll();
        assertThat(notAllowedToVoteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllNotAllowedToVotes() throws Exception {
        // Initialize the database
        notAllowedToVoteRepository.saveAndFlush(notAllowedToVote);

        // Get all the notAllowedToVoteList
        restNotAllowedToVoteMockMvc.perform(get("/api/not-allowed-to-votes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(notAllowedToVote.getId().intValue())));
    }

    @Test
    @Transactional
    public void getNotAllowedToVote() throws Exception {
        // Initialize the database
        notAllowedToVoteRepository.saveAndFlush(notAllowedToVote);

        // Get the notAllowedToVote
        restNotAllowedToVoteMockMvc.perform(get("/api/not-allowed-to-votes/{id}", notAllowedToVote.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(notAllowedToVote.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingNotAllowedToVote() throws Exception {
        // Get the notAllowedToVote
        restNotAllowedToVoteMockMvc.perform(get("/api/not-allowed-to-votes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNotAllowedToVote() throws Exception {
        // Initialize the database
        notAllowedToVoteService.save(notAllowedToVote);

        int databaseSizeBeforeUpdate = notAllowedToVoteRepository.findAll().size();

        // Update the notAllowedToVote
        NotAllowedToVote updatedNotAllowedToVote = notAllowedToVoteRepository.findOne(notAllowedToVote.getId());
        // Disconnect from session so that the updates on updatedNotAllowedToVote are not directly saved in db
        em.detach(updatedNotAllowedToVote);

        restNotAllowedToVoteMockMvc.perform(put("/api/not-allowed-to-votes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNotAllowedToVote)))
            .andExpect(status().isOk());

        // Validate the NotAllowedToVote in the database
        List<NotAllowedToVote> notAllowedToVoteList = notAllowedToVoteRepository.findAll();
        assertThat(notAllowedToVoteList).hasSize(databaseSizeBeforeUpdate);
        NotAllowedToVote testNotAllowedToVote = notAllowedToVoteList.get(notAllowedToVoteList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingNotAllowedToVote() throws Exception {
        int databaseSizeBeforeUpdate = notAllowedToVoteRepository.findAll().size();

        // Create the NotAllowedToVote

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restNotAllowedToVoteMockMvc.perform(put("/api/not-allowed-to-votes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notAllowedToVote)))
            .andExpect(status().isCreated());

        // Validate the NotAllowedToVote in the database
        List<NotAllowedToVote> notAllowedToVoteList = notAllowedToVoteRepository.findAll();
        assertThat(notAllowedToVoteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteNotAllowedToVote() throws Exception {
        // Initialize the database
        notAllowedToVoteService.save(notAllowedToVote);

        int databaseSizeBeforeDelete = notAllowedToVoteRepository.findAll().size();

        // Get the notAllowedToVote
        restNotAllowedToVoteMockMvc.perform(delete("/api/not-allowed-to-votes/{id}", notAllowedToVote.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<NotAllowedToVote> notAllowedToVoteList = notAllowedToVoteRepository.findAll();
        assertThat(notAllowedToVoteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NotAllowedToVote.class);
        NotAllowedToVote notAllowedToVote1 = new NotAllowedToVote();
        notAllowedToVote1.setId(1L);
        NotAllowedToVote notAllowedToVote2 = new NotAllowedToVote();
        notAllowedToVote2.setId(notAllowedToVote1.getId());
        assertThat(notAllowedToVote1).isEqualTo(notAllowedToVote2);
        notAllowedToVote2.setId(2L);
        assertThat(notAllowedToVote1).isNotEqualTo(notAllowedToVote2);
        notAllowedToVote1.setId(null);
        assertThat(notAllowedToVote1).isNotEqualTo(notAllowedToVote2);
    }
}
