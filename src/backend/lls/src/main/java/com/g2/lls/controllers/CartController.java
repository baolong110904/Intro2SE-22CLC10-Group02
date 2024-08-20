package com.g2.lls.controllers;

import com.g2.lls.dtos.response.ApiResponse;
import com.g2.lls.dtos.response.CourseResponse;
import com.g2.lls.services.CourseRedisService;
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
@RequestMapping("${api.v1}/cart")
@RequiredArgsConstructor
@Slf4j
public class CartController {

    private final CourseService courseService;
    private final CourseRedisService courseRedisService;

    @PostMapping()
    public ResponseEntity<ApiResponse<CourseResponse>> addCourseCart(
            @RequestBody CourseResponse course) throws Exception {
        CourseResponse coursesResponse = courseRedisService.addCourseToCart(course);

        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                coursesResponse, TimeUtil.getTime()));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<CourseResponse>>> getCourseCartAll(
            @RequestParam String email
    ) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                courseRedisService.getCart(email), TimeUtil.getTime()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<List<CourseResponse>>> removeCourseFromCart(
            @PathVariable Long id,
            @RequestParam String email) throws Exception {
        List<CourseResponse> courseResponses = courseRedisService.removeCourseFromCart(id, email);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                courseResponses, TimeUtil.getTime()));
    }
}
