"use strict";

import { getEmployees } from "./attendance.js";
import { getJobs, renderJobNav, renderJobHead } from "./jobs.js";
import { renderPayroll } from "./payroll.js";
import { renderLeaveHead, renderLeave } from "./leave.js";
import {
  getCandidates,
  renderCandidates,
  renderCandidatesHead,
} from "./candidates.js";
import { renderHoliday, renderHolidayHead } from "./holidays.js";

// DOM Elements
const nav = document.querySelector("nav");
const dashBoard = document.querySelector(".dashboard");
const viewMore = document.querySelector(".view-more-attendance");

// State
let activeView = null;
let employeesData = null;
let currentDisplayCount = 10;

// Fetch employees
getEmployees().then((employees) => {
  employeesData = employees;
});

// Render employee rows
const renderEmployeeRows = (count, container) => {
  if (!employeesData) return;

  const slicedEmployees = employeesData.slice(0, count);

  const employeeRowsHTML = slicedEmployees
    .map((emp) => {
      const statusStyles = {
        "On Time": { color: "#86EFAC", bg: "#14532D" },
        Late: { color: "#FBBF24", bg: "#78350F" },
      };
      const status = emp.attendance.truth;
      const style = statusStyles[status];

      return `
        <tr>
          <td>
            <img src="${emp.imagePath}" alt="${emp.name}">
            <p>${emp.name}</p>
          </td>
          <td>${emp.title}</td>
          <td>${emp.employment_type}</td>
          <td>${emp.attendance.check_in}</td>
          <td class="truth">
            <span style="
              color: ${style.color};
              background-color: ${style.bg};
              padding: 0.6rem 1.2rem;
              border-radius: 5px;
              display: inline-block;
            ">${status}</span>
          </td>
        </tr>
      `;
    })
    .join("");

  const tbody = container.querySelector("#data-output");
  if (tbody) tbody.innerHTML = employeeRowsHTML;
};

// Render attendance view
const renderAttendanceView = (h, c, w) => {
  if (!employeesData) return; // guard if data not loaded

  h.textContent = c;
  w.textContent = "All Employee Attendance";
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
        <option value="20">20</option>
      </select>
    </div>
  `;

  // Table HTML
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
        <tbody id="data-output"></tbody>
      </table>
    </div>
  `;

  attendancePageContainer.innerHTML =
    searchBarHTML + tableStructureHTML + rowSelectorHTML;
  dashBoard.appendChild(attendancePageContainer);

  renderEmployeeRows(currentDisplayCount, attendancePageContainer);

  // Rows per page change
  const selectElement = attendancePageContainer.querySelector("#numbers");
  if (selectElement) {
    selectElement.addEventListener("change", (e) => {
      currentDisplayCount = parseInt(e.target.value);
      renderEmployeeRows(currentDisplayCount, attendancePageContainer);
    });
  }

  // Search bar
  const searchBar = attendancePageContainer.querySelector(
    "#search-attendance-bar"
  );
  if (searchBar) {
    searchBar.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      filterEmployees(searchTerm, attendancePageContainer);
    });
  }
};

// Filter employees
const filterEmployees = (searchTerm, container) => {
  if (!employeesData) return;

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

  const tbody = container.querySelector("#data-output");
  if (tbody) {
    tbody.innerHTML =
      employeeRowsHTML ||
      `<tr>
        <td colspan="5" style="text-align: center; padding: 2rem; color: #9ca3af;">
          No employees found matching "${searchTerm}"
        </td>
      </tr>`;
  }
};

// Capitalize words
function convertCapitalLetter(words) {
  return words
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

// DOM references
const helloWord = document.querySelector(".hello");
const whatTimeOfTheDay = document.querySelector(".whatTimeOfTheDay");

// Handle nav clicks
const handleNavClick = (link) => {
  const view = link.dataset.view;
  const capFirstLetter = convertCapitalLetter(view);

  if (activeView === view) return;
  activeView = view;

  if (view === "dashboard") location.assign("./loggedInPage.html");
  if (view === "attendance") {
    window.location.hash = "attendance";
    renderAttendanceView(helloWord, capFirstLetter, whatTimeOfTheDay);
  }
  if (view === "payroll") {
    window.location.hash = "payroll";
    renderPayroll(helloWord, capFirstLetter, whatTimeOfTheDay);
  }
  if (view === "jobs") {
    getJobs().then((jobsData) => {
      window.location.hash = "jobs";
      renderJobHead(helloWord, capFirstLetter, whatTimeOfTheDay);
      renderJobNav(jobsData);
    });
  }
  if (view === "candidates") {
    getCandidates().then((candidates) => {
      window.location.hash = "candidates";
      renderCandidatesHead(helloWord, capFirstLetter, whatTimeOfTheDay);
      renderCandidates(candidates);
    });
  }
  if (view === "leaves") {
    window.location.hash = "leaves";
    renderLeaveHead(helloWord, "Notification", whatTimeOfTheDay);
    renderLeave(employeesData);
  }
  if (view === "holidays") {
    window.location.hash = "holidays";
    renderHolidayHead(helloWord, "Holidays", whatTimeOfTheDay);
    renderHoliday(employeesData);
  }
};

// Event listeners
nav.addEventListener("click", (e) => {
  const link = e.target.closest(".link");
  if (!link) return;
  e.preventDefault();
  handleNavClick(link);
});

viewMore.addEventListener("click", () => {
  window.location.hash = "attendance";
  renderAttendanceView(helloWord, "Attendance", whatTimeOfTheDay);
});

const notificationBell = document.querySelector(".notification");
notificationBell.addEventListener("click", function () {
  window.location.hash = "leaves";
  renderLeaveHead(helloWord, "Notification", whatTimeOfTheDay);
  renderLeave(employeesData);
});
