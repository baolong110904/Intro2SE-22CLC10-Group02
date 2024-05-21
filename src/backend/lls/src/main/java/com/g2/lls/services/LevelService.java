package com.g2.lls.services;

import com.g2.lls.dtos.LevelDTO;
import com.g2.lls.responses.LevelResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface LevelService {
    LevelDTO createLevel(LevelDTO levelDTO) throws Exception;

    LevelResponse getLevelAndLanguageById(Long levelId) throws Exception;

    List<LevelResponse> getAllLevelsAndLanguages();

    List<LevelResponse> getAllLevelsByLanguageId(Long languageId) throws Exception;

    List<LevelResponse> getAllLevelsByLanguageName(String languageName) throws Exception;

    Page<LevelResponse> getAllLevelsAndLanguages(PageRequest pageRequest);

    LevelDTO updateLevel(Long levelId, LevelDTO levelDTO) throws Exception;

    void deleteLevel(Long levelId);
}
