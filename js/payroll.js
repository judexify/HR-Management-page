"use strict";
import { getEmployees } from "./attendance.js";

// DOM ELELMENTS
const dashBoard = document.querySelector(".dashboard");

let employeesData = null;
let currentPayrollDisplayCount = 10;

getEmployees().then((employees) => {
  employeesData = employees;
});

const renderEmployeeRows = (count) => {
  console.log(employeesData);
  const slicedEmployees = employeesData.slice(0, count);

  const employeeRowsHTML = slicedEmployees
    .map(
      (emp) => `
      <tr>
        <td>
          <img src="${emp.imagePath}" alt="${emp.name}">
          <p>${emp.name}</p>
        </td>
        <td>${emp.salary.perYear}</td>
        <td>${emp.salary.amount}</td>
        <td>${emp.salary.deduction}</td>
        <td class="truth">${emp.salary.transaction}</td>
      </tr>
    `
    )
    .join("");

  const tbody = document.querySelector("#data-output");
  if (tbody) {
    tbody.innerHTML = employeeRowsHTML;
  }
};

export const renderPayroll = () => {
  dashBoard.innerHTML = "";

  const payrollPageContainer = document.createElement("div");
  payrollPageContainer.classList.add("payroll-page");

  // Search Bar HTML
  const searchBarHTML = ` 
     <div class="payroll-search-wrapper">
      <input type="text" id="payroll-attendance-bar" placeholder="Search..." />
    </div>`;

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

  const tableStructureHTML = `
    <div class="attendance-table-container">
      <table class="attendance-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>CTC</th>
            <th>Salary Per Month</th>
            <th>Deduction</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody id="data-output">
          <!-- Populated by JavaScript -->
        </tbody>
      </table>
    </div>
  `;

  // build the attendance page
  payrollPageContainer.innerHTML =
    searchBarHTML + tableStructureHTML + rowSelectorHTML;

  dashBoard.appendChild(payrollPageContainer);
  renderEmployeeRows(currentPayrollDisplayCount);

  // event listener for select dropdown
  const selectElement = document.querySelector("#numbers");
  if (selectElement) {
    selectElement.addEventListener("change", (e) => {
      const selectedCount = parseInt(e.target.value);
      currentPayrollDisplayCount = selectedCount;
      renderEmployeeRows(selectedCount);
    });
  }

  // Add event listener for search bar
  const searchBar = document.querySelector("#payroll-attendance-bar");
  if (searchBar) {
    searchBar.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      filterEmployees(searchTerm);
    });
  }
};

// FILTER EMPLOYEES BASED ON PAYROLL
const filterEmployees = (searchTerm) => {
  const filteredEmployees = employeesData.filter((emp) => {
    return (
      emp.name.toLowerCase().includes(searchTerm) ||
      emp.salary.perYear.toLowerCase().includes(searchTerm) ||
      emp.salary.amount.toLowerCase().includes(searchTerm) ||
      emp.salary.transaction.toLowerCase().includes(searchTerm)
    );
  });

  const slicedEmployees = filteredEmployees.slice(
    0,
    currentPayrollDisplayCount
  );

  const employeeRowsHTML = slicedEmployees
    .map(
      (emp) => `
      <tr>
        <td>
          <img src="${emp.imagePath}" alt="${emp.name}">
          <p>${emp.name}</p>
        </td>
        <td>${emp.salary.perYear}</td>
        <td>${emp.salary.amount}</td>
        <td>${emp.salary.deduction}</td>
        <td class="truth">${emp.salary.transaction}</td>
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
