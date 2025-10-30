package com.example.internal_ia.repository;

import com.example.internal_ia.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
}
