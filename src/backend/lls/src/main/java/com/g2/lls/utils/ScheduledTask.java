package com.g2.lls.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.Objects;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;

@Component
@EnableAsync
@EnableScheduling
@RequiredArgsConstructor
@Slf4j
public class ScheduledTask {
    private final ObjectMapper objectMapper;
    private final RedisTemplate<String, String> redisTemplate;
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @Value("${country.api-key}")
    private String apiKey;

    private void clearCache() {
        redisTemplate.delete(Objects.requireNonNull(redisTemplate.keys("*")));
    }

//    @Async
//    @Scheduled(fixedRate = 82800000, zone = "GMT+7")
//    public void scheduleTask() {
//        log.info("Scheduled task started at {}", TimeUtil.getTime());
//        clearCache();
//        log.info("Cache cleared at {}", TimeUtil.getTime());
//        HttpRequest request = HttpRequest.newBuilder()
//                .uri(URI.create("https://api.countrystatecity.in/v1/countries"))
//                .header("X-CSCAPI-KEY", apiKey)
//                .GET()
//                .build();
//
//        try {
//            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
//
//            JsonNode rootNode = objectMapper.readTree(response.body());
//
//            if (rootNode.isArray()) {
//                for (JsonNode node : rootNode) {
//                    String name = node.get("name").asText();
//                    String iso2 = node.get("iso2").asText();
//
//                    if (redisTemplate.opsForValue().get(name) == null) {
//                        redisTemplate.opsForValue().set(name, iso2, 24, TimeUnit.HOURS);
//                    }
//                }
//            }
//            log.info("Redis updated at {}", TimeUtil.getTime());
//        } catch (IOException | InterruptedException e) {
//            throw new RuntimeException("Error while fetching data from the API");
//        }
//    }
//    private void clearCache() {
//        redisTemplate.delete("countries");
//    }

    @Async
    @Scheduled(fixedRate = 82800000)
    public void scheduleTask() {
        log.info("Scheduled task started at {}", TimeUtil.getTime());
//        clearCache();
//        log.info("Cache cleared at {}", TimeUtil.getTime());
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.countrystatecity.in/v1/countries"))
                .header("X-CSCAPI-KEY", apiKey)
                .GET()
                .build();

        try {
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

            JsonNode rootNode = objectMapper.readTree(response.body());

            if (rootNode.isArray()) {
                ArrayNode countriesArray = objectMapper.createArrayNode();

                for (JsonNode node : rootNode) {
                    ObjectNode countryNode = objectMapper.createObjectNode();
                    countryNode.put("name", node.get("name").asText());
                    countryNode.put("iso2", node.get("iso2").asText());
                    countriesArray.add(countryNode);
                }

                String countriesJson = objectMapper.writeValueAsString(countriesArray);
                redisTemplate.opsForValue().set("countries", countriesJson, 24, TimeUnit.HOURS);
            }
            log.info("Redis updated at {}", TimeUtil.getTime());
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("Error while fetching data from the API", e);
        }
    }
}

