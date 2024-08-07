package com.g2.lls.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseDTO {

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotBlank
    @JsonProperty("start_date")
    private String startDate;

//    @NotBlank
//    @JsonProperty("level_id")
//    private int levelId;
//
//    @NotBlank
//    @JsonProperty("teacher_id")
//    private Long teacherId;

}
