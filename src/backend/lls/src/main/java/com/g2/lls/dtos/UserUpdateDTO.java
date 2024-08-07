package com.g2.lls.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.g2.lls.enums.GenderType;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserUpdateDTO {
    private String username;

    @NotBlank(message = "Password can not be blank")
    private String password;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("date_of_birth")
    private LocalDate dateOfBirth;

    private GenderType gender;

    private String description;

    @JsonProperty("is_mfa_enabled")
    private Boolean isMfaEnabled;
}
