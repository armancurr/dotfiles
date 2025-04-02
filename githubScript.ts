// ==UserScript==
// @name         GitHub JetBrains Mono Font
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Changes code font on GitHub to JetBrains Mono
// @author       You
// @match        https://github.com/*
// @match        https://gist.github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap';
    document.head.appendChild(fontLink);

    function applyJetBrainsMono() {
        const customCSS = document.createElement('style');
        customCSS.textContent = `
            /* Code blocks and inline code */
            .highlight pre, 
            pre, 
            code, 
            .blob-code-inner,
            .CodeMirror-code,
            .CodeMirror pre,
            .CodeMirror-line,
            .cm-s-github-light,
            .markdown-body code,
            .markdown-body pre,
            .pl-c,
            .pl-s,
            .pl-k,
            .pl-e,
            .pl-en,
            .pl-smi,
            .pl-s .pl-s1,
            .cm-s-github .cm-string,
            .cm-s-github .cm-keyword,
            .cm-variable,
            .cm-variable-2,
            .cm-string,
            .cm-keyword,
            .blob-code span,
            code > span,
            .react-code-text,
            .react-code-line-contents,
            .react-file-line,
            .react-blob-print-hide {
                font-family: 'JetBrains Mono', monospace !important;
                font-feature-settings: 'liga' 0 !important;
            }
            
            /* Ensure all editor views use the font */
            .react-code-view .react-code-line * {
                font-family: 'JetBrains Mono', monospace !important;
            }
            
            /* GitHub's newer code view */
            .react-blob-view-header-sticky {
                --h-code-font: 'JetBrains Mono', monospace !important;
            }
            
            /* GitHub's CSS variables */
            :root {
                --mono-font: 'JetBrains Mono', monospace !important;
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
