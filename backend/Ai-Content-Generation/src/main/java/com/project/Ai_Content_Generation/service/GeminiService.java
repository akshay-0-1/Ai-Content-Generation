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
                return "Write a professional, engaging blog post based on: " + content;
            case "caption":
                return "Write a creative and engaging caption for: " + content;
            case "summary":
                return "Provide a concise summary of: " + content;
            case "notes":
                return "Create organized, comprehensive notes about: " + content;
            case "social":
                return "Create an engaging social media post about: " + content;
            case "email":
                return "Write a professional email template regarding: " + content;
            case "article":
                return "Write a detailed, well-researched article about: " + content;
            case "product":
                return "Write a compelling product description for: " + content;
            case "seo":
                return "Create SEO-friendly content about: " + content + ". Include relevant keywords naturally.";
            case "ad":
                return "Write persuasive advertising copy for: " + content;
            case "script":
                return "Create a video script about: " + content;
            case "press":
                return "Write a formal press release announcing: " + content;
            case "technical":
                return "Create clear, detailed technical documentation for: " + content;
            case "faq":
                return "Generate a list of FAQs with answers about: " + content;
            case "newsletter":
                return "Write an informative newsletter about: " + content;
            case "review":
                return "Write a balanced product review for: " + content;
            case "tutorial":
                return "Create a step-by-step tutorial on how to: " + content;
            case "outline":
                return "Create a detailed content outline for: " + content;
            case "headline":
                return "Generate 5 engaging headlines for content about: " + content;
            case "meta":
                return "Write SEO meta descriptions for: " + content;
            default:
                return content;
        }
    }
}