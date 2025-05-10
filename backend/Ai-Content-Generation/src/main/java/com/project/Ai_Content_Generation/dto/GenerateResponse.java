package com.project.Ai_Content_Generation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GenerateResponse {
    private String generatedText;
}