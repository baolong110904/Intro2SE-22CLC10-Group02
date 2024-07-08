package com.g2.lls.controllers;

import com.g2.lls.dtos.response.ApiResponse;
import com.g2.lls.dtos.response.AvatarResponse;
import com.g2.lls.dtos.response.UserResponse;
import com.g2.lls.services.UserService;
import com.g2.lls.utils.CustomHeaders;
import com.g2.lls.utils.TimeUtil;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(
        name = "User",
        description = "REST APIs for User"
)
@RestController
@RequestMapping("${api.v1}/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                userService.getAllUsers(), TimeUtil.getTime()));
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> getUserProfile(@RequestHeader(CustomHeaders.X_AUTH_USER_ID) Long userId) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                userService.getUserById(userId), TimeUtil.getTime()));
    }

    @PostMapping(value = "/uploads/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public AvatarResponse uploadAvatar(@RequestHeader(CustomHeaders.X_AUTH_USER_ID) Long userId,
                                       @ModelAttribute("file") MultipartFile file) throws Exception {
        return userService.uploadProfilePicture(userId, file);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable Long id) throws Exception {
        userService.deleteUser(id);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                "User deleted", TimeUtil.getTime()));
    }
}
