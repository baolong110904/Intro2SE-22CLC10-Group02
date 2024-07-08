package com.g2.lls.domains;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.g2.lls.enums.GenderType;
import com.g2.lls.utils.TimeUtil;
import com.g2.lls.utils.security.SecurityUtil;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "first_name")
    @Nationalized
    private String firstName;

    @Column(name = "last_name")
    @Nationalized
    private String lastName;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    private GenderType gender;

    @ManyToOne
    @JoinColumn(name = "avatar_id")
    private Avatar avatar;

    @Column(columnDefinition = "TEXT")
    @Nationalized
    private String description;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    private Set<Role> roles;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Address> address = new HashSet<>();

    @Column(name = "refresh_token", columnDefinition = "MEDIUMTEXT")
    private String refreshToken;

    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    private Instant createdAt;

    @Column(name = "updated_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    private Instant updatedAt;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "updated_by")
    private String updatedBy;

    @PostPersist
    public void handlePostPersist() {
        this.createdAt = TimeUtil.getTime();
        this.createdBy = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
    }

    @PreUpdate
    public void handlePreUpdate() {
        this.updatedAt = TimeUtil.getTime();
        this.updatedBy = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
    }

    @Column(name = "is_mfa_enabled", columnDefinition = "BIT(1) DEFAULT FALSE")
    private Boolean isMfaEnabled;

    private String secret;

    @Column(name = "is_enabled", columnDefinition = "BIT(1) DEFAULT FALSE")
    private Boolean isEnabled;

    public String getFullName() {
        return this.firstName + " " + this.lastName;
    }
}
