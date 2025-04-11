package com.github.bloiseleo.gymbro.api.persistence.repositories;

import com.github.bloiseleo.gymbro.api.persistence.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    boolean existsUserByUsername(String username);
    Optional<User> findUserByUsername(String username);
}
