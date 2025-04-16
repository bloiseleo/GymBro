package com.github.bloiseleo.gymbro.api.application.exceptions;

import org.springframework.http.HttpStatus;

public class UsernameAlreadyTaken extends ApplicationException {
    public UsernameAlreadyTaken(String username) {
        super("Username " + username + " is already taken", HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
