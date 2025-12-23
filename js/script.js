"use strict";

const body = document.body;

function isMobile() {
  const minWidth = 768; // Minimum width for desktop devices
  return window.innerWidth < minWidth || screen.width < minWidth;
}

document.addEventListener("DOMContentLoaded", function () {
  if (isMobile()) {
    console.log("Mobile device detected");

    const overlay = document.createElement("div");
    overlay.className = "mobile-overlay";
    overlay.innerHTML = "<p>Open this page on a PC.</p>";
    overlay.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: #111;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2.4rem;
      z-index: 9999;
    `;
    document.body.appendChild(overlay);
  } else {
    console.log("Desktop device detected");
  }
});
