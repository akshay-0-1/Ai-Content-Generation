package com.project.Ai_Content_Generation.controller;

import com.project.Ai_Content_Generation.dto.GenerateRequest;
import com.project.Ai_Content_Generation.dto.GenerateResponse;
import com.project.Ai_Content_Generation.service.GeminiService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class GenerateController {

    private final GeminiService geminiService;

    @Autowired
    public GenerateController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/generate")
    public GenerateResponse generate(@RequestBody @Valid GenerateRequest request) {
        String output = geminiService.generateContent(request.getContent(), request.getType());
        return new GenerateResponse(output);
    }
}