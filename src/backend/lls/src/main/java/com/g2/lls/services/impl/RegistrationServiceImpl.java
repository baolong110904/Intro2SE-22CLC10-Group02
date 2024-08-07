package com.g2.lls.services.impl;

import com.g2.lls.domains.Avatar;
import com.g2.lls.domains.Role;
import com.g2.lls.domains.User;
import com.g2.lls.domains.VerificationToken;
import com.g2.lls.dtos.SignUpDTO;
import com.g2.lls.enums.RoleType;
import com.g2.lls.repositories.AvatarRepository;
import com.g2.lls.repositories.RoleRepository;
import com.g2.lls.repositories.UserRepository;
import com.g2.lls.repositories.VerificationTokenRepository;
import com.g2.lls.services.RegistrationService;
import com.g2.lls.utils.AppUtil;
import com.g2.lls.utils.exception.DataNotFoundException;
import com.g2.lls.utils.exception.UserAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class RegistrationServiceImpl implements RegistrationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final AvatarRepository avatarRepository;
    private final VerificationTokenRepository verificationTokenRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(SignUpDTO signUpDTO) throws Exception {
        Optional<User> user = userRepository.findByEmail(signUpDTO.getEmail());

        if (user.isPresent() && user.get().getIsEnabled()) {
            log.error("User with email: {} already exists", signUpDTO.getEmail());
            throw new UserAlreadyExistsException("User with email: " + signUpDTO.getEmail() + " already exists");
        }

        Role role = roleRepository.findByName(signUpDTO.getRole());

        if (role.getName().equals(RoleType.ADMIN)) {
            log.error("Can not create user with role ADMIN");
            throw new DataNotFoundException("Can not create user with role ADMIN");
        }

        Set<Role> roles = new HashSet<>(Set.of(role));

        User existingUser = User.builder()
                .email(signUpDTO.getEmail())
                .password(passwordEncoder.encode(signUpDTO.getPassword()))
                .firstName(signUpDTO.getFirstName())
                .lastName(signUpDTO.getLastName())
                .username(signUpDTO.getUsername())
                .dateOfBirth(signUpDTO.getDateOfBirth())
                .gender(signUpDTO.getGender())
                .roles(roles)
                .isEnabled(false)
                .isMfaEnabled(false)
                .build();

        Optional<Avatar> existingAvatar = avatarRepository.findById(1L);

        if (existingAvatar.isEmpty()) {
            Avatar avatar = Avatar.builder()
                    .id(1L)
                    .publicId("g2/avatar/default")
                    .imageUrl("https://res.cloudinary.com/ds9macgdo/image/upload/v1719592662/g2/avatar/default.png")
                    .build();
            avatarRepository.save(avatar);
            existingUser.setAvatar(avatar);
        } else {
            existingUser.setAvatar(existingAvatar.get());
        }

        return userRepository.save(existingUser);
    }

    @Override
    public void saveUserVerificationToken(User user, String token) throws Exception {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isEmpty()) {
            log.error("User with email {} not found", user.getEmail());
            throw new DataNotFoundException("User with email " + user.getEmail() + " not found");
        }
        if (verificationTokenRepository.findByUser(user).isPresent()) {
            VerificationToken existingToken = verificationTokenRepository.findByUser(user).get();
            existingToken.setToken(token);
            existingToken.setExpirationDate(Instant.now().plusSeconds(AppUtil.EXPIRATION_SECONDS));
            verificationTokenRepository.save(existingToken);
            return;
        }
        VerificationToken verificationToken = new VerificationToken(token, user);
        verificationTokenRepository.save(verificationToken);
    }

    @Override
    public Boolean validateToken(String token) throws Exception {
        Optional<VerificationToken> existingToken = verificationTokenRepository.findByToken(token);

        if (existingToken.isEmpty()) {
            throw new DataNotFoundException("Token not found");
        }

        User user = existingToken.get().getUser();

        if (existingToken.get().isExpired() ) {
//            verificationTokenRepository.delete(existingToken.get());
//            userRepository.delete(user);
            throw new DataNotFoundException("Token is expired");
        }

        user.setIsEnabled(true);
        userRepository.save(user);
//        verificationTokenRepository.delete(existingToken.get());

        return true;
    }

    @Override
    public void deleteVerificationToken(String token) throws Exception {
        Optional<VerificationToken> existingToken = verificationTokenRepository.findByToken(token);
        if (existingToken.isEmpty()) {
            throw new DataNotFoundException("Token not found");
        }
        verificationTokenRepository.delete(existingToken.get());
    }
}
