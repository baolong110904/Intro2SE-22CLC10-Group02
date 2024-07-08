package com.g2.lls.utils.security;

import com.g2.lls.configs.security.RSAKeyRecord;
import com.g2.lls.configs.security.user.CustomUserDetails;
import com.g2.lls.utils.exception.DataNotFoundException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtTokenFilter extends OncePerRequestFilter {
    private final UserDetailsService userDetailsService;
    private final JwtTokenUtil jwtTokenUtil;
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        try {
            log.info("Filter request");
            if (isBypassToken(request)) {
                try {
                    log.info("Filter request done");
//                    SecurityContextHolder.clearContext();
                    filterChain.doFilter(request, response);
                } catch (Exception e) {
                    log.error("Error: ", e);
                    throw new ServletException(e);
                }
                return;
            }
            final String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                return;
            }
            final String token = authHeader.substring(7);
            log.info("Token: " + token);
            final String email = jwtTokenUtil.extractEmail(token);
            log.info("Email: " + email);

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(email);
                if (jwtTokenUtil.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }
            log.info("Filter request done");
            filterChain.doFilter(request, response);
        } catch (JwtValidationException jwtValidationException){
            log.error("[JwtAccessTokenFilter:doFilterInternal] Exception due to :{}",jwtValidationException.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE,jwtValidationException.getMessage());
        } catch (Exception e) {
            log.error("Error: ", e);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
        }
    }

    private boolean isBypassToken(@NonNull HttpServletRequest request) {
        final List<Pair<String, String>> bypassTokens = List.of(
                Pair.of("/hello-world", "GET"),
                Pair.of("/login", "POST"),
                Pair.of("/register", "POST"),
                Pair.of("/register/registrationConfirm", "GET"),
                Pair.of("/reset-password/request", "POST"),
                Pair.of("/reset-password", "POST"),
                Pair.of("/swagger-ui", "GET"),
                Pair.of("/v3/api-docs", "GET")
        );

        log.info("Request: " + request.getServletPath() + " " + request.getMethod());
        for (Pair<String, String> bypassToken : bypassTokens) {
            log.info(request.getServletPath() + " " + request.getMethod() + " " + bypassToken.getFirst() + " " + bypassToken.getSecond());
            if (request.getServletPath().contains(bypassToken.getFirst()) &&
                    request.getMethod().equals(bypassToken.getSecond())) {
                log.info("Bypass token: " + bypassToken.getFirst() + " " + bypassToken.getSecond());
                return true;
            }
        }
        return false;
    }
}
