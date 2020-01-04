package com.itsinstanceof.rcb.misc;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.Set;

public class Utils {

    private static final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    public static <T> boolean isValid(T t) {
        Set<ConstraintViolation<T>> violations = validator.validate(t);
        return violations.isEmpty();
    }

    public static String normalizeString(String text) {
        return text.replaceAll("\\s+", " ").trim().toLowerCase();
    }
}
