package com.g2.lls.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MyCourseResponse {
    private String meetingRoomId;
    private Long id;
    private String title;
    private String subCategory;
    private String teacher;
    private Long rating;
    private String language;
    private String image;
}
