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
    String title;

    @NotBlank
    String slug;

    @NotBlank
    String content;

    @NotBlank
    String description;
}
