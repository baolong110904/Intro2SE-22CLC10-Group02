package com.g2.lls.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseFilterDTO {
    private String firstName;
    private Long minPrice;
    private Long maxPrice;
    private String language;
    private String courseName;
}
