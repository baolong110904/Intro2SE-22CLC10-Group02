package com.g2.lls.utils;

import com.g2.lls.domains.*;
import com.g2.lls.enums.GenderType;
import com.g2.lls.enums.RoleType;
import com.g2.lls.repositories.*;
import com.github.javafaker.Faker;
import com.google.common.collect.Maps;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.time.LocalDate;
import java.util.*;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DatabaseInitializer implements CommandLineRunner {
    @Value("${api.v1}")
    private String apiPrefix;

    @Qualifier("fakerVN")
    private final Faker faker;

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final AvatarRepository avatarRepository;
    private final PasswordEncoder passwordEncoder;
    private final PermissionRepository permissionRepository;
    private final CourseRepository courseRepository;
    private final ThumbnailRepository thumbnailRepository;
    private final MaterialRepository materialRepository;

    @Override
    @Transactional
    public void run(String... args) {
        log.info("Initializing database...");
        long roleCount = roleRepository.count();
        long userCount = userRepository.count();
        long avatarCount = avatarRepository.count();
        long thumbnailCount = thumbnailRepository.count();
        long permissionCount = permissionRepository.count();

        if (roleCount > 0 && userCount > 0 && avatarCount > 0 && permissionCount > 0 && thumbnailCount > 0) {
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

        Thumbnail thumbnail = Thumbnail.builder()
                .publicId("g2/thumbnails/file_s7rfcb")
                .imageUrl("https://res.cloudinary.com/ds9macgdo/image/upload/v1722965166/g2/thumbnails/file_s7rfcb.webp")
                .build();

        if (thumbnailCount == 0) {
            log.info("Initializing thumbnails...");
            thumbnailRepository.saveAndFlush(thumbnail);
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
                    "Get a user", new Permission("Get a user", String.format("/%s/users/{id}", apiPrefix),
                            "GET", "User"),
                    "Get profile", new Permission("Get profile", String.format("/%s/users/profile", apiPrefix),
                            "GET", "User"),
                    "Update address", new Permission("Update address", String.format("/%s/users/address", apiPrefix),
                            "PUT", "User"),
                    "Update a user", new Permission("Update a user", String.format("/%s/users/{id}", apiPrefix),
                            "PUT", "User"),
                    "Update profile", new Permission("Update profile", String.format("/%s/users/profile", apiPrefix),
                            "PUT", "User"),
                    "Delete a user", new Permission("Delete a user", String.format("/%s/users/{id}", apiPrefix),
                            "DELETE", "User"),
                    "Upload avatar", new Permission("Upload avatar", String.format("/%s/users/uploads/avatar", apiPrefix),
                            "POST", "User"),
                    "Get avatar", new Permission("Get avatar", String.format("/%s/users/avatar", apiPrefix),
                            "GET", "User")
            )));

            // Role permissions
            permissions.put("Role", new HashMap<>(Map.of(
                    "Create a role", new Permission("Create a role", String.format("/%s/roles", apiPrefix),
                            "POST", "Role"),
                    "Update a role", new Permission("Update a role", String.format("/%s/roles/{id}", apiPrefix),
                            "PUT", "Role"),
                    "Delete a role", new Permission("Delete a role", String.format("/%s/roles/{id}", apiPrefix),
                            "DELETE", "Role"),
                    "Verify a role", new Permission("Verify a role", String.format("/%s/roles/verify", apiPrefix),
                            "POST", "Role"),
                    "Get all roles", new Permission("Get all roles", String.format("/%s/roles", apiPrefix),
                            "GET", "Role"),
                    "Get a role", new Permission("Get a role", String.format("/%s/roles/{id}", apiPrefix),
                            "GET", "Role")
            )));

            // Permission permissions
            permissions.put("Permission", new HashMap<>(Map.of(
                    "Create a permission", new Permission("Create a permission", String.format("/%s/permissions", apiPrefix),
                            "POST", "Permission"),
                    "Update a permission", new Permission("Update a permission", String.format("/%s/permissions/{id}", apiPrefix),
                            "PUT", "Permission"),
                    "Delete a permission", new Permission("Delete a permission", String.format("/%s/permissions/{id}", apiPrefix),
                            "DELETE", "Permission"),
                    "Get all permissions", new Permission("Get all permissions", String.format("/%s/permissions", apiPrefix),
                            "GET", "Permission"),
                    "Get a permission", new Permission("Get a permission", String.format("/%s/permissions/{id}", apiPrefix),
                            "GET", "Permission")
            )));

            // VNPay permissions
            permissions.put("VNPay", new HashMap<>(Map.of(
                    "Create a VNPay", new Permission("Create a VNPay", String.format("/%s/payments/vn-pay", apiPrefix),
                            "GET", "VNPay"),
                    "Callback", new Permission("Callback", String.format("/%s/payments/vn-pay/callback", apiPrefix),
                            "GET", "VNPay")
            )));

            // VideoSDK permissions
            permissions.put("VideoSDK", new HashMap<>(Map.of(
                    "Get token", new Permission("Get token", String.format("/%s/video-sdk/token", apiPrefix),
                            "GET", "VideoSDK")
            )));

            // Course permissions
            permissions.put("Course", new HashMap<>(Map.ofEntries(
                    Map.entry("Create a course", new Permission("Create a course", String.format("/%s/courses", apiPrefix),
                            "POST", "Course")),
                    Map.entry("Get course's details", new Permission("Get course's details", String.format("/%s/courses/{id}", apiPrefix),
                            "GET", "Course")),
                    Map.entry("Update a course", new Permission("Update a course", String.format("/%s/courses/{id}", apiPrefix),
                            "PUT", "Course")),
                    Map.entry("Delete a course", new Permission("Delete a course", String.format("/%s/courses/{id}", apiPrefix),
                            "DELETE", "Course")),
                    Map.entry("Remove student from course", new Permission("Remove student from course", String.format("/%s/courses/{courseId}/{studentId}", apiPrefix),
                            "PUT", "Course")),
                    Map.entry("Upload material", new Permission("Upload material", String.format("/%s/courses/uploads/materials", apiPrefix),
                            "POST", "Course")),
                    Map.entry("Update thumbnail", new Permission("Update thumbnail", String.format("/%s/courses/{id}/uploads/thumbnail", apiPrefix),
                            "POST", "Course")),
                    Map.entry("Get User's courses", new Permission("Get User's courses", String.format("/%s/courses", apiPrefix),
                            "GET", "Course")),
                    Map.entry("Get all courses", new Permission("Get all courses", String.format("/%s/courses/all", apiPrefix),
                            "POST", "Course")),
                    Map.entry("Get materials", new Permission("Get materials", String.format("/%s/courses/{courseId}/materials", apiPrefix),
                            "GET", "Course")),
                    Map.entry("Get participants", new Permission("Get participants", String.format("/%s/courses/{courseId}/participants", apiPrefix),
                            "GET", "Course"))
            )));

            // Cart permissions
            permissions.put("Cart", new HashMap<>(Map.of(
                    "Get Courses From Cart", new Permission("Get Courses From Cart", String.format("/%s/cart/all", apiPrefix),
                            "GET", "Cart"),
                    "Add Courses To Cart", new Permission("Add Courses To Cart", String.format("/%s/cart", apiPrefix),
                            "POST", "Cart"),
                    "Remove Courses From Cart", new Permission("Remove Courses From Cart", String.format("/%s/cart/{id}", apiPrefix),
                            "DELETE", "Cart")
            )));

            //Post permissions
            permissions.put("Post", new HashMap<>(Map.of(
                    "Get All Posts", new Permission("Get All Posts", String.format("/%s/posts/{courseId}", apiPrefix),
                            "GET", "Post"),
                    "Get All Comments", new Permission("Get All Comments", String.format("/%s/posts/{postId}/comments", apiPrefix),
                            "GET", "Post"),
                    "Create Post", new Permission("Create Post", String.format("/%s/posts", apiPrefix),
                            "POST", "Post"),
                    "Create Comment", new Permission("Create Comment", String.format("/%s/posts/{postId}/comments", apiPrefix),
                            "POST", "Post"),
                    "Delete Post", new Permission("Delete Post", String.format("/%s/posts/{postId}", apiPrefix),
                            "DELETE", "Post"),
                    "Delete Comment", new Permission("Delete Comment", String.format("/%s/posts/comments/{commentId}", apiPrefix),
                            "DELETE", "Post")

            )));

            permissions.values().forEach(permissionMap -> permissionRepository.saveAllAndFlush(permissionMap.values()));
        }

        if (roleCount == 0) {
            log.info("Initializing roles...");

            // admin -> all permissions
            List<Permission> userPermissions = permissionRepository.findByModule("User");
            List<Permission> rolePermissions = permissionRepository.findByModule("Role");
            List<Permission> vnPayPermissions = permissionRepository.findByModule("VNPay");
            List<Permission> videoSDKPermissions = permissionRepository.findByModule("VideoSDK");
            List<Permission> coursePermissions = permissionRepository.findByModule("Course");
            List<Permission> cartPermissions = permissionRepository.findByModule("Cart");
            List<Permission> postPermissions = permissionRepository.findByModule("Post");

            List<Permission> adminPermissions = permissionRepository.findAll();

            Role roleAdmin = Role.builder()
                    .name(RoleType.ADMIN)
                    .permissions(adminPermissions)
                    .build();

            List<Permission> studentPermissions = new ArrayList<>();
            studentPermissions.add(permissions.get("User").get("Get a user"));
            studentPermissions.add(permissions.get("User").get("Get profile"));
            studentPermissions.add(permissions.get("User").get("Upload avatar"));
            studentPermissions.add(permissions.get("User").get("Get avatar"));
            studentPermissions.add(permissions.get("User").get("Update address"));
            studentPermissions.add(permissions.get("User").get("Update profile"));
            studentPermissions.add(permissions.get("Role").get("Verify a role"));
            studentPermissions.add(permissions.get("Course").get("Get a course"));
            studentPermissions.add(permissions.get("Course").get("Get course's details"));
            studentPermissions.add(permissions.get("Course").get("Get User's courses"));
            studentPermissions.add(permissions.get("Course").get("Get all courses"));
            studentPermissions.add(permissions.get("Course").get("Get materials"));
            studentPermissions.add(permissions.get("Course").get("Get participants"));
            studentPermissions.addAll(postPermissions);
            studentPermissions.addAll(vnPayPermissions);
            studentPermissions.addAll(cartPermissions);
            studentPermissions.addAll(videoSDKPermissions);
            Role roleStudent = Role.builder()
                    .name(RoleType.STUDENT)
                    .permissions(studentPermissions)
                    .build();

            List<Permission> teacherPermissions = new ArrayList<>();
            teacherPermissions.add(permissions.get("User").get("Get a user"));
            teacherPermissions.add(permissions.get("User").get("Get profile"));
            teacherPermissions.add(permissions.get("User").get("Upload avatar"));
            teacherPermissions.add(permissions.get("User").get("Get avatar"));
            teacherPermissions.add(permissions.get("User").get("Update address"));
            teacherPermissions.add(permissions.get("User").get("Update profile"));
            teacherPermissions.add(permissions.get("Role").get("Verify a role"));
            teacherPermissions.addAll(postPermissions);
            teacherPermissions.addAll(coursePermissions);
            teacherPermissions.addAll(vnPayPermissions);
            teacherPermissions.addAll(videoSDKPermissions);
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

            Address address1 = Address.builder()
                    .phoneNumber("0923820719")
                    .country("Vietnam")
                    .city("Hồ Chí Minh")
                    .province("")
                    .district("Quận 10")
                    .ward("Phường 7")
                    .address("497 Hòa Hảo")
                    .addressType("Home")
                    .isDefault(false)
                    .createdAt(Instant.now())
                    .updatedAt(Instant.now())
                    .build();
            addressRepository.saveAndFlush(address1);
            Avatar avatarAdmin1 = Avatar.builder()
                    .publicId("g2/avatar/admin1")
                    .imageUrl("https://res.cloudinary.com/ds9macgdo/image/upload/v1719592662/g2/avatar/default.png")
                    .userId(1L)
                    .build();
            avatarRepository.saveAndFlush(avatarAdmin1);

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
                    .lastName("Nguyễn")
                    .description("Admin Account")
                    .avatar(avatarAdmin1)
                    .address(address1)
                    .build();
            userRepository.saveAndFlush(admin1);
            address1.setUser(admin1);
            addressRepository.saveAndFlush(address1);

            Address address2 = Address.builder()
                    .phoneNumber("0123456789")
                    .country("Vietnam")
                    .city("Vũng Tàu")
                    .province("Bà Rịa - Vũng Tàu")
                    .district("")
                    .ward("Phường 10")
                    .address("30 Quang Dũng")
                    .addressType("Home")
                    .isDefault(false)
                    .createdAt(Instant.now())
                    .updatedAt(Instant.now())
                    .build();
            addressRepository.saveAndFlush(address2);
            Avatar avatarAdmin2 = Avatar.builder()
                    .publicId("g2/avatar/admin2")
                    .imageUrl("https://res.cloudinary.com/ds9macgdo/image/upload/v1719592662/g2/avatar/default.png")
                    .userId(2L)
                    .build();
            avatarRepository.saveAndFlush(avatarAdmin2);

            User admin2 = User.builder()
                    .email("admin2@gmail.com")
                    .password(passwordEncoder.encode("admin2"))
                    .username("admin2")
                    .gender(GenderType.Male)
                    .roles(roles)
                    .isEnabled(true)
                    .isMfaEnabled(false)
                    .dateOfBirth(LocalDate.parse("2004-05-16"))
                    .firstName("Huy")
                    .lastName("Đỗ")
                    .description("Admin Account")
                    .avatar(avatarAdmin2)
                    .address(address2)
                    .build();
            userRepository.saveAndFlush(admin2);
            address2.setUser(admin2);
            addressRepository.saveAndFlush(address2);

            Address address3 = Address.builder()
                    .phoneNumber(faker.phoneNumber().phoneNumber())
                    .country(faker.country().name())
                    .city(faker.address().city())
                    .province(faker.address().state())
                    .district(faker.address().cityName())
                    .ward(faker.address().streetName())
                    .address(faker.address().fullAddress())
                    .addressType("Work")
                    .isDefault(false)
                    .createdAt(Instant.now())
                    .updatedAt(Instant.now())
                    .build();
            addressRepository.saveAndFlush(address3);
            Avatar avatarTeacher1 = Avatar.builder()
                    .publicId("g2/avatar/teacher1")
                    .imageUrl("https://res.cloudinary.com/ds9macgdo/image/upload/v1719592662/g2/avatar/default.png")
                    .userId(3L)
                    .build();
            avatarRepository.saveAndFlush(avatarTeacher1);

            User teacher1 = User.builder()
                    .email("teacher1@gmail.com")
                    .password(passwordEncoder.encode("teacher1"))
                    .username("teacher1")
                    .gender(GenderType.Female)
                    .roles(new HashSet<>(Set.of(roleRepository.findByName(RoleType.TEACHER))))
                    .isEnabled(true)
                    .isMfaEnabled(false)
                    .dateOfBirth(LocalDate.parse("2004-05-16"))
                    .firstName("Long")
                    .lastName("Nguyễn")
                    .description("Teacher Account")
                    .avatar(avatarTeacher1)
                    .address(address3)
                    .build();
            userRepository.saveAndFlush(teacher1);
            address3.setUser(teacher1);
            addressRepository.saveAndFlush(address3);

            Avatar avatarTeacher2 = Avatar.builder()
                    .publicId("g2/avatar/teacher2")
                    .imageUrl("https://res.cloudinary.com/ds9macgdo/image/upload/v1719592662/g2/avatar/default.png")
                    .userId(4L)
                    .build();
            avatarRepository.saveAndFlush(avatarTeacher2);

            Address address4 = Address.builder()
                    .phoneNumber(faker.phoneNumber().phoneNumber())
                    .country(faker.country().name())
                    .city(faker.address().city())
                    .province(faker.address().state())
                    .district(faker.address().cityName())
                    .ward(faker.address().streetName())
                    .address(faker.address().fullAddress())
                    .addressType("Work")
                    .isDefault(false)
                    .createdAt(Instant.now())
                    .updatedAt(Instant.now())
                    .build();
            addressRepository.saveAndFlush(address4);
            User teacher2 = User.builder()
                    .email("teacher2@gmail.com")
                    .password(passwordEncoder.encode("teacher2"))
                    .username("teacher2")
                    .gender(GenderType.Male)
                    .roles(new HashSet<>(Set.of(roleRepository.findByName(RoleType.TEACHER))))
                    .isEnabled(true)
                    .isMfaEnabled(false)
                    .dateOfBirth(LocalDate.parse("2004-05-16"))
                    .firstName("Quân")
                    .lastName("Bùi")
                    .description("Teacher Account")
                    .avatar(avatarTeacher2)
                    .address(address4)
                    .build();
            userRepository.saveAndFlush(teacher2);
            address4.setUser(teacher2);
            addressRepository.saveAndFlush(address4);

            Address address5 = Address.builder()
                    .phoneNumber(faker.phoneNumber().phoneNumber())
                    .country(faker.country().name())
                    .city(faker.address().city())
                    .province(faker.address().state())
                    .district(faker.address().cityName())
                    .ward(faker.address().streetName())
                    .address(faker.address().fullAddress())
                    .addressType("Home")
                    .isDefault(false)
                    .createdAt(Instant.now())
                    .updatedAt(Instant.now())
                    .build();
            addressRepository.saveAndFlush(address5);
            Avatar avatarStudent1 = Avatar.builder()
                    .publicId("g2/avatar/student1")
                    .imageUrl("https://res.cloudinary.com/ds9macgdo/image/upload/v1719592662/g2/avatar/default.png")
                    .userId(5L)
                    .build();
            avatarRepository.saveAndFlush(avatarStudent1);

            User student1 = User.builder()
                    .email("student1@gmail.com")
                    .password(passwordEncoder.encode("student1"))
                    .username("student1")
                    .gender(GenderType.Female)
                    .roles(new HashSet<>(Set.of(roleRepository.findByName(RoleType.STUDENT))))
                    .isEnabled(true)
                    .isMfaEnabled(false)
                    .dateOfBirth(LocalDate.parse("2004-05-16"))
                    .firstName("Triết")
                    .lastName("Đinh")
                    .description("Student Account")
                    .avatar(avatarStudent1)
                    .address(address5)
                    .build();
            userRepository.saveAndFlush(student1);
            address5.setUser(student1);
            addressRepository.saveAndFlush(address5);

            Address address6 = Address.builder()
                    .phoneNumber(faker.phoneNumber().phoneNumber())
                    .country(faker.country().name())
                    .city(faker.address().city())
                    .province(faker.address().state())
                    .district(faker.address().cityName())
                    .ward(faker.address().streetName())
                    .address(faker.address().fullAddress())
                    .addressType("Home")
                    .isDefault(false)
                    .createdAt(Instant.now())
                    .updatedAt(Instant.now())
                    .build();
            addressRepository.saveAndFlush(address6);
            Avatar avatarStudent2 = Avatar.builder()
                    .publicId("g2/avatar/student2")
                    .imageUrl("https://res.cloudinary.com/ds9macgdo/image/upload/v1719592662/g2/avatar/default.png")
                    .userId(6L)
                    .build();
            avatarRepository.saveAndFlush(avatarStudent2);

            User student2 = User.builder()
                    .email("student2@gmail.com")
                    .password(passwordEncoder.encode("student2"))
                    .username("student2")
                    .gender(GenderType.Male)
                    .roles(new HashSet<>(Set.of(roleRepository.findByName(RoleType.STUDENT))))
                    .isEnabled(true)
                    .isMfaEnabled(false)
                    .dateOfBirth(LocalDate.parse("2004-05-16"))
                    .firstName("Shiba")
                    .lastName("Inu")
                    .description("Student Account")
                    .avatar(avatarStudent2)
                    .address(address6)
                    .build();
            userRepository.saveAndFlush(student2);
            address6.setUser(student2);
            addressRepository.saveAndFlush(address6);

            Course course1 = Course.builder()
                    .thumbnail(thumbnail)
                    .title("Phonetics")
                    .meetingRoomId("rjwj-bfie-bbw0")
                    .subCategory("Pronunciation")
                    .language("English")
                    .name("English class")
                    .teacherId(3L)
                    .rating(0L)
                    .description("English class for beginner")
                    .isEnabled(true)
                    .price(200000L)
                    .users(List.of(student1))
                    .build();

            courseRepository.saveAndFlush(course1);

            Material material1 = Material.builder()
                    .publicId("g2/material/file_xcxtci")
                    .documentUrl("http://res.cloudinary.com/ds9macgdo/image/upload/v1724473888/g2/material/file_xcxtci.pdf")
                    .title("Grammar")
                    .course(course1)
                    .build();

            Material material2 = Material.builder()
                    .publicId("g2/material/file_n2r9pi")
                    .documentUrl("http://res.cloudinary.com/ds9macgdo/image/upload/v1724401026/g2/material/file_n2r9pi.pdf")
                    .course(course1)
                    .title("Vocabulary")
                    .build();

            Material material3 = Material.builder()
                    .publicId("g2/material/file_hjexci")
                    .documentUrl("http://res.cloudinary.com/ds9macgdo/image/upload/v1724476597/g2/material/file_hjexci.pdf")
                    .course(course1)
                    .title("Listening")
                    .build();

            Material material4 = Material.builder()
                    .publicId("g2/material/file_qemmr7")
                    .documentUrl("http://res.cloudinary.com/ds9macgdo/image/upload/v1724477518/g2/material/file_qemmr7.pdf")
                    .course(course1)
                    .title("Writing")
                    .build();

            materialRepository.saveAndFlush(material1);
            materialRepository.saveAndFlush(material2);
            materialRepository.saveAndFlush(material3);
            materialRepository.saveAndFlush(material4);

            Course course2 = Course.builder()
                    .thumbnail(thumbnail)
                    .title("Phonetics")
                    .meetingRoomId("rjwj-bfie-bbw0")
                    .subCategory("Pronunciation")
                    .language("Japanese")
                    .name("Japanese class")
                    .rating(0L)
                    .teacherId(4L)
                    .description("Japanese class for beginner")
                    .isEnabled(true)
                    .price(100000L)
                    .users(List.of(student1, student2))
                    .build();

            courseRepository.saveAndFlush(course2);
        }
    }
}
