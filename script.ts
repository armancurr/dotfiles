// ==UserScript==
// @name         Universal Font Overrider
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Forcefully sets fonts across specified websites to SF Pro Display and SF Mono. Handles dynamic content, iframes, and shadow DOM.
// @author       T3 Chat & You
// @match        https://www.cursor.com/*
// @match        https://www.google.com/*
// @match        https://www.youtube.com/*
// @match        https://*.linkedin.com/*
// @match        https://x.com/*
// @match        https://mail.google.com/*
// @match        https://mail.proton.me/*
// @match        https://cloudinary.com/*
// @match        https://0.email/*
// @match        https://www.reddit.com/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  const SANS_FONT_STACK =
    `"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  const MONO_FONT_STACK =
    `"SF Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;

  const masterCss = `
    :root {
      --font-sans: ${SANS_FONT_STACK} !important;
      --font-mono: ${MONO_FONT_STACK} !important;
      --cursor-font-family-sans: ${SANS_FONT_STACK} !important;
      --cursor-font-family-mono: ${MONO_FONT_STACK} !important;
      --artdeco-reset-typography-font-family-sans: ${SANS_FONT_STACK} !important;
      --global-primary-font-family: ${SANS_FONT_STACK} !important;
    }

    * {
      font-family: ${SANS_FONT_STACK} !important;
    }

    pre, code, kbd, samp, tt,
    .font-mono, [class*="mono"],
    .monaco-editor, .monaco-mouse-cursor-text, .cm-editor, .cm-content,
    textarea[class*="mono"], textarea[class*="code"],
    [class*="code"], .monospace, .monospace-type {
      font-family: ${MONO_FONT_STACK} !important;
    }
  `;

  const injectStylesInto = (rootNode) => {
    if (rootNode) {
      const styleElement = document.createElement("style");
      styleElement.textContent = masterCss;
      rootNode.appendChild(styleElement);
    }
  };

  const processNode = (node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const elementsToScan = [node, ...node.querySelectorAll("*")];
    elementsToScan.forEach((el) => {
      if (el.tagName === "IFRAME") {
        el.addEventListener(
          "load",
          () => {
            try {
              injectStylesInto(el.contentDocument.head);
            } catch (e) {}
          },
          { once: true },
        );
      }
      if (el.shadowRoot) {
        injectStylesInto(el.shadowRoot);
      }
    });
  };

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const addedNode of mutation.addedNodes) {
        processNode(addedNode);
      }
    }
  });

  const startObserver = () => {
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
      console.log(
        "Universal Font Overrider: Observer is active on",
        window.location.hostname,
      );
    }
  };

  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    startObserver();
  } else {
    document.addEventListener("DOMContentLoaded", startObserver, { once: true });
  }
})();

// ==UserScript==
// @name         GitHub SF Mono Nerd Font
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Changes code font on GitHub to SF Mono (including code editing) using font stacks
// @author       You (Modified by T3 Chat)
// @match        https://github.com/*
// @match        https://gist.github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const SF_MONO_STACK =
    `"SF Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;

  function applySFMonoFont() {
    const customCSS = document.createElement("style");
    customCSS.textContent = `
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
          font-family: ${SF_MONO_STACK} !important;
          font-feature-settings: 'liga' 0 !important;
      }

      .react-code-view .react-code-line * {
          font-family: ${SF_MONO_STACK} !important;
      }

      .react-blob-view-header-sticky {
          --h-code-font: ${SF_MONO_STACK} !important;
      }

      :root {
          --mono-font: ${SF_MONO_STACK} !important;
      }

      .CodeMirror,
      .CodeMirror-lines,
      .CodeMirror textarea,
      .CodeMirror pre.CodeMirror-line,
      .CodeMirror pre.CodeMirror-line-like,
      .CodeMirror-linenumber,
      .monaco-editor .view-lines,
      .monaco-editor .view-line,
      .monaco-editor .margin-view-overlays .line-numbers,
      .monaco-editor-background,
      .monaco-editor .inputarea,
      .monaco-editor .editor-widget,
      textarea.file-editor-textarea,
      textarea.commit-create,
      textarea.js-comment-field,
      .commit-create-textarea,
      .edit-file-textarea,
      div[contenteditable="true"] {
          font-family: ${SF_MONO_STACK} !important;
      }

      .js-file-line-container [role="textbox"],
      .js-blob-code [role="textbox"],
      .blob-code-content [role="textbox"] {
          font-family: ${SF_MONO_STACK} !important;
      }
    `;

    const existingStyle = document.getElementById("sf-mono-github-style");
    if (existingStyle) {
      existingStyle.remove();
    }
    customCSS.id = "sf-mono-github-style";
    document.head.appendChild(customCSS);
  }

  applySFMonoFont();

  const observer = new MutationObserver(function (mutations) {
    applySFMonoFont();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener("load", function () {
    setTimeout(applySFMonoFont, 500);
  });

  document.addEventListener("pjax:end", function () {
    setTimeout(applySFMonoFont, 200);
  });
})();

// ==UserScript==
// @name         LeetCode SF Mono Nerd Font
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Changes code font on LeetCode to SF Mono using a font stack for better compatibility.
// @author       You (Modified by T3 Chat)
// @match        https://*.leetcode.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leetcode.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const SF_MONO_STACK =
    `"SF Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;

  function applySFMonoFont() {
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
      ".mtk1",
    ];

    const customCSS = document.createElement("style");
    customCSS.textContent = `
      ${codeElements.join(",\n      ")} {
          font-family: ${SF_MONO_STACK} !important;
          font-feature-settings: 'liga' 0 !important;
      }

      .monaco-editor .view-lines span,
      .monaco-editor .view-line span {
          font-family: ${SF_MONO_STACK} !important;
      }

      .content__1Y2H code,
      .description__24sA code
      {
          font-family: ${SF_MONO_STACK} !important;
      }

      .view-line span,
      .mtk1, .mtk2, .mtk3, .mtk4, .mtk5, .mtk6, .mtk7, .mtk8, .mtk9,
      .monaco-scrollable-element .lines-content .view-line
      {
          font-family: ${SF_MONO_STACK} !important;
      }

      textarea.ace_text-input,
      textarea.inputarea {
          font-family: ${SF_MONO_STACK} !important;
      }
    `;

    const existingStyle = document.getElementById("sf-mono-leetcode-style");
    if (existingStyle) {
      existingStyle.remove();
    }
    customCSS.id = "sf-mono-leetcode-style";
    document.head.appendChild(customCSS);
  }

  applySFMonoFont();

  const observer = new MutationObserver(function (mutations) {
    applySFMonoFont();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener("load", function () {
    setTimeout(applySFMonoFont, 1000);
  });
})();

// ==UserScript==
// @name         Keybr Font Override Advanced
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Advanced font override for keybr.com using local font stacks.
// @author       You
// @match        https://www.keybr.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const SF_PRO_DISPLAY_STACK =
    `"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  const SF_MONO_STACK =
    `"SF Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;

  function applyFonts() {
    const allElements = document.querySelectorAll("*");
    allElements.forEach((el) => {
      const computed = window.getComputedStyle(el);
      if (
        computed.fontFamily.includes("monospace") ||
        el.tagName === "PRE" ||
        el.tagName === "CODE" ||
        el.classList.toString().includes("typing") ||
        el.classList.toString().includes("lesson")
      ) {
        el.style.setProperty("font-family", SF_MONO_STACK, "important");
      } else {
        el.style.setProperty("font-family", SF_PRO_DISPLAY_STACK, "important");
      }
    });
  }

  setTimeout(applyFonts, 1000);

  const observer = new MutationObserver(applyFonts);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "style"],
  });
})();
