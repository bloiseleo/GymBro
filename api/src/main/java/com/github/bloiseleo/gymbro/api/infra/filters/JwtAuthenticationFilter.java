package com.github.bloiseleo.gymbro.api.infra.filters;

import com.github.bloiseleo.gymbro.api.application.exceptions.UnauthorizedException;
import com.github.bloiseleo.gymbro.api.application.services.JWTService;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.IOException;

public class JwtAuthenticationFilter implements Filter {
    private JWTService jwtService;
    public JwtAuthenticationFilter(JWTService jwtService) {
        this.jwtService = jwtService;
    }
    private UserDetails extractToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        String token = authHeader.replace("Bearer ", "");
        if (token.isEmpty()) {
            return null;
        }
        return this.jwtService.decode(token);
    }
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        UserDetails userDetails = extractToken(request);
        if (userDetails == null) {
            filterChain.doFilter(request, servletResponse);
            return;
        }
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities())
        );
        filterChain.doFilter(request, servletResponse);
    }
}
