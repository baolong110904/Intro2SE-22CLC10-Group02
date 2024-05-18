package com.g2.lls.repositories;

import com.g2.lls.models.Language;
import com.g2.lls.models.Level;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LevelRepository extends JpaRepository<Level, Long> {
    Boolean existsByLanguageAndName(Language language, String name);
}
