package com.g2.lls.services;

import com.g2.lls.domains.Role;
import com.g2.lls.dtos.response.PaginationDTO;
import com.g2.lls.utils.exception.DataNotFoundException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface RoleService {
    Boolean existByName(String name);

    Role create(Role role);

    Role fetchById(Long id) throws DataNotFoundException;

    Role update(Role role) throws DataNotFoundException;

    void delete(Long id);

    PaginationDTO getRoles(Specification<Role> spec, Pageable pageable);
}
