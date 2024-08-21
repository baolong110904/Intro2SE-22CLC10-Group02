package com.g2.lls.controllers;

import com.g2.lls.dtos.CourseDTO;
import com.g2.lls.dtos.CourseFilterDTO;
import com.g2.lls.dtos.CourseStudentRequestDTO;
import com.g2.lls.dtos.response.*;
import com.g2.lls.services.RedisService;
import com.g2.lls.services.CourseService;
import com.g2.lls.utils.TimeUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("${api.v1}/courses")
@RequiredArgsConstructor
@Slf4j
public class CourseController {
    private final CourseService courseService;
    private final RedisService courseRedisService;

    @PostMapping
    public ResponseEntity<ApiResponse<CourseResponse>> createCourse(@RequestBody CourseDTO courseDTO) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.CREATED.value(), true,
                courseService.createCourse(courseDTO), TimeUtil.getTime()));
    }

    @PostMapping(value = "{id}/uploads/thumbnail", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ThumbnailResponse uploadAvatar(
            @PathVariable Long id,
            @ModelAttribute("file") MultipartFile file) throws Exception {
        return courseService.uploadThumbnailForCourse(id,file);
    }

    @PostMapping("/all")
    public ResponseEntity<?> getAllCourses(
            @Valid @RequestBody CourseFilterDTO courseFilterDTO) throws Exception {

        List<CourseResponse> coursesResponses = courseRedisService.getAllCourses(courseFilterDTO);

        if(coursesResponses == null) {
            coursesResponses = courseService.getAllCourses(courseFilterDTO);
            courseRedisService.saveAllCourses(
                coursesResponses,
                courseFilterDTO
            );
        }
        return ResponseEntity.ok().body(coursesResponses);
//        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
//                courseService.getAllCourses(courseFilterDTO)  , TimeUtil.getTime()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponse>> getCourseById(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                courseService.getCourseById(id), TimeUtil.getTime()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponse>> updateCourse(@PathVariable Long id, @RequestBody CourseDTO courseDTO) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                courseService.updateCourse(id, courseDTO), TimeUtil.getTime()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteCourse(
            @PathVariable Long id) throws Exception {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                "Course deleted", TimeUtil.getTime()));
    }

    @PostMapping("/add-student")
    public ResponseEntity<ApiResponse<List<CourseResponse>>> addStudentToCourse(
            @RequestBody CourseStudentRequestDTO courses
            ) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                courseService.addStudent(courses.getCourseIds(), courses.getEmail(), courses.getOrderId()), TimeUtil.getTime()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CourseResponse>>> getUserCourses(
            @RequestParam String email,
            @RequestParam String role
    ) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                courseService.getUserCourses(email, role), TimeUtil.getTime()));
    }

    @PutMapping("/{courseId}/{studentId}")
    public ResponseEntity<ApiResponse<CourseResponse>> removeStudentToCourse(
            @PathVariable Long courseId, @PathVariable Long studentId
    ) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                courseService.removeStudent(courseId, studentId), TimeUtil.getTime()));
    }

    @PostMapping(value = "{id}/uploads/materials", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public MaterialResponse uploadMaterial(
            @PathVariable Long id,
            @ModelAttribute("file") MultipartFile file) throws Exception {
        return courseService.uploadMaterial(id, file);
    }

}


