package com.g2.lls.services;

import com.g2.lls.domains.Permission;
import com.g2.lls.dtos.response.PaginationDTO;
import com.g2.lls.utils.exception.DataNotFoundException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface PermissionService {
    Boolean isPermissionExist(Permission permission);

    Permission fetchById(Long id) throws DataNotFoundException;

    Permission create(Permission permission);

    Permission update(Permission permission) throws DataNotFoundException;

    void delete(Long id) throws DataNotFoundException;

    PaginationDTO getPermissions(Specification<Permission> spec, Pageable pageable);

    boolean isSameName(Permission permission) throws DataNotFoundException;
}
