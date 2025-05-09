package com.project.Ai_Content_Generation.controller;

import com.project.Ai_Content_Generation.dto.LoginRequest;
import com.project.Ai_Content_Generation.dto.LoginResponse;
import com.project.Ai_Content_Generation.dto.RegisterRequest;
import com.project.Ai_Content_Generation.dto.RegisterResponse;
import com.project.Ai_Content_Generation.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}