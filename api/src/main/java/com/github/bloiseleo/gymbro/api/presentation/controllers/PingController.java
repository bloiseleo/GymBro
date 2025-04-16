package com.github.bloiseleo.gymbro.api.presentation.controllers;

import com.github.bloiseleo.gymbro.api.presentation.dto.output.APIResponse;
import com.github.bloiseleo.gymbro.api.presentation.dto.output.APIResponses;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Ping", description = "Check if the API is available")
@RequestMapping("ping")
@SecurityRequirement(name = "bearerAuth")
public class PingController {
    @Operation(description = "Check if the api is available. If it's available, a `pong` response is sent.", summary = "Check if alive")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    content = {
                            @Content(schema = @Schema(implementation = APIResponse.class), mediaType = "application/json")
                    }
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Not authenticated",
                    content = {
                            @Content()
                    }
            ),
            @ApiResponse(
                    responseCode = "500",
                    content = {
                            @Content(schema = @Schema(implementation = APIResponse.class), mediaType = "application/json")
                    }
            ),
    })
    @GetMapping
    public APIResponse ping() {
        return APIResponses.ok("pong!");
    }
}
