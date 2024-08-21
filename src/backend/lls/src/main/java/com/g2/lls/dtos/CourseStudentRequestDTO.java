package com.g2.lls.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseStudentRequestDTO {
    private List<Long> courseIds;
    private String email;
    private Long orderId;
}
