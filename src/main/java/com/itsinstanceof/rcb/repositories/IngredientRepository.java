package com.itsinstanceof.rcb.repositories;

import com.itsinstanceof.rcb.entities.Ingredient;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends CrudRepository<Ingredient, Long> {

    Ingredient findByName(String name);

    List<Ingredient> findByApprovedTrueAndNameContainingIgnoreCaseOrderByPriorityDesc(String name, Pageable pageable);
}
