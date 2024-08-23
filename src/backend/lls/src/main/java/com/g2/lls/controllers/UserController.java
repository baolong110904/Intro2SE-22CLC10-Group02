package com.g2.lls.controllers;

import com.g2.lls.domains.User;
import com.g2.lls.dtos.AddressDTO;
import com.g2.lls.dtos.UserDTO;
import com.g2.lls.dtos.response.ApiResponse;
import com.g2.lls.dtos.response.AvatarResponse;
import com.g2.lls.dtos.response.PaginationDTO;
import com.g2.lls.dtos.response.UserResponse;
import com.g2.lls.services.UserService;
import com.g2.lls.utils.CustomHeaders;
import com.g2.lls.utils.TimeUtil;
import com.turkraft.springfilter.boot.Filter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(
        name = "User",
        description = "REST APIs for User"
)
@RestController
@RequestMapping("${api.v1}/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<ApiResponse<UserResponse>> createUser(@RequestBody UserDTO userDTO) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.CREATED.value(), true,
                userService.createUser(userDTO), TimeUtil.getTime()));
    }

    //    @GetMapping
//    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() throws Exception {
//        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
//                userService.getAllUsers(), TimeUtil.getTime()));
//    }
    @GetMapping
    public ResponseEntity<ApiResponse<PaginationDTO>> getAllUsers(
            @Filter Specification<User> spec, Pageable pageable) {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                userService.fetchAllUsers(spec, pageable), TimeUtil.getTime()));
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> getUserProfile(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                userService.getUserByEmail(email), TimeUtil.getTime()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(
            @PathVariable Long id) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                userService.getUserById(id), TimeUtil.getTime()));
    }

    @PostMapping(value = "/uploads/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<AvatarResponse>> uploadAvatar(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
            @ModelAttribute("file") MultipartFile file) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                userService.uploadProfilePictureByEmail(email, file), TimeUtil.getTime()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteUser(
            @PathVariable Long id) throws Exception {
        userService.deleteUser(id);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                "User deleted", TimeUtil.getTime()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserDTO userDTO) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                userService.updateUser(id, userDTO), TimeUtil.getTime()));
    }

    @GetMapping("/avatar")
    public ResponseEntity<ApiResponse<AvatarResponse>> getProfilePicture(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                userService.getProfilePicture(email), TimeUtil.getTime()));
    }

    @PutMapping("/address")
    public ResponseEntity<ApiResponse<AddressDTO>> updateUserAddress(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
            @Valid @RequestBody AddressDTO addressDTO) throws Exception {
        
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
            userService.updateUserAddress(email, addressDTO), TimeUtil.getTime()));
    }
}
