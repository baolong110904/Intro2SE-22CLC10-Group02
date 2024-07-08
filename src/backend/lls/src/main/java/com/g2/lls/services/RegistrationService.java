package com.g2.lls.services;

import com.g2.lls.domains.User;
import com.g2.lls.dtos.SignUpDTO;
import com.g2.lls.utils.exception.DataNotFoundException;

public interface RegistrationService {
    User registerUser(SignUpDTO signUpDTO) throws Exception;

    void saveUserVerificationToken(User theUser, String token) throws Exception;

    Boolean validateToken(String token) throws Exception;

    void deleteVerificationToken(String token) throws Exception;
}
