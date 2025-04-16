package com.github.bloiseleo.gymbro.api.presentation.controllers;

import com.github.bloiseleo.gymbro.api.application.exceptions.ApplicationException;
import com.github.bloiseleo.gymbro.api.application.exceptions.UsernameAlreadyTaken;
import com.github.bloiseleo.gymbro.api.presentation.dto.output.APIResponse;
import com.github.bloiseleo.gymbro.api.presentation.dto.output.APIResponses;
import com.github.bloiseleo.gymbro.api.presentation.dto.output.FieldErrorAPIResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Slf4j
public class ApiControllerAdvice {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public FieldErrorAPIResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(fieldError -> {
            errors.put(fieldError.getField(), fieldError.getDefaultMessage());
        });
        return new FieldErrorAPIResponse(errors);
    }
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public APIResponse handleException(Exception ex) {
        log.error(ex.getMessage(), ex);
        return APIResponses.internalServerError("Internal Server Error");
    }
    @ExceptionHandler(UsernameAlreadyTaken.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public APIResponse handleUsernameAlreadyTaken(UsernameAlreadyTaken exception) {
        log.error(exception.getMessage(), exception);
        Map<String, String> errors = new HashMap<>();
        errors.put("username", exception.getMessage());
        return new FieldErrorAPIResponse(errors);
    }
    @ExceptionHandler(ApplicationException.class)
    public ResponseEntity handleApplicationException(ApplicationException ex) {
        log.error(ex.getMessage(), ex);
        HttpStatus status = ex.getStatus();
        return new ResponseEntity(new APIResponses(
                status == null ? HttpStatus.BAD_REQUEST: status,
                ex.getMessage()
        ), status == null ? HttpStatus.BAD_REQUEST: status);
    }
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public APIResponse handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException ex) {
        log.error(ex.getMessage(), ex);
        return APIResponses.badRequest(ex.getMessage());
    }
}
