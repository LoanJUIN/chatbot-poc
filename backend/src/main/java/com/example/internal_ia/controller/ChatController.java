package com.example.internal_ia.controller;

import com.example.internal_ia.dto.ChatRequestDto;
import com.example.internal_ia.dto.ChatResponseDto;
import com.example.internal_ia.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping
    public Mono<ChatResponseDto> chat(@RequestBody ChatRequestDto request) {
        return chatService.handleChat(request);
    }
}
