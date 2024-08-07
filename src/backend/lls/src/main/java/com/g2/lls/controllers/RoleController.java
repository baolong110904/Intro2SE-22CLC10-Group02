package com.g2.lls.controllers;

import com.g2.lls.domains.Role;
import com.g2.lls.dtos.response.ApiResponse;
import com.g2.lls.dtos.response.PaginationDTO;
import com.g2.lls.enums.RoleType;
import com.g2.lls.services.RoleService;
import com.g2.lls.services.UserService;
import com.g2.lls.utils.CustomHeaders;
import com.g2.lls.utils.TimeUtil;
import com.g2.lls.utils.exception.DataNotFoundException;
import com.turkraft.springfilter.boot.Filter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Role",
        description = "REST APIs for Role"
)
@RestController
@RequestMapping("${api.v1}/roles")
@RequiredArgsConstructor
public class RoleController {
    private final UserService userService;
    private final RoleService roleService;

    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<RoleType>> verifyRole(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(200, true,
                userService.verifyRole(email), TimeUtil.getTime()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Role>> create(@RequestBody Role role) throws DataNotFoundException {
        if (roleService.existByName(String.valueOf(role.getName()))) {
            throw new DataNotFoundException("Role already exists");
        }
        return ResponseEntity.ok(new ApiResponse<>(200, true,
                roleService.create(role), TimeUtil.getTime()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Role>> update(
        @PathVariable("id") Long id,
        @RequestBody Role role) throws DataNotFoundException {

        return ResponseEntity.ok(new ApiResponse<>(200, true,
                roleService.update(role), TimeUtil.getTime()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> delete(@PathVariable("id") Long id) throws DataNotFoundException {
        Role existingRole = roleService.fetchById(id);
        roleService.delete(existingRole.getId());

        return ResponseEntity.ok(new ApiResponse<>(200, true,
                "Role deleted successfully", TimeUtil.getTime()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PaginationDTO>> getPermissions(
            @Filter Specification<Role> spec, Pageable pageable) {

        return ResponseEntity.ok(new ApiResponse<>(200, true,
                roleService.getRoles(spec, pageable), TimeUtil.getTime()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Role>> getById(@PathVariable("id") Long id) throws DataNotFoundException {
        Role role = roleService.fetchById(id);

        return ResponseEntity.ok(new ApiResponse<>(200, true,
                role, TimeUtil.getTime()));
    }
}
