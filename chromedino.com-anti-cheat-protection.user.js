// ==UserScript==
// @name         Anti ChromeDino Anti Cheat TusDino Addon
// @namespace    https://github.com/inon-13/TusDino
// @homepageURL  https://github.com/inon-13/TusDino
// @supportURL  https://github.com/inon-13/TusDino/issues
// @version      1.0
// @description Blocks scores on https://chromedino.com/ with above 20000 score to protect from the antiCheat
// @author       inon13
// @match        https://chromedino.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    alert("Anti ChromeDino Anti Cheat is enabled! whenever you pass 19999 it will still show as you progress but it only shows 19999 to other people, so you won't get banned from the stupid 20000 antiCCheat");

    const originalFetch = window.fetch;
    const originalXHR = window.XMLHttpRequest;

    window.fetch = (...args) => {
        const url = args[0];
        if (typeof url === 'string' && url.match(/\d{5,}$/)) {
            const modifiedUrl = url.replace(/\d{5,}$/, '19999');
            console.warn(`Modified request: ${modifiedUrl}`);
            return originalFetch(modifiedUrl);
        }
        return originalFetch(...args);
    };

    window.XMLHttpRequest = class extends originalXHR {
        open(method, url) {
            if (url.match(/\d{5,}$/)) {
                const modifiedUrl = url.replace(/\d{5,}$/, '19999');
                console.warn(`Modified request: ${modifiedUrl}`);
                super.open(method, modifiedUrl);
            } else {
                super.open(method, url);
            }
        }
    };
})();
