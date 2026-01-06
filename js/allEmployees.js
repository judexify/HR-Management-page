"use strict";

const dashBoard = document.querySelector(".dashboard");
let currentDisplayedItem = 10;
const chunkArr = [];
let currentPage = 0;
let isPaginationInitialized = false;

export const renderAllEmployeePage = (data) => {
  dashBoard.innerHTML = "";

  const searchWrapper = createEmployeeSearchBar();
  const tableStructureHTML = createEmployeeTableStructure(data);

  dashBoard.appendChild(searchWrapper);
  dashBoard.appendChild(tableStructureHTML);
  selectFn(data);
  paginationFn(data);
  searchBarFn(data, tableStructureHTML);
};

const createEmployeeSearchBar = () => {
  const searchWrapper = document.createElement("div");
  searchWrapper.classList.add("employee-search-wrapper");

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.id = "search-employee-bar";
  searchInput.placeholder = "Search...";

  const actionButtons = document.createElement("div");
  actionButtons.classList.add("employee-action-buttons");

  const addEmployeeBtn = document.createElement("button");
  addEmployeeBtn.classList.add("add-employee-btn");

  const addIcon = document.createElement("i");
  addIcon.className = "fa-solid fa-circle-plus";

  const addText = document.createElement("span");
  addText.textContent = "Add New Employee";

  addEmployeeBtn.appendChild(addIcon);
  addEmployeeBtn.appendChild(addText);

  actionButtons.appendChild(addEmployeeBtn);

  searchWrapper.appendChild(searchInput);
  searchWrapper.appendChild(actionButtons);

  return searchWrapper;
};

const searchBarFn = (data, tableStructure) => {
  //   // Search bar
  const searchBar = document.querySelector("#search-employee-bar");

  if (searchBar) {
    searchBar.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();

      filterEmployees(data, searchTerm, tableStructure);
    });
  }
};

// // Filter employees
const filterEmployees = (data, searchTerm, tableStructure) => {
  if (!data) return;

  const filteredEmployees = data.filter((emp) => {
    return (
      emp.name.toLowerCase().includes(searchTerm) ||
      emp.department.toLowerCase().includes(searchTerm) ||
      emp.title.toLowerCase().includes(searchTerm) ||
      emp.employment_type.toLowerCase().includes(searchTerm) ||
      emp.status.toLowerCase().includes(searchTerm)
    );
  });

  const slicedEmployees = filteredEmployees.slice(0, currentDisplayedItem);

  const employeeRowsHTML = slicedEmployees
    .map(
      (emp) => `
      <tr>
        <td>${emp.id}</td>
        <td>
          <img src="${emp.imagePath}" alt="${emp.name}">
          <p>${emp.name}</p>
        </td>
        <td>${emp.department}</td>
        <td>${emp.title}</td>
        <td>${emp.employment_type}</td>
        <td>
        <span class="employee-status ${
          emp.status === "Permanent" ? "status-permanent" : "status-contract"
        }">${emp.status}</span>
      </td>
      <td>
        <div class="employee-action-cell">
          <i class="fa-regular fa-eye action-icon"></i>
          <i class="fa-regular fa-pen-to-square action-icon"></i>
          <i class="fa-regular fa-trash-can action-icon"></i>
        </div>
      </td>
      </tr>
    `
    )
    .join("");

  const tableContainer = tableStructure.querySelector(".attendance-table");
  const tbody = tableContainer.querySelector(".data-output");

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

const createEmployeeTableStructure = (data) => {
  const tableStructureHTML = document.createElement("div");
  tableStructureHTML.classList.add("attendance-table-container");

  const table = createEmployeeTable();
  populateEmployeeTableBody(data.slice(0, 10), table);

  tableStructureHTML.appendChild(table);

  const footer = createPaginationFooter(data);
  tableStructureHTML.appendChild(footer);

  return tableStructureHTML;
};

const createEmployeeTable = () => {
  const table = document.createElement("table");
  table.classList.add("attendance-table");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const headers = [
    "Employee ID",
    "Employee Name",
    "Department",
    "Designation",
    "Type",
    "Status",
    "Action",
  ];

  headers.forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  return table;
};

const selectFn = (data) => {
  const entriesSelect = document.querySelector(".entries-select");
  if (entriesSelect) {
    entriesSelect.addEventListener("change", (e) => {
      currentDisplayedItem = parseInt(e.target.value);
      const slicedItems = data.slice(0, currentDisplayedItem);

      const table = document.querySelector(".attendance-table");
      if (table) {
        const oldTbody = table.querySelector(".data-output");
        if (oldTbody) {
          table.removeChild(oldTbody);
        }
        populateEmployeeTableBody(slicedItems, table);
      }

      chunkArr.length = 0;
      currentPage = 0;
      for (let i = 0; i < data.length; i += currentDisplayedItem) {
        chunkArr.push(data.slice(i, i + currentDisplayedItem));
      }
    });
  }
};

const populateEmployeeTableBody = (data, table) => {
  const tbody = document.createElement("tbody");
  tbody.classList.add("data-output");

  data.forEach((employee) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = employee.id;
    row.appendChild(idCell);

    const nameCell = document.createElement("td");
    const nameWrapper = document.createElement("div");
    nameWrapper.classList.add("employee-name-cell");

    const img = document.createElement("img");
    img.src = employee.imagePath;
    img.alt = employee.name;
    img.classList.add("employee-avatar");

    const nameText = document.createElement("p");
    nameText.textContent = employee.name;

    nameWrapper.appendChild(img);
    nameWrapper.appendChild(nameText);
    nameCell.appendChild(nameWrapper);
    row.appendChild(nameCell);

    const deptCell = document.createElement("td");
    deptCell.textContent = employee.department;
    row.appendChild(deptCell);

    const titleCell = document.createElement("td");
    titleCell.textContent = employee.title;
    row.appendChild(titleCell);

    const typeCell = document.createElement("td");
    typeCell.textContent = employee.employment_type;
    row.appendChild(typeCell);

    const statusCell = document.createElement("td");
    const statusSpan = document.createElement("span");
    statusSpan.textContent = employee.status;
    statusSpan.classList.add("employee-status");

    if (employee.status === "Permanent") {
      statusSpan.classList.add("status-permanent");
    }

    if (employee.status === "Contract") {
      statusSpan.classList.add("status-contract");
    }

    statusCell.appendChild(statusSpan);
    row.appendChild(statusCell);

    const actionCell = document.createElement("td");
    const actionWrapper = document.createElement("div");
    actionWrapper.classList.add("employee-action-cell");

    ["fa-eye", "fa-pen-to-square", "fa-trash-can"].forEach((icon) => {
      const i = document.createElement("i");
      i.className = `fa-regular ${icon}`;
      i.classList.add("action-icon");
      actionWrapper.appendChild(i);
    });

    actionCell.appendChild(actionWrapper);
    row.appendChild(actionCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
};

const mutateDataForPagination = (e, data) => {
  const btnText = e.target.textContent;

  if (btnText === "Previous" && currentPage === 1) {
    chunkArr.length = 0;
  }

  if (chunkArr.length === 0) {
    for (let i = 0; i < data.length; i += currentDisplayedItem) {
      chunkArr.push(data.slice(i, i + currentDisplayedItem));
    }
  }
  nextBtn(chunkArr, e);
  prevBtn(chunkArr, e);
};

const nextBtn = (arr, e) => {
  const next = e.target.textContent;

  if (next === "Next" && currentPage < arr.length - 1) {
    currentPage++;
    const table = document.querySelector(".attendance-table");

    const oldTbody = table.querySelector(".data-output");
    if (oldTbody) {
      table.removeChild(oldTbody);
    }

    populateEmployeeTableBody(arr[currentPage], table);
  }
};
const prevBtn = (arr, e) => {
  const prev = e.target.textContent;

  if (prev === "Previous" && currentPage > 0) {
    currentPage--;
    const table = document.querySelector(".attendance-table");
    const oldTbody = table.querySelector(".data-output");
    if (oldTbody) {
      table.removeChild(oldTbody);
    }

    populateEmployeeTableBody(arr[currentPage], table);
  }
};

const paginationFn = (data) => {
  if (isPaginationInitialized) return;
  isPaginationInitialized = true;

  const pagBtns = document.querySelector(".pagination-buttons");

  pagBtns.addEventListener("click", (e) => {
    mutateDataForPagination(e, data);
  });
};

const createPaginationFooter = (data) => {
  const paginationFooter = document.createElement("div");
  paginationFooter.classList.add("employee-pagination-footer");

  const showingContainer = document.createElement("div");
  showingContainer.classList.add("showing-container");

  const showingLabel = document.createElement("label");
  showingLabel.classList.add("showing-label");
  showingLabel.textContent = "Showing";

  const entriesSelect = document.createElement("select");
  entriesSelect.classList.add("entries-select");

  const option5 = document.createElement("option");
  option5.value = 5;
  option5.textContent = 5;
  entriesSelect.appendChild(option5);

  const option10 = document.createElement("option");
  option10.value = 10;
  option10.textContent = 10;
  entriesSelect.appendChild(option10);

  const option15 = document.createElement("option");
  option15.value = 15;
  option15.textContent = 15;
  entriesSelect.appendChild(option15);
  option10.selected = true;

  const option20 = document.createElement("option");
  option20.value = 20;
  option20.textContent = 20;
  entriesSelect.appendChild(option20);

  showingContainer.appendChild(showingLabel);
  showingContainer.appendChild(entriesSelect);

  const paginationContainer = document.createElement("div");
  paginationContainer.classList.add("pagination-container");

  const paginationInfo = document.createElement("span");
  paginationInfo.classList.add("pagination-info");
  // paginationInfo.textContent = `Showing 1 to 10 of ${data.length} members`;

  const paginationButtons = document.createElement("div");
  paginationButtons.classList.add("pagination-buttons");

  const prevBtn = document.createElement("button");
  prevBtn.classList.add("pagination-btn");
  prevBtn.textContent = "Previous";

  const nextBtn = document.createElement("button");
  nextBtn.classList.add("pagination-btn");
  nextBtn.textContent = "Next";

  paginationButtons.appendChild(prevBtn);

  paginationButtons.appendChild(nextBtn);

  paginationContainer.appendChild(paginationButtons);

  paginationFooter.appendChild(showingContainer);
  paginationFooter.appendChild(paginationContainer);

  return paginationFooter;
};

export const renderAllEmployeeHead = (h, c, w) => {
  h.textContent = c;
  w.textContent = "All Employees";
};
