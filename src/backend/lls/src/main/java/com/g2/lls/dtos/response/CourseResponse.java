package com.g2.lls.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseResponse {

    private Long id;

    @JsonProperty("course_name")
    private String name;

    private String description;

    private String thumbnail;

    @JsonProperty("start_date")
    private String startDate;

    @JsonProperty("teacher_id")
    private Long teacherId;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("is_enabled")
    private Boolean isEnabled;

    @JsonProperty("created_at")
    private Instant createdAt;

    @JsonProperty("updated_at")
    private Instant updatedAt;

    @JsonProperty("created_by")
    private String createdBy;

    @JsonProperty("updated_by")
    private String updatedBy;

    @JsonProperty("number_of_student")
    private int numStudent = 0;

    private Long price;

    private String email;
}
