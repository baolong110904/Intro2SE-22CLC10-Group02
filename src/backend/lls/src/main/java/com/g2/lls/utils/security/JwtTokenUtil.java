package com.g2.lls.utils.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.g2.lls.domains.User;
import com.g2.lls.dtos.response.TokenResponse;
import com.g2.lls.repositories.UserRepository;
import com.g2.lls.services.UserService;
import com.g2.lls.utils.TimeUtil;
import com.g2.lls.utils.exception.DataNotFoundException;
import com.google.gson.Gson;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

@Service
@Getter
@Setter
@RequiredArgsConstructor
@Slf4j
public class JwtTokenUtil {
    public static MacAlgorithm JWT_ALGORITHM = MacAlgorithm.HS512;
    public final JwtEncoder jwtEncoder;
    private final Gson gson;
    private final ObjectMapper objectMapper;
    private final JwtDecoder jwtDecoder;
    private final UserRepository userRepository;

    @Value("${jwt.access-token}")
    private Long jwtAccessTokenExpiration;

    @Value("${jwt.refresh-token}")
    private Long jwtRefreshTokenExpiration;

    @Value("${jwt.secret}")
    private String jwtSecret;

    public String createAccessToken(Authentication authentication) throws DataNotFoundException {
        Instant now = TimeUtil.getTime();
        Instant validity = now.plus(jwtAccessTokenExpiration, ChronoUnit.SECONDS);
        log.info("Create access token for user: {}", authentication.getAuthorities());
        log.info("Expiration: {}", validity);

        String scopes = authentication.getAuthorities().stream().map(Object::toString).
                collect(Collectors.joining(" "));

        log.info("Scopes: {}", scopes);

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new DataNotFoundException("User not found"));

        JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
                .issuer("g2")
                .issuedAt(now)
                .expiresAt(validity)
                .subject(user.getEmail())
                .claim("id", user.getId())
                .claim("username", user.getUsername())
                .claim("scope", scopes)
                .build();

//        JwsHeader jwsHeader = JwsHeader
//                .with(JWT_ALGORITHM)
//                .type("JWT")
//                .build();

        JwsHeader jwsHeader = JwsHeader.with(SignatureAlgorithm.RS256)
                .type("JWT")
                .build();

//        return jwtEncoder.encode(JwtEncoderParameters.from(jwtClaimsSet)).getTokenValue();
        return jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, jwtClaimsSet)).getTokenValue();
    }
    public String createRefreshToken(String email) throws DataNotFoundException {
        Instant now = TimeUtil.getTime();
        Instant validity = now.plus(jwtRefreshTokenExpiration, ChronoUnit.SECONDS);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("User not found"));

        JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
                .issuer("g2")
                .issuedAt(now)
                .expiresAt(validity)
                .subject(email)
                .claim("id", user.getId())
                .claim("username", user.getUsername())
                .claim("scope", "refresh_token")
                .build();
//        JwsHeader jwsHeader = JwsHeader
//                .with(JWT_ALGORITHM)
//                .type("JWT")
//                .build();
        JwsHeader jwsHeader = JwsHeader.with(SignatureAlgorithm.RS256)
                .type("JWT")
                .build();

//        return jwtEncoder.encode(JwtEncoderParameters.from(jwtClaimsSet)).getTokenValue();
        return jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, jwtClaimsSet)).getTokenValue();
    }

    public Jwt checkValidRefreshToken(String token){
        try {
            return jwtDecoder.decode(token);
        } catch (Exception e) {
            log.error("Error checking refresh token: {}", e.getMessage());
            throw e;
        }
    }
    
    public String extractEmail(String token) {
        try {
            Jwt jwt = jwtDecoder.decode(token);
            return jwt.getSubject();
        } catch (Exception e) {
            log.error("Error extracting email from token: {}", e.getMessage());
            return null;
        }
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String email = extractEmail(token);
        return (email.equals(userDetails.getUsername()))
                && !isTokenExpired(token);
    }

    public Instant getExpiration(String token) {
        try {
            Jwt jwt = jwtDecoder.decode(token);
            return jwt.getExpiresAt();
        } catch (Exception e) {
            log.error("Error extracting email from token: {}", e.getMessage());
            return null;
        }
    }

    private boolean isTokenExpired(String token) {
        try {
            Instant expirationDate = jwtDecoder.decode(token).getExpiresAt();
            assert expirationDate != null;
            return expirationDate.isBefore(TimeUtil.getTime());
        } catch (Exception e) {
            log.error("Error checking token expiration: {}", e.getMessage());
            return true;
        }
    }
}
