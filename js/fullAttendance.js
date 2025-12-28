"use strict";

import { getEmployees } from "./attendance.js";
import { renderPayroll } from "./payroll.js";

// DOM Elements
const nav = document.querySelector("nav");
const dashBoard = document.querySelector(".dashboard");

// State
let activeView = null;
let employeesData = null;
let currentDisplayCount = 10;

getEmployees().then((employees) => {
  employeesData = employees;
});

const renderEmployeeRows = (count) => {
  const slicedEmployees = employeesData.slice(0, count);

  const employeeRowsHTML = slicedEmployees
    .map(
      (emp) => `
      <tr>
        <td>
          <img src="${emp.imagePath}" alt="${emp.name}">
          <p>${emp.name}</p>
        </td>
        <td>${emp.title}</td>
        <td>${emp.employment_type}</td>
        <td>${emp.attendance.check_in}</td>
        <td class="truth">${emp.attendance.truth}</td>
      </tr>
    `
    )
    .join("");

  const tbody = document.querySelector("#data-output");
  if (tbody) {
    tbody.innerHTML = employeeRowsHTML;
  }
};

const renderAttendanceView = () => {
  dashBoard.innerHTML = "";

  const attendancePageContainer = document.createElement("div");
  attendancePageContainer.classList.add("attendance-page");

  // Search bar HTML
  const searchBarHTML = `
    <div class="attendance-search-wrapper">
      <input type="text" id="search-attendance-bar" placeholder="Search employees..." />
    </div>
  `;

  // Rows per page selector HTML
  const rowSelectorHTML = `
    <div class="attendance-controls">
      <label for="numbers">Showing:</label>
      <select id="numbers" name="number">
        <option value="5">5</option>
        <option value="10" selected>10</option>
        <option value="15">15</option>
      </select>
    </div>
  `;

  // Table structure HTML
  const tableStructureHTML = `
    <div class="attendance-table-container">
      <table class="attendance-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Designation</th>
            <th>Type</th>
            <th>Check In Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody id="data-output">
          <!-- Populated by JavaScript -->
        </tbody>
      </table>
    </div>
  `;

  // Build the attendance page
  attendancePageContainer.innerHTML =
    searchBarHTML + tableStructureHTML + rowSelectorHTML;
  dashBoard.appendChild(attendancePageContainer);

  renderEmployeeRows(currentDisplayCount);

  // event listener for select dropdown
  const selectElement = document.querySelector("#numbers");
  if (selectElement) {
    selectElement.addEventListener("change", (e) => {
      const selectedCount = parseInt(e.target.value);
      currentDisplayCount = selectedCount;
      renderEmployeeRows(selectedCount);
    });
  }

  // Add event listener for search bar
  const searchBar = document.querySelector("#search-attendance-bar");
  if (searchBar) {
    searchBar.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      filterEmployees(searchTerm);
    });
  }
};

const filterEmployees = (searchTerm) => {
  const filteredEmployees = employeesData.filter((emp) => {
    return (
      emp.name.toLowerCase().includes(searchTerm) ||
      emp.title.toLowerCase().includes(searchTerm) ||
      emp.employment_type.toLowerCase().includes(searchTerm) ||
      emp.attendance.truth.toLowerCase().includes(searchTerm)
    );
  });

  const slicedEmployees = filteredEmployees.slice(0, currentDisplayCount);

  const employeeRowsHTML = slicedEmployees
    .map(
      (emp) => `
      <tr>
        <td>
          <img src="${emp.imagePath}" alt="${emp.name}">
          <p>${emp.name}</p>
        </td>
        <td>${emp.title}</td>
        <td>${emp.employment_type}</td>
        <td>${emp.attendance.check_in}</td>
        <td class="truth">${emp.attendance.truth}</td>
      </tr>
    `
    )
    .join("");

  const tbody = document.querySelector("#data-output");
  if (tbody) {
    tbody.innerHTML =
      employeeRowsHTML ||
      `
      <tr>
        <td colspan="5" style="text-align: center; padding: 2rem; color: #9ca3af;">
          No employees found matching "${searchTerm}"
        </td>
      </tr>
    `;
  }
};
function convertCapitalLetter(words) {
  let theWord = words.split(" ").map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  });
  return theWord.join(" ");
}

// Handle navigation link clicks
const handleNavClick = (link) => {
  const view = link.dataset.view;
  const capFirstLetter = convertCapitalLetter(view);
  const helloWord = document.querySelector(".hello");
  const whatTimeOfTheDay = document.querySelector(".whatTimeOfTheDay");

  if (activeView === view) return;

  activeView = view;

  // Render appropriate view
  if (view === "attendance") {
    helloWord.textContent = "Hello Jude 🤝";
    whatTimeOfTheDay.textContent = "Good Morning";
    renderAttendanceView();
  }
  if (view === "payroll") {
    helloWord.textContent = capFirstLetter;
    whatTimeOfTheDay.textContent = "All Employee Records";

    renderPayroll();
  }
};

// Event Listeners
nav.addEventListener("click", (e) => {
  const link = e.target.closest(".link");
  if (!link) return;

  handleNavClick(link);
});
