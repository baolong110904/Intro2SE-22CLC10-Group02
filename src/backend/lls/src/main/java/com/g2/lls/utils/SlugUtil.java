package com.g2.lls.utils;

import com.github.slugify.Slugify;
import org.springframework.stereotype.Component;

@Component
public class SlugUtil {
    public static String toSlug(String title) {
        final Slugify slg = Slugify.builder()
                .transliterator(true)
                .build();

        return slg.slugify(title);
    }
}
