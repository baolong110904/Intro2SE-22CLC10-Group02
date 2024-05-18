package com.g2.lls.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class LevelDTO {
    @NotBlank(message = "Level's name is required")
    private String name;

    @Min(value = 1, message = "Language's ID must be greater than 0")
    @JsonProperty("language_id")
    private Long languageId;
}
