package com.g2.lls.controllers;

import com.g2.lls.configs.security.user.CustomUserDetails;
import com.g2.lls.domains.User;
import com.g2.lls.dtos.ChangePasswordDTO;
import com.g2.lls.dtos.LoginDTO;
import com.g2.lls.dtos.LogoutDTO;
import com.g2.lls.dtos.response.ApiResponse;
import com.g2.lls.dtos.response.TokenResponse;
import com.g2.lls.services.UserService;
import com.g2.lls.utils.CustomHeaders;
import com.g2.lls.utils.TimeUtil;
import com.g2.lls.utils.exception.DataNotFoundException;
import com.g2.lls.utils.security.JwtTokenUtil;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Tag(
        name = "Auth",
        description = "REST APIs for Authentication"
)
@RestController
@RequestMapping("${api.v1}/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Value("${jwt.refresh-token}")
    private Long jwtRefreshTokenExpiration;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<TokenResponse>> login(@Valid @RequestBody LoginDTO loginDTO) throws Exception {
        TokenResponse tokenResponse = userService.login(loginDTO);

        String refreshToken = jwtTokenUtil.createRefreshToken(loginDTO.getEmail());
        userService.updateUserRefreshToken(loginDTO.getEmail(), refreshToken);

        ResponseCookie cookie = ResponseCookie
                .from("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(true)
                .maxAge(jwtRefreshTokenExpiration)
                .path("/")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new ApiResponse<>(HttpStatus.OK.value(), true, tokenResponse, TimeUtil.getTime()));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponse<TokenResponse>> refreshToken(
            @CookieValue(name = "refresh_token", defaultValue = "g2") String refreshToken) throws DataNotFoundException {
        if (refreshToken.equals("g2")) {
            throw new DataNotFoundException("Refresh token not found in cookie");
        }

        Jwt jwt = jwtTokenUtil.checkValidRefreshToken(refreshToken);
        String email = jwt.getSubject();

        User user = userService.getUserByRefreshTokenAndEmail(refreshToken, email);
        if (user == null) {
            throw new DataNotFoundException("User not found with the provided refresh token");
        }

        CustomUserDetails userDetails = new CustomUserDetails(user);

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(user.getEmail(),
                        user.getPassword(),
                        userDetails.getAuthorities());

        Authentication authentication = authenticationManagerBuilder.getObject()
                .authenticate(usernamePasswordAuthenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtTokenUtil.createAccessToken(authentication);

        Instant instant = jwtTokenUtil.getExpiration(accessToken);
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.of("GMT+7"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String expiration = localDateTime.format(formatter);

        TokenResponse.UserLogin userEntity = TokenResponse.UserLogin.builder()
                .email(user.getEmail())
                .build();

        TokenResponse tokenResponse = TokenResponse.builder()
                .accessToken(accessToken)
                .expiration(expiration)
                .user(userEntity)
                .build();

        String newRefreshToken = jwtTokenUtil.createRefreshToken(email);
        userService.updateUserRefreshToken(email, newRefreshToken);

        ResponseCookie cookie = ResponseCookie
                .from("refresh_token", newRefreshToken)
                .httpOnly(true)
                .secure(true)
                .maxAge(jwtRefreshTokenExpiration)
                .path("/")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new ApiResponse<>(HttpStatus.OK.value(), true, tokenResponse, TimeUtil.getTime()));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(
			@Valid @RequestBody LogoutDTO logoutDTO) throws Exception {
        userService.updateUserRefreshToken(logoutDTO.getEmail(), null);

        ResponseCookie deleteSpringCookie = ResponseCookie
                .from("refresh_token", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, deleteSpringCookie.toString())
                .body(new ApiResponse<>(HttpStatus.OK.value(), true,
                        "Logout successfully", TimeUtil.getTime()));
    }

    @PutMapping("/change-password")
	public ResponseEntity<ApiResponse<String>> changePassword(
			@RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
			@Valid @RequestBody ChangePasswordDTO changePasswordDTO) throws Exception {
		userService.changePassword(email, changePasswordDTO);
		return ResponseEntity.ok()
				.body(new ApiResponse<>(HttpStatus.OK.value(), true,
						"Password changed successfully!", TimeUtil.getTime()));
	}
}
