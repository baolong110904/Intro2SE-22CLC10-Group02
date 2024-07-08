package com.g2.lls.domains;

import com.g2.lls.utils.AppUtil;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.time.Instant;

@Entity
@Table(name = "reset_password_tokens")
@Data
@NoArgsConstructor
@Slf4j
public class ResetPasswordToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @Column(name = "expiration_date")
    private Instant expirationDate;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public ResetPasswordToken(String token, User user) {
        this.token = token;
        this.user = user;
        Instant now = Instant.now();
        this.expirationDate = now.plusSeconds(AppUtil.EXPIRATION_SECONDS);
    }

    public Boolean isExpired() {
        return this.expirationDate.isBefore(Instant.now());
    }
}
