package com.project.Ai_Content_Generation.service;

import com.project.Ai_Content_Generation.dto.LoginRequest;
import com.project.Ai_Content_Generation.dto.LoginResponse;
import com.project.Ai_Content_Generation.dto.RegisterRequest;
import com.project.Ai_Content_Generation.dto.RegisterResponse;
import com.project.Ai_Content_Generation.jwt.JwtUtil;
import com.project.Ai_Content_Generation.entity.User;
import com.project.Ai_Content_Generation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;

    public RegisterResponse register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRoles(Collections.singleton("ROLE_USER"));
        userRepository.save(user);
        return new RegisterResponse("User registered successfully!");
    }

    public LoginResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }
        UserDetails user = userRepository.findByEmail(request.getEmail())
                .map(u -> new org.springframework.security.core.userdetails.User(
                        u.getEmail(),
                        u.getPassword(),
                        (u.getRoles() == null ? Collections.<String>emptySet() : u.getRoles())
                        .stream()
                        .map(role -> new SimpleGrantedAuthority(role))
                        .toList()
                )).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        // Pass email as username to JWT util for token generation (your JwtUtil uses token subject as username)
        String token = jwtUtil.generateToken(user.getUsername());  // user.getUsername() is email here
        String msg = "Login successful! Use this token for Authorization header: Bearer <token>";
        return new LoginResponse(msg, token);
    }
}