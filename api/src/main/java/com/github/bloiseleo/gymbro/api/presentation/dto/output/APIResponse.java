package com.github.bloiseleo.gymbro.api.presentation.dto.output;

import lombok.Getter;
import lombok.Setter;
import java.time.Instant;

@Getter
@Setter
public abstract class APIResponse {
    private int status;
    private String message;
    private Instant timestamp;
    APIResponse(int status, String message, Instant timestamp) {
        this.message = message;
        this.timestamp = timestamp;
        this.status = status;
    }
}
