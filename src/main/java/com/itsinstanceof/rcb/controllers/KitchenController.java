package com.itsinstanceof.rcb.controllers;

import com.itsinstanceof.rcb.entities.Ingredient;
import com.itsinstanceof.rcb.misc.Utils;
import com.itsinstanceof.rcb.repositories.IngredientRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/kitchen")
public class KitchenController {

    private final IngredientRepository ingredientRepository;

    @Autowired
    public KitchenController(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    @GetMapping(value = "/ingredients")
    public ResponseEntity getIngredients(@RequestParam(defaultValue = "") String name,
                                                   @PageableDefault(size = 20) Pageable pageable) {
        try {
            String normalizedName = Utils.normalizeString(name);
            if (normalizedName.length() < 2) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            List<Ingredient> ingredientsToSend = ingredientRepository
                    .findByApprovedTrueAndNameContainingIgnoreCaseOrderByPriorityDesc(normalizedName, pageable);
            if (ingredientsToSend.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
            return ResponseEntity.status(HttpStatus.OK).body(ingredientsToSend);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(value = "/ingredients")
    public ResponseEntity suggestIngredient(@RequestBody Ingredient ingredient) {
        try {
            String normalizedName = Utils.normalizeString(ingredient.getName());
            ingredient.setName(normalizedName.substring(0, 1).toUpperCase() + normalizedName.substring(1));
            if (!Utils.isValid(ingredient)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            Ingredient ingredientToUpdate = ingredientRepository.findByName(ingredient.getName());
            if (ingredientToUpdate == null) {
                ingredientRepository.save(ingredient);
                return ResponseEntity.status(HttpStatus.CREATED).build();
            } else {
                if (!ingredientToUpdate.isApproved()) {
                    ingredientToUpdate.setSuggestCounter(ingredientToUpdate.getSuggestCounter() + 1);
                    ingredientRepository.save(ingredientToUpdate);
                }
                return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).build();
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
