package com.github.bloiseleo.gymbro.api.presentation.dto.output;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.Instant;
import java.util.Map;

@Getter
@Setter
public class FieldErrorAPIResponse extends APIResponse {
    private Map<String, String> fieldErrors;
    public FieldErrorAPIResponse(Map<String, String> fieldErrors) {
        super(
                HttpStatus.UNPROCESSABLE_ENTITY.value(),
                "Invalid data provided",
                Instant.now()
        );
        setFieldErrors(fieldErrors);
    }
}
