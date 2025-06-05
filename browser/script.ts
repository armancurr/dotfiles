// ==UserScript==
// @name         Cursor.com Font Customizer (Funnel Sans & Geist Mono)
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Sets sans-serif font to "Funnel Sans" and monospace font to "Geist Mono" on www.cursor.com. Ensure fonts are installed locally.
// @author       T3 Chat
// @match        https://www.cursor.com/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  const css = `
    /*
     * IMPORTANT:
     * You MUST have "Funnel Sans" and "Geist Mono" installed on your system
     * for this script to work as intended.
     */

    /* General Sans-Serif Override */
    body, button, input, select, optgroup, textarea,
    h1, h2, h3, h4, h5, h6, p, a, li, span, div,
    label, legend, caption, th, td,
    .font-sans, /* Common utility class */
    [class*="sans"], /* Elements with "sans" in their class */
    [style*="font-family"]:not([style*="monospace"]):not([style*="mono"]):not([style*="Courier"]):not([style*="Consolas"]) /* Catch inline styles, try not to override mono */
    {
        font-family: "Funnel Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif !important;
    }

    /* Monospace Override - targeting common elements and potential editor classes */
    pre, code, kbd, samp,
    textarea[class*="mono"], /* Textareas styled as mono */
    .monaco-editor, .monaco-mouse-cursor-text, /* VS Code based editor classes (Cursor uses this) */
    .CodeMirror, /* CodeMirror editor classes */
    .ace_editor, /* Ace editor classes */
    .jetbrains-mono, .source-code-pro, /* Font specific classes sometimes used */
    .font-mono, /* Common utility class */
    [class*="mono"], /* Elements with "mono" in their class */
    [style*="font-family: monospace"],
    [style*="font-family: mono"],
    [style*="font-family: Courier"],
    [style*="font-family: Consolas"]
    {
        font-family: "Geist Mono", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace !important;
    }

    /*
     * If cursor.com uses CSS Custom Properties (variables) for fonts,
     * overriding them would be cleaner. You'd need to inspect their CSS
     * to find the variable names. Example:
     * :root {
     *   --cursor-font-family-sans: "Funnel Sans", sans-serif !important;
     *   --cursor-font-family-mono: "Geist Mono", monospace !important;
     * }
     */
  `;

  GM_addStyle(css);

  // Optional: Log to console to confirm script execution
  console.log(
    "Cursor.com Font Customizer: Applied Funnel Sans & Geist Mono styles.",
  );
})();

// ==UserScript==
// @name         GitHub Geist Mono Nerd Font
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Changes code font on GitHub to Geist Mono (including code editing)
// @author       You (Modified by T3 Chat)
// @match        https://github.com/*
// @match        https://gist.github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function applyGeistMonoFont() {
    const customCSS = document.createElement("style");
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
          font-family: 'Geist Mono', monospace !important;
          font-feature-settings: 'liga' 0 !important; /* Consider if Geist Mono needs ligatures enabled or disabled */
      }

      /* Ensure all editor views use the font */
      .react-code-view .react-code-line * {
          font-family: 'Geist Mono', monospace !important;
      }

      /* GitHub's newer code view */
      .react-blob-view-header-sticky {
          --h-code-font: 'Geist Mono', monospace !important;
      }

      /* GitHub's CSS variables */
      :root {
          --mono-font: 'Geist Mono', monospace !important;
      }

      /* Code editing elements */
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
          font-family: 'Geist Mono', monospace !important;
      }

      /* Editor in-place edit mode */
      .js-file-line-container [role="textbox"],
      .js-blob-code [role="textbox"],
      .blob-code-content [role="textbox"] {
          font-family: 'Geist Mono', monospace !important;
      }
    `;
    // Remove existing style if it exists to prevent multiple appends
    const existingStyle = document.getElementById("geist-mono-github-style");
    if (existingStyle) {
      existingStyle.remove();
    }
    customCSS.id = "geist-mono-github-style";
    document.head.appendChild(customCSS);
  }

  applyGeistMonoFont();

  // Re-apply on DOM changes, common for SPAs like GitHub
  const observer = new MutationObserver(function (mutations) {
    // More targeted check could be added here if performance becomes an issue
    applyGeistMonoFont();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Re-apply after full page load and PJAX navigation
  window.addEventListener("load", function () {
    setTimeout(applyGeistMonoFont, 500); // Delay to ensure page elements are ready
  });

  document.addEventListener("pjax:end", function () {
    setTimeout(applyGeistMonoFont, 200); // PJAX navigation is usually faster
  });
})();

// ==UserScript==
// @name         LeetCode Geist Mono Nerd Font
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Changes code font on LeetCode to Geist Mono
// @author       You (Modified by T3 Chat)
// @match        https://*.leetcode.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leetcode.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function applyGeistMonoFont() {
    const codeElements = [
      ".monaco-editor", // Base Monaco editor container
      ".CodeMirror", // Base CodeMirror container
      "code", // Inline code and generic code blocks
      "pre", // Preformatted text blocks
      ".CodeMirror-code", // CodeMirror inner code area
      ".monaco-editor-background", // Monaco editor background
      ".monaco-editor .view-lines", // Monaco editor lines container
      ".monaco-editor .view-line", // Individual line in Monaco
      ".cm-s-leetcode", // LeetCode's CodeMirror theme
      ".mtk1", // Common token class in Monaco
      // Add other specific LeetCode editor classes if needed
    ];

    const customCSS = document.createElement("style");
    customCSS.textContent = `
      ${codeElements.join(",\n      ")} {
          font-family: 'Geist Mono', monospace !important;
          font-feature-settings: 'liga' 0 !important; /* Adjust if Geist Mono handles ligatures differently or if you prefer them */
      }

      /* Ensure spans within Monaco editor lines also get the font */
      .monaco-editor .view-lines span,
      .monaco-editor .view-line span {
          font-family: 'Geist Mono', monospace !important;
      }

      /* Specific selector for code blocks within LeetCode content areas */
      .content__1Y2H code, /* Example of a LeetCode specific class, might change */
      .description__24sA code /* Another example for problem descriptions */
      {
          font-family: 'Geist Mono', monospace !important;
      }

      /* Additional LeetCode-specific selectors for the Monaco editor parts */
      .view-line span, /* Catch-all for spans within a view line */
      .mtk1, .mtk2, .mtk3, .mtk4, .mtk5, .mtk6, .mtk7, .mtk8, .mtk9, /* Monaco token classes */
      .monaco-scrollable-element .lines-content .view-line /* More specific path to view lines */
      {
          font-family: 'Geist Mono', monospace !important;
      }

      /* Target textareas that might be used for code input */
      textarea.ace_text-input,
      textarea.inputarea {
          font-family: 'Geist Mono', monospace !important;
      }
    `;

    // Remove existing style if it exists to prevent multiple appends
    const existingStyle = document.getElementById("geist-mono-leetcode-style");
    if (existingStyle) {
      existingStyle.remove();
    }
    customCSS.id = "geist-mono-leetcode-style";
    document.head.appendChild(customCSS);
  }

  applyGeistMonoFont();

  // Re-apply on DOM changes, as LeetCode dynamically loads content
  const observer = new MutationObserver(function (mutations) {
    // A more sophisticated check could be to see if relevant editor nodes were added
    applyGeistMonoFont();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Re-apply after full page load
  window.addEventListener("load", function () {
    setTimeout(applyGeistMonoFont, 1000); // Longer delay for LeetCode as it can be heavy
  });

  // LeetCode might use client-side routing or dynamic content loading without full page reloads.
  // If font changes revert, you might need to listen to other events or use a more robust
  // way to detect when the editor is re-rendered.
  // For example, if LeetCode uses React Router, you might need a different event.
})();

// ==UserScript==
// @name         LinkedIn Funnel Sans Font
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Changes all fonts on LinkedIn to Funnel Sans
// @author       You
// @match        https://*.linkedin.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=linkedin.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function applyFunnelSans() {
    const customCSS = document.createElement("style");
    customCSS.textContent = `
      html, body, div, span, applet, object, iframe,
      h1, h2, h3, h4, h5, h6, p, blockquote, pre,
      a, abbr, acronym, address, big, cite, code,
      del, dfn, em, img, ins, kbd, q, s, samp,
      small, strike, strong, sub, sup, tt, var,
      b, u, i, center,
      dl, dt, dd, ol, ul, li,
      fieldset, form, label, legend,
      table, caption, tbody, tfoot, thead, tr, th, td,
      article, aside, canvas, details, embed,
      figure, figcaption, footer, header, hgroup,
      menu, nav, output, ruby, section, summary,
      time, mark, audio, video, input, textarea, button {
        font-family: 'Funnel Sans', -apple-system,
          BlinkMacSystemFont, sans-serif !important;
      }

      :root {
        --artdeco-reset-typography-font-family-sans: 'Funnel Sans',
          -apple-system, BlinkMacSystemFont, sans-serif !important;
        --global-primary-font-family: 'Funnel Sans',
          -apple-system, BlinkMacSystemFont, sans-serif !important;
        --artdeco-typography-font-family-stack: 'Funnel Sans',
          -apple-system, BlinkMacSystemFont, sans-serif !important;
        --font-family: 'Funnel Sans', -apple-system,
          BlinkMacSystemFont, sans-serif !important;
      }

      .artdeco-button,
      .feed-shared-text,
      .feed-shared-text-view,
      .feed-shared-actor__title,
      .feed-shared-actor__description,
      .t-16,
      .t-14,
      .t-12,
      .t-bold,
      .scaffold-layout__main,
      .app-aware-link,
      .artdeco-card {
        font-family: 'Funnel Sans', -apple-system,
          BlinkMacSystemFont, sans-serif !important;
      }

      .msg-form__contenteditable,
      .msg-s-event-listitem__body {
        font-family: 'Funnel Sans', -apple-system,
          BlinkMacSystemFont, sans-serif !important;
      }

      input,
      .search-global-typeahead__input {
        font-family: 'Funnel Sans', -apple-system,
          BlinkMacSystemFont, sans-serif !important;
      }
    `;
    document.head.appendChild(customCSS);
  }

  applyFunnelSans();

  const observer = new MutationObserver(applyFunnelSans);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener("load", () => {
    setTimeout(applyFunnelSans, 1000);
  });
})();
