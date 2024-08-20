package com.g2.lls.events.listener;

import com.g2.lls.domains.Course;
import com.g2.lls.services.CourseRedisService;
import com.g2.lls.services.impl.CourseRedisServiceImpl;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
public class CourseListener {

    private final CourseRedisService courseRedisService;

    private final Logger logger = LoggerFactory.getLogger(CourseListener.class);

    public CourseListener(@Lazy CourseRedisServiceImpl courseRedisService) {
        this.courseRedisService = courseRedisService;
    }

    @PrePersist
    public void prePersist (Course course) {logger.info("prePersist");}

    @PostPersist
    public void postPersist (Course course) {
        logger.info("postPersist");
        courseRedisService.clear();
    }

    @PreUpdate
    public void preUpdate (Course course) {logger.info("preUpdate");}

    @PostUpdate
    public void postUpdate (Course course) {
        logger.info("postUpdate");
        courseRedisService.clear();
    }

    @PreRemove
    public void preDelete (Course course) {logger.info("preDelete");}

    @PostRemove
    public void postDelete (Course course) {
        logger.info("postDelete");
        courseRedisService.clear();
    }
}
