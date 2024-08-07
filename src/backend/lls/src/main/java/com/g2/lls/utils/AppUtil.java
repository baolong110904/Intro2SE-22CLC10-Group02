package com.g2.lls.utils;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Arrays;
import java.util.List;

@Component
public class AppUtil {
    private static String apiPrefix;

    @Value("${api.v1}")
    private String apiPrefixFromConfig;

    @PostConstruct
    private void init() {
        AppUtil.apiPrefix = apiPrefixFromConfig;
    }

//    public static final Long EXPIRATION_SECONDS = 120; // 2 minutes

    public static final Long EXPIRATION_SECONDS = 86400L; // 1 day

    public static final String DEFAULT_PAGE_NUMBER = "0";
    public static final String DEFAULT_PAGE_SIZE = "10";
    public static final String DEFAULT_SORT_BY = "id";
    public static final String DEFAULT_SORT_DIRECTION = "asc";

    public static List<String> allowedOrigins = Arrays.asList("http://localhost:3000", "http://localhost:3001");
    public static List<String> allowedMethods = Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS");

    public static List<String> allowedHeaders = Arrays.asList("Authorization", "Content-Type", "Accept", "X-Auth-User-Id",
            "X-Auth-User-Email");

    public static String applicationUrl(HttpServletRequest request) {
        return request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getServletPath();
    }

    public static HttpServletRequest getCurrentRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    }
}
