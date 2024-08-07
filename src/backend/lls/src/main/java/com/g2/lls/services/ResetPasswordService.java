package com.g2.lls.services;

import com.g2.lls.domains.ResetPasswordToken;
import com.g2.lls.domains.User;

import java.util.Optional;

public interface ResetPasswordService {
    void createResetPasswordToken(User user, String token) throws Exception;

    void updateResetPasswordToken(ResetPasswordToken resetPasswordToken) throws Exception;

    Boolean validateToken(String token) throws Exception;

    Optional<User> getUserByToken(String token) throws Exception;

    ResetPasswordToken getResetPasswordTokenByToken(String token) throws Exception;

    void changePassword(User user, String password) throws Exception;

    void deleteResetPasswordToken(String token) throws Exception;
}
