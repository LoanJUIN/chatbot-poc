package com.example.internal_ia.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    private Long idMessage;
    private String auteur;
    private String contenu;
    private LocalDateTime dateMessage;
}
