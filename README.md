# Chatbot IA Interne – Projet 3 semaines

Ce projet a été réalisé en autonomie sur **3 semaines**, en suivant la méthodologie **Scrum**.
Il comprend à la fois :

* Une **phase de gestion de projet** (recueil du besoin, cadrage, backlog, planification)
* Une **phase de réalisation technique** avec développement complet du produit (front + back)

---

## 🧠 Technologies

* **Front-end :** React + TypeScript
* **Back-end :** Spring Boot
* **Base de données :** PostgreSQL
* **IA :** API Mistral AI

---

## 🚀 Installation

### 1️⃣ Pré-requis

* Java + Maven
* Node.js + npm
* PostgreSQL
* Une clé API gratuite Mistral (console.mistral.ai)

---

## 🧩 Back-end (Spring Boot)

Configurer vos variables d’environnement dans `application.properties` :

```
spring.datasource.url=jdbc:postgresql://localhost:5432/xxx
spring.datasource.username=xxx
spring.datasource.password=xxx

mistral.api.key=VOTRE_CLE_MISTRAL
```

Démarrer le serveur :

```bash
mvn spring-boot:run
```

---

## 💬 Front-end (React)

Dans le dossier `/frontend` :

```bash
npm install
npm start
```

L’interface démarre sur :

```
http://localhost:3000
```

---

## 📁 Structure du dépôt

* `/code` → frontend + backend
* `/cahier-des-charges` → Cahier des charges du projet
* `/sprint-review` →  Support de présentation du Sprint Review 1
