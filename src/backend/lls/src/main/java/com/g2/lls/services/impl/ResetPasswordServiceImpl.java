package com.g2.lls.services.impl;

import com.g2.lls.domains.ResetPasswordToken;
import com.g2.lls.domains.User;
import com.g2.lls.repositories.ResetPasswordTokenRepository;
import com.g2.lls.repositories.RoleRepository;
import com.g2.lls.repositories.UserRepository;
import com.g2.lls.repositories.VerificationTokenRepository;
import com.g2.lls.services.ResetPasswordService;
import com.g2.lls.utils.AppUtil;
import com.g2.lls.utils.exception.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResetPasswordServiceImpl implements ResetPasswordService {
    private final UserRepository userRepository;
    private final ResetPasswordTokenRepository resetPasswordTokenRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public void createResetPasswordToken(User user, String token) throws Exception {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isEmpty()) {
            log.error("User with email {} not found", user.getEmail());
            throw new DataNotFoundException("User with email " + user.getEmail() + " not found");
        }
        if (resetPasswordTokenRepository.findByUser(existingUser.get()).isPresent()) {
            ResetPasswordToken resetPasswordToken = resetPasswordTokenRepository.findByUser(existingUser.get()).get();
            resetPasswordToken.setToken(token);
            resetPasswordToken.setExpirationDate(Instant.now().plusSeconds(AppUtil.EXPIRATION_SECONDS));
            resetPasswordTokenRepository.save(resetPasswordToken);
            return;
        }
        ResetPasswordToken resetPasswordToken = new ResetPasswordToken(token, user);
        resetPasswordTokenRepository.save(resetPasswordToken);
    }

    @Override
    public void updateResetPasswordToken(ResetPasswordToken resetPasswordToken) throws Exception {
        resetPasswordTokenRepository.save(resetPasswordToken);
    }

    @Override
    public Boolean validateToken(String token) throws Exception {
        Optional<ResetPasswordToken> resetPasswordToken = resetPasswordTokenRepository.findByToken(token);
        if (resetPasswordToken.isEmpty()) {
            log.error("Token {} not found", token);
            throw new DataNotFoundException("Token " + token + " not found");
        }
        Instant now = Instant.now();
        if (resetPasswordToken.get().isExpired()) {
            log.error("Token {} is expired", token);
            return false;
        }
        return true;
    }

    @Override
    public Optional<User> getUserByToken(String token) throws Exception {
        Optional<ResetPasswordToken> resetPasswordToken = resetPasswordTokenRepository.findByToken(token);
        if (resetPasswordToken.isEmpty()) {
            log.error("Token {} not found", token);
            throw new DataNotFoundException("Token " + token + " not found");
        }
        return Optional.of(resetPasswordToken.get().getUser());
    }

    @Override
    public ResetPasswordToken getResetPasswordTokenByToken(String token) throws Exception {
        Optional<ResetPasswordToken> resetPasswordToken = resetPasswordTokenRepository.findByToken(token);
        if (resetPasswordToken.isEmpty()) {
            log.error("Token {} not found", token);
            throw new DataNotFoundException("Token " + token + " not found");
        }
        return resetPasswordToken.get();
    }

    @Override
    public void changePassword(User user, String password) throws Exception {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isEmpty()) {
            log.error("User with email {} not found", user.getEmail());
            throw new DataNotFoundException("User with email " + user.getEmail() + " not found");
        }
        existingUser.get().setPassword(passwordEncoder.encode(password));
        userRepository.save(existingUser.get());
    }

    @Override
    public void deleteResetPasswordToken(String token) throws Exception {
        Optional<ResetPasswordToken> resetPasswordToken = resetPasswordTokenRepository.findByToken(token);
        if (resetPasswordToken.isEmpty()) {
            log.error("Token {} not found", token);
            throw new DataNotFoundException("Token " + token + " not found");
        }
        resetPasswordTokenRepository.delete(resetPasswordToken.get());
    }
}
