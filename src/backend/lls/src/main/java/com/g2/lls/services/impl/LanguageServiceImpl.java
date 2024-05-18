package com.g2.lls.services.impl;

import com.g2.lls.dtos.LanguageDTO;
import com.g2.lls.exceptions.DataNotFoundException;
import com.g2.lls.models.Language;
import com.g2.lls.repositories.LanguageRepository;
import com.g2.lls.services.LanguageService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LanguageServiceImpl implements LanguageService {
    private final LanguageRepository languageRepository;
    private final ModelMapper modelMapper;

    @Override
    public LanguageDTO createLanguage(LanguageDTO languageDTO) {
        Language newLanguage = Language
                .builder()
                .name(languageDTO.getName())
                .active(true)
                .build();
        if (languageRepository.existsByName(newLanguage.getName())) {
            throw new RuntimeException("Language already exists");
        }
        return modelMapper.map(languageRepository.save(newLanguage), LanguageDTO.class);
    }

    @Override
    public LanguageDTO getLanguageById(Long languageId) throws Exception {
        return modelMapper.map(languageRepository.findById(languageId)
                .orElseThrow(() -> new DataNotFoundException("Language not found")), LanguageDTO.class);
    }

    @Override
    public List<LanguageDTO> getAllLanguages() {
        List<Language> languages = languageRepository.findAll();
        return languages.stream()
                .map(language -> modelMapper.map(language, LanguageDTO.class))
                .toList();
    }

    @Override
    public Page<LanguageDTO> getAllLanguages(PageRequest pageRequest) {
        return languageRepository
                .findAll(pageRequest)
                .map(language -> modelMapper.map(language, LanguageDTO.class));
    }

    @Override
    public LanguageDTO updateLanguage(Long languageId, LanguageDTO languageDTO) {
        Language existingLanguage = languageRepository.findById(languageId)
                .orElseThrow(() -> new RuntimeException("Language not found"));
        existingLanguage.setName(languageDTO.getName());
        return modelMapper
                .map(languageRepository.save(existingLanguage), LanguageDTO.class);
    }

    @Override
    public void deleteLanguage(Long languageId) {
        languageRepository.deleteById(languageId);
    }
}
