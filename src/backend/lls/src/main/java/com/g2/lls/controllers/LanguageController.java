package com.g2.lls.controllers;

import com.g2.lls.dtos.LanguageDTO;
import com.g2.lls.objects.ResponseObject;
import com.g2.lls.responses.BaseListResponse;
import com.g2.lls.services.LanguageService;
import com.github.javafaker.Faker;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.v1}/languages")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Language Controller", description = "Endpoints for language management")
public class LanguageController {
    private final LanguageService languageService;
    private final Faker faker;

    @PostMapping("")
    public ResponseEntity<ResponseObject<LanguageDTO>> createLanguage(
            @Valid @RequestBody LanguageDTO languageDTO,
            BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(DefaultMessageSourceResolvable::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(
                        new ResponseObject<>("400", "Language creation failed", null, errorMessages.toString()));
            }
            return ResponseEntity.ok(
                    new ResponseObject<>("201", "Created language", languageService.createLanguage(languageDTO), null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                    new ResponseObject<>("400", "Language creation failed", null, e.getMessage()));
        }
    }

    @GetMapping("/{languageId}")
    public ResponseEntity<ResponseObject<LanguageDTO>> getLanguageById(
            @PathVariable("languageId") Long languageId) {
        try {
            return ResponseEntity.ok(
                    new ResponseObject<>("200", "Retrieved language", languageService.getLanguageById(languageId), null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ResponseObject<>("400", "Language not found", null, e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseObject<List<LanguageDTO>>> getAllLanguages() {
        return ResponseEntity.ok(
                new ResponseObject<>("200", "Retrieved all languages", languageService.getAllLanguages(), null));
    }

    @GetMapping("")
    public ResponseEntity<ResponseObject<BaseListResponse<LanguageDTO>>> getAllLanguages(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            @RequestParam(value = "sort", defaultValue = "name") String property,
            @RequestParam(value = "direction", defaultValue = "asc") String direction) {
        if (!property.equals("name") && !property.equals("id")) {
            property = "name";
        }
        if (limit < 1) {
            limit = 1;
        }
        List<LanguageDTO> allCategories = languageService.getAllLanguages();
        int maxPage = allCategories.size() / limit;
        int currentPage = 0;

        if (page < 0) {
            page = 0;
        }
        if (page > maxPage) {
            page = maxPage;
            currentPage = maxPage;
        }
        currentPage = page;
        if (!direction.equals("asc") && !direction.equals("desc")) {
            direction = "asc";
        }
        if (direction.equals("asc")) {
            PageRequest pageRequest = PageRequest.of(page, limit, Sort.by(property).ascending());
            Page<LanguageDTO> languages = languageService.getAllLanguages(pageRequest);
            int totalPages = languages.getTotalPages();
            List<LanguageDTO> categoryList = languages.getContent();
            BaseListResponse<LanguageDTO> response = BaseListResponse.<LanguageDTO>builder()
                    .data(categoryList)
                    .current(currentPage + 1)
                    .total(totalPages)
                    .build();
            return ResponseEntity.ok(
                    new ResponseObject<>("200", "Languages retrieved", response, null));
        } else {
            PageRequest pageRequest = PageRequest.of(page, limit, Sort.by(property).descending());
            Page<LanguageDTO> languages = languageService.getAllLanguages(pageRequest);
            int totalPages = languages.getTotalPages();
            List<LanguageDTO> categoryList = languages.getContent();
            BaseListResponse<LanguageDTO> response = BaseListResponse.<LanguageDTO>builder()
                    .data(categoryList)
                    .current(currentPage + 1)
                    .total(totalPages)
                    .build();
            return ResponseEntity.ok(
                    new ResponseObject<>("200", "Languages retrieved", response, null));
        }
    }

    @PutMapping("/{languageId}")
    public ResponseEntity<ResponseObject<LanguageDTO>> updateLanguage(
            @PathVariable("languageId") Long languageId,
            @Valid @RequestBody LanguageDTO languageDTO,
            BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(DefaultMessageSourceResolvable::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(
                        new ResponseObject<>("400", "Language update failed", null, errorMessages.toString()));
            }
            return ResponseEntity.ok(
                    new ResponseObject<>("200", "Updated language", languageService.updateLanguage(languageId, languageDTO), null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                    new ResponseObject<>("400", "Language update failed", null, e.getMessage()));
        }
    }

    @DeleteMapping("/{languageId}")
    public ResponseEntity<ResponseObject<?>> deleteLanguage(
            @PathVariable("languageId") Long languageId) {
        try {
            languageService.getLanguageById(languageId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ResponseObject<>("400", "Language not found", null, e.getMessage()));
        }
        languageService.deleteLanguage(languageId);
        return ResponseEntity.ok(
                new ResponseObject<>("200", "Language deleted", null, null));
    }
}
