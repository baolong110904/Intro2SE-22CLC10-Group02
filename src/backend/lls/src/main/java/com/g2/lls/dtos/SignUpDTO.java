package com.g2.lls.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.g2.lls.enums.GenderType;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUpDTO {
    @NotBlank(message = "Email is required")
    @Email(message = "Email is not valid")
    private String email;

    @NotBlank(message = "Password can not be blank")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~`@#$%^&*()_+=/{}|;':,.<>?])(?=\\S+$).{8,}$",
            message = "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character")
//    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#$%^&*])[a-zA-Z0-9_!@#$%^&*]{4,12}$",
//            message = "Password must be min 4 and max 12 length containing at least 1 uppercase, 1 lowercase, 1 special character and 1 digit")
    private String password;

    @NotBlank(message = "Username can not be blank")
    @Pattern(regexp = "^[a-zA-Z0-9._]{2,50}$",
            message = "Username must be alphanumeric and have at least 2 characters and maximum 50 characters allow underscore, dot")
    private String username;

    private GenderType gender;

//    @NotBlank(message = "Address ID can not be blank")
    @JsonProperty("address_id")
    private Long addressId;

    @JsonProperty("date_of_birth")
    private LocalDate dateOfBirth;

    @NotBlank(message = "First name can not be blank")
    @Size(max = 50, message = "First name must be less than 50 characters")
    @JsonProperty("first_name")
    private String firstName;

    @NotBlank(message = "Last name can not be blank")
    @Size(max = 50, message = "Last name must be less than 50 characters")
    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("role_id")
    private Long roleId;
}
