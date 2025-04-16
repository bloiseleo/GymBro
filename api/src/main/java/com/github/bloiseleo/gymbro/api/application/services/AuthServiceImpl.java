package com.github.bloiseleo.gymbro.api.application.services;

import com.github.bloiseleo.gymbro.api.application.exceptions.UnauthorizedException;
import com.github.bloiseleo.gymbro.api.application.exceptions.UsernameAlreadyTaken;
import com.github.bloiseleo.gymbro.api.application.requests.AuthenticateRequest;
import com.github.bloiseleo.gymbro.api.application.requests.CreateAccountRequest;
import com.github.bloiseleo.gymbro.api.persistence.entity.User;
import com.github.bloiseleo.gymbro.api.persistence.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collection;

@Slf4j
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    public AuthServiceImpl(UserRepository userRepository, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public User createAccount(CreateAccountRequest payload) {
        if(this.userRepository.existsUserByUsername(payload.username())) {
            throw new UsernameAlreadyTaken(payload.username());
        };
        User user = new User();
        user.setUsername(payload.username());
        user.setPassword(this.passwordEncoder.encode(payload.password()));
        return this.userRepository.save(user);
    }

    @Override
    public UserDetails authenticate(AuthenticateRequest payload) {
        try {
            Authentication authentication = this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    payload.username(),
                    payload.password()
            ));
            if(!authentication.isAuthenticated()) {
                throw new UnauthorizedException("Unauthorized");
            }
            return new UserDetails() {
                @Override
                public Collection<? extends GrantedAuthority> getAuthorities() {
                    return authentication.getAuthorities();
                }

                @Override
                public String getPassword() {
                    return "";
                }

                @Override
                public String getUsername() {
                    return authentication.getPrincipal().toString();
                }
            };
        } catch (AuthenticationException authenticationException) {
            log.error(authenticationException.getMessage(), authenticationException);
            throw new UnauthorizedException("Unauthorized");
        }
    }
}
