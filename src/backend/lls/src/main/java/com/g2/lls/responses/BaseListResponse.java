package com.g2.lls.responses;

import jakarta.persistence.MappedSuperclass;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class BaseListResponse<T> {
    private List<T> data;
    private int current;
    private int total;
}