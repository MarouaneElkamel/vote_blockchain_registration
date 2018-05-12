package com.insat.pfa.web.rest.errors;
import org.zalando.problem.Status;

public class EmailOutOfTheOrganizationException extends BadRequestAlertException {

    public EmailOutOfTheOrganizationException() {
        super(ErrorConstants.EMAIL_OUT_OF_THE_ORGANIZATION_TYPE, "Email address out of organization domain", "userManagement", "emailOutOfOrganizationDomain");
    }
}
