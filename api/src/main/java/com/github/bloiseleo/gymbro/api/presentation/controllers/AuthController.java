package com.github.bloiseleo.gymbro.api.presentation.controllers;

import com.github.bloiseleo.gymbro.api.application.requests.AuthenticateRequest;
import com.github.bloiseleo.gymbro.api.application.requests.CreateAccountRequest;
import com.github.bloiseleo.gymbro.api.application.services.AuthService;
import com.github.bloiseleo.gymbro.api.application.services.JWTService;
import com.github.bloiseleo.gymbro.api.presentation.dto.input.SignInDTO;
import com.github.bloiseleo.gymbro.api.presentation.dto.input.SignUpDTO;
import com.github.bloiseleo.gymbro.api.presentation.dto.output.APIResponse;
import com.github.bloiseleo.gymbro.api.presentation.dto.output.APIResponses;
import com.github.bloiseleo.gymbro.api.presentation.dto.output.FieldErrorAPIResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Auth", description = "Authentication controller")
@RestController
@RequestMapping("auth")
public class AuthController {
    private final AuthService authService;
    private final JWTService jwtService;
    public AuthController(AuthService authService, JWTService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }
    @Operation(
            summary = "Create an account",
            description = "Create an account in Gymbro"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Account created successfully", content = {
                    @Content(schema =  @Schema(implementation = APIResponse.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "422", description = "Unprocessable entity", content = {
                    @Content(schema = @Schema(implementation = FieldErrorAPIResponse.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
                    @Content(schema = @Schema(implementation = APIResponse.class), mediaType = "application/json")
            })
    })
    @PostMapping("sign-up")
    @ResponseStatus(HttpStatus.CREATED)
    public APIResponse signUp(@RequestBody @Valid SignUpDTO payload) {
        this.authService.createAccount(new CreateAccountRequest(
                payload.username(),
                payload.password()
        ));
        return APIResponses.created("User created successfully");
    }
    @Operation(
            summary = "Login",
            description = "Login and generate a JWT token"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User logged in successfully. Token located inside the `message` property", content = {
                    @Content(schema =  @Schema(implementation = APIResponse.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "422", description = "Unprocessable entity", content = {
                    @Content(schema = @Schema(implementation = FieldErrorAPIResponse.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = {
                    @Content(schema = @Schema(implementation = APIResponse.class), mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = {
                    @Content(schema = @Schema(implementation = APIResponse.class), mediaType = "application/json")
            })
    })
    @PostMapping("sign-in")
    @ResponseStatus(HttpStatus.OK)
    public APIResponse signIn(@RequestBody @Valid SignInDTO payload) {
        UserDetails userDetails = this.authService.authenticate(new AuthenticateRequest(payload.username(), payload.password()));
        return APIResponses.ok(jwtService.generateToken(userDetails));
    }
}
