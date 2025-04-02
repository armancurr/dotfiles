// ==UserScript==
// @name         LeetCode Geist Mono Font
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Changes code font on LeetCode to Geist Mono
// @author       You
// @match        https://*.leetcode.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leetcode.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&display=swap';
    document.head.appendChild(fontLink);

    function applyGeistMono() {
        const codeElements = [
            '.monaco-editor',
            '.CodeMirror',
            'code',
            'pre',
            '.CodeMirror-code',
            '.monaco-editor-background',
            '.monaco-editor .view-lines',
            '.monaco-editor .view-line',
            '.cm-s-leetcode',
            '.mtk1'
        ];

        const customCSS = document.createElement('style');
        customCSS.textContent = `
            ${codeElements.join(', ')} {
                font-family: 'Geist Mono', monospace !important;
                font-feature-settings: 'liga' 0 !important;
            }
            .monaco-editor .view-lines span {
                font-family: 'Geist Mono', monospace !important;
            }
            .content__1Y2H code {
                font-family: 'Geist Mono', monospace !important;
            }

            /* Additional LeetCode specific selectors for Monaco editor */
            .view-line span,
            .mtk1, .mtk2, .mtk3, .mtk4, .mtk5, .mtk6, .mtk7, .mtk8, .mtk9,
            .monaco-scrollable-element {
                font-family: 'Geist Mono', monospace !important;
            }
        `;
        document.head.appendChild(customCSS);
    }

    applyGeistMono();

    const observer = new MutationObserver(function() {
        applyGeistMono();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    window.addEventListener('load', function() {
        setTimeout(applyGeistMono, 1000);
    });
})();
