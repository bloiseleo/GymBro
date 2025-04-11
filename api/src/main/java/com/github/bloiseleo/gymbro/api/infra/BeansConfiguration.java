package com.github.bloiseleo.gymbro.api.infra;

import com.github.bloiseleo.gymbro.api.application.services.AuthService;
import com.github.bloiseleo.gymbro.api.application.services.AuthServiceImpl;
import com.github.bloiseleo.gymbro.api.application.services.JWTService;
import com.github.bloiseleo.gymbro.api.application.services.JWTServiceImpl;
import com.github.bloiseleo.gymbro.api.persistence.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class BeansConfiguration {
    @Bean
    public AuthService authService(UserRepository userRepository, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        return new AuthServiceImpl(userRepository, authenticationManager, passwordEncoder);
    }
    @Bean
    public JWTService jwtService(@Value("${jwt.secret}") String secret, @Value("${jwt.issuer}") String issuer) {
        return new JWTServiceImpl(secret, issuer);
    }
}
