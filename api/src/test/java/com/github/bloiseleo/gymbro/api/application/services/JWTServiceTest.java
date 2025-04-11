package com.github.bloiseleo.gymbro.api.application.services;

import com.github.bloiseleo.gymbro.api.application.exceptions.UnauthorizedException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;

public class JWTServiceTest {
    public JWTService jwtService = new JWTServiceImpl("test", "test");
    @Test
    public void generateJWT_Success_UserDetails() {
        UserDetails userDetails = new UserDetails() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return List.of();
            }

            @Override
            public String getPassword() {
                return "";
            }

            @Override
            public String getUsername() {
                return "test";
            }
        };
        String token = jwtService.generateToken(userDetails);
        Assertions.assertNotNull(token);
        Assertions.assertFalse(token.isBlank());
    }
    @Test
    public void decodeJWT_Success_ReturnsUserDetails() {
        UserDetails userDetails = new UserDetails() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return List.of();
            }

            @Override
            public String getPassword() {
                return "";
            }

            @Override
            public String getUsername() {
                return "test";
            }
        };
        String token = jwtService.generateToken(userDetails);
        UserDetails response = jwtService.decode(token);
        Assertions.assertNotNull(response);
        Assertions.assertEquals(userDetails.getUsername(), response.getUsername());
        Assertions.assertEquals(userDetails.getPassword(), response.getPassword());
        Assertions.assertEquals(userDetails.getAuthorities(), response.getAuthorities());
    }
    @Test
    public void decodeJWT_Failed_ThrowsException() {
        UserDetails userDetails = new UserDetails() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return List.of();
            }

            @Override
            public String getPassword() {
                return "";
            }

            @Override
            public String getUsername() {
                return "test";
            }
        };
        String token = jwtService.generateToken(userDetails);
        Assertions.assertThrows(UnauthorizedException.class, () -> jwtService.decode(token + "testesteste"));
    }
}
