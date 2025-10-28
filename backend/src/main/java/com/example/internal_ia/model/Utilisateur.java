package com.example.internal_ia.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUtilisateur;

    @Column(nullable = false, length = 100)
    private String nomUtilisateur;

    @Column(length = 20)
    private String role;

    private LocalDateTime dateCreation = LocalDateTime.now();

    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL)
    private List<Conversation> conversations;

}
