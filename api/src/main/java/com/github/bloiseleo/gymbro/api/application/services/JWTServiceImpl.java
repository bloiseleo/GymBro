package com.github.bloiseleo.gymbro.api.application.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.github.bloiseleo.gymbro.api.application.exceptions.UnauthorizedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

@Slf4j
public class JWTServiceImpl implements JWTService{
    private final String secret;
    private final String issuer;
    private final String authoritiesDelimiter = ", ";
    public JWTServiceImpl(String secret, String issuer) {
        this.secret = secret;
        this.issuer = issuer;
    }
    private Algorithm getAlgorithm() {
        return Algorithm.HMAC256(secret);
    }
    @Override
    public String generateToken(UserDetails details) {
        Collection<? extends GrantedAuthority> authorities = details.getAuthorities();
        String grantedAuthoritiesString = authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(authoritiesDelimiter));
        return JWT.create()
                .withIssuer(issuer)
                .withSubject(details.getUsername())
                .withClaim("authorities", grantedAuthoritiesString)
                .withExpiresAt(Instant.now().plus(1, ChronoUnit.DAYS))
                .sign(getAlgorithm());
    }
    @Override
    public UserDetails decode(String token) {
        try {
            Algorithm algorithm = getAlgorithm();
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(issuer)
                    .build();
            DecodedJWT jwt = verifier.verify(token);
            return new UserDetails() {
                private final DecodedJWT token = jwt;
                @Override
                public Collection<? extends GrantedAuthority> getAuthorities() {
                    Claim claim = token.getClaim("authorities");
                    String[] authorities = claim.asString().split(authoritiesDelimiter);
                    return Arrays
                            .stream(authorities)
                            .filter(authority -> !authority.isBlank())
                            .map(SimpleGrantedAuthority::new)
                            .toList();
                }
                @Override
                public String getPassword() {
                    return "";
                }
                @Override
                public String getUsername() {
                    return token.getSubject();
                }
            };
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new UnauthorizedException("Unauthorized");
        }
    }
}
