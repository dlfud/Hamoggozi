package com.hamoggozi.hamoggozi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // 모든 요청에 대해 CORS 허용
                        .allowedOrigins("http://localhost:3000") // React 서버 주소
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowCredentials(true) // ✅ 쿠키 허용!
                        .allowedHeaders("*");
            }
        };
    }
}
