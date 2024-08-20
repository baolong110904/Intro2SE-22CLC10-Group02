package com.g2.lls.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.g2.lls.domains.User;
import com.g2.lls.dtos.CourseFilterDTO;
import com.g2.lls.dtos.response.CourseResponse;
import com.g2.lls.repositories.UserRepository;
import com.g2.lls.services.CourseRedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseRedisServiceImpl implements CourseRedisService {
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;
    private final UserServiceImpl userServiceImpl;

    private String getKeyFrom(CourseFilterDTO courseFilterDTO) {
        String key = String.format("courses:%s", courseFilterDTO);
        return key;
    }

    @Override
    public void clear() {
        redisTemplate.getConnectionFactory().getConnection().flushAll();
    }

    @Override
    public List<CourseResponse> getAllCourses(CourseFilterDTO courseFilterDTO) throws JsonProcessingException {
        String key = getKeyFrom(courseFilterDTO);
        String json = (String) redisTemplate.opsForValue().get(key);
        List<CourseResponse> courseResponses =
                json != null ? objectMapper.readValue(json, new TypeReference<List<CourseResponse>>() {}) : null;

        return courseResponses;
    }

    @Override
    public void saveAllCourses(List<CourseResponse> courses, CourseFilterDTO courseFilterDTO) throws JsonProcessingException {
        String key =  this.getKeyFrom(courseFilterDTO);
        String json = objectMapper.writeValueAsString(courses);
        redisTemplate.opsForValue().set(key, json);
    }

    @Override
    public CourseResponse addCourseToCart(CourseResponse courseResponse) throws Exception {
        User user = userServiceImpl.fetchUserByEmail(courseResponse.getEmail());
        String cartKey = "cart:" + user.getId();
        String cartJson = (String) redisTemplate.opsForValue().get(cartKey);

        List<CourseResponse> cart;
        if (cartJson != null) {
            try {
                cart = objectMapper.readValue(cartJson, objectMapper.getTypeFactory().constructCollectionType(List.class, CourseResponse.class));
            } catch (Exception e) {
                e.printStackTrace();
                cart = new ArrayList<>();
            }
        } else {
            cart = new ArrayList<>();
        }

        boolean isProductInCart = cart.stream().anyMatch(c -> c.getId().equals(courseResponse.getId()));
        if (!isProductInCart) {
            cart.add(courseResponse);
            try {
                redisTemplate.opsForValue().set(cartKey, objectMapper.writeValueAsString(cart));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return courseResponse;
    }

    @Override
    public List<CourseResponse> getCart(String email) throws Exception {
        if (email.charAt(0) == '"' && email.charAt(email.length() - 1) == '"') {
            email = email.substring(1, email.length() - 1);
        }
        User user = userServiceImpl.fetchUserByEmail(email);
        String cartKey = "cart:" + user.getId();

        String cartJson = (String) redisTemplate.opsForValue().get(cartKey);

        if (cartJson != null) {
            try {
                return objectMapper.readValue(cartJson, objectMapper.getTypeFactory().constructCollectionType(List.class, CourseResponse.class));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return new ArrayList<>();
    }

    @Override
    public List<CourseResponse> removeCourseFromCart(Long courseId, String email) throws Exception {
        if (email.charAt(0) == '"' && email.charAt(email.length() - 1) == '"') {
            email = email.substring(1, email.length() - 1);
        }

        User user = userServiceImpl.fetchUserByEmail(email);
        String cartKey = "cart:" + user.getId();
        String cartJson = (String) redisTemplate.opsForValue().get(cartKey);

        try {
            if (cartJson != null && !cartJson.isEmpty()) {
                List<CourseResponse> cart = objectMapper.readValue(cartJson, new TypeReference<List<CourseResponse>>() {});
                cart.removeIf(course -> course.getId().equals(courseId));
                redisTemplate.opsForValue().set(cartKey, objectMapper.writeValueAsString(cart));

                return objectMapper.readValue(cartJson, new TypeReference<List<CourseResponse>>() {});
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return objectMapper.readValue(cartJson, new TypeReference<List<CourseResponse>>() {});
    }
}
