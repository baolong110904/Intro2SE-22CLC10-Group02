package com.g2.lls.services.impl;

import com.g2.lls.dtos.LevelDTO;
import com.g2.lls.exceptions.DataNotFoundException;
import com.g2.lls.models.Language;
import com.g2.lls.models.Level;
import com.g2.lls.repositories.LanguageRepository;
import com.g2.lls.repositories.LevelRepository;
import com.g2.lls.responses.LevelResponse;
import com.g2.lls.services.LevelService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LevelServiceImpl implements LevelService {
    private final LevelRepository levelRepository;
    private final LanguageRepository languageRepository;
    private final ModelMapper modelMapper;
    @Override
    public LevelDTO createLevel(LevelDTO levelDTO) throws Exception {
        if (!levelDTO.getName().equals("Beginner")
                && !levelDTO.getName().equals("Intermediate")
                && !levelDTO.getName().equals("Advanced")) {
            throw new RuntimeException("Invalid level name");
        }
        Language existingLanguage = languageRepository.findById(levelDTO.getLanguageId())
                .orElseThrow(() -> new DataNotFoundException("Language not found"));
        Level newLevel = Level
                .builder()
                .name(levelDTO.getName())
                .language(existingLanguage)
                .active(true)
                .build();
        if (levelRepository.existsByLanguageAndName(existingLanguage, levelDTO.getName())) {
            throw new RuntimeException("Level already exists");
        }
        return modelMapper.map(levelRepository.save(newLevel), LevelDTO.class);
    }

    @Override
    public LevelResponse getLevelAndLanguageById(Long levelId) throws Exception {
        Level existingLevel = levelRepository.findById(levelId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find level with id: " + levelId));
        return LevelResponse
                .builder()
                .level(existingLevel.getName())
                .language(existingLevel.getLanguage().getName())
                .build();
    }

    @Override
    public List<LevelResponse> getAllLevelsAndLanguages() {
        List<Level> levels = levelRepository.findAll();
        return levels.stream()
                .map(level -> LevelResponse
                        .builder()
                        .level(level.getName())
                        .language(level.getLanguage().getName())
                        .build())
                .toList();
    }

    @Override
    public List<LevelResponse> getAllLevelsByLanguageId(Long languageId) throws Exception {
        Language existingLanguage = languageRepository.findById(languageId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find language with id: " + languageId));
        List<Level> levels = levelRepository.findAllByLanguage(existingLanguage);
        return levels.stream()
                .map(level -> LevelResponse
                        .builder()
                        .level(level.getName())
                        .language(level.getLanguage().getName())
                        .build())
                .toList();
    }

    @Override
    public List<LevelResponse> getAllLevelsByLanguageName(String languageName) throws Exception {
        Language existingLanguage = languageRepository.findByName(languageName)
                .orElseThrow(() -> new DataNotFoundException("Language not found"));
        List<Level> levels = levelRepository.findAllByLanguage(existingLanguage);
        return levels.stream()
                .map(level -> LevelResponse
                        .builder()
                        .level(level.getName())
                        .language(level.getLanguage().getName())
                        .build())
                .toList();
    }

    @Override
    public Page<LevelResponse> getAllLevelsAndLanguages(PageRequest pageRequest) {
        return levelRepository
                .findAll(pageRequest)
                .map(level -> LevelResponse
                        .builder()
                        .level(level.getName())
                        .language(level.getLanguage().getName())
                        .build());
    }

    @Override
    public LevelDTO updateLevel(Long levelId, LevelDTO levelDTO) throws Exception {
        Level existingLevel = levelRepository.findById(levelId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find level with id: " + levelId));
        Language existingLanguage = languageRepository.findById(levelDTO.getLanguageId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find language with id: " + levelDTO.getLanguageId()));
        if (levelRepository.existsByLanguageAndName(existingLanguage, levelDTO.getName())) {
            throw new RuntimeException("Level already exists");
        }
        existingLevel.setName(levelDTO.getName());
        existingLevel.setLanguage(existingLanguage);
        return modelMapper.map(levelRepository.save(existingLevel), LevelDTO.class);
    }

    @Override
    public void deleteLevel(Long levelId) {
        levelRepository.deleteById(levelId);
    }
}
