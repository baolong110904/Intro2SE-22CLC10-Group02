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
public class UpdateCourseDTO {
    private String name;
    private String language;
    private String title;
    private String description;
    private String startDate;
    private Long price;
    private String meetingRoomId;
}
