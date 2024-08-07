package com.g2.lls.configs.security;

import java.io.IOException;

import com.g2.lls.dtos.response.ApiErrorResponse;
import com.g2.lls.dtos.response.ApiResponse;
import com.g2.lls.utils.TimeUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private final AuthenticationEntryPoint delegate = new BearerTokenAuthenticationEntryPoint();

    private final ObjectMapper mapper;

    public CustomAuthenticationEntryPoint(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        this.delegate.commence(request, response, authException);
        response.setContentType("application/json;charset=UTF-8");

        ApiResponse<ApiErrorResponse> res = new ApiResponse<>(HttpStatus.UNAUTHORIZED.value(), false,
                new ApiErrorResponse(request.getMethod(), request.getRequestURI(), authException.getMessage()), TimeUtil.getTime());

        mapper.writeValue(response.getWriter(), res);
    }
}

