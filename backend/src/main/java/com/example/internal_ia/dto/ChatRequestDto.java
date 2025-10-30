package com.example.internal_ia.dto;


import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatRequestDto {
    private final String message;
    private final Long conversationId;
}