package com.g2.lls.dtos.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.g2.lls.utils.TimeUtil;
import lombok.*;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private int status;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Boolean success;

    //    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;

    private Instant timestamp = TimeUtil.getTime();
}