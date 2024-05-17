package com.g2.lls.objects;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ResponseObject {
    private Object status;
    private Object message;
    private Object data;
}
