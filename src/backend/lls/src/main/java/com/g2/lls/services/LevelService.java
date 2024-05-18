package com.g2.lls.services;

import com.g2.lls.dtos.LevelDTO;
import com.g2.lls.exceptions.DataNotFoundException;

import java.util.List;
import java.util.Map;

public interface LevelService {
    LevelDTO createLevel(LevelDTO levelDTO) throws Exception;

    Map<String, String> getLevelAndLanguageById(Long levelId) throws Exception;

    List<Map<String, String>> getAllLevelsAndLanguages();

    LevelDTO updateLevel(Long levelId, LevelDTO levelDTO) throws Exception;

    void deleteLevel(Long levelId);
}
