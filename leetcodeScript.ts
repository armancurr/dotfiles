// ==UserScript==
// @name         LeetCode Lilex Nerd Font Mono
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Changes code font on LeetCode to Lilex Nerd Font Mono
// @author       You
// @match        https://*.leetcode.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leetcode.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // If you have a web-hosted stylesheet for Lilex Nerd Font Mono, uncomment and
  // update the code below. Otherwise, if you rely on a local installation, you
  // can remove or comment out this section.
  // const fontLink = document.createElement("link");
  // fontLink.rel = "stylesheet";
  // fontLink.href = "https://your-hosted-source-for-lilex-nerd-font-mono.css";
  // document.head.appendChild(fontLink);

  function applyLilexNerdFontMono() {
    const codeElements = [
      ".monaco-editor",
      ".CodeMirror",
      "code",
      "pre",
      ".CodeMirror-code",
      ".monaco-editor-background",
      ".monaco-editor .view-lines",
      ".monaco-editor .view-line",
      ".cm-s-leetcode",
      ".mtk1"
    ];

    const customCSS = document.createElement("style");
    customCSS.textContent = `
      ${codeElements.join(", ")} {
          font-family: 'Lilex Nerd Font Mono', monospace !important;
          font-feature-settings: 'liga' 0 !important;
      }
      .monaco-editor .view-lines span {
          font-family: 'Lilex Nerd Font Mono', monospace !important;
      }
      .content__1Y2H code {
          font-family: 'Lilex Nerd Font Mono', monospace !important;
      }

      /* Additional LeetCode-specific selectors for the Monaco editor */
      .view-line span,
      .mtk1, .mtk2, .mtk3, .mtk4, .mtk5, .mtk6, .mtk7, .mtk8, .mtk9,
      .monaco-scrollable-element {
          font-family: 'Lilex Nerd Font Mono', monospace !important;
      }
    `;
    document.head.appendChild(customCSS);
  }

  applyLilexNerdFontMono();

  const observer = new MutationObserver(function () {
    applyLilexNerdFontMono();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  window.addEventListener("load", function () {
    setTimeout(applyLilexNerdFontMono, 1000);
  });
})();
