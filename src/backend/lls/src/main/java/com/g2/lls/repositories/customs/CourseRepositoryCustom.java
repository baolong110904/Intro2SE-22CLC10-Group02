package com.g2.lls.repositories.customs;

import com.g2.lls.domains.Course;
import com.g2.lls.dtos.CourseFilterDTO;
import java.util.List;

public interface CourseRepositoryCustom {
    List<Course> findAll(CourseFilterDTO courseFilterDTO);
}