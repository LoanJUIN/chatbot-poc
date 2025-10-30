package com.example.internal_ia.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMessage;

    @ManyToOne
    @JoinColumn(name = "id_conversation")
    @JsonBackReference
    private Conversation conversation;

    private String auteur;

    @Column(columnDefinition = "TEXT")
    private String contenu;

    private LocalDateTime dateMessage = LocalDateTime.now();

}
