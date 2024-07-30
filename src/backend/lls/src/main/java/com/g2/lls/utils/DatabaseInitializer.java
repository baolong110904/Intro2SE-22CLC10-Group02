package com.g2.lls.utils;

import com.g2.lls.domains.Avatar;
import com.g2.lls.domains.Permission;
import com.g2.lls.domains.Role;
import com.g2.lls.domains.User;
import com.g2.lls.enums.GenderType;
import com.g2.lls.enums.RoleType;
import com.g2.lls.repositories.AvatarRepository;
import com.g2.lls.repositories.PermissionRepository;
import com.g2.lls.repositories.RoleRepository;
import com.g2.lls.repositories.UserRepository;
import com.google.common.collect.Maps;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.*;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DatabaseInitializer implements CommandLineRunner {
    @Value("${api.v1}")
    private String apiPrefix;

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final AvatarRepository avatarRepository;
    private final PasswordEncoder passwordEncoder;
    private final PermissionRepository permissionRepository;

    @Override
    @Transactional
    public void run(String... args) {
        log.info("Initializing database...");
        long roleCount = roleRepository.count();
        long userCount = userRepository.count();
        long avatarCount = avatarRepository.count();
        long permissionCount = permissionRepository.count();

        if (roleCount > 0 && userCount > 0 && avatarCount > 0 && permissionCount > 0) {
            log.info("Database is already initialized.");
            return;
        }

        Avatar avatar = Avatar.builder()
                .publicId("g2/avatar/default")
                .imageUrl("https://res.cloudinary.com/ds9macgdo/image/upload/v1719592662/g2/avatar/default.png")
                .build();
        if (avatarCount == 0) {
            log.info("Initializing avatars...");
            avatarRepository.saveAndFlush(avatar);
        }

        HashMap<String, HashMap<String, Permission>> permissions = Maps.newHashMap();
        if (permissionCount == 0) {
            log.info("Initializing permissions...");

            // User permissions
            permissions.put("User", new HashMap<>(Map.of(
                    "Create a user", new Permission("Create a user", String.format("/%s/users", apiPrefix),
                            "POST", "User"),
                    "Get all Users", new Permission("Get all users", String.format("/%s/users", apiPrefix),
                            "GET", "User"),
                    "Get a user", new Permission("Get a user", String.format("/%s/users/profile", apiPrefix),
                            "GET", "User"),
                    "Update a user", new Permission("Update a user", String.format("/%s/users/{id}", apiPrefix),
                            "PUT", "User"),
                    "Delete a user", new Permission("Delete a user", String.format("/%s/users/{id}", apiPrefix),
                            "DELETE", "User"),
                    "Upload avatar", new Permission("Upload avatar", String.format("/%s/users/uploads/avatar", apiPrefix),
                            "POST", "User")
            )));

            // Auth permissions
            permissions.put("Auth", new HashMap<>(Map.of(
                    "Forgot password", new Permission("Forgot password", String.format("/%s/auth/forgot-password", apiPrefix),
                            "POST", "Auth"),
                    "Login", new Permission("Login", String.format("/%s/auth/login", apiPrefix),
                            "POST", "Auth"),
                    "Logout", new Permission("Logout", String.format("/%s/auth/logout", apiPrefix),
                            "POST", "Auth"),
                    "Refresh token", new Permission("Refresh token", String.format("/%s/auth/refresh", apiPrefix),
                            "POST", "Auth"),
                    "Register", new Permission("Register", String.format("/%s/auth/register", apiPrefix),
                            "POST", "Auth"),
                    "Reset password", new Permission("Reset password", String.format("/%s/auth/reset-password", apiPrefix),
                            "POST", "Auth")
            )));

            // Role permissions
            permissions.put("Role", new HashMap<>(Map.of(
                    "Create a role", new Permission("Create a role", String.format("/%s/roles", apiPrefix),
                            "POST", "Role"),
                    "Get all roles", new Permission("Get all roles", String.format("/%s/roles", apiPrefix),
                            "GET", "Role"),
                    "Get a role", new Permission("Get a role", String.format("/%s/roles/{id}", apiPrefix),
                            "GET", "Role"),
                    "Update a role", new Permission("Update a role", String.format("/%s/roles", apiPrefix),
                            "PUT", "Role"),
                    "Delete a role", new Permission("Delete a role", String.format("/%s/roles", apiPrefix),
                            "DELETE", "Role"),
                    "Verify a role", new Permission("Verify a role", String.format("/%s/roles/verify", apiPrefix),
                            "POST", "Role")
            )));

            // VNPay permissions
            permissions.put("VNPay", new HashMap<>(Map.of(
                    "Create a VNPay", new Permission("Create a VNPay", String.format("/%s/payments/vn-pay", apiPrefix),
                            "GET", "VNPay"),
                    "Callback", new Permission("Callback", String.format("/%s/payments/vn-pay/callback", apiPrefix),
                            "GET", "VNPay")
            )));

            permissions.values().forEach(permissionMap -> permissionRepository.saveAllAndFlush(permissionMap.values()));
        }

        // Get Permissions with User -> Create a user
//        Permission createUserPermission = permissions.get("User").get("Create a user");
//        log.info("Create User Permission: {}", createUserPermission);

        if (roleCount == 0) {
            log.info("Initializing roles...");

            // admin -> all permissions
            List<Permission> authPermissions = permissionRepository.findByModule("Auth");
            List<Permission> userPermissions = permissionRepository.findByModule("User");
            List<Permission> rolePermissions = permissionRepository.findByModule("Role");
            List<Permission> vnPayPermissions = permissionRepository.findByModule("VNPay");

            List<Permission> adminPermissions = permissionRepository.findAll();

            Role roleAdmin = Role.builder()
                    .name(RoleType.ADMIN)
                    .permissions(adminPermissions)
                    .build();

            List<Permission> studentPermissions = new ArrayList<>(authPermissions);
            studentPermissions.add(permissions.get("User").get("Get a user"));
            studentPermissions.add(permissions.get("User").get("Update a user"));
            studentPermissions.add(permissions.get("Role").get("Verify a role"));
            studentPermissions.addAll(vnPayPermissions);
            Role roleStudent = Role.builder()
                    .name(RoleType.STUDENT)
                    .permissions(studentPermissions)
                    .build();

            List<Permission> teacherPermissions = new ArrayList<>(authPermissions);
            teacherPermissions.add(permissions.get("User").get("Get a user"));
            teacherPermissions.add(permissions.get("User").get("Update a user"));
            teacherPermissions.add(permissions.get("Role").get("Verify a role"));
            teacherPermissions.addAll(vnPayPermissions);
            Role roleTeacher = Role.builder()
                    .name(RoleType.TEACHER)
                    .permissions(teacherPermissions)
                    .build();

            roleRepository.saveAndFlush(roleAdmin);
            roleRepository.saveAndFlush(roleStudent);
            roleRepository.saveAndFlush(roleTeacher);
        }

        if (userCount == 0) {
            log.info("Initializing users...");

            Role role = roleRepository.findByName(RoleType.ADMIN);
            Set<Role> roles = new HashSet<>(Set.of(role));

            User admin1 = User.builder()
                    .email("admin1@gmail.com")
                    .password(passwordEncoder.encode("admin1"))
                    .username("admin1")
                    .gender(GenderType.Male)
                    .roles(roles)
                    .isEnabled(true)
                    .isMfaEnabled(false)
                    .dateOfBirth(LocalDate.parse("2004-05-16"))
                    .firstName("Nam")
                    .lastName("Nguyen")
                    .description("Admin Account")
                    .avatar(avatar)
                    .build();

            userRepository.saveAndFlush(admin1);

            User admin2 = User.builder()
                    .email("admin2@gmail.com")
                    .password(passwordEncoder.encode("admin2"))
                    .username("admin2")
                    .gender(GenderType.Male)
                    .roles(roles)
                    .isEnabled(true)
                    .isMfaEnabled(false)
                    .dateOfBirth(LocalDate.parse("2004-05-16"))
                    .firstName("Nam")
                    .lastName("Nguyen")
                    .description("Admin Account")
                    .avatar(avatar)
                    .build();

            userRepository.saveAndFlush(admin2);

            User teacher1 = User.builder()
                    .email("teacher1@gmail.com")
                    .password(passwordEncoder.encode("teacher1"))
                    .username("teacher")
                    .gender(GenderType.Female)
                    .roles(new HashSet<>(Set.of(roleRepository.findByName(RoleType.TEACHER))))
                    .isEnabled(true)
                    .isMfaEnabled(false)
                    .dateOfBirth(LocalDate.parse("2004-05-16"))
                    .firstName("Nam")
                    .lastName("Nguyen")
                    .description("Teacher Account")
                    .avatar(avatar)
                    .build();

            userRepository.saveAndFlush(teacher1);

            User teacher2 = User.builder()
                    .email("teacher2@gmail.com")
                    .password(passwordEncoder.encode("teacher2"))
                    .username("teacher2")
                    .gender(GenderType.Male)
                    .roles(new HashSet<>(Set.of(roleRepository.findByName(RoleType.TEACHER))))
                    .isEnabled(true)
                    .isMfaEnabled(false)
                    .dateOfBirth(LocalDate.parse("2004-05-16"))
                    .firstName("Nam")
                    .lastName("Nguyen")
                    .description("Teacher Account")
                    .avatar(avatar)
                    .build();

            userRepository.saveAndFlush(teacher2);

            User student1 = User.builder()
                    .email("student1@gmail.com")
                    .password(passwordEncoder.encode("student1"))
                    .username("student1")
                    .gender(GenderType.Female)
                    .roles(new HashSet<>(Set.of(roleRepository.findByName(RoleType.STUDENT))))
                    .isEnabled(true)
                    .isMfaEnabled(false)
                    .dateOfBirth(LocalDate.parse("2004-05-16"))
                    .firstName("Nam")
                    .lastName("Nguyen")
                    .description("Student Account")
                    .avatar(avatar)
                    .build();

            userRepository.saveAndFlush(student1);

            User student2 = User.builder()
                    .email("student2@gmail.com")
                    .password(passwordEncoder.encode("student2"))
                    .username("student2")
                    .gender(GenderType.Male)
                    .roles(new HashSet<>(Set.of(roleRepository.findByName(RoleType.STUDENT))))
                    .isEnabled(true)
                    .isMfaEnabled(false)
                    .dateOfBirth(LocalDate.parse("2004-05-16"))
                    .firstName("Nam")
                    .lastName("Nguyen")
                    .description("Student Account")
                    .avatar(avatar)
                    .build();

            userRepository.saveAndFlush(student2);
        }
    }
}
