package com.g2.lls.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResetPasswordDTO {
    private String email;

    @JsonProperty("new_password")
    @NotBlank(message = "Password can not be blank")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~`@#$%^&*()_+=/{}|;':,.<>?])(?=\\S+$).{8,}$",
            message = "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character")
    private String newPassword;
}
