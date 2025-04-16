package com.github.bloiseleo.gymbro.api.application.requests;

public record AuthenticateRequest(
        String username,
        String password
) {
}
