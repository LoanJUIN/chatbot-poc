package com.example.internal_ia.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

@Configuration
public class WebClientConfig {

    @Value("${spring.ai.mistralai.api-key}")
    private String mistralApiKey;

    @Bean
    public WebClient mistralWebClient() {
        HttpClient httpClient = UnsafeHttpClientConfig.createUnsafeHttpClient();

        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .baseUrl("https://api.mistral.ai/v1")
                .defaultHeader("Authorization", "Bearer " + mistralApiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }
}
