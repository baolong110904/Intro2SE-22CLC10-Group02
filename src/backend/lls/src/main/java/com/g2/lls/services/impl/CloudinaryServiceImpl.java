package com.g2.lls.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.g2.lls.domains.Avatar;
import com.g2.lls.domains.User;
import com.g2.lls.dtos.response.AvatarResponse;
import com.g2.lls.repositories.AvatarRepository;
import com.g2.lls.repositories.UserRepository;
import com.g2.lls.services.CloudinaryService;
import com.g2.lls.utils.exception.DataNotFoundException;
import com.g2.lls.utils.exception.UserNotActivatedException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CloudinaryServiceImpl implements CloudinaryService {
    private final Cloudinary cloudinary;
    private final UserRepository userRepository;
    private final AvatarRepository avatarRepository;
    private final ModelMapper modelMapper;

    @Value("${avatar.folder}")
    private String avatarFolder;

    @Override
    public AvatarResponse getAvatar(Long userId) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("User not found"));
        if (user.getIsEnabled() == null || !user.getIsEnabled()) {
            throw new UserNotActivatedException("User is not active");
        }

        Optional<Avatar> avatar = avatarRepository.findByUserId(userId);

        if (avatar.isEmpty()) {
            throw new DataNotFoundException("Avatar not found");
        }

        return modelMapper.map(avatar.get(), AvatarResponse.class);
    }

    @Override
    public AvatarResponse updateAvatar(Long userId, MultipartFile file) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("User not found"));
        if (user.getIsEnabled() == null || !user.getIsEnabled()) {
            throw new UserNotActivatedException("User is not active");
        }

        Optional<Avatar> existingAvatar = avatarRepository.findByUserId(userId);
        if (existingAvatar.isPresent()) {
            deleteFile(existingAvatar.get().getPublicId());
            avatarRepository.delete(existingAvatar.get());
        }

        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "folder", avatarFolder,
                "use_filename", true,
                "unique_filename", true,
                "overwrite", false
        ));

        Avatar avatar = Avatar.builder()
                .publicId(uploadResult.get("public_id").toString())
                .imageUrl(uploadResult.get("url").toString())
                .build();

        avatarRepository.save(avatar);
        user.setAvatar(avatar);
        userRepository.save(user);

        return modelMapper.map(avatar, AvatarResponse.class);
    }

    @Override
    public void deleteFile(String publicId) throws Exception {
        Map params = ObjectUtils.asMap(
                "invalidate", true
        );
        cloudinary.uploader().destroy(publicId, params);
    }
}
