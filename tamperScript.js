// ==UserScript==
// @name         Change Font on 10fastfingers.com and Programiz.com
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Change the font to Geist Mono on 10fastfingers.com and programiz.com
// @author       You
// @match        https://10fastfingers.com/*
// @match        https://www.programiz.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Define the font family you want to use
    const fontFamily = 'Geist Mono, monospace';

    // Create a style element
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        * {
            font-family: ${fontFamily} !important;
        }
    `;

    // Append the style element to the document head
    document.head.appendChild(style);
})();
