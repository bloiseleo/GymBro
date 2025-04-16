package com.github.bloiseleo.gymbro.api.application.services;

import com.github.bloiseleo.gymbro.api.application.requests.AuthenticateRequest;
import com.github.bloiseleo.gymbro.api.application.requests.CreateAccountRequest;
import com.github.bloiseleo.gymbro.api.persistence.entity.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface AuthService {
    User createAccount(CreateAccountRequest payload);
    UserDetails authenticate(AuthenticateRequest payload);
}
