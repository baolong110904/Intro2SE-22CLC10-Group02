package com.g2.lls.utils;

import com.g2.lls.domains.Avatar;
import com.g2.lls.domains.Role;
import com.g2.lls.domains.User;
import com.g2.lls.enums.GenderType;
import com.g2.lls.enums.RoleType;
import com.g2.lls.repositories.AvatarRepository;
import com.g2.lls.repositories.RoleRepository;
import com.g2.lls.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class InitData implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final AvatarRepository avatarRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
//        Role roleAdmin = Role.builder()
//                .name(RoleType.ADMIN)
//                .build();
//        Role roleStudent = Role.builder()
//                .name(RoleType.STUDENT)
//                .build();
//        Role roleTeacher = Role.builder()
//                .name(RoleType.TEACHER)
//                .build();
//
//        roleRepository.save(roleAdmin);
//        roleRepository.save(roleStudent);
//        roleRepository.save(roleTeacher);
//
//        User admin = User.builder()
//                .email("admin@gmail.com")
//                .password(passwordEncoder.encode("admin"))
//                .username("admin")
//                .gender(GenderType.Male)
//                .roles(Set.of(roleAdmin))
//                .createdAt(TimeUtil.getTime())
//                .updatedAt(TimeUtil.getTime())
//                .isEnabled(true)
//                .isMfaEnabled(false)
//                .dateOfBirth(LocalDate.parse("2004-05-16"))
//                .firstName("Nam")
//                .lastName("Nguyen")
//                .description("Admin Account")
//                .build();
//
//        Optional<Avatar> existingAvatar = avatarRepository.findById(1L);
//
//        if (existingAvatar.isEmpty()) {
//            Avatar avatar = Avatar.builder()
//                    .id(1L)
//                    .publicId("g2/avatar/default")
//                    .imageUrl("https://res.cloudinary.com/ds9macgdo/image/upload/v1719592662/g2/avatar/default.png")
//                    .build();
//            avatarRepository.save(avatar);
//            admin.setAvatar(avatar);
//        } else {
//            admin.setAvatar(existingAvatar.get());
//        }
//
//        userRepository.save(admin);
    }
}
