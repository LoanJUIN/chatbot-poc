package com.example.internal_ia.config;

import io.netty.handler.ssl.SslContext;
import io.netty.handler.ssl.SslContextBuilder;
import reactor.netty.http.client.HttpClient;

import javax.net.ssl.SSLException;
import javax.net.ssl.X509TrustManager;
import java.security.cert.X509Certificate;

public class UnsafeHttpClientConfig {

    public static HttpClient createUnsafeHttpClient() {
        try {
            // 1. Crée un trust manager qui accepte tous les certificats
            X509TrustManager trustAll = new X509TrustManager() {
                public void checkClientTrusted(X509Certificate[] chain, String authType) {}
                public void checkServerTrusted(X509Certificate[] chain, String authType) {}
                public X509Certificate[] getAcceptedIssuers() { return new X509Certificate[0]; }
            };

            // 2. Crée un SSLContext permissif
            SslContext sslContext = SslContextBuilder.forClient()
                    .trustManager(trustAll)
                    .build();

            // 3. Retourne un HttpClient réactif qui ignore les vérifications SSL
            return HttpClient.create().secure(t -> t.sslContext(sslContext));
        } catch (SSLException e) {
            throw new RuntimeException("Erreur lors de la création du SSLContext permissif", e);
        }
    }
}
