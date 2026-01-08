"use strict";

const dashBoard = document.querySelector(".dashboard");

const THEMES = { DARK: "dark", LIGHT: "light", SYSTEM: "system" };

const getStoredTheme = () => localStorage.getItem("theme") || THEMES.DARK;
const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

const applyTheme = (theme) => {
  document.body.classList.remove(THEMES.DARK, THEMES.LIGHT);
  document.body.classList.add(theme);
};

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEMES.DARK
    : THEMES.LIGHT;

const applyThemePreference = (preference) => {
  applyTheme(preference === THEMES.SYSTEM ? getSystemTheme() : preference);
};

const updateThemeDropdown = (theme) => {
  const select = document.querySelector("#themeSelection");
  if (select) select.value = theme;
};

const initializeTheme = () => {
  const savedTheme = getStoredTheme();
  applyThemePreference(savedTheme);

  // react to system theme change
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (getStoredTheme() === THEMES.SYSTEM) {
        applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    });
};

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();

  document.querySelector(".light-mode")?.addEventListener("click", () => {
    setStoredTheme(THEMES.LIGHT);
    applyTheme(THEMES.LIGHT);
    updateThemeDropdown(THEMES.LIGHT);
  });

  document.querySelector(".dark-mode")?.addEventListener("click", () => {
    setStoredTheme(THEMES.DARK);
    applyTheme(THEMES.DARK);
    updateThemeDropdown(THEMES.DARK);
  });
});

export const renderSettingPage = () => {
  dashBoard.innerHTML = "";

  const settingPageContainer = document.createElement("div");
  settingPageContainer.classList.add("attendance-table-container");

  const settingsDiv = document.createElement("div");
  settingsDiv.classList.add("settingsDiv");

  const cuztomizationDiv = document.createElement("div");
  cuztomizationDiv.classList.add("customizationDiv");

  const ApperanceText = document.createElement("div");
  ApperanceText.classList.add("appearanceText");

  const appearanceTextTitle = document.createElement("div");
  appearanceTextTitle.classList.add("appearanceTextTitle");
  appearanceTextTitle.textContent = "Appearance";

  const appearanceTextDetails = document.createElement("div");
  appearanceTextDetails.classList.add("appearanceTextDetails");
  appearanceTextDetails.textContent =
    "Customize how your theme looks on your device";

  const themeSelector = document.createElement("div");
  themeSelector.classList.add("attendance-controls");

  const select = document.createElement("select");
  select.id = "themeSelection";
  select.name = "theme";

  const optionValueOne = document.createElement("option");
  optionValueOne.id = "dark";
  optionValueOne.value = "dark";
  optionValueOne.textContent = "🌙 Dark";

  const optionValueTwo = document.createElement("option");
  optionValueTwo.value = "light";
  optionValueTwo.textContent = "☀️ Light";
  optionValueTwo.id = "light";

  const optionValueThree = document.createElement("option");
  optionValueThree.value = "system";
  optionValueThree.textContent = "🖥️ System";
  optionValueThree.id = "system";

  const languageDiv = document.createElement("div");
  languageDiv.classList.add("languageDiv");

  const languageText = document.createElement("div");
  languageText.classList.add("appearanceText");

  const languageTextTitle = document.createElement("div");
  languageTextTitle.classList.add("appearanceTextTitle");
  languageTextTitle.textContent = "Language";

  const languageTextDetails = document.createElement("div");
  languageTextDetails.classList.add("appearanceTextDetails");
  languageTextDetails.textContent = "Select your language";

  const languageSelector = document.createElement("div");
  languageSelector.classList.add("attendance-controls");

  const selectLanguage = document.createElement("select");
  selectLanguage.id = "languageSelection";
  selectLanguage.name = "language";

  const optionValue1 = document.createElement("option");
  optionValue1.id = "english";
  optionValue1.value = "en";
  optionValue1.textContent = "English";

  const optionValue2 = document.createElement("option");
  optionValue2.value = "fr";
  optionValue2.textContent = "French";
  optionValue2.id = "french";

  const optionValue3 = document.createElement("option");
  optionValue3.value = "es";
  optionValue3.textContent = "Spanish";
  optionValue3.id = "spanish";

  cuztomizationDiv.append(ApperanceText, themeSelector);
  ApperanceText.append(appearanceTextTitle, appearanceTextDetails);
  themeSelector.appendChild(select);
  select.append(optionValueOne, optionValueTwo, optionValueThree);

  dashBoard.appendChild(settingPageContainer);
  settingPageContainer.appendChild(settingsDiv);
  settingsDiv.append(cuztomizationDiv, languageDiv);

  languageDiv.appendChild(languageText);
  languageDiv.appendChild(languageSelector);
  languageText.append(languageTextTitle, languageTextDetails);
  languageSelector.appendChild(selectLanguage);
  selectLanguage.append(optionValue1, optionValue2, optionValue3);

  // Set current theme in dropdown
  const savedTheme = getStoredTheme();
  select.value = savedTheme;

  // Theme change event listener
  select.addEventListener("change", (e) => {
    const selectedTheme = e.target.value;
    setStoredTheme(selectedTheme);
    applyThemePreference(selectedTheme);
  });
};

export const renderSettingsHead = (h, c, w) => {
  h.textContent = c;
  w.textContent = "All System Settings";
};
