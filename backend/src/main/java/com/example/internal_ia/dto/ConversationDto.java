package com.example.internal_ia.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConversationDto {
    private Long idConversation;
    private String titre;
    private LocalDateTime dateCreation;
    private List<MessageDto> messages;
}
