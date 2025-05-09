package com.project.Ai_Content_Generation.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GenerateRequest {
    @NotBlank
    private String content;

    @NotBlank
    private String type;
}