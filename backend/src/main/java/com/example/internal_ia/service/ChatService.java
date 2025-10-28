package com.example.internal_ia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
public class ChatService {

    private final WebClient mistralWebClient;

    @Autowired
    public ChatService(WebClient mistralWebClient) {
        this.mistralWebClient = mistralWebClient;
    }

    public Mono<String> getChatResponse(String userMessage) {
        return mistralWebClient.post()
                .uri("/chat/completions")
                .bodyValue(Map.of(
                        "model", "mistral-tiny",
                        "messages", new Object[]{
                                Map.of("role", "user", "content", userMessage)
                        }
                ))
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> extractMessageContent(response));
    }

    @SuppressWarnings("unchecked")
    private String extractMessageContent(Map<String, Object> response) {
        var choices = (List<Map<String, Object>>) response.get("choices");
        if (choices == null || choices.isEmpty()) return "Aucune réponse reçue.";
        var messageMap = (Map<String, Object>) choices.get(0).get("message");
        return (String) messageMap.get("content");
    }
}
