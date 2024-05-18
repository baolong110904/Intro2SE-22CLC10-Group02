package com.g2.lls.controllers;

import com.g2.lls.dtos.LevelDTO;
import com.g2.lls.objects.ResponseObject;
import com.g2.lls.services.LevelService;
import com.github.javafaker.Faker;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.v1}/levels")
@RequiredArgsConstructor
public class LevelController {
    private final LevelService levelService;
    private final Faker faker;

    @PostMapping("")
    public ResponseEntity<ResponseObject> createLevel(
            @Valid @RequestBody LevelDTO levelDTO,
            BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(DefaultMessageSourceResolvable::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(
                        new ResponseObject("400", "Level creation failed", errorMessages));
            }
            return ResponseEntity.ok(
                    new ResponseObject("201", "Created level", levelService.createLevel(levelDTO)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ResponseObject("400", e.getMessage(), null));
        }
    }

    @GetMapping("/{levelId}")
    public ResponseEntity<ResponseObject> getLevelAndLanguageById(
            @PathVariable("levelId") Long levelId) {
        try {
            return ResponseEntity.ok(
                    new ResponseObject("200", "Retrieved level", levelService.getLevelAndLanguageById(levelId)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("400", e.getMessage(), null));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseObject> getAllLevelsAndLanguages() {
        return ResponseEntity.ok(
                new ResponseObject("200", "Retrieved all levels", levelService.getAllLevelsAndLanguages()));
    }

    @PutMapping("/{levelId}")
    public ResponseEntity<ResponseObject> updateLevel(
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
                        new ResponseObject("400", "Level update failed", errorMessages));
            }
            return ResponseEntity.ok(
                    new ResponseObject("200", "Updated level", levelService.updateLevel(levelId, levelDTO)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ResponseObject("400", e.getMessage(), null));
        }
    }

    @DeleteMapping("/{levelId}")
    public ResponseEntity<ResponseObject> deleteLevel(
            @PathVariable("levelId") Long levelId) {
        try {
            levelService.getLevelAndLanguageById(levelId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ResponseObject("400", e.getMessage(), null));
        }
        levelService.deleteLevel(levelId);
        return ResponseEntity.ok(new ResponseObject("200", "Level deleted", null));
    }
}
