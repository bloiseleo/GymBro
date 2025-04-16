package com.github.bloiseleo.gymbro.api.infra.services;

import com.github.bloiseleo.gymbro.api.persistence.entity.User;
import com.github.bloiseleo.gymbro.api.persistence.repositories.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findUserByUsername(username);
        if(user.isEmpty()) {
            throw new UsernameNotFoundException(username);
        }
        return new UserDetails() {
            private final User userEntity = user.get();
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return List.of();
            }
            @Override
            public String getPassword() {
                return userEntity.getPassword();
            }
            @Override
            public String getUsername() {
                return userEntity.getUsername();
            }
        };
    }
}
