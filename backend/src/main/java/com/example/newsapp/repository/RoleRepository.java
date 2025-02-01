package com.example.newsapp.repository;

import com.example.newsapp.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(Role.ERole name);
    Boolean existsByName(Role.ERole name);
}
