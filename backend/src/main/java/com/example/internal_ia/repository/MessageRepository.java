package com.example.internal_ia.repository;

import com.example.internal_ia.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByConversationIdConversation(Long conversationId);
}
