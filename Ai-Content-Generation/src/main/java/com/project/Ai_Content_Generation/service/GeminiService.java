package com.project.Ai_Content_Generation.service;

import com.project.Ai_Content_Generation.dto.GeminiRequest;
import com.project.Ai_Content_Generation.dto.GeminiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Collections;

@Service
public class GeminiService {

    private final WebClient webClient;
    private final String geminiApiKey;

    public GeminiService(@Value("${gemini.api.key}") String geminiApiKey) {
        this.geminiApiKey = geminiApiKey;
        this.webClient = WebClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent")
                .build();
    }

    public String generateContent(String content, String type) {
        String prompt = buildPrompt(type, content);

        GeminiRequest.Content.Part part = new GeminiRequest.Content.Part(prompt);
        GeminiRequest.Content contentObj = new GeminiRequest.Content(Collections.singletonList(part));
        GeminiRequest requestBody = new GeminiRequest(Collections.singletonList(contentObj));

        Mono<String> responseMono = webClient.post()
                .uri(uriBuilder -> uriBuilder.queryParam("key", geminiApiKey).build())
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(GeminiResponse.class)
                .map(response -> {
                    if (response.getCandidates() != null && !response.getCandidates().isEmpty()) {
                        GeminiResponse.Candidate candidate = response.getCandidates().get(0);
                        GeminiResponse.Content candidateContent = candidate.getContent();
                        if (candidateContent != null
                                && candidateContent.getParts() != null
                                && !candidateContent.getParts().isEmpty()) {
                            return candidateContent.getParts().get(0).getText();
                        }
                    }
                    return "No content generated.";
                })
                .onErrorReturn("Could not generate content (API error).");

        return responseMono.block();
    }

    private String buildPrompt(String type, String content) {
        switch (type.toLowerCase()) {
            case "blog":
                return "Write a blog post based on: " + content;
            case "caption":
                return "Write a caption for: " + content;
            case "summary":
                return "Summarize: " + content;
            case "notes":
                return "Write notes about: " + content;
            default:
                return content;
        }
    }
}