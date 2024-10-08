package com.g2.lls.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.g2.lls.domains.Role;
import com.g2.lls.dtos.AddressDTO;
import com.g2.lls.enums.GenderType;
import lombok.*;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private Long id;

    private String email;

    private String username;

    private String password;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("date_of_birth")
    private LocalDate dateOfBirth;

    private GenderType gender;

    private String description;

    private AddressDTO address;

    private String avatar;

    @JsonProperty("is_mfa_enabled")
    private Boolean isMfaEnabled;

    private String secret;

    @JsonProperty("created_at")
    private Instant createdAt;

    @JsonProperty("created_by")
    private String createdBy;

    @JsonProperty("updated_at")
    private Instant updatedAt;  

    @JsonProperty("updated_by")
    private String updatedBy;

    private Boolean isEnabled;

    private Set<Role> role;

    // private List<String> roleType;
}
