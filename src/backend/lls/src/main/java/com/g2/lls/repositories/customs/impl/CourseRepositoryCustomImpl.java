package com.g2.lls.repositories.customs.impl;

import com.g2.lls.domains.Course;
import com.g2.lls.dtos.CourseFilterDTO;
import com.g2.lls.repositories.customs.CourseRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Objects;

@Repository
public class CourseRepositoryCustomImpl implements CourseRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Course> findAll(CourseFilterDTO courseFilterDTO) {
        StringBuilder sql = new StringBuilder(
                " SELECT DISTINCT C.* " + " FROM courses C ");
        joinSql(courseFilterDTO, sql);
        sql.append(" WHERE 1 = 1 ");
        sqlCourse(courseFilterDTO, sql);
        sql.append(" AND C.is_enabled = 1 ");
        Query query = entityManager.createNativeQuery(sql.toString(), Course.class);

        return query.getResultList();
    }

    public void sqlCourse(CourseFilterDTO course, StringBuilder sql) {
        if (course.getMinPrice() != null)
            sql.append(" AND C.price" + " >= ").append(course.getMinPrice()).append(" ");
        if (course.getMaxPrice() != null)
            sql.append(" AND C.price" + " <= ").append(course.getMaxPrice()).append(" ");
        if (!Objects.equals(course.getCourseName(), "") && course.getCourseName() != null)
            sql.append(" AND C.name" + " LIKE '%").append(course.getCourseName()).append("%' ");
        if (!Objects.equals(course.getLanguage(), "") && course.getLanguage() != null)
            sql.append(" AND C.language" + " LIKE '%").append(course.getLanguage()).append("%' ");
        if (!Objects.equals(course.getFirstName(), "") && course.getFirstName() != null)
            sql.append(" AND U.first_name" + " LIKE '%").append(course.getFirstName()).append("%' ");
    }


    public void joinSql(CourseFilterDTO courseFilterDTO, StringBuilder sql) {
        if (!Objects.equals(courseFilterDTO.getFirstName(), null) && !Objects.equals(courseFilterDTO.getFirstName(), "")) {
            sql.append(" JOIN users U ON C.teacher_id = U.id");
        }
    }
}
