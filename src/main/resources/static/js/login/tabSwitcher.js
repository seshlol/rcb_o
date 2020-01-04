'use strict';

(function () {
    document.addEventListener('DOMContentLoaded', function () {

        const tabs = document.querySelector('.tabs').children;
        const forms = document.querySelectorAll('.box form');
        const tabsToForms = new Map();
        let enabled = document.querySelector('.enabled');

        const switchTab = (e) => {
            const tar = e.target;
            if (!tar.classList.contains('enabled')) {

                enabled.classList.remove('enabled');
                enabled.classList.add('disabled');
                tabsToForms.get(enabled).classList.add('hidden');

                tar.classList.remove('disabled');
                tar.classList.add('enabled');
                tabsToForms.get(tar).classList.remove('hidden');
                enabled = tar;
            }
        };

        for (let i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener('click', switchTab);
            tabsToForms.set(tabs[i], forms[i]);
        }
    });
})();

