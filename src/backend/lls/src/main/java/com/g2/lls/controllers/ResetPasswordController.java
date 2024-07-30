package com.g2.lls.controllers;

import com.g2.lls.domains.User;
import com.g2.lls.dtos.EmailDTO;
import com.g2.lls.dtos.ResetPasswordDTO;
import com.g2.lls.events.ResetPasswordCompleteEvent;
import com.g2.lls.services.ResetPasswordService;
import com.g2.lls.services.UserService;
import com.g2.lls.utils.AppUtil;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Tag(
        name = "Reset Password",
        description = "REST APIs for Reset Password"
)
@RestController
@RequestMapping("${api.v1}/auth/reset-password")
@RequiredArgsConstructor
@Slf4j
public class ResetPasswordController {
    private final UserService userService;
    private final ApplicationEventPublisher publisher;
    private final ResetPasswordService resetPasswordService;
    private final HttpServletRequest request;

    @PostMapping("/request")
    public String requestResetPassword(@RequestBody EmailDTO emailDTO) {
        log.info("Email: {}", emailDTO.getEmail());
        Optional<User> user = userService.findByEmail(emailDTO.getEmail());
        if (user.isEmpty()) {
            return "User with email " + emailDTO.getEmail() + " not found";
        }
        try {
//            String token = UUID.randomUUID().toString();
//            resetPasswordService.createResetPasswordToken(user.get(), token);
            log.info("Url: {}", AppUtil.applicationUrl(request));
            publisher.publishEvent(new ResetPasswordCompleteEvent(user.get(), AppUtil.applicationUrl(request)));
            return "Success!  Please, check your email for the reset password link";
        } catch (Exception e) {
            log.error("Error: {}", e.getMessage());
            return e.getMessage();
        }
    }

    @PostMapping("/request/reset")
    public String resetPassword(@Valid @RequestBody ResetPasswordDTO resetPasswordDTO,
                                @RequestParam String token) {
        try {
            if (!resetPasswordService.validateToken(token)) {
                return "Invalid token";
            }
            Optional<User> user = resetPasswordService.getUserByToken(token);
            if (user.isEmpty()) {
                return "User not found";
            }
            resetPasswordService.changePassword(user.get(), resetPasswordDTO.getNewPassword());
//            resetPasswordService.deleteResetPasswordToken(token);
            return "Success!  Password reset successfully";
        } catch (Exception e) {
            log.error("Error: {}", e.getMessage());
            return e.getMessage();
        }
    }
}
