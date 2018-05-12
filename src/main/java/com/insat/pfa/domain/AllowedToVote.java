package com.insat.pfa.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A AllowedToVote.
 */
@Entity
@Table(name = "allowed_to_vote")
public class AllowedToVote implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "votesAllowedIn")
    @JsonIgnore
    private Set<Address> voters = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Address> getVoters() {
        return voters;
    }

    public AllowedToVote voters(Set<Address> addresses) {
        this.voters = addresses;
        return this;
    }

    public AllowedToVote addVoters(Address address) {
        this.voters.add(address);
        address.setVotesAllowedIn(this);
        return this;
    }

    public AllowedToVote removeVoters(Address address) {
        this.voters.remove(address);
        address.setVotesAllowedIn(null);
        return this;
    }

    public void setVoters(Set<Address> addresses) {
        this.voters = addresses;
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
        AllowedToVote allowedToVote = (AllowedToVote) o;
        if (allowedToVote.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), allowedToVote.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AllowedToVote{" +
            "id=" + getId() +
            "}";
    }
}
