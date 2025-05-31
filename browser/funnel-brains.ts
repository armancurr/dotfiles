// ==UserScript==
// @name         GitHub JetBrains Mono Nerd Font
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Changes code font on GitHub to JetBrains Mono (including code editing)
// @author       You
// @match        https://github.com/*
// @match        https://gist.github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function applyJetBrainsMonoFont() {
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
          font-family: 'JetBrains Mono', monospace !important;
      }

      /* Editor in-place edit mode */
      .js-file-line-container [role="textbox"],
      .js-blob-code [role="textbox"],
      .blob-code-content [role="textbox"] {
          font-family: 'JetBrains Mono', monospace !important;
      }
    `;
    document.head.appendChild(customCSS);
  }

  applyJetBrainsMonoFont();

  const observer = new MutationObserver(function (mutations) {
    let shouldUpdate = false;
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        shouldUpdate = true;
        break;
      }
    }
    if (shouldUpdate) {
      applyJetBrainsMonoFont();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener("load", function () {
    setTimeout(applyJetBrainsMonoFont, 1000);
  });

  document.addEventListener("pjax:end", function () {
    setTimeout(applyJetBrainsMonoFont, 200);
  });
})();

// ==UserScript==
// @name         LeetCode JetBrains Mono Nerd Font
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Changes code font on LeetCode to JetBrains Mono
// @author       You
// @match        https://*.leetcode.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leetcode.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function applyJetBrainsMonoFont() {
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
      ${codeElements.join(", ")} {
          font-family: 'JetBrains Mono', monospace !important;
          font-feature-settings: 'liga' 0 !important;
      }
      .monaco-editor .view-lines span {
          font-family: 'JetBrains Mono', monospace !important;
      }
      .content__1Y2H code {
          font-family: 'JetBrains Mono', monospace !important;
      }

      /* Additional LeetCode-specific selectors for the Monaco editor */
      .view-line span,
      .mtk1, .mtk2, .mtk3, .mtk4, .mtk5, .mtk6, .mtk7, .mtk8, .mtk9,
      .monaco-scrollable-element {
          font-family: 'JetBrains Mono', monospace !important;
      }
    `;
    document.head.appendChild(customCSS);
  }

  applyJetBrainsMonoFont();

  const observer = new MutationObserver(function () {
    applyJetBrainsMonoFont();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener("load", function () {
    setTimeout(applyJetBrainsMonoFont, 1000);
  });
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
