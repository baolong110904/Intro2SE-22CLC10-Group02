package com.g2.lls.services.impl;

import com.g2.lls.domains.Permission;
import com.g2.lls.domains.Role;
import com.g2.lls.dtos.response.PaginationDTO;
import com.g2.lls.enums.RoleType;
import com.g2.lls.repositories.PermissionRepository;
import com.g2.lls.repositories.RoleRepository;
import com.g2.lls.services.RoleService;
import com.g2.lls.utils.exception.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    @Override
    public Boolean existByName(String name) {
        return roleRepository.existsByName(RoleType.valueOf(name));
    }

    @Override
    public Role create(Role role) {
        if (role.getPermissions() != null) {
            List<Long> reqPermissions = role.getPermissions()
                    .stream().map(Permission::getId)
                    .collect(Collectors.toList());

            List<Permission> dbPermissions = permissionRepository.findByIdIn(reqPermissions);
            role.setPermissions(dbPermissions);
        }

        return roleRepository.save(role);
    }

    @Override
    public Role fetchById(Long id) throws DataNotFoundException {
        return roleRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Role not found"));
    }

    @Override
    public Role update(Role role) throws DataNotFoundException {
        Role roleDB = fetchById(role.getId());

        if (role.getPermissions() != null) {
            List<Long> reqPermissions = role.getPermissions()
                    .stream().map(Permission::getId)
                    .collect(Collectors.toList());

            List<Permission> dbPermissions = permissionRepository.findByIdIn(reqPermissions);
            role.setPermissions(dbPermissions);
        }

        roleDB.setName(role.getName());
        roleDB.setDescription(role.getDescription());
        roleDB.setPermissions(role.getPermissions());
        roleDB = roleRepository.save(roleDB);
        return roleDB;
    }

    @Override
    public void delete(Long id) {
        roleRepository.deleteById(id);
    }

    @Override
    public PaginationDTO getRoles(Specification<Role> spec, Pageable pageable) {
        Page<Role> pRole = roleRepository.findAll(spec, pageable);
        PaginationDTO rs = new PaginationDTO();
        PaginationDTO.Meta mt = new PaginationDTO.Meta();

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());

        mt.setPages(pRole.getTotalPages());
        mt.setTotal(pRole.getTotalElements());

        rs.setMeta(mt);
        rs.setResult(pRole.getContent());
        return rs;
    }
}
