// ==UserScript==
// @name         LinkedIn Atkinson Hyperlegible Next Font
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Changes all fonts on LinkedIn to Atkinson Hyperlegible Next
// @author       You
// @match        https://*.linkedin.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=linkedin.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  // Adjust the link below if you have a different source for Atkinson Hyperlegible Next.
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible&display=swap";
  document.head.appendChild(fontLink);

  function applyAtkinsonHyperlegibleNext() {
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
          font-family: 'Atkinson Hyperlegible Next', -apple-system, BlinkMacSystemFont, sans-serif !important;
      }

      :root {
          --artdeco-reset-typography-font-family-sans: 'Atkinson Hyperlegible Next', -apple-system, BlinkMacSystemFont,
          sans-serif !important;
          --global-primary-font-family: 'Atkinson Hyperlegible Next', -apple-system, BlinkMacSystemFont,
          sans-serif !important;
          --artdeco-typography-font-family-stack: 'Atkinson Hyperlegible Next', -apple-system, BlinkMacSystemFont,
          sans-serif !important;
          --font-family: 'Atkinson Hyperlegible Next', -apple-system, BlinkMacSystemFont, sans-serif !important;
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
          font-family: 'Atkinson Hyperlegible Next', -apple-system, BlinkMacSystemFont, sans-serif !important;
      }

      .msg-form__contenteditable,
      .msg-s-event-listitem__body {
          font-family: 'Atkinson Hyperlegible Next', -apple-system, BlinkMacSystemFont, sans-serif !important;
      }

      input,
      .search-global-typeahead__input {
          font-family: 'Atkinson Hyperlegible Next', -apple-system, BlinkMacSystemFont, sans-serif !important;
      }
    `;
    document.head.appendChild(customCSS);
  }

  applyAtkinsonHyperlegibleNext();

  const observer = new MutationObserver(function () {
    applyAtkinsonHyperlegibleNext();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener("load", function () {
    setTimeout(applyAtkinsonHyperlegibleNext, 1000);
  });
})();
