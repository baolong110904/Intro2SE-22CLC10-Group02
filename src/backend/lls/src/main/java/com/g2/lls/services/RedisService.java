package com.g2.lls.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.g2.lls.dtos.CourseFilterDTO;
import com.g2.lls.dtos.response.CourseResponse;
import java.util.List;

public interface RedisService {
    void clear();
    List<CourseResponse> getAllCourses(CourseFilterDTO courseFilterDTO) throws JsonProcessingException;
    void saveAllCourses(List<CourseResponse> courses, CourseFilterDTO courseFilterDTO) throws JsonProcessingException;
    CourseResponse addCourseToCart(CourseResponse courseResponse, String email) throws Exception;
    List<CourseResponse> getCart(String email) throws Exception;
    List<CourseResponse> removeCourseFromCart(Long courseId, String email) throws Exception;
    void deleteCart(Long studentId);
    void addOrder(String orderId, String status);
    boolean checkOrder(Long orderId);
    void deleteOrder(Long orderId);
}
