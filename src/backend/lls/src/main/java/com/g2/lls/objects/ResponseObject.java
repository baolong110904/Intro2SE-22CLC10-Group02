package com.g2.lls.objects;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseObject<T> {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String status;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String message;

//    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;

//    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String error;
}
