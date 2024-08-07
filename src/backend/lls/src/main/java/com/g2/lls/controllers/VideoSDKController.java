package com.g2.lls.controllers;

import com.g2.lls.dtos.response.ApiResponse;
import com.g2.lls.dtos.response.VideoSDKResponse;
import com.g2.lls.utils.TimeUtil;
import com.g2.lls.utils.VideoSDKJwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.v1}/video-sdk")
@RequiredArgsConstructor
public class VideoSDKController {
    private final VideoSDKJwtUtil videoSDKJwtUtil;

    @GetMapping("/token")
    public ResponseEntity<ApiResponse<VideoSDKResponse>> getVideoSDKToken() {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                new VideoSDKResponse(videoSDKJwtUtil.generateToken()), TimeUtil.getTime()));
    }
}
