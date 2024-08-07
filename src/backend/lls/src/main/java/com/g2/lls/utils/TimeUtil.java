package com.g2.lls.utils;

import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class TimeUtil {
    public static Instant getTime() {
        return Instant.now();
    }
}
