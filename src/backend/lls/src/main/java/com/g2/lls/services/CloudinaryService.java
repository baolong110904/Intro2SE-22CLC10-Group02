package com.g2.lls.services;

import com.g2.lls.dtos.response.AvatarResponse;
import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {
    AvatarResponse getAvatar(Long userId) throws Exception;

    AvatarResponse updateAvatar(Long userId, MultipartFile file) throws Exception;

    void deleteFile(String publicId) throws Exception;
}
