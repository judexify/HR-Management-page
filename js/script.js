"use strict";

const seePasswordBtn = document.querySelector("#checkbox");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const submitBtn = document.querySelector(".submitBtn");

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
  handleSubmit(emailValidty);
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

  handleSubmit(passValidty);
};

const handleSubmit = (input) => {
  if (input) {
    submitBtn.removeAttribute("disabled");
  }
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace("./loggedInPage.html");
});

email.addEventListener("input", () => {
  handleEmailValidity();
});

password.addEventListener("input", () => {
  handlePassValidity();
});
