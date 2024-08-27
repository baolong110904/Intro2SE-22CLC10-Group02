package com.g2.lls.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class PostResponseDTO {
    private Long id;
    private String title;
    private String content;
    private String slug;
    private UserResponse user;
    private Instant createdAt;
    private Instant updatedAt;
}
