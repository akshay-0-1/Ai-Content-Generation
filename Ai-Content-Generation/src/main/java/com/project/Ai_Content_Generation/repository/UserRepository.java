package com.project.Ai_Content_Generation.repository;


import com.project.Ai_Content_Generation.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}