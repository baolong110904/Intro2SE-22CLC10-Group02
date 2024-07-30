package com.g2.lls.controllers;

import com.g2.lls.domains.User;
import com.g2.lls.domains.VerificationToken;
import com.g2.lls.dtos.SignUpDTO;
import com.g2.lls.events.RegistrationCompleteEvent;
import com.g2.lls.repositories.VerificationTokenRepository;
import com.g2.lls.services.RegistrationService;
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
        name = "Registration",
        description = "REST APIs for Registration"
)
@RestController
@RequestMapping("${api.v1}/auth/register")
@RequiredArgsConstructor
@Slf4j
public class RegistrationController {
    private final ApplicationEventPublisher publisher;
    private final VerificationTokenRepository tokenRepository;
    private final RegistrationService registrationService;
    private final HttpServletRequest request;

    @PostMapping("")
    public String registerUser(@Valid @RequestBody SignUpDTO signUpDTO) throws Exception {
        User user = registrationService.registerUser(signUpDTO);
        log.info("Url: {}", AppUtil.applicationUrl(request));
        publisher.publishEvent(new RegistrationCompleteEvent(user, AppUtil.applicationUrl(request)));
        return "Success!  Please, check your email for to complete your registration";
    }

    @GetMapping("/registrationConfirm")
    public String verifyEmail(@RequestParam("token") String token) throws Exception {
        Optional<VerificationToken> existingToken = tokenRepository.findByToken(token);

        if (existingToken.isEmpty()){
            return "Invalid verification token";
        }

        if (existingToken.get().getUser().getIsEnabled()){
            return "This account has already been verified, please, login.";
        }
        Boolean result = registrationService.validateToken(token);
//        registrationService.deleteVerificationToken(token);

        if (result) {
            return "Email verified successfully. Now you can login to your account";
        }
        log.error("Invalid verification token");
        return "Invalid verification token";
    }
}
