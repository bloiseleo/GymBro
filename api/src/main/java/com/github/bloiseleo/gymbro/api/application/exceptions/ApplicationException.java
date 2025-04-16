package com.github.bloiseleo.gymbro.api.application.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public abstract class ApplicationException extends RuntimeException {
    private HttpStatus status = null;
    public ApplicationException(String message) {
        super(message);
    }
    public ApplicationException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}
