package com.insat.pfa.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Address.
 */
@Entity
@Table(name = "address")
public class Address implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "public_address")
    private String publicAddress;

    @ManyToOne
    private AllowedToVote votesAllowedIn;

    @ManyToOne
    private NotAllowedToVote votesNotAllowedIn;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPublicAddress() {
        return publicAddress;
    }

    public Address publicAddress(String publicAddress) {
        this.publicAddress = publicAddress;
        return this;
    }

    public void setPublicAddress(String publicAddress) {
        this.publicAddress = publicAddress;
    }

    public AllowedToVote getVotesAllowedIn() {
        return votesAllowedIn;
    }

    public Address votesAllowedIn(AllowedToVote allowedToVote) {
        this.votesAllowedIn = allowedToVote;
        return this;
    }

    public void setVotesAllowedIn(AllowedToVote allowedToVote) {
        this.votesAllowedIn = allowedToVote;
    }

    public NotAllowedToVote getVotesNotAllowedIn() {
        return votesNotAllowedIn;
    }

    public Address votesNotAllowedIn(NotAllowedToVote notAllowedToVote) {
        this.votesNotAllowedIn = notAllowedToVote;
        return this;
    }

    public void setVotesNotAllowedIn(NotAllowedToVote notAllowedToVote) {
        this.votesNotAllowedIn = notAllowedToVote;
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
        Address address = (Address) o;
        if (address.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), address.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Address{" +
            "id=" + getId() +
            ", publicAddress='" + getPublicAddress() + "'" +
            "}";
    }
}
