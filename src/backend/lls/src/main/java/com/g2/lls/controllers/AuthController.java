package com.g2.lls.controllers;

import com.g2.lls.dtos.LoginDTO;
import com.g2.lls.dtos.response.ApiResponse;
import com.g2.lls.dtos.response.TokenResponse;
import com.g2.lls.services.UserService;
import com.g2.lls.utils.TimeUtil;
import com.g2.lls.utils.security.JwtTokenUtil;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(
        name = "Auth",
        description = "REST APIs for Authentication"
)
@RestController
@RequestMapping("${api.v1}/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;

    @Value("${jwt.refresh-token}")
    private Long jwtRefreshTokenExpiration;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<TokenResponse>> login(@Valid @RequestBody LoginDTO loginDTO) throws Exception {
        TokenResponse tokenResponse = userService.login(loginDTO);

        String refreshToken = jwtTokenUtil.createRefreshToken(loginDTO.getEmail(), tokenResponse);
        userService.updateUserRefreshToken(loginDTO.getEmail(), refreshToken);

        ResponseCookie cookie = ResponseCookie.from("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(true)
                .maxAge(jwtRefreshTokenExpiration)
                .path("/")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new ApiResponse<>(HttpStatus.OK.value(), true, tokenResponse, TimeUtil.getTime()));
    }
}
