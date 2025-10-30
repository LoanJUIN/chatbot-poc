package com.example.internal_ia.service;

import com.example.internal_ia.dto.ConversationDto;
import com.example.internal_ia.dto.MessageDto;
import com.example.internal_ia.model.Conversation;
import com.example.internal_ia.model.Message;
import com.example.internal_ia.repository.ConversationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepository;

    public ConversationDto getConversationById(Long id) {
        Conversation conversation = conversationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Conversation non trouvée"));

        List<MessageDto> messageDTOs = conversation.getMessages().stream()
                .map(this::mapToMessageDTO)
                .collect(Collectors.toList());

        return ConversationDto.builder()
                .idConversation(conversation.getIdConversation())
                .titre(conversation.getTitre())
                .dateCreation(conversation.getDateCreation())
                .messages(messageDTOs)
                .build();
    }

    private MessageDto mapToMessageDTO(Message message) {
        return MessageDto.builder()
                .idMessage(message.getIdMessage())
                .auteur(message.getAuteur())
                .contenu(message.getContenu())
                .dateMessage(message.getDateMessage())
                .build();
    }
}
