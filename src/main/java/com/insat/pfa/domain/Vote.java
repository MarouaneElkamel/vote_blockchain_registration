package com.insat.pfa.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Vote.
 */
@Entity
@Table(name = "vote")
public class Vote implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "inscription_date", nullable = false)
    private ZonedDateTime inscriptionDate;

    @NotNull
    @Column(name = "inscription_end_date", nullable = false)
    private ZonedDateTime inscriptionEndDate;

    @NotNull
    @Column(name = "vote_date", nullable = false)
    private ZonedDateTime voteDate;

    @NotNull
    @Column(name = "vote_end_date", nullable = false)
    private ZonedDateTime voteEndDate;

    @NotNull
    @Column(name = "result_date", nullable = false)
    private ZonedDateTime resultDate;

    @ManyToOne(optional = false)
    @NotNull
    private User owner;

    @ManyToMany
    @JoinTable(name = "vote_voters",
               joinColumns = @JoinColumn(name="votes_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="voters_id", referencedColumnName="id"))
    private Set<User> voters = new HashSet<>();

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

    public Vote inscriptionDate(ZonedDateTime inscriptionDate) {
        this.inscriptionDate = inscriptionDate;
        return this;
    }

    public void setInscriptionDate(ZonedDateTime inscriptionDate) {
        this.inscriptionDate = inscriptionDate;
    }

    public ZonedDateTime getInscriptionEndDate() {
        return inscriptionEndDate;
    }

    public Vote inscriptionEndDate(ZonedDateTime inscriptionEndDate) {
        this.inscriptionEndDate = inscriptionEndDate;
        return this;
    }

    public void setInscriptionEndDate(ZonedDateTime inscriptionEndDate) {
        this.inscriptionEndDate = inscriptionEndDate;
    }

    public ZonedDateTime getVoteDate() {
        return voteDate;
    }

    public Vote voteDate(ZonedDateTime voteDate) {
        this.voteDate = voteDate;
        return this;
    }

    public void setVoteDate(ZonedDateTime voteDate) {
        this.voteDate = voteDate;
    }

    public ZonedDateTime getVoteEndDate() {
        return voteEndDate;
    }

    public Vote voteEndDate(ZonedDateTime voteEndDate) {
        this.voteEndDate = voteEndDate;
        return this;
    }

    public void setVoteEndDate(ZonedDateTime voteEndDate) {
        this.voteEndDate = voteEndDate;
    }

    public ZonedDateTime getResultDate() {
        return resultDate;
    }

    public Vote resultDate(ZonedDateTime resultDate) {
        this.resultDate = resultDate;
        return this;
    }

    public void setResultDate(ZonedDateTime resultDate) {
        this.resultDate = resultDate;
    }

    public User getOwner() {
        return owner;
    }

    public Vote owner(User user) {
        this.owner = user;
        return this;
    }

    public void setOwner(User user) {
        this.owner = user;
    }

    public Set<User> getVoters() {
        return voters;
    }

    public Vote voters(Set<User> users) {
        this.voters = users;
        return this;
    }

    public Vote addVoters(User user) {
        this.voters.add(user);
        return this;
    }

    public Vote removeVoters(User user) {
        this.voters.remove(user);
        return this;
    }

    public void setVoters(Set<User> users) {
        this.voters = users;
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
        Vote vote = (Vote) o;
        if (vote.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vote.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Vote{" +
            "id=" + getId() +
            ", inscriptionDate='" + getInscriptionDate() + "'" +
            ", inscriptionEndDate='" + getInscriptionEndDate() + "'" +
            ", voteDate='" + getVoteDate() + "'" +
            ", voteEndDate='" + getVoteEndDate() + "'" +
            ", resultDate='" + getResultDate() + "'" +
            "}";
    }
}
