package com.itsinstanceof.rcb.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank
    @Size(min = 2, max = 63)
    @Column(unique = true)
    @EqualsAndHashCode.Include
    private String name;

    private float carbohydrates;

    private float proteins;

    private float fats;

    private float calories;

    @Size(max = 63)
    private String shortDescription;

    @Size(max = 1023)
    private String fullDescription;

    private int priority;

    private String iconPath;

    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDateTime = new Date();

    private long suggestCounter = 1;

    private boolean approved = false;
}
