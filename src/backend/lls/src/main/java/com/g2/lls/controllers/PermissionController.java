package com.g2.lls.controllers;

import com.g2.lls.domains.Permission;
import com.g2.lls.dtos.response.ApiResponse;
import com.g2.lls.dtos.response.PaginationDTO;
import com.g2.lls.services.PermissionService;
import com.g2.lls.utils.TimeUtil;
import com.g2.lls.utils.exception.DataAlreadyExistsException;
import com.g2.lls.utils.exception.DataNotFoundException;
import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("${api.v1}/permissions")
@RequiredArgsConstructor
public class PermissionController {
    private final PermissionService permissionService;

    @PostMapping
    public ResponseEntity<ApiResponse<Permission>> create(
            @Valid @RequestBody Permission permission) throws Exception {
        if (permissionService.isPermissionExist(permission)) {
            throw new DataAlreadyExistsException("Permission already exists");
        }

        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.CREATED.value(), true,
                permissionService.create(permission), TimeUtil.getTime()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Permission>> update(
            @PathVariable("id") Long id,
            @Valid @RequestBody Permission permission) throws Exception {
        Permission existingPermission = permissionService.fetchById(id);

        if (permissionService.isPermissionExist(existingPermission)) {
            if (permissionService.isSameName(existingPermission)) {
                throw new DataAlreadyExistsException("Permission already exists");
            }
        }

        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                permissionService.update(permission), TimeUtil.getTime()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> delete(@PathVariable("id") Long id) throws DataNotFoundException {
        permissionService.delete(permissionService.fetchById(id).getId());

        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                "Permission deleted", TimeUtil.getTime()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PaginationDTO>> getPermissions(
            @Filter Specification<Permission> spec, Pageable pageable) {

        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                permissionService.getPermissions(spec, pageable), TimeUtil.getTime()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Permission>> getPermission(@PathVariable("id") Long id) throws DataNotFoundException {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true,
                permissionService.fetchById(id), TimeUtil.getTime()));
    } 
    
}
