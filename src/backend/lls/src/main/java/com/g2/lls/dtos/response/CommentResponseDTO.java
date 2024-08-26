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
public class CommentResponseDTO {
    private Long id;
    private Long postId;
    private UserResponse user;
    private String content;
    private Instant updatedAt;
    private Instant createdAt;
}
