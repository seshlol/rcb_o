'use strict';

import fetchWithTimeout from '../misc/fetchWithTimeout.js';
import changeFormState from '../misc/changeFormState.js';
import setPlaceholderDefinedByHttpStatus from '../misc/setPlaceholderDefinedByStatus.js';

(function () {

    document.addEventListener('DOMContentLoaded', () => {
        const WAITING_FOR_RESPONSE = 'waiting for response';
        const INGREDIENT_TAG = 'ingredient';

        const searchButton = document.querySelector('.search > button');
        const searchInput = document.querySelector('.search > input');
        const ingredientsList = document.querySelector('.list > ul');
        const ingredientInfo = document.querySelector('.info > .box');
        const liToJson = new Map();

        const clearList = () => {
            let previousFoundIngredients = ingredientsList.querySelectorAll('li');
            for (let i = 0; i < previousFoundIngredients.length; i++) {
                previousFoundIngredients[i].remove();
                liToJson.delete(previousFoundIngredients[i])
            }
        };

        document.querySelector('.search').addEventListener('submit', e => {
            e.preventDefault();
            clearList();
            if (!ingredientInfo.classList.contains('hidden')) {
                ingredientInfo.classList.add('hidden');
            }

            const search = searchInput.value;
            changeFormState(searchButton, searchInput, WAITING_FOR_RESPONSE);
            let jsonData;
            fetchWithTimeout(window.location.href + `/ingredients?name=${encodeURIComponent(search)}`, {
                method: 'GET',
            }, 8000)
                .then((response) => {
                    setPlaceholderDefinedByHttpStatus(response.status, searchInput);
                    if (response.status === 200) {
                        return response.json();
                    }
                })
                .then((json) => {
                    jsonData = json;
                    if (jsonData) {
                        for (const ingredient of jsonData) {
                            let liIngredient = ingredientsList.querySelector('template')
                                .content.querySelector('li').cloneNode(true);
                            liIngredient.querySelector('img').setAttribute('src', ingredient.iconPath);
                            liIngredient.querySelector('div > strong').textContent = ingredient.name;
                            liIngredient.querySelector('div > span').textContent = ingredient.shortDescription;
                            ingredientsList.appendChild(liIngredient);
                            liToJson.set(liIngredient, ingredient);
                        }
                    }
                })
                .catch(() => {
                    searchInput.placeholder = 'unexpected error';
                })
                .then(() => {
                    const timeout = (jsonData) ? 0 : 2000;
                    changeFormState(searchButton, searchInput, INGREDIENT_TAG, timeout);
                })
        });

        ingredientsList.addEventListener('click', e => {
            if (e.target === ingredientsList) {
                return;
            }
            let li = e.target.closest('li');
            let jsonIngredient = liToJson.get(li);
            ingredientInfo.querySelector('.icon').setAttribute('src', jsonIngredient.iconPath);
            ingredientInfo.querySelector('.name').textContent = jsonIngredient.name;
            ingredientInfo.querySelector('.carbohydrates').textContent = 'Carbohydrates: ' + jsonIngredient.carbohydrates;
            ingredientInfo.querySelector('.proteins').textContent = 'Proteins: ' + jsonIngredient.proteins;
            ingredientInfo.querySelector('.fats').textContent = 'Fats: ' + jsonIngredient.fats;
            ingredientInfo.querySelector('.calories').textContent = 'Calories: ' + jsonIngredient.calories;
            ingredientInfo.querySelector('.text').textContent = jsonIngredient.fullDescription;

            if (ingredientInfo.classList.contains('hidden')) {
                ingredientInfo.classList.remove('hidden');
            }
            document.querySelector('.info').scrollTo(0, 0);
        }, true)
    });
})();
