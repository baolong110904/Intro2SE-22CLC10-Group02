package com.g2.lls.dtos.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@AllArgsConstructor
public class ApiErrorResponse {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String method; // HTTP method

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String request; // Request URL

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String error; // Error message
}
