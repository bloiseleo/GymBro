package com.github.bloiseleo.gymbro.api.application.services;

import com.github.bloiseleo.gymbro.api.application.exceptions.UnauthorizedException;
import com.github.bloiseleo.gymbro.api.application.exceptions.UsernameAlreadyTaken;
import com.github.bloiseleo.gymbro.api.application.requests.AuthenticateRequest;
import com.github.bloiseleo.gymbro.api.application.requests.CreateAccountRequest;
import com.github.bloiseleo.gymbro.api.persistence.entity.User;
import com.github.bloiseleo.gymbro.api.persistence.repositories.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {
    private AuthService authService;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    @BeforeEach
    public void setUp(
            @Mock UserRepository userRepository,
            @Mock AuthenticationManager authenticationManager,
            @Mock PasswordEncoder passwordEncoder
            ) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        authService = new AuthServiceImpl(
            userRepository, authenticationManager, passwordEncoder
        );
    }
    @Test
    public void createAccount_Successful_UsernamePassword() {
        User user = new User();
        user.setUsername("teste");
        user.setPassword("teste");
        Mockito.when(userRepository.existsUserByUsername(Mockito.anyString())).thenReturn(false);
        Mockito.when(passwordEncoder.encode(Mockito.anyString())).thenReturn("teste");
        Mockito.when(userRepository.save(Mockito.any())).thenReturn(user);
        User result = authService.createAccount(
                new CreateAccountRequest(
                        "teste",
                        "teste"
                )
        );
        Mockito.verify(userRepository, Mockito.times(1)).save(Mockito.any());
        Mockito.verify(passwordEncoder, Mockito.times(1)).encode("teste");
        Mockito.verify(userRepository, Mockito.times(1)).existsUserByUsername("teste");
        Assertions.assertEquals(user, result);
    }
    @Test
    public void createAccount_Failed_UsernameAlreadyTaken() {
        Mockito.when(userRepository.existsUserByUsername(Mockito.anyString())).thenReturn(true);
        Assertions.assertThrows(UsernameAlreadyTaken.class, () -> authService.createAccount(new CreateAccountRequest(
                "teste",
                "teste"
        )));
        Mockito.verify(userRepository, Mockito.times(0)).save(Mockito.any());
        Mockito.verify(passwordEncoder, Mockito.times(0)).encode("teste");
        Mockito.verify(userRepository, Mockito.times(1)).existsUserByUsername("teste");
    }
    @Test
    public void authenticate_Sucessful_UsernamePassword() {
        AuthenticateRequest authenticationRequest = new AuthenticateRequest(
                "teste",
                "teste"
        );
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                authenticationRequest.username(),
                authenticationRequest.password(),
                List.of()
        );
        Mockito.when(authenticationManager.authenticate(Mockito.any())).thenReturn(usernamePasswordAuthenticationToken);
        UserDetails userDetails = authService.authenticate(authenticationRequest);
        Mockito.verify(authenticationManager, Mockito.times(1)).authenticate(Mockito.any(UsernamePasswordAuthenticationToken.class));
        Assertions.assertEquals(userDetails.getUsername(), usernamePasswordAuthenticationToken.getPrincipal());
        Assertions.assertEquals("", userDetails.getPassword());
        Assertions.assertEquals(List.of(), userDetails.getAuthorities());
    }
    @Test
    public void authenticate_Failure_Authentication_Failed() {
        AuthenticateRequest authenticationRequest = new AuthenticateRequest(
                "teste",
                "teste"
        );
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                authenticationRequest.username(),
                authenticationRequest.password()
        );
        Mockito.when(authenticationManager.authenticate(Mockito.any())).thenReturn(usernamePasswordAuthenticationToken);
        Assertions.assertThrows(UnauthorizedException.class, () -> authService.authenticate(authenticationRequest));
        Mockito.verify(authenticationManager, Mockito.times(1)).authenticate(Mockito.any(UsernamePasswordAuthenticationToken.class));
    }
    @Test
    public void authenticate_Failure_Authentication_Internally_Failed() {
        AuthenticateRequest authenticationRequest = new AuthenticateRequest(
                "teste",
                "teste"
        );
        Mockito.when(authenticationManager.authenticate(Mockito.any())).thenThrow(BadCredentialsException.class);
        Assertions.assertThrows(UnauthorizedException.class, () -> authService.authenticate(authenticationRequest));
        Mockito.verify(authenticationManager, Mockito.times(1)).authenticate(Mockito.any(UsernamePasswordAuthenticationToken.class));
    }
}
