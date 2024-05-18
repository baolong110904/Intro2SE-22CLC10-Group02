package com.g2.lls.services;

import com.g2.lls.dtos.LanguageDTO;
import com.g2.lls.exceptions.DataNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface LanguageService {
    LanguageDTO createLanguage(LanguageDTO languageDTO);

    LanguageDTO getLanguageById(Long languageId) throws Exception;

    List<LanguageDTO> getAllLanguages();

    Page<LanguageDTO> getAllLanguages(PageRequest pageRequest);

    LanguageDTO updateLanguage(Long languageId, LanguageDTO languageDTO);

    void deleteLanguage(Long languageId);
}
