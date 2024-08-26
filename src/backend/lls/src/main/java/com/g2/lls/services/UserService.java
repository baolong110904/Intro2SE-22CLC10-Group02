package com.g2.lls.services;

import com.g2.lls.domains.User;
import com.g2.lls.dtos.AddressDTO;
import com.g2.lls.dtos.ChangePasswordDTO;
import com.g2.lls.dtos.LoginDTO;
import com.g2.lls.dtos.UserDTO;
import com.g2.lls.dtos.UserUpdateDTO;
import com.g2.lls.dtos.response.*;
import com.g2.lls.enums.RoleType;
import com.g2.lls.utils.exception.DataNotFoundException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User fetchUserById(Long id) throws Exception;

    User fetchUserByEmail(String email) throws Exception;

    UserResponse createUser(UserDTO userDTO) throws Exception;

    List<UserResponse> getAllUsers() throws Exception;

    UserResponse getUserById(Long id) throws Exception;

    UserResponse getUserByEmail(String email) throws Exception;

    UserResponse updateUser(Long id, UserDTO userDTO) throws Exception;

    void deleteUser(Long id) throws Exception;

    void updateUserRefreshToken(String email, String refreshToken) throws DataNotFoundException;

    TokenResponse login(LoginDTO loginDTO) throws Exception;

    Optional<User> findByEmail(String email);

    AvatarResponse uploadProfilePicture(Long userId, MultipartFile file) throws Exception;

    AvatarResponse uploadProfilePictureByEmail(String email, MultipartFile file) throws Exception;

    PaginationDTO fetchAllUsers(Specification<User> spec, Pageable pageable);

    RoleType verifyRole(String email) throws Exception;

    User getUserByRefreshTokenAndEmail(String token, String email);

    AvatarResponse getProfilePicture(String email) throws Exception;

    AddressDTO updateUserAddress(String email, AddressDTO addressDTO) throws Exception;

    void changePassword(String email, ChangePasswordDTO changePasswordDTO) throws Exception;

    UserUpdateDTO updateUserProfile(String email, UserUpdateDTO userUpdateDTO) throws Exception;
}
