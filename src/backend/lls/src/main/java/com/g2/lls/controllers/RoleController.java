package com.g2.lls.controllers;

import com.g2.lls.dtos.response.ApiResponse;
import com.g2.lls.enums.RoleType;
import com.g2.lls.services.UserService;
import com.g2.lls.utils.CustomHeaders;
import com.g2.lls.utils.TimeUtil;
import com.g2.lls.utils.exception.DataNotFoundException;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(
        name = "Role",
        description = "REST APIs for Role"
)
@RestController
@RequestMapping("${api.v1}/roles")
@RequiredArgsConstructor
@Slf4j
public class RoleController {
    private final UserService userService;
    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<RoleType>> verifyRole(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(200, true,
                userService.verifyRole(email), TimeUtil.getTime()));
    }
}
