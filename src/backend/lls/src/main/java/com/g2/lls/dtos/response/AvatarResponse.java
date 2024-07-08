package com.g2.lls.dtos.response;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AvatarResponse {
    private String publicId;
    private String imageUrl;
}
