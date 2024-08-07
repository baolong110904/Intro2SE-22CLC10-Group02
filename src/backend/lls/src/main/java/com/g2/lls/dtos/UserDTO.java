package com.g2.lls.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.g2.lls.enums.GenderType;
import com.g2.lls.enums.RoleType;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    @NotBlank(message = "Email is required")
    // @Email(message = "Email is not valid")
    private String email;

    private String username;

    @NotBlank(message = "Password can not be blank")
    // @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~`@#$%^&*()_+=/{}|;':,.<>?])(?=\\S+$).{8,}$",
    //         message = "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character")
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

    private RoleType role;

    @JsonProperty("is_enabled")
    private Boolean isEnabled;
}
