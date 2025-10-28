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
    public Mono<Map<String, String>> chat(@RequestBody Map<String, String> body) {
        String message = body.get("message");
        return chatService.getChatResponse(message)
                .map(response -> Map.of("response", response));
    }
}
