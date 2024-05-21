package com.g2.lls.repositories;

import com.g2.lls.models.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;

public interface LanguageRepository extends JpaRepository<Language, Long> {
    Boolean existsByName(String name);

    boolean existsById(@NonNull Long id);
    @NonNull
    List<Language> findAll();

    Optional<Language> findByName(String languageName);
}
