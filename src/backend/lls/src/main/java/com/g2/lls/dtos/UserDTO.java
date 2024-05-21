package com.g2.lls.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.g2.lls.models.UserRole;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

public class UserDTO {
    @NotBlank(message = "Username is required")
    private String username;

    @JsonProperty("phone_number")
    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @NotBlank(message = "Password can not be blank")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~`@#$%^&*()_+=/{}|;':,.<>?])(?=\\S+$).{8,}$",
            message = "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character")
    private String password;

    @JsonProperty("first_name")
    @NotBlank(message = "First name is required")
    private String firstName;

    @JsonProperty("last_name")
    @NotBlank(message = "Last name is required")
    private String lastName;

    @Pattern(regexp = "^(male|female|other)$",
            message = "Gender must be male or female or other")
    private String gender;

    @JsonProperty("date_of_birth")
    private Date dateOfBirth;

    private String address;

    private String avatar;

    private String description;

    @JsonProperty("ip_address")
    @NotBlank(message = "IP address is required")
    @Pattern(regexp = "^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$",
            message = "Invalid IP address")
    private String ipAddress;

    @JsonProperty("role_id")
    @NotNull(message = "Role ID is required")
    private final Set<UserRole> userRoles = new HashSet<>();
}
