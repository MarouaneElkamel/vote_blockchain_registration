package com.insat.pfa.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A VoteInfo.
 */
@Entity
@Table(name = "vote_info")
public class VoteInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "inscription_date")
    private ZonedDateTime inscriptionDate;

    @Column(name = "inscription_end_date")
    private ZonedDateTime inscriptionEndDate;

    @Column(name = "vote_date")
    private ZonedDateTime voteDate;

    @Column(name = "vote_end_date")
    private ZonedDateTime voteEndDate;

    @Column(name = "result_date")
    private ZonedDateTime resultDate;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @ManyToOne(optional = false)
    @NotNull
    private User owner;

    @ManyToMany
    @JoinTable(name = "vote_info_elected",
               joinColumns = @JoinColumn(name="vote_infos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="electeds_id", referencedColumnName="id"))
    private Set<User> electeds = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "vote_info_voter",
               joinColumns = @JoinColumn(name="vote_infos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="voters_id", referencedColumnName="id"))
    private Set<User> voters = new HashSet<>();

    @OneToOne
    @JoinColumn(unique = true)
    private AllowedToVote allowedToVote;

    @OneToOne
    @JoinColumn(unique = true)
    private NotAllowedToVote notAllowedToVote;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getInscriptionDate() {
        return inscriptionDate;
    }

    public VoteInfo inscriptionDate(ZonedDateTime inscriptionDate) {
        this.inscriptionDate = inscriptionDate;
        return this;
    }

    public void setInscriptionDate(ZonedDateTime inscriptionDate) {
        this.inscriptionDate = inscriptionDate;
    }

    public ZonedDateTime getInscriptionEndDate() {
        return inscriptionEndDate;
    }

    public VoteInfo inscriptionEndDate(ZonedDateTime inscriptionEndDate) {
        this.inscriptionEndDate = inscriptionEndDate;
        return this;
    }

    public void setInscriptionEndDate(ZonedDateTime inscriptionEndDate) {
        this.inscriptionEndDate = inscriptionEndDate;
    }

    public ZonedDateTime getVoteDate() {
        return voteDate;
    }

    public VoteInfo voteDate(ZonedDateTime voteDate) {
        this.voteDate = voteDate;
        return this;
    }

    public void setVoteDate(ZonedDateTime voteDate) {
        this.voteDate = voteDate;
    }

    public ZonedDateTime getVoteEndDate() {
        return voteEndDate;
    }

    public VoteInfo voteEndDate(ZonedDateTime voteEndDate) {
        this.voteEndDate = voteEndDate;
        return this;
    }

    public void setVoteEndDate(ZonedDateTime voteEndDate) {
        this.voteEndDate = voteEndDate;
    }

    public ZonedDateTime getResultDate() {
        return resultDate;
    }

    public VoteInfo resultDate(ZonedDateTime resultDate) {
        this.resultDate = resultDate;
        return this;
    }

    public void setResultDate(ZonedDateTime resultDate) {
        this.resultDate = resultDate;
    }

    public String getTitle() {
        return title;
    }

    public VoteInfo title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public VoteInfo description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getOwner() {
        return owner;
    }

    public VoteInfo owner(User user) {
        this.owner = user;
        return this;
    }

    public void setOwner(User user) {
        this.owner = user;
    }

    public Set<User> getElecteds() {
        return electeds;
    }

    public VoteInfo electeds(Set<User> users) {
        this.electeds = users;
        return this;
    }

    public VoteInfo addElected(User user) {
        this.electeds.add(user);
        return this;
    }

    public VoteInfo removeElected(User user) {
        this.electeds.remove(user);
        return this;
    }

    public void setElecteds(Set<User> users) {
        this.electeds = users;
    }

    public Set<User> getVoters() {
        return voters;
    }

    public VoteInfo voters(Set<User> users) {
        this.voters = users;
        return this;
    }

    public VoteInfo addVoter(User user) {
        this.voters.add(user);
        return this;
    }

    public VoteInfo removeVoter(User user) {
        this.voters.remove(user);
        return this;
    }

    public void setVoters(Set<User> users) {
        this.voters = users;
    }

    public AllowedToVote getAllowedToVote() {
        return allowedToVote;
    }

    public VoteInfo allowedToVote(AllowedToVote allowedToVote) {
        this.allowedToVote = allowedToVote;
        return this;
    }

    public void setAllowedToVote(AllowedToVote allowedToVote) {
        this.allowedToVote = allowedToVote;
    }

    public NotAllowedToVote getNotAllowedToVote() {
        return notAllowedToVote;
    }

    public VoteInfo notAllowedToVote(NotAllowedToVote notAllowedToVote) {
        this.notAllowedToVote = notAllowedToVote;
        return this;
    }

    public void setNotAllowedToVote(NotAllowedToVote notAllowedToVote) {
        this.notAllowedToVote = notAllowedToVote;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        VoteInfo voteInfo = (VoteInfo) o;
        if (voteInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), voteInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VoteInfo{" +
            "id=" + getId() +
            ", inscriptionDate='" + getInscriptionDate() + "'" +
            ", inscriptionEndDate='" + getInscriptionEndDate() + "'" +
            ", voteDate='" + getVoteDate() + "'" +
            ", voteEndDate='" + getVoteEndDate() + "'" +
            ", resultDate='" + getResultDate() + "'" +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
