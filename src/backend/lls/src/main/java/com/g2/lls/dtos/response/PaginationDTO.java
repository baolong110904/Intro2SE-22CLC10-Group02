package com.g2.lls.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaginationDTO {
    private Meta meta;
    private Object result;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Meta {
        private int page;
        private int pageSize;
        private int pages;
        private long total;
    }
}
