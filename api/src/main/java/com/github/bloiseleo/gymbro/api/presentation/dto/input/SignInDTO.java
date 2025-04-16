package com.github.bloiseleo.gymbro.api.presentation.dto.input;

import jakarta.validation.constraints.NotEmpty;

public record SignInDTO(
        @NotEmpty()
        String username,
        @NotEmpty()
        String password
) {
}
