package com.g2.lls.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Component
@Slf4j
public class TimeUtil {
    private static final ZoneId ZONE_ID;

    static {
        ZONE_ID = ZoneId.of("Asia/Ho_Chi_Minh");
    }

    public static Instant getTime() {
//        Clock clock = Clock.system(ZONE_ID);
        return Instant.now();
    }
}
