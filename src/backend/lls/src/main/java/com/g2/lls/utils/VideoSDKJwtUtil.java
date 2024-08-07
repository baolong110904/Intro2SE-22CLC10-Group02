package com.g2.lls.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class VideoSDKJwtUtil {
    @Value("${video.sdk.api-key}")
    private String apiKey;

    @Value("${video.sdk.api-secret}")
    private String apiSecret;

    private static final long EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours

    public String generateToken() {
        Algorithm algorithm = Algorithm.HMAC256(apiSecret);

        return JWT.create()
                .withClaim("apikey", apiKey)
                .withClaim("permissions", List.of("allow_join"))
                .withClaim("version", 2)
                .withClaim("roomId", "2kyv-gzay-64pg")
                .withClaim("participantId", "lxvdplwt")
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(algorithm);
    }
}
