// ==UserScript==
// @name         Triple Backticks Shortcut
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Insert triple backticks with Ctrl+Alt+B
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.altKey && event.key === "c") {
      const activeElement = document.activeElement;

      if (
        activeElement &&
        (activeElement.tagName === "TEXTAREA" ||
          activeElement.tagName === "INPUT" ||
          activeElement.contentEditable === "true")
      ) {
        event.preventDefault();

        const text = "```\n\n```";

        if (
          activeElement.tagName === "TEXTAREA" ||
          activeElement.tagName === "INPUT"
        ) {
          const start = activeElement.selectionStart;
          const end = activeElement.selectionEnd;
          const value = activeElement.value;

          activeElement.value =
            value.substring(0, start) + text + value.substring(end);

          activeElement.selectionStart = activeElement.selectionEnd = start + 4;
        } else if (activeElement.contentEditable === "true") {
          document.execCommand("insertText", false, text);
        }
      }
    }
  });
})();
