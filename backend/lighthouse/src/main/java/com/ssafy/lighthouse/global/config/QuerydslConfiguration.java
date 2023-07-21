package com.ssafy.lighthouse.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Configuration
public class QuerydslConfiguration {
    @PersistenceContext
    private EntityManager em;

    @Bean
    public J
}
