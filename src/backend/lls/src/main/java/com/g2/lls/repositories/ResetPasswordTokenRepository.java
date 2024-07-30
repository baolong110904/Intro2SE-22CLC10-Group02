package com.g2.lls.repositories;

import com.g2.lls.domains.ResetPasswordToken;
import com.g2.lls.domains.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResetPasswordTokenRepository extends JpaRepository<ResetPasswordToken, Long>,
        JpaSpecificationExecutor<ResetPasswordToken> {
    Optional<ResetPasswordToken> findByToken(String token);

    Optional<ResetPasswordToken> findByUser(User user);
}
