// ==UserScript==
// @name         Zen Themes CSS
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Apply custom CSS to all sites except monkeytype.com and perplexity.ai
// @match        http://*/*
// @match        https://*/*
// @exclude      http://monkeytype.com/*
// @exclude      https://monkeytype.com/*
// @exclude      http://perplexity.ai/*
// @exclude      https://perplexity.ai/*
// @grant        none
// ==/UserScript==
(function() {
   'use strict';

   // Check if we're not on excluded sites
   const excludedHosts = ['monkeytype.com', 'perplexity.ai'];
   if (!excludedHosts.includes(window.location.hostname)) {
       // Create a style element
       var style = document.createElement('style');
       style.type = 'text/css';
       style.innerHTML = `
           body, html {
               font-family: "SF Pro Display", sans-serif !important;
           }
           code, pre, kbd, samp, tt, .monospace {
               font-family: "JetBrains Mono", monospace !important;
           }
       `;

       // GitHub-specific styles
       if (window.location.hostname === 'github.com') {
           style.innerHTML += `
               .markdown-body:not(.js-code-block-container) {
                   font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif !important;
               }

               .markdown-body pre,
               .markdown-body code,
               .js-code-block-container {
                   font-family: "JetBrains Mono", ui-monospace, "SFMono-Regular", monospace !important;
               }
           `;
       }

       // Append the style element to the head
       document.head.appendChild(style);
   }
})();
