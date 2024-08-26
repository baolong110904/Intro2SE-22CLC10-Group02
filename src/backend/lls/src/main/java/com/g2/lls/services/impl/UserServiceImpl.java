package com.g2.lls.services.impl;

import com.g2.lls.configs.security.user.CustomUserDetails;
import com.g2.lls.domains.Address;
import com.g2.lls.domains.Role;
import com.g2.lls.dtos.AddressDTO;
import com.g2.lls.dtos.ChangePasswordDTO;
import com.g2.lls.dtos.LoginDTO;
import com.g2.lls.dtos.UserDTO;
import com.g2.lls.dtos.UserUpdateDTO;
import com.g2.lls.dtos.response.*;
import com.g2.lls.domains.User;
import com.g2.lls.enums.RoleType;
import com.g2.lls.repositories.AddressRepository;
import com.g2.lls.repositories.RoleRepository;
import com.g2.lls.repositories.UserRepository;
import com.g2.lls.services.CloudinaryService;
import com.g2.lls.services.UserService;
import com.g2.lls.utils.exception.DataNotFoundException;
import com.g2.lls.utils.exception.UserNotActivatedException;
import com.g2.lls.utils.security.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
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
//        if (user.get().getIsEnabled() == null || !user.get().getIsEnabled()) {
//            log.error("User is not active");
//            throw new UserNotActivatedException("User is not active");
//        }
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
    public UserResponse createUser(UserDTO userDTO) throws Exception {
        Role existingRole = roleRepository.findByName(userDTO.getRole());
        if (existingRole == null) {
            log.error("Role not found");
            throw new DataNotFoundException("Role not found");
        }
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            log.error("Email already exists");
            throw new DataNotFoundException("Email already exists");
        }
        User user = modelMapper.map(userDTO, User.class);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setIsEnabled(true);
        user.setIsMfaEnabled(false);
        user.setRoles(Set.of(existingRole));
        userRepository.save(user);
        return modelMapper.map(user, UserResponse.class);
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
    public UserResponse getUserByEmail(String email) throws Exception {
        User user = fetchUserByEmail(email);
        UserResponse userResponse = modelMapper.map(user, UserResponse.class);
        // userResponse.setRoleType(user.getRoles().stream()
        //         .map(role -> role.getName().name())
        //         .collect(Collectors.toList()));
        userResponse.setRole(user.getRoles());
        userResponse.setAddress(modelMapper.map(user.getAddress(), AddressDTO.class));
        return userResponse;
    }

    @Override
    public UserResponse updateUser(Long id, UserDTO userDTO) throws Exception {
        User user = fetchUserById(id);
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setDescription(userDTO.getDescription());
        user.setGender(userDTO.getGender());
        user.setIsMfaEnabled(userDTO.getIsMfaEnabled());
        user.setUpdatedAt(Instant.now());
        user.setUpdatedBy(userDTO.getUpdatedBy());
        user.setCreatedBy(userDTO.getCreatedBy());
        user.setCreatedAt(userDTO.getCreatedAt());
        user.setSecret(userDTO.getSecret());
        user.setIsEnabled(userDTO.getIsEnabled());

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
    public void updateUserRefreshToken(String email, String refreshToken) throws DataNotFoundException {
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

    @Override
    public AvatarResponse uploadProfilePictureByEmail(String email, MultipartFile file) throws Exception {
        User user = fetchUserByEmail(email);
        return cloudinaryService.updateAvatar(user.getId(), file);
    }

    @Override
    public PaginationDTO fetchAllUsers(Specification<User> spec, Pageable pageable) {
        Page<User> users = userRepository.findAll(spec, pageable);
        PaginationDTO.Meta meta = PaginationDTO.Meta.builder()
                .page(pageable.getPageNumber() + 1)
                .pageSize(pageable.getPageSize())
                .pages(users.getTotalPages())
                .total(users.getTotalElements())
                .build();

        List<User> userEntities = users.getContent();

        return PaginationDTO.builder()
                .meta(meta)
                .result(userEntities)
                .build();
    }

    @Override
    public RoleType verifyRole(String email) throws Exception {
        User user = fetchUserByEmail(email);
        return user.getRoles().stream()
                .map(Role::getName)
                .findFirst()
                .orElseThrow(() -> new DataNotFoundException("Can not find role for user with email: " + email));
    }

    @Override
    public User getUserByRefreshTokenAndEmail(String token, String email) {
        return userRepository.findByRefreshTokenAndEmail(token, email);
    }

    @Override
    public AvatarResponse getProfilePicture(String email) throws Exception {
        User user = fetchUserByEmail(email);
        return cloudinaryService.getAvatar(user.getId());
    }

    @Override
    public AddressDTO updateUserAddress(String email, AddressDTO addressDTO) throws Exception {
        User user = fetchUserByEmail(email);
        Address address = user.getAddress();
        
        if (address == null) {
            address = new Address();
            user.setAddress(address);
        }
        
        address.setPhoneNumber(addressDTO.getPhoneNumber());
        address.setCountry(addressDTO.getCountry());
        address.setCity(addressDTO.getCity());
        address.setProvince(addressDTO.getProvince());
        address.setDistrict(addressDTO.getDistrict());
        address.setWard(addressDTO.getWard());
        address.setAddress(addressDTO.getAddress());
        address.setAddressType(addressDTO.getAddressType());
        address.setIsDefault(addressDTO.getIsDefault());
        
        addressRepository.save(address);
        userRepository.save(user);
        
        return addressDTO;
    }

    @Override
    public void changePassword(String email, ChangePasswordDTO changePasswordDTO) throws Exception {
        User user = fetchUserByEmail(email);
        if (!passwordEncoder.matches(changePasswordDTO.getOldPassword(), user.getPassword())) {
            log.error("Wrong old password");
            throw new BadCredentialsException("Wrong old password");
        }
        if (!changePasswordDTO.getNewPassword().equals(changePasswordDTO.getConfirmPassword())) {
            log.error("New password and confirm password do not match!");
            throw new BadCredentialsException("New password and confirm password do not match!");
        }
        user.setPassword(passwordEncoder.encode(changePasswordDTO.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public UserUpdateDTO updateUserProfile(String email, UserUpdateDTO userUpdateDTO) throws Exception {
        User user = fetchUserByEmail(email);
        user.setUsername(userUpdateDTO.getUsername());
        user.setFirstName(userUpdateDTO.getFirstName());
        user.setLastName(userUpdateDTO.getLastName());
        user.setDateOfBirth(userUpdateDTO.getDateOfBirth());
        user.setGender(userUpdateDTO.getGender());
        user.setDescription(userUpdateDTO.getDescription());
        userRepository.save(user);
        return userUpdateDTO;
    }
}
