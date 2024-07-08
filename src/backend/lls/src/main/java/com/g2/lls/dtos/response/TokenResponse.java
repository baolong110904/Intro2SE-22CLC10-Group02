package com.g2.lls.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TokenResponse {
    @JsonProperty("access_token")
    private String accessToken;

    private String expiration;

    private UserLogin user;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    public static class UserLogin {
        private String email;
    }
}
