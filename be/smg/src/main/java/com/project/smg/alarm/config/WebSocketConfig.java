package com.project.smg.alarm.config;

import com.project.smg.alarm.Handler.CustomHandshakeInterceptor;
import com.project.smg.alarm.Handler.CustomWebSocketHandler;
import com.project.smg.alarm.service.AlarmMakeService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.HandshakeInterceptor;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {
    private final AlarmMakeService alarmMakeService;
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(customWebSocketHandler(), "/ws")
                .addInterceptors(customHandshakeInterceptor())
//                .setAllowedOrigins("http://localhost:8080", "http://www.shinemustget.com", "https://www.shinemustget.com")
                .setAllowedOriginPatterns("*");
//                .withSockJS()
//                .setClientLibraryUrl("http://localhost:8080");
    }

    @Bean
    public CustomWebSocketHandler customWebSocketHandler() {
        return new CustomWebSocketHandler(alarmMakeService);
    }

    @Bean
    public HandshakeInterceptor customHandshakeInterceptor() {
        return new CustomHandshakeInterceptor();
    }
}
