package com.g2.lls.services;


import com.g2.lls.dtos.CourseDTO;
import com.g2.lls.dtos.CourseFilterDTO;
import com.g2.lls.dtos.response.CourseResponse;
import com.g2.lls.dtos.response.MaterialResponse;
import com.g2.lls.dtos.response.ThumbnailResponse;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface CourseService {
    CourseResponse createCourse(CourseDTO courseDTO) throws Exception;
    List<CourseResponse> getAllCourses(CourseFilterDTO courseFilterDTO) throws Exception;
    CourseResponse getCourseById(Long id) throws Exception;
    void deleteCourse(Long id, String email) throws Exception;
    CourseResponse updateCourse(Long id, CourseDTO courseDTO, String email) throws Exception;
    List<CourseResponse> addStudent(List<Long> courseIds, String email, Long orderId) throws Exception;
    CourseResponse removeStudent(Long id, Long studentId) throws Exception;
    MaterialResponse uploadMaterial(Long id, MultipartFile file, String email) throws Exception;
    ThumbnailResponse uploadThumbnailForCourse(Long id, MultipartFile file, String email) throws Exception;
    List<CourseResponse> getUserCourses(String email, String role) throws Exception;
}
