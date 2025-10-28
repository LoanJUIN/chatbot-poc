package com.example.internal_ia.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
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
