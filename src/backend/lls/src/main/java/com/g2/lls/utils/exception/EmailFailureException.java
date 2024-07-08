package com.g2.lls.utils.exception;

public class EmailFailureException extends RuntimeException {
    public EmailFailureException(String message) {
        super(message);
    }
}
