package com.example.internal_ia.controller;

import com.example.internal_ia.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

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
        public Mono<Map<String, Object>> chat(@RequestBody Map<String, Object> body) {
            String message = (String) body.get("message");
            Long conversationId = body.get("conversationId") != null
                    ? Long.valueOf(body.get("conversationId").toString())
                    : null;

            return chatService.handleChat(message, conversationId);
        }
    }
