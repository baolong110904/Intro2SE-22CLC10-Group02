package com.g2.lls.utils.exception;

import com.g2.lls.dtos.response.ApiErrorResponse;
import com.g2.lls.dtos.response.ApiResponse;
import com.g2.lls.utils.TimeUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNullApi;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.io.IOException;
import java.util.List;

@RestControllerAdvice
@RequiredArgsConstructor
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    private final HttpServletRequest req;
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers,
                                                                  HttpStatusCode status, WebRequest request) {
        List<String> errorMessages = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .toList();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), false,
                        new ApiErrorResponse(req.getMethod(), req.getRequestURI(), errorMessages.toString()), TimeUtil.getTime()));
    }

    @Override
    protected ResponseEntity<Object> handleNoResourceFoundException(NoResourceFoundException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(HttpStatus.NOT_FOUND.value(), false,
                        new ApiErrorResponse(req.getMethod(), req.getRequestURI(), ex.getMessage()), TimeUtil.getTime()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<ApiErrorResponse>> handleException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), false,
                        new ApiErrorResponse(req.getMethod(), req.getRequestURI(), ex.getMessage()), TimeUtil.getTime()));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse<ApiErrorResponse>> handleBadCredentialsException(BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), false,
                        new ApiErrorResponse(req.getMethod(), req.getRequestURI(), ex.getMessage()), TimeUtil.getTime()));
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiResponse<ApiErrorResponse>> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(HttpStatus.NOT_FOUND.value(), false,
                        new ApiErrorResponse(req.getMethod(), req.getRequestURI(), ex.getMessage()), TimeUtil.getTime()));
    }

    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<ApiResponse<ApiErrorResponse>> handleDataNotFoundException(DataNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(HttpStatus.NOT_FOUND.value(), false,
                        new ApiErrorResponse(req.getMethod(), req.getRequestURI(), ex.getMessage()), TimeUtil.getTime()));
    }

    @ExceptionHandler(EmailFailureException.class)
    public ResponseEntity<ApiResponse<ApiErrorResponse>> handleEmailFailureException(EmailFailureException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), false,
                        new ApiErrorResponse(req.getMethod(), req.getRequestURI(), ex.getMessage()), TimeUtil.getTime()));
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ApiResponse<ApiErrorResponse>> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ApiResponse<>(HttpStatus.CONFLICT.value(), false,
                        new ApiErrorResponse(req.getMethod(), req.getRequestURI(), ex.getMessage()), TimeUtil.getTime()));
    }

    @ExceptionHandler(UserNotActivatedException.class)
    public ResponseEntity<ApiResponse<ApiErrorResponse>> handleUserNotActivatedException(UserNotActivatedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new ApiResponse<>(HttpStatus.FORBIDDEN.value(), false,
                        new ApiErrorResponse(req.getMethod(), req.getRequestURI(), ex.getMessage()), TimeUtil.getTime()));
    }

    @ExceptionHandler(ServletException.class)
    public ResponseEntity<ApiResponse<ApiErrorResponse>> handleServletException(ServletException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), false,
                        new ApiErrorResponse(req.getMethod(), req.getRequestURI(), ex.getMessage()), TimeUtil.getTime()));
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ApiResponse<ApiErrorResponse>> handleJwtException(JwtException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ApiResponse<>(HttpStatus.UNAUTHORIZED.value(), false,
                        new ApiErrorResponse(req.getMethod(), req.getRequestURI(), ex.getMessage()), TimeUtil.getTime()));
    }


    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ApiResponse<ApiErrorResponse>> handleResponseStatusException(ResponseStatusException ex) {
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                .body(new ApiResponse<>(HttpStatus.NOT_ACCEPTABLE.value(), false,
                        new ApiErrorResponse(req.getMethod(), req.getRequestURI(), ex.getReason()), TimeUtil.getTime()));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<ApiErrorResponse>> handleAccessDeniedException(AccessDeniedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new ApiResponse<>(HttpStatus.FORBIDDEN.value(), false,
                        new ApiErrorResponse(req.getMethod(), req.getRequestURI(), ex.getMessage()), TimeUtil.getTime()));
    }
}
