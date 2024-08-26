package com.g2.lls.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.g2.lls.enums.GenderType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
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
    @NotBlank(message = "Username can not be blank")
    @Pattern(regexp = "^[a-zA-Z0-9._]{2,50}$",
            message = "Username must be alphanumeric and have at least 2 characters and maximum 50 characters allow underscore, dot")
    private String username;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("date_of_birth")
    private LocalDate dateOfBirth;

    private GenderType gender;

    private String description;
}
