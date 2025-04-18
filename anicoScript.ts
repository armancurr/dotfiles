// ==UserScript==
// @name         AniList • Funnel Sans
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Apply Funnel Sans from Google Fonts on anilist.co
// @match        https://anilist.co/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const gf = document.createElement('link');
  gf.rel = 'stylesheet';
  gf.href =
    'https://fonts.googleapis.com/css2?' +
    'family=Funnel+Display:wght@300..800&' +
    'family=Funnel+Sans:ital,wght@0,300..800;1,300..800&' +
    'display=swap';
  document.head.appendChild(gf);

  const style = document.createElement('style');
  style.textContent = `
    html, body, #root, * {
      font-family: 'Funnel Sans', sans-serif !important;
    }
  `;
  document.head.appendChild(style);
})();
