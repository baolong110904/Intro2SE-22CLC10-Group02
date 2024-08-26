package com.g2.lls.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.g2.lls.domains.*;
import com.g2.lls.dtos.response.AvatarResponse;
import com.g2.lls.dtos.response.MaterialResponse;
import com.g2.lls.dtos.response.ThumbnailResponse;
import com.g2.lls.repositories.*;
import com.g2.lls.services.CloudinaryService;
import com.g2.lls.utils.exception.DataNotFoundException;
import com.g2.lls.utils.exception.UserNotActivatedException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {
    private final Cloudinary cloudinary;
    private final UserRepository userRepository;
    private final AvatarRepository avatarRepository;
    private final ModelMapper modelMapper;
    private final CourseRepository courseRepository;
    private final MaterialRepository materialRepository;
    private final ThumbnailRepository thumbnailRepository;

    @Value("${avatar.folder}")
    private String avatarFolder;

    @Value("${material.folder}")
    private String materialFolder;

    @Value("${thumbnail.folder}")
    private String thumbnailFolder;

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

        // Optional<Avatar> existingAvatar = avatarRepository.findByUserId(userId);
        // if (existingAvatar.isPresent()) {
        //     deleteFile(existingAvatar.get().getPublicId());
        //     avatarRepository.delete(existingAvatar.get());
        // }

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

    @Override
    public MaterialResponse uploadMaterial(Long courseId, String title, MultipartFile file) throws Exception {
        Course course = courseRepository.findById(courseId).
                orElseThrow(() -> new DataNotFoundException("Course not found"));
        if (course.getIsEnabled() == null || !course.getIsEnabled()) {
            throw new UserNotActivatedException("Course is not active");
        }

        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "folder", materialFolder,
                "use_filename", true,
                "unique_filename", true,
                "overwrite", false
        ));

        Material material = Material.builder()
                .publicId(uploadResult.get("public_id").toString())
                .documentUrl(uploadResult.get("url").toString())
                .course(course)
                .title(title)
                .build();

        materialRepository.save(material);
        List<Material> materials = course.getMaterials();
        materials.add(material);
        course.setMaterials(materials);
        courseRepository.save(course);

        return modelMapper.map(material, MaterialResponse.class);
    }

    @Override
    public ThumbnailResponse updateThumbnail(Long courseId, MultipartFile file) throws Exception {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new DataNotFoundException("Course not found"));
        if (course.getIsEnabled() == null || !course.getIsEnabled()) {
            throw new UserNotActivatedException("Course is not active");
        }

        Optional<Thumbnail> existingThumnail = thumbnailRepository.findByCourseId(courseId);
        if (existingThumnail.isPresent()) {
            deleteFile(existingThumnail.get().getPublicId());
            thumbnailRepository.delete(existingThumnail.get());
        }

        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "folder", thumbnailFolder,
                "use_filename", true,
                "unique_filename", true,
                "overwrite", false
        ));

        Thumbnail thumbnail = Thumbnail.builder()
                .publicId(uploadResult.get("public_id").toString())
                .imageUrl(uploadResult.get("url").toString())
                .build();

        thumbnailRepository.save(thumbnail);
        course.setThumbnail(thumbnail);
        courseRepository.save(course);

        return modelMapper.map(thumbnail, ThumbnailResponse.class);
    }
}
