CREATE TABLE utilisateur (
                             id_utilisateur SERIAL PRIMARY KEY,
                             nom_utilisateur VARCHAR(100) NOT NULL,
                             role VARCHAR(20),
                             date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conversation (
                              id_conversation SERIAL PRIMARY KEY,
                              titre VARCHAR(150) NOT NULL,
                              date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              id_utilisateur INT,
                              CONSTRAINT fk_conversation_utilisateur
                                  FOREIGN KEY (id_utilisateur)
                                      REFERENCES utilisateur(id_utilisateur)
                                      ON DELETE SET NULL
);

CREATE TABLE message (
                         id_message SERIAL PRIMARY KEY,
                         id_conversation INT NOT NULL,
                         auteur VARCHAR(50),
                         contenu TEXT,
                         date_message TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         CONSTRAINT fk_message_conversation
                             FOREIGN KEY (id_conversation)
                                 REFERENCES conversation(id_conversation)
                                 ON DELETE CASCADE
);

CREATE INDEX idx_message_conversation ON message(id_conversation);
CREATE INDEX idx_conversation_utilisateur ON conversation(id_utilisateur);
