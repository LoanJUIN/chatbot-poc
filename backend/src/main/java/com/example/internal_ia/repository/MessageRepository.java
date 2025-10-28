package com.example.internal_ia.repository;

import com.example.internal_ia.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {}

