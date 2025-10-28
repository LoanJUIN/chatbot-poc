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
                .map(this::extractMessageContent);
    }

    @SuppressWarnings("unchecked")
    private String extractMessageContent(Map<String, Object> response) {
        var choices = (List<Map<String, Object>>) response.get("choices");
        if (choices == null || choices.isEmpty()) return "Aucune réponse reçue.";
        var messageMap = (Map<String, Object>) choices.get(0).get("message");
        return (String) messageMap.get("content");
    }

    public Message saveMessage(String content, String auteur, Long conversationId) {
        Conversation conversation;

        if (conversationId == null) {
            // Crée une nouvelle conversation
            conversation = new Conversation();
            conversation.setTitre("Nouvelle conversation");
            conversation.setDateCreation(LocalDateTime.now());
            conversation = conversationRepository.save(conversation);
        } else {
            // Charge la conversation existante
            conversation = conversationRepository.findById(conversationId)
                    .orElseThrow(() -> new RuntimeException("Conversation not found"));
        }

        //Sauvegarde du message
        Message message = new Message();
        message.setAuteur(auteur);
        message.setContenu(content);
        message.setConversation(conversation);
        message.setDateMessage(LocalDateTime.now());

        return messageRepository.save(message);
    }
}

