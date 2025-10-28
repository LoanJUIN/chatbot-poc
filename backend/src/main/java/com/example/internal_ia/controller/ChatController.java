package com.example.internal_ia.controller;

import com.example.internal_ia.model.Message;
import com.example.internal_ia.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.io.Serializable;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public Mono<ResponseEntity<Map<String, Serializable>>> chat(@RequestBody Map<String, Object> body) {
        String message = (String) body.get("message");
        String profile = (String) body.getOrDefault("profile", "user");
        Long conversationId = body.get("conversationId") != null
                ? Long.valueOf(body.get("conversationId").toString())
                : null;

        Message userMessage = chatService.saveMessage(message, profile, conversationId);

        return chatService.getChatResponse(message)
                .map(assistantResponse -> {
                    chatService.saveMessage(assistantResponse, "assistant", userMessage.getConversation().getIdConversation());

                    return ResponseEntity.ok(Map.of(
                            "response", assistantResponse,
                            "conversationId", userMessage.getConversation().getIdConversation()
                    ));
                });
    }
}
