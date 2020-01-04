'use strict';

export default (button, input, placeholderValue, timeout = 0) => {
    if (button.disabled) {
        button.querySelector('.loading-animation').classList.add('hidden');
        button.querySelector('span').classList.remove('hidden');
        setTimeout(() => {
            input.placeholder = placeholderValue;
        }, timeout);
        setTimeout(() => {
            button.disabled = false;
        }, 1000)
    } else {
        button.disabled = true;
        button.querySelector('span').classList.add('hidden');
        button.querySelector('.loading-animation').classList.remove('hidden');
        input.value = '';
        input.placeholder = placeholderValue;
    }
}
