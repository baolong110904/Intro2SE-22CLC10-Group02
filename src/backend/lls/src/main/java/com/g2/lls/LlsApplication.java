package com.g2.lls;

import com.g2.lls.configs.security.RSAKeyRecord;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaRepositories
@EnableCaching
@EnableAsync
@EnableConfigurationProperties(RSAKeyRecord.class)
public class LlsApplication {

    public static void main(String[] args) {
        SpringApplication.run(LlsApplication.class, args);
    }

}
