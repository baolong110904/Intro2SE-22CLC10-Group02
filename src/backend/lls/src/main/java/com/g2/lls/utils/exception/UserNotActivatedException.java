package com.g2.lls.utils.exception;

import org.springframework.security.core.AuthenticationException;

public class UserNotActivatedException extends AuthenticationException {
    public UserNotActivatedException(String message) {
        super(message);
    }
}
