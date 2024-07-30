package com.g2.lls.repositories;

import com.g2.lls.domains.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AvatarRepository extends JpaRepository<Avatar, Long>,
        JpaSpecificationExecutor<Avatar> {
    Optional<Avatar> findByUserId(Long userId);
}
