// ==UserScript==
// @name         LeetCode JetBrains Mono Font
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Changes code font on LeetCode to JetBrains Mono
// @author       You
// @match        https://*.leetcode.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leetcode.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap';
    document.head.appendChild(fontLink);

    function applyJetBrainsMono() {
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
                font-family: 'JetBrains Mono', monospace !important;
                font-feature-settings: 'liga' 0 !important;
            }
            
            .monaco-editor .view-lines span {
                font-family: 'JetBrains Mono', monospace !important;
            }
            
            .content__1Y2H code {
                font-family: 'JetBrains Mono', monospace !important;
            }
        `;
        document.head.appendChild(customCSS);
    }

    applyJetBrainsMono();

    const observer = new MutationObserver(function() {
        applyJetBrainsMono();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    window.addEventListener('load', function() {
        setTimeout(applyJetBrainsMono, 1000);
    });
})();
