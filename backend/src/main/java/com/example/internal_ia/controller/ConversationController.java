package com.example.internal_ia.controller;

import com.example.internal_ia.dto.ConversationDto;
import com.example.internal_ia.model.Conversation;
import com.example.internal_ia.model.Message;
import com.example.internal_ia.repository.ConversationRepository;
import com.example.internal_ia.repository.MessageRepository;
import com.example.internal_ia.service.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ConversationController {

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private MessageRepository messageRepository;

    private final ConversationService conversationService;


    @GetMapping
    public List<Conversation> getAllConversations() {
        return conversationRepository.findAll();
    }

    @GetMapping("/{id}/messages")
    public List<Message> getMessagesByConversation(@PathVariable Long id) {
        return messageRepository.findByConversationIdConversation(id);
    }

    @GetMapping("/{conversationId}")
    public ResponseEntity<ConversationDto> getConversation(@PathVariable Long conversationId) {
        ConversationDto dto = conversationService.getConversationById(conversationId);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public void deleteConversation(@PathVariable Long id) {
        messageRepository.deleteAll(messageRepository.findByConversationIdConversation(id));
        conversationRepository.deleteById(id);
    }
}
