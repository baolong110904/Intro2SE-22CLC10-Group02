package com.g2.lls.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.g2.lls.enums.GenderType;
import lombok.*;

import java.time.Instant;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private String email;

    private String username;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("date_of_birth")
    private LocalDate dateOfBirth;

    private GenderType gender;

    private String description;

    private String avatar;

    @JsonProperty("is_mfa_enabled")
    private Boolean isMfaEnabled;

    private String secret;

    @JsonProperty("created_at")
    private Instant createdAt;

    @JsonProperty("updated_at")
    private Instant updatedAt;

    private Boolean isEnabled;
}
