package com.g2.lls.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostDTO {
    @NotBlank
    private Long courseId;

    @NotBlank
    private String title;

    @NotBlank
    private String slug;

    @NotBlank
    private String content;

    @NotBlank
    private String description;
}
