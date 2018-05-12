package com.insat.pfa.web.rest;

import com.insat.pfa.VoteApp;

import com.insat.pfa.domain.VoteInfo;
import com.insat.pfa.domain.User;
import com.insat.pfa.repository.VoteInfoRepository;
import com.insat.pfa.service.VoteInfoService;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.insat.pfa.web.rest.TestUtil.sameInstant;
import static com.insat.pfa.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the VoteInfoResource REST controller.
 *
 * @see VoteInfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VoteApp.class)
public class VoteInfoResourceIntTest {

    private static final ZonedDateTime DEFAULT_INSCRIPTION_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_INSCRIPTION_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_INSCRIPTION_END_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_INSCRIPTION_END_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_VOTE_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_VOTE_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_VOTE_END_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_VOTE_END_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_RESULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_RESULT_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private VoteInfoRepository voteInfoRepository;

    @Autowired
    private VoteInfoService voteInfoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVoteInfoMockMvc;

    private VoteInfo voteInfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VoteInfoResource voteInfoResource = new VoteInfoResource(voteInfoService);
        this.restVoteInfoMockMvc = MockMvcBuilders.standaloneSetup(voteInfoResource)
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
    public static VoteInfo createEntity(EntityManager em) {
        VoteInfo voteInfo = new VoteInfo()
            .inscriptionDate(DEFAULT_INSCRIPTION_DATE)
            .inscriptionEndDate(DEFAULT_INSCRIPTION_END_DATE)
            .voteDate(DEFAULT_VOTE_DATE)
            .voteEndDate(DEFAULT_VOTE_END_DATE)
            .resultDate(DEFAULT_RESULT_DATE)
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION);
        // Add required entity
        User owner = UserResourceIntTest.createEntity(em);
        em.persist(owner);
        em.flush();
        voteInfo.setOwner(owner);
        return voteInfo;
    }

    @Before
    public void initTest() {
        voteInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createVoteInfo() throws Exception {
        int databaseSizeBeforeCreate = voteInfoRepository.findAll().size();

        // Create the VoteInfo
        restVoteInfoMockMvc.perform(post("/api/vote-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(voteInfo)))
            .andExpect(status().isCreated());

        // Validate the VoteInfo in the database
        List<VoteInfo> voteInfoList = voteInfoRepository.findAll();
        assertThat(voteInfoList).hasSize(databaseSizeBeforeCreate + 1);
        VoteInfo testVoteInfo = voteInfoList.get(voteInfoList.size() - 1);
        assertThat(testVoteInfo.getInscriptionDate()).isEqualTo(DEFAULT_INSCRIPTION_DATE);
        assertThat(testVoteInfo.getInscriptionEndDate()).isEqualTo(DEFAULT_INSCRIPTION_END_DATE);
        assertThat(testVoteInfo.getVoteDate()).isEqualTo(DEFAULT_VOTE_DATE);
        assertThat(testVoteInfo.getVoteEndDate()).isEqualTo(DEFAULT_VOTE_END_DATE);
        assertThat(testVoteInfo.getResultDate()).isEqualTo(DEFAULT_RESULT_DATE);
        assertThat(testVoteInfo.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testVoteInfo.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createVoteInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = voteInfoRepository.findAll().size();

        // Create the VoteInfo with an existing ID
        voteInfo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVoteInfoMockMvc.perform(post("/api/vote-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(voteInfo)))
            .andExpect(status().isBadRequest());

        // Validate the VoteInfo in the database
        List<VoteInfo> voteInfoList = voteInfoRepository.findAll();
        assertThat(voteInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllVoteInfos() throws Exception {
        // Initialize the database
        voteInfoRepository.saveAndFlush(voteInfo);

        // Get all the voteInfoList
        restVoteInfoMockMvc.perform(get("/api/vote-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(voteInfo.getId().intValue())))
            .andExpect(jsonPath("$.[*].inscriptionDate").value(hasItem(sameInstant(DEFAULT_INSCRIPTION_DATE))))
            .andExpect(jsonPath("$.[*].inscriptionEndDate").value(hasItem(sameInstant(DEFAULT_INSCRIPTION_END_DATE))))
            .andExpect(jsonPath("$.[*].voteDate").value(hasItem(sameInstant(DEFAULT_VOTE_DATE))))
            .andExpect(jsonPath("$.[*].voteEndDate").value(hasItem(sameInstant(DEFAULT_VOTE_END_DATE))))
            .andExpect(jsonPath("$.[*].resultDate").value(hasItem(sameInstant(DEFAULT_RESULT_DATE))))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getVoteInfo() throws Exception {
        // Initialize the database
        voteInfoRepository.saveAndFlush(voteInfo);

        // Get the voteInfo
        restVoteInfoMockMvc.perform(get("/api/vote-infos/{id}", voteInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(voteInfo.getId().intValue()))
            .andExpect(jsonPath("$.inscriptionDate").value(sameInstant(DEFAULT_INSCRIPTION_DATE)))
            .andExpect(jsonPath("$.inscriptionEndDate").value(sameInstant(DEFAULT_INSCRIPTION_END_DATE)))
            .andExpect(jsonPath("$.voteDate").value(sameInstant(DEFAULT_VOTE_DATE)))
            .andExpect(jsonPath("$.voteEndDate").value(sameInstant(DEFAULT_VOTE_END_DATE)))
            .andExpect(jsonPath("$.resultDate").value(sameInstant(DEFAULT_RESULT_DATE)))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVoteInfo() throws Exception {
        // Get the voteInfo
        restVoteInfoMockMvc.perform(get("/api/vote-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVoteInfo() throws Exception {
        // Initialize the database
        voteInfoService.save(voteInfo);

        int databaseSizeBeforeUpdate = voteInfoRepository.findAll().size();

        // Update the voteInfo
        VoteInfo updatedVoteInfo = voteInfoRepository.findOne(voteInfo.getId());
        // Disconnect from session so that the updates on updatedVoteInfo are not directly saved in db
        em.detach(updatedVoteInfo);
        updatedVoteInfo
            .inscriptionDate(UPDATED_INSCRIPTION_DATE)
            .inscriptionEndDate(UPDATED_INSCRIPTION_END_DATE)
            .voteDate(UPDATED_VOTE_DATE)
            .voteEndDate(UPDATED_VOTE_END_DATE)
            .resultDate(UPDATED_RESULT_DATE)
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION);

        restVoteInfoMockMvc.perform(put("/api/vote-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVoteInfo)))
            .andExpect(status().isOk());

        // Validate the VoteInfo in the database
        List<VoteInfo> voteInfoList = voteInfoRepository.findAll();
        assertThat(voteInfoList).hasSize(databaseSizeBeforeUpdate);
        VoteInfo testVoteInfo = voteInfoList.get(voteInfoList.size() - 1);
        assertThat(testVoteInfo.getInscriptionDate()).isEqualTo(UPDATED_INSCRIPTION_DATE);
        assertThat(testVoteInfo.getInscriptionEndDate()).isEqualTo(UPDATED_INSCRIPTION_END_DATE);
        assertThat(testVoteInfo.getVoteDate()).isEqualTo(UPDATED_VOTE_DATE);
        assertThat(testVoteInfo.getVoteEndDate()).isEqualTo(UPDATED_VOTE_END_DATE);
        assertThat(testVoteInfo.getResultDate()).isEqualTo(UPDATED_RESULT_DATE);
        assertThat(testVoteInfo.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testVoteInfo.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingVoteInfo() throws Exception {
        int databaseSizeBeforeUpdate = voteInfoRepository.findAll().size();

        // Create the VoteInfo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVoteInfoMockMvc.perform(put("/api/vote-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(voteInfo)))
            .andExpect(status().isCreated());

        // Validate the VoteInfo in the database
        List<VoteInfo> voteInfoList = voteInfoRepository.findAll();
        assertThat(voteInfoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteVoteInfo() throws Exception {
        // Initialize the database
        voteInfoService.save(voteInfo);

        int databaseSizeBeforeDelete = voteInfoRepository.findAll().size();

        // Get the voteInfo
        restVoteInfoMockMvc.perform(delete("/api/vote-infos/{id}", voteInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<VoteInfo> voteInfoList = voteInfoRepository.findAll();
        assertThat(voteInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VoteInfo.class);
        VoteInfo voteInfo1 = new VoteInfo();
        voteInfo1.setId(1L);
        VoteInfo voteInfo2 = new VoteInfo();
        voteInfo2.setId(voteInfo1.getId());
        assertThat(voteInfo1).isEqualTo(voteInfo2);
        voteInfo2.setId(2L);
        assertThat(voteInfo1).isNotEqualTo(voteInfo2);
        voteInfo1.setId(null);
        assertThat(voteInfo1).isNotEqualTo(voteInfo2);
    }
}
