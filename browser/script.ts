// ==UserScript==
// @name         Universal Font Overrider (Funnel Sans & Geist Mono)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Forcefully sets sans-serif font to "Funnel Sans" and monospace to "Geist Mono" across specified websites. Handles dynamic content, iframes, and shadow DOM.
// @author       T3 Chat & You
// @match        https://www.cursor.com/*
// @match        https://www.google.com/*
// @match        https://*.linkedin.com/*
// @match        https://mail.google.com/*
// @match        https://mail.proton.me/*
// @match        https://cloudinary.com/*
// @match        https://0.email/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
	"use strict";

	// --- FONT DEFINITIONS ---
	const SANS_FONT_STACK = `"Funnel Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
	const MONO_FONT_STACK = `"Geist Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;

	// --- MASTER CSS STYLES ---
	const masterCss = `
    /* Strategy 1: Override common CSS variables */
    :root {
      --font-sans: ${SANS_FONT_STACK} !important;
      --font-mono: ${MONO_FONT_STACK} !important;
      --cursor-font-family-sans: ${SANS_FONT_STACK} !important;
      --cursor-font-family-mono: ${MONO_FONT_STACK} !important;
      --artdeco-reset-typography-font-family-sans: ${SANS_FONT_STACK} !important;
      --global-primary-font-family: ${SANS_FONT_STACK} !important;
    }

    /* Strategy 2: Universal override for all elements */
    * {
      font-family: ${SANS_FONT_STACK} !important;
    }

    /*
     * Strategy 3: Specific overrides for monospaced elements.
     * NOTE: The generic 'textarea' selector has been removed to prevent
     * issues like the one on the Google search bar.
     */
    pre, code, kbd, samp, tt,
    .font-mono, [class*="mono"],
    .monaco-editor, .monaco-mouse-cursor-text, .cm-editor, .cm-content,
    textarea[class*="mono"], textarea[class*="code"], /* This is the fix */
    [class*="code"], .monospace, .monospace-type {
      font-family: ${MONO_FONT_STACK} !important;
    }
  `;

	// --- DYNAMIC INJECTION LOGIC ---

	GM_addStyle(masterCss);

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
			// Handle iframes
			if (el.tagName === "IFRAME") {
				el.addEventListener(
					"load",
					() => {
						try {
							injectStylesInto(el.contentDocument.head);
						} catch (e) {
							/* ignore cross-origin */
						}
					},
					{ once: true },
				);
			}
			// Handle shadow DOM
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
// @name         Keybr Font Override Advanced
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Advanced font override for keybr.com
// @author       You
// @match        https://www.keybr.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Add fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Funnel+Sans:wght@300;400;500;600;700&family=Geist+Mono:wght@100;200;300;400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    function applyFonts() {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            const computed = window.getComputedStyle(el);
            if (computed.fontFamily.includes('monospace') ||
                el.tagName === 'PRE' ||
                el.tagName === 'CODE' ||
                el.classList.toString().includes('typing') ||
                el.classList.toString().includes('lesson')) {
                el.style.setProperty('font-family', '"Geist Mono", monospace', 'important');
            } else {
                el.style.setProperty('font-family', '"Funnel Sans", sans-serif', 'important');
            }
        });
    }

    // Apply immediately and on changes
    setTimeout(applyFonts, 1000);

    const observer = new MutationObserver(applyFonts);
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
    });
})();
