package com.example.internal_ia.service;

import com.example.internal_ia.dto.ChatRequestDto;
import com.example.internal_ia.dto.ChatResponseDto;
import com.example.internal_ia.model.Conversation;
import com.example.internal_ia.model.Message;
import com.example.internal_ia.repository.ConversationRepository;
import com.example.internal_ia.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final WebClient mistralWebClient;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

    /**
     * Gère la logique complète d’un échange avec Mistral :
     * - création ou récupération de la conversation
     * - sauvegarde des messages
     * - appel du modèle
     * - retour DTO propre
     */
    public Mono<ChatResponseDto> handleChat(ChatRequestDto request) {
        String userMessage = request.getMessage();
        Long conversationId = request.getConversationId();

        // Crée ou récupère la conversation
        Conversation conversation = getOrCreateConversation(conversationId,  userMessage);

        // Sauvegarde le message utilisateur
        saveMessage("user", userMessage, conversation);

        // Appel Mistral
        return mistralWebClient.post()
                .uri("/chat/completions")
                .bodyValue(Map.of(
                        "model", "mistral-tiny",
                        "messages", List.of(Map.of("role", "user", "content", userMessage))
                ))
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    String aiResponse = extractMessageContent(response);
                    saveMessage("assistant", aiResponse, conversation);

                    return ChatResponseDto.builder()
                            .response(aiResponse)
                            .conversationId(conversation.getIdConversation())
                            .build();
                });
    }
    
    private Conversation getOrCreateConversation(Long conversationId, String userMessage) {
        if (conversationId == null || conversationId == 0) {
            String generatedTitle = generateTitleFromMessage(userMessage);
            return conversationRepository.save(
                    Conversation.builder()
                            .titre(generatedTitle)
                            .dateCreation(LocalDateTime.now())
                            .build()
            );
        }
        return conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation non trouvée"));
    }

    private void saveMessage(String auteur, String contenu, Conversation conversation) {
        messageRepository.save(
                Message.builder()
                        .auteur(auteur)
                        .contenu(contenu)
                        .conversation(conversation)
                        .dateMessage(LocalDateTime.now())
                        .build()
        );
    }

    private String generateTitleFromMessage(String message) {
        if (message == null || message.isBlank()) {
            return "Nouvelle conversation";
        }

        String trimmed = message.trim();

        // Nettoie les retours à la ligne et espace multiples
        trimmed = trimmed.replaceAll("\\s+", " ");

        // Tronque à 20 caractères environ
        int maxLength = 25;
        if (trimmed.length() > maxLength) {
            trimmed = trimmed.substring(0, maxLength).trim() + "...";
        }

        // Met la première lettre en majuscule pour un rendu plus propre
        return Character.toUpperCase(trimmed.charAt(0)) + trimmed.substring(1);
    }

    @SuppressWarnings("unchecked")
    private String extractMessageContent(Map<String, Object> response) {
        var choices = (List<Map<String, Object>>) response.get("choices");
        if (choices == null || choices.isEmpty()) return "Aucune réponse reçue.";
        var messageMap = (Map<String, Object>) choices.get(0).get("message");
        return (String) messageMap.get("content");
    }
}
