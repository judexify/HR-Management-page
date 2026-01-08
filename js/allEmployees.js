"use strict";

const dashBoard = document.querySelector(".dashboard");
let currentDisplayedItem = 10;
const chunkArr = [];
let currentPage = 0;
let isPaginationInitialized = false;
let formData = {
  personalInfoData: {},
  professionalInfoData: {},
  accessAccountData: {},
};

export const renderAllEmployeePage = (data) => {
  dashBoard.innerHTML = "";

  const searchWrapper = createEmployeeSearchBar();
  const tableStructureHTML = createEmployeeTableStructure(data);

  dashBoard.appendChild(searchWrapper);
  dashBoard.appendChild(tableStructureHTML);
  selectFn(data);
  paginationFn(data);
  searchBarFn(data, tableStructureHTML);
  newEmployeeFn(data);
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
  option10.selected = true;

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

//  Personal Information Form
const renderPersonalInfoForm = (data) => {
  const formSection = document.querySelector(".eachFormSectionDiv");
  formSection.innerHTML = `
    <div class="personal-info-form">
      <div class="photo-upload-section">
        <div class="camera-icon" id="cameraIcon">📷</div>
        <span class="upload-text" id="uploadText">Upload Photo</span>
        <input type="file" accept="image/*" class="photo-upload-input" id="photoUpload">
      </div>

      <div class="form-grid">
        <div class="form-group">
          <input type="text" placeholder="Full Name" class="form-input" id="name">
        </div>
        
        <div class="form-group">
          <input type="text" placeholder="Role/Title" class="form-input" id="role">
        </div>
        
        <div class="form-group">
          <input type="email" placeholder="Email Address" class="form-input" id="email">
        </div>
        
        <div class="form-group">
          <input type="tel" placeholder="Phone Number" class="form-input" id="phone_number">
        </div>
        
        <div class="form-group">
          <input type="text" placeholder="Location (City, State)" class="form-input" id="location">
        </div>
        
        <div class="form-group">
          <select class="form-select" id="employment_type">
            <option disabled selected>Employment Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Intern">Intern</option>
          </select>
        </div>
        
        <div class="form-group">
          <select class="form-select" id="status">
            <option disabled selected>Status</option>
            <option value="Permanent">Permanent</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        
        <div class="form-group">
          <input type="text" placeholder="Department" class="form-input" id="department">
        </div>
      </div>

      <div class="next-button-container">
        <button class="next-button">Next</button>
      </div>
    </div>
  `;

  const photoInput = document.getElementById("photoUpload");
  const cameraIcon = document.getElementById("cameraIcon");
  const uploadText = document.getElementById("uploadText");

  cameraIcon.addEventListener("click", () => photoInput.click());
  uploadText.addEventListener("click", () => photoInput.click());

  photoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        cameraIcon.style.backgroundImage = `url(${event.target.result})`;
        cameraIcon.style.backgroundSize = "cover";
        cameraIcon.style.backgroundPosition = "center";
        cameraIcon.innerHTML = "";
      };
      reader.readAsDataURL(file);
    }
  });

  // Next button - Collect personal info
  document.querySelector(".next-button").addEventListener("click", () => {
    formData.personalInfoData = {
      name: document.getElementById("name").value,
      role: document.getElementById("role").value,
      email: document.getElementById("email").value,
      phone_number: document.getElementById("phone_number").value,
      location: document.getElementById("location").value,
      employment_type: document.getElementById("employment_type").value,
      status: document.getElementById("status").value,
      department: document.getElementById("department").value,
      imagePath: cameraIcon.style.backgroundImage
        ? cameraIcon.style.backgroundImage.slice(5, -2)
        : "./img/default.jpg",
    };

    console.log("Personal Info:", formData.personalInfoData);
    setActiveButton(document.querySelector(".proffesionalInfoBtn"));
    renderProfessionalInfoForm(data);
  });
};

const setActiveButton = (activeBtn) => {
  document.querySelectorAll(".buttonsDiv button").forEach((btn) => {
    btn.classList.remove("active");
  });
  activeBtn.classList.add("active");
};

// Render Professional Information Form
const renderProfessionalInfoForm = (data) => {
  const formSection = document.querySelector(".eachFormSectionDiv");
  formSection.innerHTML = `
    <div class="professional-info-form">
      <div class="form-grid">
        <div class="form-group">
          <input type="text" placeholder="Job Title/Designation" class="form-input" id="title">
        </div>
        
        <div class="form-group">
          <input type="text" placeholder="Monthly Salary (e.g., $5,833)" class="form-input" id="salary_amount">
        </div>
        
        <div class="form-group">
          <input type="text" placeholder="Annual Salary (e.g., $70,000)" class="form-input" id="salary_perYear">
        </div>
        
        <div class="form-group">
          <select class="form-select" id="salary_transaction">
            <option disabled selected>Salary Transaction Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
          </select>
        </div>
        
        <div class="form-group">
          <input type="text" placeholder="Salary Deduction (e.g., $200 or -)" class="form-input" id="salary_deduction">
        </div>
        
        <div class="form-group">
          <input type="time" placeholder="Check-in Time" class="form-input" id="attendance_check_in">
        </div>
        
        <div class="form-group">
          <select class="form-select" id="attendance_truth">
            <option disabled selected>Attendance Status</option>
            <option value="On Time">On Time</option>
            <option value="Late">Late</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
        
        <div class="form-group">
          <input type="number" placeholder="Employee ID" class="form-input" id="id">
        </div>
      </div>

      <div class="button-group">
        <button class="back-button">Back</button>
        <button class="next-button">Next</button>
      </div>
    </div>
  `;

  // Back button
  document.querySelector(".back-button").addEventListener("click", () => {
    setActiveButton(document.querySelector(".personalInfoBtn"));
    renderPersonalInfoForm(data);
  });

  // Next button - Collect professional info
  document.querySelector(".next-button").addEventListener("click", () => {
    formData.professionalInfoData = {
      id: parseInt(document.getElementById("id").value),
      title: document.getElementById("title").value,
      salary: {
        amount: document.getElementById("salary_amount").value,
        perYear: document.getElementById("salary_perYear").value,
        transaction: document.getElementById("salary_transaction").value,
        deduction: document.getElementById("salary_deduction").value,
      },
      attendance: {
        truth: document.getElementById("attendance_truth").value,
        check_in: document.getElementById("attendance_check_in").value,
      },
    };

    console.log("Professional Info:", formData.professionalInfoData);
    setActiveButton(document.querySelector(".accessAccountBtn"));
    renderAccessAccountForm(data);
  });
};

// Render Access Account Form
const renderAccessAccountForm = (data) => {
  const formSection = document.querySelector(".eachFormSectionDiv");
  formSection.innerHTML = `
    <div class="access-account-form">
      <h3 style="color: #e5e7eb; margin-bottom: 2rem; font-size: 1.8rem;">Additional Information</h3>
      
      <div class="form-grid">
        <div class="form-group full-width">
          <label style="color: #9ca3af; margin-bottom: 0.8rem; display: block;">Notification Message</label>
          <input type="text" placeholder="Enter notification message" class="form-input" id="notification_message">
        </div>
        
        <div class="form-group full-width">
          <label style="color: #9ca3af; margin-bottom: 0.8rem; display: block;">Notification Content</label>
          <textarea placeholder="Enter detailed notification content" class="form-textarea" id="notification_content"></textarea>
        </div>
        
        <div class="form-group">
          <label style="color: #9ca3af; margin-bottom: 0.8rem; display: block;">Application Type</label>
          <select class="form-select" id="application_type">
            <option disabled selected>Select Application Type</option>
            <option value="Leave">Leave</option>
            <option value="Reimbursement">Reimbursement</option>
            <option value="Transfer">Transfer</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div class="form-group">
          <label style="color: #9ca3af; margin-bottom: 0.8rem; display: block;">Application Status</label>
          <select class="form-select" id="application_status">
            <option disabled selected>Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        
        <div class="form-group">
          <label style="color: #9ca3af; margin-bottom: 0.8rem; display: block;">Application Start Date</label>
          <input type="date" class="form-input" id="application_start_date">
        </div>
        
        <div class="form-group">
          <label style="color: #9ca3af; margin-bottom: 0.8rem; display: block;">Application End Date</label>
          <input type="date" class="form-input" id="application_end_date">
        </div>

        <div class="form-group full-width">
          <label style="color: #9ca3af; margin-bottom: 0.8rem; display: block;">Select One Holiday Per Year</label>
          <select class="form-select" id="holiday_name">
            <option disabled selected>Choose Holiday</option>
            <option value="New Year's Day">New Year's Day</option>
            <option value="Martin Luther King Jr. Day">Martin Luther King Jr. Day</option>
            <option value="Presidents' Day">Presidents' Day</option>
            <option value="Memorial Day">Memorial Day</option>
            <option value="Independence Day">Independence Day</option>
            <option value="Labor Day">Labor Day</option>
            <option value="Thanksgiving">Thanksgiving</option>
            <option value="Christmas Day">Christmas Day</option>
          </select>
        </div>

        <div class="form-group">
          <label style="color: #9ca3af; margin-bottom: 0.8rem; display: block;">Holiday Date</label>
          <input type="date" class="form-input" id="holiday_date">
        </div>
      </div>

      <div class="button-group">
        <button class="back-button">Back</button>
        <button class="submit-button">Submit</button>
      </div>
    </div>
  `;

  // Back button
  document.querySelector(".back-button").addEventListener("click", () => {
    setActiveButton(document.querySelector(".proffesionalInfoBtn"));
    renderProfessionalInfoForm(data);
  });

  // Submit button
  document.querySelector(".submit-button").addEventListener("click", () => {
    const holidayName = document.getElementById("holiday_name").value;
    const holidayDate = document.getElementById("holiday_date").value;

    const formattedDate = holidayDate
      ? new Date(holidayDate).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      : "";

    formData.accessAccountData = {
      notifications: [
        {
          message: document.getElementById("notification_message").value,
          content: document.getElementById("notification_content").value,
          timestamp: new Date().toLocaleString(),
        },
      ],
      applications: [
        {
          type: document.getElementById("application_type").value,
          start_date: document.getElementById("application_start_date").value,
          end_date: document.getElementById("application_end_date").value,
          status: document.getElementById("application_status").value,
        },
      ],
      upcoming_holidays: [
        {
          holiday_name: holidayName,
          date: formattedDate,
          status: true,
        },
      ],
    };

    // reduce to json format type

    const newEmployee = Object.keys(formData).reduce((acc, key) => {
      return Object.assign(acc, formData[key]);
    }, {});

    data.push(newEmployee);

    // Adding the new employee row to the table
    const tbody = document.querySelector(".data-output");
    if (tbody) {
      const row = document.createElement("tr");

      const idCell = document.createElement("td");
      idCell.textContent = newEmployee.id || "N/A";
      row.appendChild(idCell);

      const nameCell = document.createElement("td");
      const nameWrapper = document.createElement("div");
      nameWrapper.classList.add("employee-name-cell");

      const img = document.createElement("img");
      img.src = newEmployee.imagePath || "";
      img.alt = newEmployee.name;
      img.classList.add("employee-avatar");

      const nameText = document.createElement("p");
      nameText.textContent = newEmployee.name || "N/A";

      nameWrapper.appendChild(img);
      nameWrapper.appendChild(nameText);
      nameCell.appendChild(nameWrapper);
      row.appendChild(nameCell);

      const deptCell = document.createElement("td");
      deptCell.textContent = newEmployee.department || "N/A";
      row.appendChild(deptCell);

      const titleCell = document.createElement("td");
      titleCell.textContent = newEmployee.title || "N/A";
      row.appendChild(titleCell);

      const typeCell = document.createElement("td");
      typeCell.textContent = newEmployee.employment_type || "N/A";
      row.appendChild(typeCell);

      const statusCell = document.createElement("td");
      const statusSpan = document.createElement("span");
      statusSpan.textContent = newEmployee.status || "N/A";
      statusSpan.classList.add("employee-status");

      if (newEmployee.status === "Permanent") {
        statusSpan.classList.add("status-permanent");
      }

      if (newEmployee.status === "Contract") {
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

      // Adding  the row to the table
      tbody.appendChild(row);
    }

    // Clear form data for next employee
    formData = {
      personalInfoData: {},
      professionalInfoData: {},
      accessAccountData: {},
    };

    alert("Employee added successfully!");

    // Go back to employee table
    renderAllEmployeePage(data);
  });
};

//  renderFormSection
const renderFormSection = (data) => {
  dashBoard.innerHTML = "";
  dashBoard.innerHTML = `
    <div class="attendance-table-container">
      <div class="form-container">
        <div class="buttonsDiv">
          <button class="personalInfoBtn active">Personal Information</button>
          <button class="proffesionalInfoBtn">Professional Information</button>
          <button class="accessAccountBtn">Access Account</button>
        </div>
        <div class="eachFormSectionDiv"></div>
      </div>
    </div>
  `;

  renderPersonalInfoForm(data);
};

const newEmployeeFn = (data) => {
  const addEmployeeBtn = document.querySelector(".add-employee-btn");
  if (addEmployeeBtn) {
    addEmployeeBtn.addEventListener("click", () => {
      renderFormSection(data);
    });
  }
};

export const renderAllEmployeeHead = (h, c, w) => {
  h.textContent = c;
  w.textContent = "All Employees";
};
