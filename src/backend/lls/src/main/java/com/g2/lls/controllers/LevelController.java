package com.g2.lls.controllers;

import com.g2.lls.dtos.LevelDTO;
import com.g2.lls.objects.ResponseObject;
import com.g2.lls.responses.BaseListResponse;
import com.g2.lls.responses.LevelResponse;
import com.g2.lls.services.LevelService;
import com.github.javafaker.Faker;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.v1}/levels")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Level Controller", description = "Endpoints for level management")
public class LevelController {
    private final LevelService levelService;
    private final Faker faker;

    @PostMapping("")
    public ResponseEntity<ResponseObject<LevelDTO>> createLevel(
            @Valid @RequestBody LevelDTO levelDTO,
            BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(DefaultMessageSourceResolvable::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(
                        new ResponseObject<>("400", "Level creation failed", null, errorMessages.toString()));
            }
            return ResponseEntity.ok(
                    new ResponseObject<>("201", "Created level", levelService.createLevel(levelDTO), null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ResponseObject<>("400", "Level creation failed", null, e.getMessage()));
        }
    }

    @GetMapping("/{levelId}")
    public ResponseEntity<ResponseObject<LevelResponse>> getLevelAndLanguageById(
            @PathVariable("levelId") Long levelId) {
        try {
            return ResponseEntity.ok(
                    new ResponseObject<>("200", "Retrieved level", levelService.getLevelAndLanguageById(levelId), null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ResponseObject<>("400", "Level not found", null, e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseObject<List<LevelResponse>>> getAllLevelsAndLanguages() {
        return ResponseEntity.ok(
                new ResponseObject<>("200", "Retrieved all levels", levelService.getAllLevelsAndLanguages(), null));
    }

    @GetMapping("")
    public ResponseEntity<ResponseObject<BaseListResponse<LevelResponse>>> getLevelsAndLanguages(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            @RequestParam(value = "sort", defaultValue = "name") String property,
            @RequestParam(value = "direction", defaultValue = "asc") String direction) {
        if (!property.equals("id") && !property.equals("name")) {
            property = "name";
        }
        if (!direction.equals("asc") && !direction.equals("desc")) {
            direction = "asc";
        }
        if (limit < 1) {
            limit = 1;
        }
        List<LevelResponse> allLevels = levelService.getAllLevelsAndLanguages();
        int maxPage = allLevels.size() / limit;
        int currentPage = 0;
        if (page < 0) {
            page = 0;
        }
        if (page > maxPage) {
            page = maxPage;
            currentPage = maxPage;
        }
        currentPage = page;
        if (direction.equals("asc")) {
            PageRequest pageRequest = PageRequest.of(page, limit, Sort.by(property).ascending());
            Page<LevelResponse> levelResponses = levelService.getAllLevelsAndLanguages(pageRequest);
            int totalPages = levelResponses.getTotalPages();
            List<LevelResponse> levelResponsesContent = levelResponses.getContent();
            BaseListResponse<LevelResponse> response = BaseListResponse.<LevelResponse>builder()
                    .data(levelResponsesContent)
                    .current(currentPage + 1)
                    .total(totalPages)
                    .build();
            return ResponseEntity.ok(
                    new ResponseObject<>("200", "Retrieved all languages and levels", response, null));
        } else {
            PageRequest pageRequest = PageRequest.of(page, limit, Sort.by(property).descending());
            Page<LevelResponse> levelResponses = levelService.getAllLevelsAndLanguages(pageRequest);
            int totalPages = levelResponses.getTotalPages();
            List<LevelResponse> levelResponsesContent = levelResponses.getContent();
            BaseListResponse<LevelResponse> response = BaseListResponse.<LevelResponse>builder()
                    .data(levelResponsesContent)
                    .current(currentPage + 1)
                    .total(totalPages)
                    .build();
            return ResponseEntity.ok(
                    new ResponseObject<>("200", "Retrieved all languages and levels", response, null));
        }
    }

    @PutMapping("/{levelId}")
    public ResponseEntity<ResponseObject<LevelDTO>> updateLevel(
            @PathVariable("levelId") Long levelId,
            @Valid @RequestBody LevelDTO levelDTO,
            BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(DefaultMessageSourceResolvable::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(
                        new ResponseObject<>("400", "Level update failed", null, errorMessages.toString()));
            }
            return ResponseEntity.ok(
                    new ResponseObject<>("200", "Updated level", levelService.updateLevel(levelId, levelDTO), null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ResponseObject<>("400", "Level update failed", null, e.getMessage()));
        }
    }

    @DeleteMapping("/{levelId}")
    public ResponseEntity<ResponseObject<?>> deleteLevel(
            @PathVariable("levelId") Long levelId) {
        try {
            levelService.getLevelAndLanguageById(levelId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ResponseObject<>("400", "Level not found", null, e.getMessage()));
        }
        levelService.deleteLevel(levelId);
        return ResponseEntity.ok(
                new ResponseObject<>("200", "Level deleted", null, null));
    }
}
