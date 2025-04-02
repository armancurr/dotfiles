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

    // First, load JetBrains Mono from Google Fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap';
    document.head.appendChild(fontLink);

    // Function to apply the font
    function applyJetBrainsMono() {
        // Style for the main code editor
        const codeElements = [
            '.monaco-editor', // Monaco editor
            '.CodeMirror', // CodeMirror (if used)
            'code',
            'pre',
            '.CodeMirror-code',
            '.monaco-editor-background',
            '.monaco-editor .view-lines',
            '.monaco-editor .view-line',
            '.cm-s-leetcode',
            '.mtk1' // Monaco editor text tokens
        ];

        const customCSS = document.createElement('style');
        customCSS.textContent = `
            ${codeElements.join(', ')} {
                font-family: 'JetBrains Mono', monospace !important;
                font-feature-settings: 'liga' 0 !important;
            }

            /* Target the actual code content inside the editor */
            .monaco-editor .view-lines span {
                font-family: 'JetBrains Mono', monospace !important;
            }

            /* Code snippets in problem descriptions */
            .content__1Y2H code {
                font-family: 'JetBrains Mono', monospace !important;
            }
        `;
        document.head.appendChild(customCSS);
    }

    // Apply immediately
    applyJetBrainsMono();

    // Observer to handle dynamic content loading
    const observer = new MutationObserver(function(mutations) {
        applyJetBrainsMono();
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Re-apply after editor is fully loaded
    window.addEventListener('load', function() {
        setTimeout(applyJetBrainsMono, 1000);
    });
})();
