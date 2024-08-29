package com.g2.lls.controllers;

import com.g2.lls.domains.Material;
import com.g2.lls.domains.Role;
import com.g2.lls.dtos.*;
import com.g2.lls.dtos.response.*;
import com.g2.lls.enums.RoleType;
import com.g2.lls.services.RedisService;
import com.g2.lls.services.CourseService;
import com.g2.lls.services.impl.UserServiceImpl;
import com.g2.lls.utils.CustomHeaders;
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
import java.util.Set;

@RestController
@RequestMapping("${api.v1}/courses")
@RequiredArgsConstructor
@Slf4j
public class CourseController {
    private final CourseService courseService;
    private final RedisService courseRedisService;
    private final UserServiceImpl userServiceImpl;

    @PostMapping
    public ResponseEntity<?> createCourse(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
            @RequestBody CourseDTO courseDTO) throws Exception {
        Set<Role> roles = userServiceImpl.fetchUserByEmail(email).getRoles();
        List<String> roleTypes = roles.stream().map(role -> role.getName().toString()).toList();
        if (!roleTypes.contains(RoleType.TEACHER.toString()) && !roleTypes.contains(RoleType.ADMIN.toString())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse<>(HttpStatus.FORBIDDEN.value(), false, "Access denied", null));
        }

        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.CREATED.value(), true,
                courseService.createCourse(courseDTO, email), TimeUtil.getTime()));
    }

    @PostMapping(value = "{id}/uploads/thumbnail", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadThumbnail(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
            @PathVariable Long id,
            @ModelAttribute("file") MultipartFile file) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(
                HttpStatus.OK.value(),
                true,
                courseService.uploadThumbnailForCourse(id,file, email),
                TimeUtil.getTime()
        ));
    }

    @PostMapping("/all")
    public ResponseEntity<?> getAllCourses(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
            @Valid @RequestBody CourseFilterDTO courseFilterDTO) {

        try {
            Set<Role> roles = userServiceImpl.fetchUserByEmail(email).getRoles();
            List<String> roleTypes = roles.stream().map(role -> role.getName().toString()).toList();
            if (!roleTypes.contains(RoleType.STUDENT.toString()) && !roleTypes.contains(RoleType.ADMIN.toString()) && !roleTypes.contains(RoleType.TEACHER.toString())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(new ApiResponse<>(HttpStatus.FORBIDDEN.value(), false, "Access denied", null));
            }

            List<CourseResponse> coursesResponses = courseRedisService.getAllCourses(courseFilterDTO);
            if (coursesResponses == null || coursesResponses.isEmpty()) {
                coursesResponses = courseService.getAllCourses(courseFilterDTO, email);
                courseRedisService.saveAllCourses(coursesResponses, courseFilterDTO);
            }

            return ResponseEntity.ok(new ApiResponse<>(
                    HttpStatus.OK.value(),
                    true,
                    coursesResponses,
                    TimeUtil.getTime()
            ));
        } catch (Exception e) {
            log.error("Error while fetching courses", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), false, "An error occurred", null));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCourseById(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
            @PathVariable Long id) throws Exception {

        Set<Role> roles = userServiceImpl.fetchUserByEmail(email).getRoles();
        List<String> roleTypes = roles.stream().map(role -> role.getName().toString()).toList();
        if (!roleTypes.contains(RoleType.STUDENT.toString()) && !roleTypes.contains(RoleType.ADMIN.toString()) && !roleTypes.contains(RoleType.TEACHER.toString())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse<>(HttpStatus.FORBIDDEN.value(), false, "Access denied", null));
        }

        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                courseService.getCourseById(id), TimeUtil.getTime()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCourse(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
            @PathVariable Long id, @RequestBody UpdateCourseDTO courseDTO) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                courseService.updateCourse(id, courseDTO, email), TimeUtil.getTime()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteCourse(
            @RequestHeader (CustomHeaders.X_AUTH_USER_EMAIL) String email,
            @PathVariable Long id) throws Exception {
        courseService.deleteCourse(id, email);
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
    public ResponseEntity<ApiResponse<List<MyCourseResponse>>> getUserCourses(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
            @RequestParam String role
    ) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                courseService.getUserCourses(email, role), TimeUtil.getTime()));
    }

    @PutMapping("/{courseId}/{studentId}")
    public ResponseEntity<ApiResponse<CourseResponse>> removeStudentToCourse(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
            @PathVariable Long courseId, @PathVariable Long studentId
    ) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                courseService.removeStudent(courseId, studentId, email), TimeUtil.getTime()));
    }

    @PostMapping(value = "/uploads/materials", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadMaterial(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
            @ModelAttribute("file") MultipartFile file,
            @RequestPart("metadata") MaterialRequestDTO material) throws Exception {
        System.out.println("Received file: " + file.getOriginalFilename());
        System.out.println("File size: " + file.getSize());
        System.out.println("Content type: " + file.getContentType());

        return ResponseEntity.ok(new ApiResponse<>(
                HttpStatus.OK.value(),
                true,
                courseService.uploadMaterial(material.getCourseId(), material.getTitle(), file, email),
                TimeUtil.getTime()
        ));
    }

    @GetMapping("/{courseId}/materials")
    public ResponseEntity<ApiResponse<List<MaterialResponse>>> getMaterials(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
            @PathVariable Long courseId
    ) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(
                HttpStatus.OK.value(),
                true,
                courseService.getMaterials(courseId, email),
                TimeUtil.getTime()
        ));
    }

    @GetMapping("/{courseId}/participants")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getParticipants(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
            @PathVariable Long courseId
    ) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(
                HttpStatus.OK.value(),
                true,
                courseService.getParticipants(courseId, email),
                TimeUtil.getTime()
        ));
    }
}