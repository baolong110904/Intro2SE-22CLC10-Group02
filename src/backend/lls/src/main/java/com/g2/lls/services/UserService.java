package com.g2.lls.services;

import com.g2.lls.domains.User;
import com.g2.lls.dtos.LoginDTO;
import com.g2.lls.dtos.UserDTO;
import com.g2.lls.dtos.response.AvatarResponse;
import com.g2.lls.dtos.response.TokenResponse;
import com.g2.lls.dtos.response.UserResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User fetchUserById(Long id) throws Exception;

    User fetchUserByEmail(String email) throws Exception;

    List<UserResponse> getAllUsers() throws Exception;

    UserResponse getUserById(Long id) throws Exception;

    UserResponse updateUser(UserDTO userDTO) throws Exception;

    void deleteUser(Long id) throws Exception;

    void updateUserRefreshToken(String email, String refreshToken) throws Exception;
    TokenResponse login(LoginDTO loginDTO) throws Exception;

    Optional<User> findByEmail(String email);

    AvatarResponse uploadProfilePicture(Long userId, MultipartFile file) throws Exception;
}
