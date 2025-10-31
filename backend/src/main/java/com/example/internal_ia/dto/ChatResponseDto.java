package com.example.internal_ia.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatResponseDto {
    private final String response;
    private final Long conversationId;
}