package com.g2.lls.repositories;

import com.g2.lls.domains.Thumbnail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.util.Optional;

public interface ThumbnailRepository extends JpaRepository<Thumbnail, Long>, JpaSpecificationExecutor<Thumbnail> {
    Optional<Thumbnail> findByCourseId(Long courseId);
}
