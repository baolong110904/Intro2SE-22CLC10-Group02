package com.g2.lls.repositories;

import com.g2.lls.domains.Role;
import com.g2.lls.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>,
        JpaSpecificationExecutor<Role> {
    Boolean existsByName(RoleType name);

    Role findByName(RoleType name);
}
