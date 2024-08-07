package com.g2.lls.controllers;

import com.g2.lls.dtos.CourseDTO;
import com.g2.lls.dtos.response.*;
import com.g2.lls.services.CourseService;
import com.g2.lls.utils.TimeUtil;
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

    @PostMapping
    public ResponseEntity<ApiResponse<CourseResponse>> createCourse(@RequestBody CourseDTO courseDTO) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.CREATED.value(), true,
                courseService.createCourse(courseDTO), TimeUtil.getTime()));
    }

    @PostMapping(value = "{id}/uploads/thumbnail", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ThumbnailResponse uploadAvatar(
            @PathVariable Long id,
            @ModelAttribute("file") MultipartFile file) throws Exception {
        return courseService.uploadThumnailForCourse(id,file);
    }

    @GetMapping("/overview")
    public ResponseEntity<ApiResponse<List<CourseResponse>>> getAllCourses() throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                courseService.getAllCourses(), TimeUtil.getTime()));
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
                "User deleted", TimeUtil.getTime()));
    }

    @PostMapping("/{courseId}/{studentId}")
    public ResponseEntity<ApiResponse<CourseResponse>> addStudentToCourse(
            @PathVariable Long courseId, @PathVariable Long studentId
    ) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                courseService.addStudent(courseId, studentId), TimeUtil.getTime()));
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


