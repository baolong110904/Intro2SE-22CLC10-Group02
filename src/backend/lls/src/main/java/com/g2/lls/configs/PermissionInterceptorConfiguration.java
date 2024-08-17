package com.g2.lls.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class PermissionInterceptorConfiguration implements WebMvcConfigurer {
    @Value("${api.v1}")
    private String apiPrefix;

    @Bean
    PermissionInterceptor getPermissionInterceptor() {
        return new PermissionInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        String[] whiteList = {
                "/",
                "/v3/api-docs/**",
                "/swagger-ui/**",
                "/swagger-ui.html",
                "/actuator/**",
                "/robots.txt",
                "/robot.txt",
                String.format("/%s/hello-world", apiPrefix),
                String.format("/%s/auth/**", apiPrefix),
                String.format("/%s/users/avatar", apiPrefix),
                String.format("/%s/countries/**", apiPrefix),
                String.format("/%s/payments/vn-pay/**", apiPrefix),
        };
        registry.addInterceptor(getPermissionInterceptor())
                .excludePathPatterns(whiteList);
    }
}
