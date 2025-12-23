"use strict";

const body = document.body;

function isMobile() {
  const minWidth = 768; // Minimum width for desktop devices
  return window.innerWidth < minWidth || screen.width < minWidth;
}

document.addEventListener("DOMContentLoaded", function () {
  if (isMobile()) {
    console.log("Mobile device detected");
    body.innerHTML = "";
    const string = `<p class='openOnPc'>Open this page on a PC.</p>`;
    body.innerHTML = string;
  } else {
    console.log("Desktop device detected");
  }
});
