package com.g2.lls.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.g2.lls.utils.exception.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("${api.v1}/countries")
@RequiredArgsConstructor
@Slf4j
public class CountryController {
    private final ObjectMapper objectMapper;
    private final ConcurrentHashMap<String, String> countryCache;
    private final RedisTemplate<String, String> redisTemplate;

    @Value("${country.api-key}")
    private String apiKey;

    @GetMapping("/all")
    public ResponseEntity<String> getCountries() {
        String country = redisTemplate.opsForValue().get("countries");

        if (country != null) {
            try {
                log.info("Cache hit");
                Object json = objectMapper.readValue(country, Object.class);
                String prettyJson = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(json);

                return ResponseEntity.ok().body(prettyJson);
            } catch (JsonProcessingException e) {
                throw new RuntimeException("Error while converting cache to JSON", e);
            }
        }

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

                String prettyJson = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(countriesArray);
                return ResponseEntity.ok().body(prettyJson);
            }

            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("Error while fetching data from the API", e);
        }
    }

    @GetMapping("/{countryName}")
    public ResponseEntity<String> getStateByCountry(@PathVariable("countryName") String countryName) {
        String country = redisTemplate.opsForValue().get("countries");

        String isoCodeCache = null;

        if (country != null) {
            try {
                JsonNode rootNode = objectMapper.readTree(country);

                if (rootNode.isArray()) {
                    for (JsonNode node : rootNode) {
                        if (node.get("name").asText().equals(countryName)) {
                            isoCodeCache = node.get("iso2").asText();
                            break;
                        }
                    }
                }
            } catch (JsonProcessingException e) {
                throw new RuntimeException("Error while processing JSON", e);
            }
        }

//        String isoCodeCache = redisTemplate.opsForValue().get(countryName);

//        log.info("Country name: {}", countryName);
        log.info("ISO code: {}", isoCodeCache);

        if (isoCodeCache != null) {
            HttpRequest stateRequest = HttpRequest.newBuilder()
                    .uri(URI.create(String.format("https://api.countrystatecity.in/v1/countries/%s/states", isoCodeCache)))
                    .header("X-CSCAPI-KEY", apiKey)
                    .GET()
                    .build();

            try {
                HttpResponse<String> stateResponse = HttpClient.newHttpClient().send(stateRequest, HttpResponse.BodyHandlers.ofString());
                return ResponseEntity
                        .ok()
                        .body(stateResponse.body());
            } catch (IOException | InterruptedException e) {
                throw new RuntimeException("Error while fetching data from the API", e);
            }
        }

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.countrystatecity.in/v1/countries"))
                .header("X-CSCAPI-KEY", apiKey)
                .GET()
                .build();

        try {
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            JsonNode rootNode = objectMapper.readTree(response.body());
//
//            Optional<String> isoCode = Optional.empty();
//            if (rootNode.isArray()) {
//                for (JsonNode node : rootNode) {
//                    if (node.get("name").asText().equals(countryName)) {
//                        isoCode = Optional.of(node.get("iso2").asText());
//                        redisTemplate.opsForValue().set(countryName, node.get("iso2").asText(), 24, TimeUnit.HOURS); // Cache for 24 hours
//                        break;
//                    }
//                }
//            }

            Optional<String> isoCode = Optional.empty();
            if (rootNode.isArray()) {
                for (JsonNode node : rootNode) {
                    if (node.get("name").asText().equals(countryName)) {
                        isoCode = Optional.of(node.get("iso2").asText());
                        break;
                    }
                }
            }

            if (isoCode.isEmpty()) {
                throw new DataNotFoundException("Country not found");
            }

            HttpRequest stateRequest = HttpRequest.newBuilder()
                    .uri(URI.create(String.format("https://api.countrystatecity.in/v1/countries/%s/states", isoCode.get())))
                    .header("X-CSCAPI-KEY", apiKey)
                    .GET()
                    .build();

            try {
                HttpResponse<String> stateResponse = HttpClient.newHttpClient().send(stateRequest, HttpResponse.BodyHandlers.ofString());
                return ResponseEntity
                        .ok()
                        .body(stateResponse.body());
            } catch (IOException | InterruptedException e) {
                throw new RuntimeException("Error while fetching data from the API", e);
            }
        } catch (IOException | InterruptedException | DataNotFoundException e) {
            throw new RuntimeException("Error while fetching data from the API", e);
        }
    }

    @GetMapping("/cache")
    public String getCache() {
//        Map<String, Object> cache = new HashMap<>();
//        for (String key : Objects.requireNonNull(redisTemplate.keys("*"))) {
//            cache.put(key, redisTemplate.opsForValue().get(key));
//        }
//        return cache;
        String jsonString = redisTemplate.opsForValue().get("countries");
        if (jsonString != null) {
            try {
                Object json = objectMapper.readValue(jsonString, Object.class);
                return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(json);
            } catch (JsonProcessingException e) {
                throw new RuntimeException("Error processing JSON", e);
            }
        }
        return null;
    }
}
