package com.g2.lls.repositories;

import com.g2.lls.domains.Course;
import com.g2.lls.repositories.customs.CourseRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long>, JpaSpecificationExecutor<Course>, CourseRepositoryCustom {
    List<Course> findByIdIn(List<Long> ids);
}
