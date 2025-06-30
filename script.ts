// ==UserScript==
// @name         Font Overrider - GitHub
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Changes code font on GitHub to Geist Mono
// @author       You (Modified by T3 Chat)
// @match        https://github.com/*
// @match        https://gist.github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const SF_MONO_STACK =
    `"Geist Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;

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
// @name         Font Overrider - Leetcode
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Changes code font on LeetCode to Geist Mono
// @author       You (Modified by T3 Chat)
// @match        https://*.leetcode.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leetcode.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const SF_MONO_STACK =
    `"Geist Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;

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
// @name         Font Overrider - LinkedIn
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Overrides fonts on LinkedIn to Funnel Sans with Geist Mono fallback
// @author       T3 Chat
// @match        https://*.linkedin.com/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  // Font stacks - Funnel Sans for sans-serif, Geist Mono for monospace
  const SANS_FONT_STACK = `"Funnel Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  const MONO_FONT_STACK = `"Geist Mono", "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace`;

  const masterCss = `
    /* Root variables override */
    :root {
      --font-family-sans: ${SANS_FONT_STACK} !important;
      --font-family-mono: ${MONO_FONT_STACK} !important;
      --system-font-stack: ${SANS_FONT_STACK} !important;
    }

    /* Universal font override - sans-serif elements */
    *, *::before, *::after,
    html, body, div, span, p, h1, h2, h3, h4, h5, h6,
    a, button, input, textarea, select, label, option,
    article, section, nav, header, footer, main, aside,
    ul, ol, li, dl, dt, dd, blockquote, cite, time,
    .btn, .button, [role="button"], [type="button"],
    [type="submit"], [type="reset"], .artdeco-button,
    .feed-shared-text, .feed-shared-update-v2,
    .update-components-text, .break-words {
      font-family: ${SANS_FONT_STACK} !important;
    }

    /* LinkedIn-specific component overrides */
    .feed-shared-update-v2__description,
    .feed-shared-text__text-view,
    .attributed-text-segment-list__container,
    .update-components-text .break-words,
    .feed-shared-inline-show-more-text,
    .comments-comment-item__main-content,
    .comments-comment-texteditor,
    .feed-shared-actor__description,
    .feed-shared-actor__title,
    .feed-shared-header__text,
    .contextual-sign-in-modal__modal-dismiss-text,
    .search-result__wrapper,
    .entity-result__title-text,
    .entity-result__primary-subtitle,
    .entity-result__secondary-subtitle,
    .pv-text-details__left-panel h1,
    .text-heading-xlarge,
    .text-heading-large,
    .text-heading-medium,
    .text-heading-small,
    .text-body-large,
    .text-body-medium,
    .text-body-small,
    .messaging-conversation-listitem__participant-names,
    .msg-s-message-list__event,
    .msg-form__contenteditable,
    .msg-form__placeholder,
    .global-nav__primary-link-text,
    .global-nav__secondary-link-text,
    .artdeco-typeahead__input,
    .jobs-search-box__text-input,
    .jobs-details-top-card__job-title,
    .jobs-details-top-card__company-info,
    .job-details-jobs-unified-top-card__job-title,
    .job-details-jobs-unified-top-card__company-name,
    .scaffold-layout__content,
    .profile-rail-card__actor-link,
    .pv-entity__secondary-title,
    .lt-line-clamp,
    .feed-identity-module__actor-meta,
    .update-components-actor__meta,
    .update-components-actor__description,
    .share-box-feed-entry__trigger,
    .share-box-feed-entry__closed-share-box,
    .premium-upsell-link__premium-text,
    .artdeco-card,
    .artdeco-entity-lockup__title,
    .artdeco-entity-lockup__subtitle,
    .artdeco-entity-lockup__caption,
    .feed-shared-social-action-bar,
    .social-actions-button,
    .reactions-menu-item,
    .feed-shared-social-counts,
    .linkedin-tc-embed-LI,
    [data-test-id*="text"],
    [class*="text-"],
    [class*="font-"],
    [class*="typography-"] {
      font-family: ${SANS_FONT_STACK} !important;
    }

    /* Message and notification overrides */
    .msg-overlay-bubble-header__title,
    .msg-overlay-bubble-header__subtitle,
    .msg-conversation-listitem__participant-names,
    .msg-s-message-list-content,
    .msg-s-event-listitem__body,
    .notifications-container,
    .nt-card__text,
    .notification-card__text {
      font-family: ${SANS_FONT_STACK} !important;
    }

    /* Code and monospace elements */
    code, pre, kbd, samp, tt,
    .hljs, .code, .monospace,
    [class*="code"], [class*="mono"],
    .feed-shared-text code,
    .comments-comment-item code {
      font-family: ${MONO_FONT_STACK} !important;
    }

    /* Body and global overrides */
    body, body *,
    .application-outlet,
    .authentication-outlet,
    .extended-nav,
    .global-nav,
    .scaffold-layout,
    .scaffold-layout-toolbar,
    .scaffold-finite-scroll,
    .core-rail,
    .feed-container-theme,
    .feed-outlet,
    .artdeco-modal,
    .artdeco-dropdown,
    .artdeco-toast,
    .artdeco-spotlight-tab {
      font-family: ${SANS_FONT_STACK} !important;
    }

    /* Input and form elements */
    input:not([type="checkbox"]):not([type="radio"]),
    textarea, select, option,
    .artdeco-typeahead,
    .typeahead-results,
    .search-typeahead-v2,
    .typeahead-result,
    .ember-text-field,
    .artdeco-text-input,
    .form-element,
    .artdeco-textinput {
      font-family: ${SANS_FONT_STACK} !important;
    }

    /* Force override for stubborn elements */
    [style*="font-family"] {
      font-family: ${SANS_FONT_STACK} !important;
    }

    /* Preserve monospace for code elements even if they have inline styles */
    code[style*="font-family"],
    pre[style*="font-family"],
    .hljs[style*="font-family"] {
      font-family: ${MONO_FONT_STACK} !important;
    }
  `;

  GM_addStyle(masterCss);
  console.log("LinkedIn Font Override (Funnel Sans) Active");
})();

// ==UserScript==
// @name         Font Overrider - Reddit
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Aggressively overrides ALL fonts on Reddit to Funnel Sans
// @author       T3 Chat
// @match        https://*.reddit.com/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  const SANS_FONT_STACK = `"Funnel Sans", Inter, Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
  const MONO_FONT_STACK = `"Geist Mono", "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace`;

  const masterCss = `
    /* Root variable overrides */
    :root {
      --reddit-font-family: ${SANS_FONT_STACK} !important;
      --font-family-default: ${SANS_FONT_STACK} !important;
      --font-family-sans: ${SANS_FONT_STACK} !important;
      --font-family-mono: ${MONO_FONT_STACK} !important;
      --system-font-stack: ${SANS_FONT_STACK} !important;
      --primary-font: ${SANS_FONT_STACK} !important;
      --secondary-font: ${SANS_FONT_STACK} !important;
    }

    /* Universal override - maximum aggression */
    *, *::before, *::after,
    html, body, div, span, p, h1, h2, h3, h4, h5, h6,
    a, button, input, textarea, select, label, option,
    article, section, nav, header, footer, main, aside,
    ul, ol, li, dl, dt, dd, blockquote, cite, time,
    table, thead, tbody, tfoot, tr, td, th,
    form, fieldset, legend, canvas, svg, img,
    .btn, .button, [role="button"], [type="button"],
    [type="submit"], [type="reset"], .action-button {
      font-family: ${SANS_FONT_STACK} !important;
    }

    /* Reddit-specific class overrides */
    .Comment, .Post, .comment, .post, .title, .usertext-body,
    [data-testid], [data-click-id], .thing, .entry,
    .titlebox, .side, .sidebar, .content, .link,
    .expando, .usertext, .md, .md p, .md-container,
    .RichTextJSON-root, .RichTextJSON-paragraph,
    ._1qeIAgB0cPwnLhDF9XSiJM, ._2FCtq-QzlfuN-SwVMUZMM3,
    .s1yxw8qn-1, .s1yxw8qn-2, .s1yxw8qn-3,
    .Post__content, .Comment__body, .CommentBody,
    .PostContent, .PostTitle, .UserText,
    ._3Im6OD67aKo33nql4FpSp_, ._1h0r6vtgOzgWtu-GNBO6Yb,
    ._25IkBM0rRUqWX5ZojEMAFQ, ._2qww3J5KKzsD7e5DO0BvvU,
    .s1ra9jyh-0, .s1ra9jyh-1, .s1ra9jyh-2,
    body, #siteTable, .link .title, .link .title a,
    .comments-page .comment .usertext-body,
    .thing .title, .thing .usertext-body,
    .flairrichtext, .flair, .author, .subreddit {
      font-family: ${SANS_FONT_STACK} !important;
    }

    /* Reddit Chat specific overrides */
    .chat-container, .chat-window, .chat-message,
    .chat-input, .chat-sidebar, .chat-header,
    .ChatWindow, .ChatMessage, .ChatInput,
    .ChatSidebar, .ChatHeader, .ChatContainer,
    [class*="chat"], [class*="Chat"],
    [data-testid*="chat"], [data-testid*="Chat"],
    .messaging-container, .messaging-window,
    .messaging-input, .messaging-conversation,
    [class*="messaging"], [class*="Messaging"],
    .reddit-chat, .RedditChat,
    .chat-room, .ChatRoom, .chat-thread, .ChatThread,
    .dm-container, .DmContainer, .direct-message,
    .DirectMessage, .private-message, .PrivateMessage {
      font-family: ${SANS_FONT_STACK} !important;
    }

    /* New Reddit UI components */
    [data-testid="post-content"],
    [data-testid="comment"],
    [data-testid="comment-body-text"],
    [data-testid="post-title"],
    [data-testid="subreddit-name"],
    [data-testid="user-name"],
    [data-click-id*="text"],
    [data-click-id*="comment"],
    [data-click-id*="post"],
    .rpBJOHq2PR60pnwJlUyP0,
    ._3KxQPN3V_0,
    ._2FCtq-QzlfuN-SwVMUZMM3,
    ._1qeIAgB0cPwnLhDF9XSiJM,
    .s1ra9jyh-0, .s1ra9jyh-1, .s1ra9jyh-2, .s1ra9jyh-3,
    .s1yxw8qn-0, .s1yxw8qn-1, .s1yxw8qn-2, .s1yxw8qn-3 {
      font-family: ${SANS_FONT_STACK} !important;
    }

    /* Modal and overlay components */
    .modal, .Modal, .overlay, .Overlay,
    .popup, .Popup, .dialog, .Dialog,
    .dropdown, .Dropdown, .tooltip, .Tooltip,
    [role="dialog"], [role="popup"], [role="tooltip"],
    [class*="modal"], [class*="Modal"],
    [class*="overlay"], [class*="Overlay"],
    [class*="popup"], [class*="Popup"] {
      font-family: ${SANS_FONT_STACK} !important;
    }

    /* Input and form elements */
    input:not([type="checkbox"]):not([type="radio"]),
    textarea, select, option, optgroup,
    [contenteditable], [contenteditable="true"],
    .form-control, .input, .textarea,
    [class*="input"], [class*="Input"],
    [class*="textarea"], [class*="Textarea"],
    [class*="form"], [class*="Form"] {
      font-family: ${SANS_FONT_STACK} !important;
    }

    /* Navigation and header elements */
    nav, .nav, .navigation, .Navigation,
    header, .header, .Header,
    .navbar, .NavBar, .nav-bar,
    .menu, .Menu, .menubar, .MenuBar,
    [role="navigation"], [role="menubar"],
    [class*="nav"], [class*="Nav"],
    [class*="header"], [class*="Header"],
    [class*="menu"], [class*="Menu"] {
      font-family: ${SANS_FONT_STACK} !important;
    }

    /* Button and interactive elements */
    button, .button, .btn, .Btn,
    [role="button"], [type="button"], [type="submit"], [type="reset"],
    .clickable, .interactive,
    [class*="button"], [class*="Button"],
    [class*="btn"], [class*="Btn"],
    a, .link, .Link, [role="link"] {
      font-family: ${SANS_FONT_STACK} !important;
    }

    /* Code and monospace preservation */
    code, pre, kbd, samp, tt, var,
    .code, .Code, .monospace, .Monospace,
    .hljs, .highlight,
    [class*="code"], [class*="Code"],
    [class*="mono"], [class*="Mono"],
    [class*="syntax"], [class*="Syntax"] {
      font-family: ${MONO_FONT_STACK} !important;
    }

    /* Force override for inline styles */
    [style*="font-family"] {
      font-family: ${SANS_FONT_STACK} !important;
    }

    /* Preserve monospace even with inline styles */
    code[style*="font-family"],
    pre[style*="font-family"],
    .hljs[style*="font-family"],
    [class*="code"][style*="font-family"],
    [class*="mono"][style*="font-family"] {
      font-family: ${MONO_FONT_STACK} !important;
    }

    /* Body and global catch-all */
    body, body *,
    #root, #app, .App, .app,
    .reddit, .Reddit,
    .main, .Main, .container, .Container,
    .wrapper, .Wrapper, .content, .Content {
      font-family: ${SANS_FONT_STACK} !important;
    }

    /* Additional Reddit-specific selectors */
    .styled-outlines-reset,
    .RES-keyNav-activeElement,
    .thing.comment,
    .thing.link,
    .md-container,
    .usertext-body,
    .entry.unvoted,
    .entry.likes,
    .entry.dislikes,
    .tagline,
    .author,
    .subreddit,
    .domain,
    .title.may-blank,
    .title.loggedin,
    .expando-button,
    .thumbnail,
    .score,
    .upmod,
    .downmod,
    .arrow,
    .flat-list,
    .buttons,
    .save-button,
    .share-button,
    .hide-button,
    .report-button,
    .comment-save-button,
    .give-gold-button,
    .reply-button {
      font-family: ${SANS_FONT_STACK} !important;
    }
  `;

  // Apply styles immediately
  GM_addStyle(masterCss);

  // Additional aggressive override using MutationObserver
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) { // Element node
            // Apply font to the new element and all its children
            applyFontToElement(node);
          }
        });
      }
    });
  });

  function applyFontToElement(element) {
    if (element.tagName && !['CODE', 'PRE', 'KBD', 'SAMP', 'TT', 'VAR'].includes(element.tagName)) {
      element.style.setProperty('font-family', SANS_FONT_STACK, 'important');
    }

    // Apply to all children
    if (element.children) {
      Array.from(element.children).forEach(child => {
        if (!child.className || (!child.className.includes('hljs') && !child.className.includes('code'))) {
          applyFontToElement(child);
        }
      });
    }
  }

  // Start observing when DOM is ready
  function startObserver() {
    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true
    });

    // Apply to existing elements
    document.querySelectorAll('*:not(code):not(pre):not(kbd):not(samp):not(tt):not(var):not(.hljs):not([class*="code"]):not([class*="mono"])').forEach(element => {
      element.style.setProperty('font-family', SANS_FONT_STACK, 'important');
    });
  }

  // Initialize when document is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserver);
  } else {
    startObserver();
  }

  console.log("Reddit Font Override (Aggressive Funnel Sans) Active");
})();

// ==UserScript==
// @name         Font Overrider - Universal
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Aggressively overrides fonts across all websites to Funnel Sans and Geist Mono
// @author       Enhanced Version
// @match        https://0.email/*
// @match        https://cloudinary.com/*
// @match        https://www.cursor.com/*
// @match        https://www.google.com/*
// @match        https://mail.google.com/*
// @match        https://mail.proton.me/*
// @match        https://x.com/*
// @match        https://*.youtube.com/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  const SANS_FONT_STACK = `"Funnel Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  const MONO_FONT_STACK = `"Geist Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;

  const masterCss = `
    :root {
      --font-sans: ${SANS_FONT_STACK} !important;
      --font-mono: ${MONO_FONT_STACK} !important;
      --cursor-font-family-sans: ${SANS_FONT_STACK} !important;
      --cursor-font-family-mono: ${MONO_FONT_STACK} !important;
      --artdeco-reset-typography-font-family-sans: ${SANS_FONT_STACK} !important;
      --global-primary-font-family: ${SANS_FONT_STACK} !important;
      --reddit-font-family: ${SANS_FONT_STACK} !important;
      --font-family-default: ${SANS_FONT_STACK} !important;
    }

    *, *::before, *::after,
    html, body, div, span, p, h1, h2, h3, h4, h5, h6,
    a, button, input, textarea, select, label, option,
    article, section, nav, header, footer, main,
    ul, ol, li, dl, dt, dd, blockquote, cite,
    .btn, .button, [role="button"], [type="button"],
    [type="submit"], [type="reset"], .action-button,
    .ui-button, .btn-primary, .btn-secondary {
      font-family: ${SANS_FONT_STACK} !important;
    }

    pre, pre *, code, kbd, samp, tt,
    .monaco-editor, .monaco-editor *, .cm-editor .cm-content,
    textarea.font-mono, input.font-mono,
    .codehilite, .codehilite *, .highlight pre, .highlight code,
    .language-javascript, .language-python, .language-css, .language-html,
    .language-json, .language-xml, .language-sql, .language-bash,
    [class*="language-"] pre, [class*="language-"] code,
    .hljs, .hljs-* {
      font-family: ${MONO_FONT_STACK} !important;
    }

    button, button *, .button, .button *,
    .btn, .btn *, .action-button, .action-button *,
    [role="button"], [role="button"] *,
    [type="button"], [type="button"] *,
    [type="submit"], [type="submit"] *,
    [type="reset"], [type="reset"] *,
    .ui-button, .ui-button *,
    .btn-primary, .btn-primary *,
    .btn-secondary, .btn-secondary *,
    .submit-button, .submit-button *,
    .control-button, .control-button * {
      font-family: ${SANS_FONT_STACK} !important;
    }

    [data-test-id], [data-control-name], .artdeco-entity-lockup__subtitle,
    .artdeco-card, .artdeco-button, .artdeco-toast, .artdeco-modal,
    .jobs-unified-top-card__content--two-pane, .jobs-search-box,
    .entity-name, .feed-shared-update-v2, .feed-shared-actor,
    .profile-card-one__profile-content, .text-heading-xlarge,
    .text-heading-large, .text-heading-medium, .text-heading-small,
    .text-body-large, .text-body-medium, .text-body-small,
    .linkedin-post, .post-content, .comment-content,
    .artdeco-typeahead__results-list, .typeahead-results,
    .msg-s-message-list__event, .msg-conversation-card,
    .search-result, .search-results-container,
    .pv-text-details__left-panel, .pv-top-card,
    .pv-profile-section, .experience-section,
    .education-section, .skills-section,
    .recommendations-section, .accomplishments-section,
    .artdeco-button, .artdeco-button *,
    .artdeco-button-primary, .artdeco-button-primary *,
    .artdeco-button-secondary, .artdeco-button-secondary * {
      font-family: ${SANS_FONT_STACK} !important;
    }

    .Comment, .Post, .comment, .post, .title, .usertext-body,
    [data-testid], [data-click-id], .thing, .entry,
    .titlebox, .side, .sidebar, .content, .link,
    .expando, .usertext, .md, .md p, .md-container,
    .RichTextJSON-root, .RichTextJSON-paragraph,
    ._1qeIAgB0cPwnLhDF9XSiJM, ._2FCtq-QzlfuN-SwVMUZMM3,
    .s1yxw8qn-1, .s1yxw8qn-2, .s1yxw8qn-3,
    .Post__content, .Comment__body, .CommentBody,
    .PostContent, .PostTitle, .UserText,
    ._3Im6OD67aKo33nql4FpSp_, ._1h0r6vtgOzgWtu-GNBO6Yb,
    ._25IkBM0rRUqWX5ZojEMAFQ, ._2qww3J5KKzsD7e5DO0BvvU,
    .s1ra9jyh-0, .s1ra9jyh-1, .s1ra9jyh-2,
    body, #siteTable, .link .title, .link .title a,
    .comments-page .comment .usertext-body,
    .thing .title, .thing .usertext-body,
    .flairrichtext, .flair, .author, .subreddit {
      font-family: ${SANS_FONT_STACK} !important;
    }

    .md pre, .md pre *, .md code,
    .RichTextJSON-codeBlock, .RichTextJSON-codeBlock *,
    .usertext-body pre, .usertext-body pre *,
    .usertext-body code,
    .highlight pre, .highlight code,
    .codehilite pre, .codehilite code {
      font-family: ${MONO_FONT_STACK} !important;
    }
  `;

  const injectStylesInto = (rootNode) => {
    if (!rootNode) return;

    const styleElement = document.createElement("style");
    styleElement.setAttribute("data-font-override", "true");
    styleElement.textContent = masterCss;

    if (rootNode === document.head) {
      rootNode.appendChild(styleElement);
    } else {
      rootNode.insertBefore(styleElement, rootNode.firstChild);
    }
  };

  const processNode = (node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const elementsToProcess = [node, ...node.querySelectorAll("*")];

    elementsToProcess.forEach((el) => {
      if (el.style) {
        const isActualCodeElement = (
          (el.tagName && ['PRE', 'CODE', 'KBD', 'SAMP', 'TT'].includes(el.tagName)) ||
          (el.className && (
            el.className.includes('monaco-editor') ||
            el.className.includes('cm-editor') ||
            el.className.includes('codehilite') ||
            el.className.includes('highlight')
          )) ||
          (el.closest && (el.closest('pre') || el.closest('code') || el.closest('.monaco-editor')))
        );

        if (isActualCodeElement) {
          el.style.setProperty('font-family', MONO_FONT_STACK, 'important');
        } else {
          el.style.setProperty('font-family', SANS_FONT_STACK, 'important');
        }
      }

      if (el.tagName === "IFRAME") {
        el.addEventListener("load", () => {
          try {
            injectStylesInto(el.contentDocument.head);
          } catch (e) {
            console.log("Cannot access iframe content:", e);
          }
        }, { once: true });
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

      if (mutation.type === 'attributes' &&
          (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
        processNode(mutation.target);
      }
    }
  });

  const startObserver = () => {
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
      });

      processNode(document.body);

      console.log(`Universal Font Overrider Enhanced: Active on ${window.location.hostname}`);
    }
  };

  const initialize = () => {
    injectStylesInto(document.head);
    startObserver();

    setInterval(() => {
      if (!document.head.querySelector('style[data-font-override="true"]')) {
        injectStylesInto(document.head);
      }
    }, 2000);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }

  window.addEventListener("load", () => {
    setTimeout(initialize, 1000);
  }, { once: true });

})();