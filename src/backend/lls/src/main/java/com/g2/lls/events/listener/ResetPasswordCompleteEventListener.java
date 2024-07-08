package com.g2.lls.events.listener;

import com.g2.lls.domains.User;
import com.g2.lls.events.ResetPasswordCompleteEvent;
import com.g2.lls.services.RegistrationService;
import com.g2.lls.services.ResetPasswordService;
import com.g2.lls.utils.exception.DataNotFoundException;
import com.g2.lls.utils.exception.EmailFailureException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Component
@RequiredArgsConstructor
@Slf4j
public class ResetPasswordCompleteEventListener implements ApplicationListener<ResetPasswordCompleteEvent> {
    private final ResetPasswordService resetPasswordService;
    private final JavaMailSender mailSender;
    private User user;

    @Override
    public void onApplicationEvent(ResetPasswordCompleteEvent event) {
        user = event.getUser();
        String token = UUID.randomUUID() + "-" + user.hashCode();
        try {
            resetPasswordService.createResetPasswordToken(user, token);
        } catch (Exception e) {
            log.error("Error: ", e);
            throw new RuntimeException(e);
        }
        String url = event.getApplicationUrl() + "/reset?token=" + token;

        sendResetPasswordVerificationEmail(url).exceptionally(e -> {
            log.error("Error: ", e);
            throw new EmailFailureException(e.getMessage());
        });

        log.info("Click the link to verify your registration :  {}", url);
    }

    @Async
    public CompletableFuture<Void> sendResetPasswordVerificationEmail(String url) {
        return CompletableFuture.runAsync(() -> {
            String subject = "Reset Password Email Verification";
            String senderName = "User Registration Portal Service";
            String mailContent = "<p> Hi, " + user.getUsername() + ", </p>" +
                    "Please, follow the link below to reset your password." +
                    "<a href=\"" + url + "\">Reset your password</a>" +
                    "<p> Thank you <br> Users Registration Portal Service";

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message);
            try {
                messageHelper.setFrom("ntnam22@clc.fitus.edu.vn", senderName);
                messageHelper.setTo(user.getEmail());
                messageHelper.setSubject(subject);
                messageHelper.setText(mailContent, true);
            } catch (MessagingException | UnsupportedEncodingException e) {
                throw new EmailFailureException(e.getMessage());
            }

            mailSender.send(message);
        });
    }
}
