package com.project.Ai_Content_Generation.controller;

import com.project.Ai_Content_Generation.dto.GenerateRequest;
import com.project.Ai_Content_Generation.dto.GenerateResponse;
import com.project.Ai_Content_Generation.service.GeminiService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api") // This maps to /api
public class GenerateController {

    private final GeminiService geminiService;
    private static final Logger logger = LoggerFactory.getLogger(GenerateController.class);

    @Autowired
    public GenerateController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/generate") // This maps to /api/generate
    public GenerateResponse generate(@RequestBody @Valid GenerateRequest request) {
        logger.info("Endpoint /api/generate called");
        logger.info("Received generate request with type: {}", request.getType());
        logger.info("Content: {}", request.getContent());
        
        String output = geminiService.generateContent(request.getContent(), request.getType());
        logger.info("Generated response with length: {}", output.length());
        
        return new GenerateResponse(output);
    }
}