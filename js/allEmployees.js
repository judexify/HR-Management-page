"use strict";

const dashBoard = document.querySelector(".dashboard");

export const renderAllEmployeePage = (data) => {
  dashBoard.innerHTML = "";

  const searchWrapper = createEmployeeSearchBar();
  const tableStructureHTML = createEmployeeTableStructure(data);

  dashBoard.appendChild(searchWrapper);
  dashBoard.appendChild(tableStructureHTML);
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

  const filterBtn = document.createElement("button");
  filterBtn.classList.add("filter-btn");

  const filterIcon = document.createElement("i");
  filterIcon.className = "fa-solid fa-filter";

  const filterText = document.createElement("span");
  filterText.textContent = "Filter";

  filterBtn.appendChild(filterIcon);
  filterBtn.appendChild(filterText);

  actionButtons.appendChild(addEmployeeBtn);
  actionButtons.appendChild(filterBtn);

  searchWrapper.appendChild(searchInput);
  searchWrapper.appendChild(actionButtons);

  return searchWrapper;
};

const createEmployeeTableStructure = (data) => {
  const tableStructureHTML = document.createElement("div");
  tableStructureHTML.classList.add("attendance-table-container");

  const table = createEmployeeTable();
  populateEmployeeTableBody(data, table);

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
    statusSpan.textContent = employee.status || "N/A";
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
  paginationInfo.textContent = `Showing 1 to 10 of ${data.length} members`;

  const paginationButtons = document.createElement("div");
  paginationButtons.classList.add("pagination-buttons");

  const prevBtn = document.createElement("button");
  prevBtn.classList.add("pagination-btn");
  prevBtn.textContent = "Previous";

  const page1Btn = document.createElement("button");
  page1Btn.classList.add("pagination-btn", "page-number-btn", "active-page");
  page1Btn.textContent = "1";

  const page2Btn = document.createElement("button");
  page2Btn.classList.add("pagination-btn", "page-number-btn");
  page2Btn.textContent = "2";

  const page3Btn = document.createElement("button");
  page3Btn.classList.add("pagination-btn", "page-number-btn");
  page3Btn.textContent = "3";

  const page4Btn = document.createElement("button");
  page4Btn.classList.add("pagination-btn", "page-number-btn");
  page4Btn.textContent = "4";

  const page5Btn = document.createElement("button");
  page5Btn.classList.add("pagination-btn", "page-number-btn");
  page5Btn.textContent = "5";

  const nextBtn = document.createElement("button");
  nextBtn.classList.add("pagination-btn");
  nextBtn.textContent = "Next";

  paginationButtons.appendChild(prevBtn);
  paginationButtons.appendChild(page1Btn);
  paginationButtons.appendChild(page2Btn);
  paginationButtons.appendChild(page3Btn);
  paginationButtons.appendChild(page4Btn);
  paginationButtons.appendChild(page5Btn);
  paginationButtons.appendChild(nextBtn);

  paginationContainer.appendChild(paginationInfo);
  paginationContainer.appendChild(paginationButtons);

  paginationFooter.appendChild(showingContainer);
  paginationFooter.appendChild(paginationContainer);

  return paginationFooter;
};

export const renderAllEmployeeHead = (h, c, w) => {
  h.textContent = c;
  w.textContent = "All Employees";
};
