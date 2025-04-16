package com.github.bloiseleo.gymbro.api.application.services;

import org.springframework.security.core.userdetails.UserDetails;

public interface JWTService {
    String generateToken(UserDetails details);
    UserDetails decode(String token);
}
