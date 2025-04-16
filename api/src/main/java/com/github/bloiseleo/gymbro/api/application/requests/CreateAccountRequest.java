package com.github.bloiseleo.gymbro.api.application.requests;

public record CreateAccountRequest(
        String username,
        String password
) {
}
