package com.github.bloiseleo.gymbro.api.presentation.dto.input;

import jakarta.validation.constraints.NotEmpty;
import org.hibernate.validator.constraints.Length;

public record SignUpDTO(
        @NotEmpty()
        @Length(min = 3)
        String username,
        @NotEmpty()
        @Length(min = 3)
        String password
) {
}
