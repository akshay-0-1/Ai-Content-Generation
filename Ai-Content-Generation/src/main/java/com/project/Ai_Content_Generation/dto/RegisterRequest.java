package com.project.Ai_Content_Generation.dto;


import lombok.Data;
@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
}