package com.g2.lls.configs;

import com.github.javafaker.Faker;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Locale;

@Configuration
public class FakerConfig {
    @Bean(name = "faker")
    public Faker faker() {
        return new Faker(new Locale.Builder()
                .setLanguage("en")
                .setRegion("US")
                .setVariant("POSIX")
                .build());
    }

    @Bean(name = "fakerVN")
    public Faker fakerVN() {
        return new Faker(new Locale.Builder()
                .setLanguage("vi")
                .setRegion("VN")
                .setVariant("POSIX")
                .build());
    }
}
