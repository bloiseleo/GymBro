package com.github.bloiseleo.gymbro.api.presentation.dto.output;

import org.springframework.http.HttpStatus;

import java.time.Instant;

public final class APIResponses extends APIResponse {
    public APIResponses(HttpStatus status, String message) {
        super(status.value(), message, Instant.now());
    }
    public static APIResponse ok(String message) {
        return new APIResponses(HttpStatus.OK, message);
    }
    public static APIResponse created(String message) {
        return new APIResponses(HttpStatus.CREATED, message);
    }
    public static APIResponse internalServerError(String message) {
        return new APIResponses(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
    public static APIResponse badRequest(String message) {
        return new APIResponses(HttpStatus.BAD_REQUEST, message);
    }
}
