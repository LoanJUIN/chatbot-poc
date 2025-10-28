package com.example.internal_ia.service;

import com.example.internal_ia.model.Conversation;
import com.example.internal_ia.model.Message;
import com.example.internal_ia.repository.ConversationRepository;
import com.example.internal_ia.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {

    private final WebClient mistralWebClient;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

    @Autowired
    public ChatService(WebClient mistralWebClient,
                       ConversationRepository conversationRepository,
                       MessageRepository messageRepository) {
        this.mistralWebClient = mistralWebClient;
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
    }

    /**
     * Gère le flux complet : sauvegarde message utilisateur, appel Mistral,
     * sauvegarde réponse et retour au front.
     */
    public Mono<Map<String, Object>> handleChat(String userMessage, Long conversationId) {
        Conversation conversation;

        // Créer ou récupérer la conversation
        if (conversationId == null || conversationId == 0) {
            conversation = new Conversation();
            conversation.setTitre("Nouvelle conversation");
            conversation.setDateCreation(LocalDateTime.now());
            conversation = conversationRepository.save(conversation);
        } else {
            conversation = conversationRepository.findById(conversationId)
                    .orElseThrow(() -> new RuntimeException("Conversation not found"));
        }

        // Sauvegarder le message utilisateur
        Message userMsg = new Message();
        userMsg.setAuteur("user");
        userMsg.setContenu(userMessage);
        userMsg.setConversation(conversation);
        userMsg.setDateMessage(LocalDateTime.now());
        messageRepository.save(userMsg);

        // Appeler l'API Mistral et sauvegarder la réponse IA
        Conversation finalConversation = conversation;

        return mistralWebClient.post()
                .uri("/chat/completions")
                .bodyValue(Map.of(
                        "model", "mistral-tiny",
                        "messages", List.of(
                                Map.of("role", "user", "content", userMessage)
                        )
                ))
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    String aiResponse = extractMessageContent(response);

                    // Sauvegarder le message de l'assistant
                    Message aiMsg = new Message();
                    aiMsg.setAuteur("assistant");
                    aiMsg.setContenu(aiResponse);
                    aiMsg.setConversation(finalConversation);
                    aiMsg.setDateMessage(LocalDateTime.now());
                    messageRepository.save(aiMsg);

                    // Retourner la réponse et l'id de conversation
                    return Map.of(
                            "response", aiResponse,
                            "conversationId", finalConversation.getIdConversation()
                    );
                });
    }

    @SuppressWarnings("unchecked")
    private String extractMessageContent(Map<String, Object> response) {
        var choices = (List<Map<String, Object>>) response.get("choices");
        if (choices == null || choices.isEmpty()) return "Aucune réponse reçue.";
        var messageMap = (Map<String, Object>) choices.get(0).get("message");
        return (String) messageMap.get("content");
    }
}
