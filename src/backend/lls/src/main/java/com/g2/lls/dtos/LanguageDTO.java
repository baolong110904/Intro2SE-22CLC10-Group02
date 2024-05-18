package com.g2.lls.dtos;

import com.g2.lls.models.Language;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class LanguageDTO {
    @NotBlank(message = "Language's name is required")
    private String name;
}
