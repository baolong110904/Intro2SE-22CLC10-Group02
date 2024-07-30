package com.g2.lls.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PreSignUpDTO {
    @NotBlank(message = "Email is required")
    @Email(message = "Email is not valid")
    private String email;

    @NotBlank(message = "Password can not be blank")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~`@#$%^&*()_+=/{}|;':,.<>?])(?=\\S+$).{8,}$",
            message = "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character")
    private String password;
}
