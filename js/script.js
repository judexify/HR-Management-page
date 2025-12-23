"use strict";

const body = document.body;

const seePasswordBtn = document.querySelector("#checkbox");
const email = document.querySelector(".email");
const password = document.querySelector(".password");

const isMobile = () => {
  const minWidth = 768; // Minimum width for desktop devices
  return window.innerWidth < minWidth || screen.width < minWidth;
};

document.addEventListener("DOMContentLoaded", function () {
  if (isMobile()) {
    console.log("Mobile device detected");

    const overlay = document.createElement("div");
    overlay.className = "mobile-overlay";
    overlay.innerHTML = "<p>Open this page on a PC.</p>";
    overlay.style.cssText = `
      position: fixed;
      top: 0; 
      left: 0;
      width: 100%; 
      height: 100%;
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

// function for see password typed

let isChecked = false;
const forPasswordInput = () => {
  const passwordInput = document.querySelector(".password");
  passwordInput.type = isChecked ? "text" : "password";
};

seePasswordBtn.addEventListener("change", () => {
  isChecked = !isChecked;
  forPasswordInput();
});

// function for validation of forms

const handleEmailValidity = () => {
  const emailRegExp = /^[\w.!#$%&'+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)$/i;
  const emailValidty =
    email.value.length !== 0 && emailRegExp.test(email.value);
  visualForErrorEmail(emailValidty);
};

const visualForErrorEmail = (emailValidty) => {
  if (!emailValidty) {
    email.setAttribute("required", true);
    email.classList.add("error");
    email.classList.remove("valid");
  } else {
    email.classList.remove("error");
    email.classList.add("valid");
  }
};
const handlePassValidity = () => {
  const passRegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*_)(?!.* ).{5,16}$/;
  const passValidty =
    password.value.length > 5 && passRegExp.test(password.value);

  if (!passValidty) {
    password.classList.add("error");
    password.classList.remove("valid");
  } else {
    password.classList.remove("error");
    password.classList.add("valid");
  }
};
email.addEventListener("input", () => {
  handleEmailValidity();
});

password.addEventListener("input", () => {
  handlePassValidity();
});
