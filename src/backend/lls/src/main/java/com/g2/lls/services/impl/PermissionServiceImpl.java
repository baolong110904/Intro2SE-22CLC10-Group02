package com.g2.lls.services.impl;

import com.g2.lls.domains.Permission;
import com.g2.lls.domains.User;
import com.g2.lls.dtos.response.PaginationDTO;
import com.g2.lls.repositories.PermissionRepository;
import com.g2.lls.repositories.UserRepository;
import com.g2.lls.services.PermissionService;
import com.g2.lls.utils.exception.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PermissionServiceImpl implements PermissionService {
    private final PermissionRepository permissionRepository;

    @Override
    public Boolean isPermissionExist(Permission permission) {
        return permissionRepository.existsByModuleAndApiPathAndMethod(
                permission.getModule(),
                permission.getApiPath(),
                permission.getMethod());
    }

    @Override
    public Permission fetchById(Long id) throws DataNotFoundException {
        Optional<Permission> permissionOptional = permissionRepository.findById(id);
        if (permissionOptional.isEmpty()) {
            throw new DataNotFoundException("Permission with id " + id + " not found");
        }
        return permissionOptional.get();
    }

    @Override
    public Permission create(Permission permission) {
        return permissionRepository.save(permission);
    }

    @Override
    public Permission update(Permission permission) throws DataNotFoundException {
        Permission permissionDB = fetchById(permission.getId());
        if (permissionDB != null) {
            permissionDB.setName(permission.getName());
            permissionDB.setApiPath(permission.getApiPath());
            permissionDB.setMethod(permission.getMethod());
            permissionDB.setModule(permission.getModule());

            permissionDB = permissionRepository.save(permissionDB);
            return permissionDB;
        }
        return null;
    }

    @Override
    public void delete(Long id) throws DataNotFoundException {
        Permission currentPermission = fetchById(id);
        currentPermission.getRoles().forEach(role -> role.getPermissions().remove(currentPermission));

        permissionRepository.delete(currentPermission);
    }

    @Override
    public PaginationDTO getPermissions(Specification<Permission> spec, Pageable pageable) {
        Page<Permission> pPermissions = permissionRepository.findAll(spec, pageable);
        PaginationDTO rs = new PaginationDTO();
        PaginationDTO.Meta mt = new PaginationDTO.Meta();

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());

        mt.setPages(pPermissions.getTotalPages());
        mt.setTotal(pPermissions.getTotalElements());

        rs.setMeta(mt);
        rs.setResult(pPermissions.getContent());
        return rs;
    }

    @Override
    public boolean isSameName(Permission permission) throws DataNotFoundException {
        Permission permissionDB = fetchById(permission.getId());
        if (permissionDB != null) {
            return permissionDB.getName().equals(permission.getName());
        }
        return false;
    }
}
