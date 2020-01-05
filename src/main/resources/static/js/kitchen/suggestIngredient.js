'use strict';

import fetchWithTimeout from '../misc/fetchWithTimeout.js';
import changeFormState from '../misc/changeFormState.js';
import setPlaceholderMessage from '../misc/setPlaceholderDefinedByStatus.js';

(function () {
    const WAITING_FOR_RESPONSE = 'waiting for response';
    const INGREDIENT = 'ingredient';

    const suggestButton = document.querySelector('.suggest > button');
    const suggestInput = document.querySelector('.suggest > input');

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelector('.suggest').addEventListener('submit', (e) => {
            e.preventDefault();
            const suggestName = suggestInput.value;

            changeFormState(suggestButton, suggestInput, WAITING_FOR_RESPONSE, 2000);
            fetchWithTimeout(window.location.href + '/ingredients', {
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                body: JSON.stringify({name: suggestName})
            }, 8000)
                .then((response) => {
                    setPlaceholderMessage(response.status, suggestInput);
                })
                .catch(() => {
                    suggestInput.placeholder = 'unexpected error';
                })
                .then(() => {
                    changeFormState(suggestButton, suggestInput, INGREDIENT, 2000);
                });
        });
    });
})();