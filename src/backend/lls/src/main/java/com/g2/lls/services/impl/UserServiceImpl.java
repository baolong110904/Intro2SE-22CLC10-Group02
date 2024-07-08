package com.g2.lls.services.impl;

import com.g2.lls.configs.security.user.CustomUserDetails;
import com.g2.lls.dtos.AddressDTO;
import com.g2.lls.dtos.LoginDTO;
import com.g2.lls.dtos.UserDTO;
import com.g2.lls.dtos.response.AvatarResponse;
import com.g2.lls.dtos.response.TokenResponse;
import com.g2.lls.dtos.response.UserResponse;
import com.g2.lls.domains.User;
import com.g2.lls.repositories.AddressRepository;
import com.g2.lls.repositories.UserRepository;
import com.g2.lls.services.CloudinaryService;
import com.g2.lls.services.UserService;
import com.g2.lls.utils.exception.DataNotFoundException;
import com.g2.lls.utils.exception.UserNotActivatedException;
import com.g2.lls.utils.security.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenUtil jwtTokenUtil;
    private final CloudinaryService cloudinaryService;
    private final ModelMapper modelMapper;

    @Override
    public User fetchUserById(Long id) throws Exception {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            log.error("Can not find user with id: {}", id);
            throw new DataNotFoundException("Can not find user with id: " + id);
        }
        if (user.get().getIsEnabled() == null || !user.get().getIsEnabled()) {
            log.error("User is not active");
            throw new UserNotActivatedException("User is not active");
        }
        return user.get();
    }

    @Override
    public User fetchUserByEmail(String email) throws Exception {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            log.error("Can not find user with email: {}", email);
            throw new DataNotFoundException("Can not find user with email: " + email);
        }
        if (user.get().getIsEnabled() == null || !user.get().getIsEnabled()) {
            log.error("User is not active");
            throw new UserNotActivatedException("User is not active");
        }
        return user.get();
    }

    @Override
    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> modelMapper.map(user, UserResponse.class))
                .toList();
    }

    @Override
    public UserResponse getUserById(Long id) throws Exception {
        User user = fetchUserById(id);
        return modelMapper.map(user, UserResponse.class);
    }

    @Override
    public UserResponse updateUser(UserDTO userDTO) throws Exception {
        User user = fetchUserByEmail(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setUsername(userDTO.getUsername());
        user.setDescription(userDTO.getDescription());
        user.setGender(userDTO.getGender());
        user.setIsMfaEnabled(userDTO.getIsMfaEnabled());
        user.setUpdatedAt(Instant.now());
        userRepository.save(user);
        return modelMapper.map(user, UserResponse.class);
    }

    @Override
    public void deleteUser(Long id) throws Exception {
        User user = fetchUserById(id);
        user.setIsEnabled(false);
        userRepository.save(user);
    }

    @Override
    public void updateUserRefreshToken(String email, String refreshToken) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Can not find user with email: " + email));
        user.setRefreshToken(refreshToken);
        userRepository.save(user);
    }

    @Override
    public TokenResponse login(LoginDTO loginDTO) throws Exception {
        User user = fetchUserByEmail(loginDTO.getEmail());

        CustomUserDetails existingUser = new CustomUserDetails(user);
        if (!passwordEncoder.matches(loginDTO.getPassword(), existingUser.getPassword())) {
            log.error("Wrong password");
            throw new BadCredentialsException("Wrong password");
        }

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(),
                        loginDTO.getPassword(),
                        existingUser.getAuthorities());

        Authentication authentication = authenticationManagerBuilder.getObject()
                .authenticate(usernamePasswordAuthenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtTokenUtil.createAccessToken(authentication);

        Instant instant = jwtTokenUtil.getExpiration(accessToken);
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.of("GMT+7"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String expiration = localDateTime.format(formatter);

        TokenResponse.UserLogin userEntity = TokenResponse.UserLogin.builder()
                .email(user.getEmail())
                .build();

        return TokenResponse.builder()
                .accessToken(accessToken)
                .expiration(expiration)
                .user(userEntity)
                .build();
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public AvatarResponse uploadProfilePicture(Long userId, MultipartFile file) throws Exception {
        return cloudinaryService.updateAvatar(userId, file);
    }
}
