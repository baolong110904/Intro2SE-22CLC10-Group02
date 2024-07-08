package com.g2.lls.domains;

import com.g2.lls.utils.AppUtil;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "verification_tokens")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VerificationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @Column(name = "expiration_date")
    private Instant expirationDate;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public VerificationToken(String token, User user) {
        this.token = token;
        this.user = user;
        Instant now = Instant.now();
        this.expirationDate = now.plusSeconds(AppUtil.EXPIRATION_SECONDS);
    }

    public Boolean isExpired() {
        return this.expirationDate.isBefore(Instant.now());
    }
}
