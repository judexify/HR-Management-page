"use strict";

const dashBoard = document.querySelector(".dashboard");

export const renderHoliday = (data) => {
  dashBoard.innerHTML = "";
  const holidayPageContainer = document.createElement("div");
  holidayPageContainer.classList.add("attendance-table-container");

  const holidayBoxHead = document.createElement("div");
  holidayBoxHead.classList.add("holidayBoxHead");
  holidayBoxHead.style.cssText = `
  display:flex;
  align-items:center;
  justify-content:space-between;
  `;

  const holidaysBox = document.createElement("div");
  holidaysBox.classList.add("holidaysBox");

  const searchWrapper = document.createElement("div");
  searchWrapper.className = "holidays-search-wrapper";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.id = "search-holiday-bar";
  searchInput.placeholder = "Search...";

  const addNewMember = document.createElement("div");
  addNewMember.classList.add("addNewMember");
  addNewMember.style.cssText = `
  display:flex;
  align-items:center;
  gap:1.2rem;
  background-color: #7c3aed;
  padding:1.2rem;
  border-radius:5px;
  `;

  const plusIcon = document.createElement("i");
  plusIcon.classList.add("fa-solid");
  plusIcon.classList.add("fa-plus");
  plusIcon.style.cssText = `
  font-size:1.8rem;
  color:#e5e7eb;
  `;

  const newMemberText = document.createElement("p");
  newMemberText.classList.add("newMemberText");
  newMemberText.textContent = "Add New Holiday";
  newMemberText.style.cssText = `
  font-size:1.8rem;
  color:#e5e7eb;
  `;

  searchWrapper.appendChild(searchInput);
  dashBoard.appendChild(holidayPageContainer);
  holidayPageContainer.append(holidayBoxHead, holidaysBox);
  holidayBoxHead.append(searchWrapper, addNewMember);
  addNewMember.append(plusIcon, newMemberText);

  renderHolidayTableHead(data, holidaysBox);
};

const renderHolidayTableHead = (data, holidayBox) => {
  const table = document.createElement("table");
  table.classList.add("attendace-table");

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  thead.appendChild(tr);

  const th1 = document.createElement("th");
  th1.textContent = "Date";
  const th2 = document.createElement("th");
  th2.textContent = "Day";
  const th3 = document.createElement("th");
  th3.textContent = "Holiday Name";
  tr.append(th1, th2, th3);

  const tbody = document.createElement("tbody");
  tbody.id = "data-output";

  table.append(thead, tbody);
  holidayBox.appendChild(table);
  reduceHolDatatoObject(tbody, data);
};

const reduceHolDatatoObject = (tbody, data) => {
  const eachHolidayCopyArr = data.slice();

  const eachReducedHoliday = eachHolidayCopyArr.map((employee) => {
    const holidays = employee.upcoming_holidays;

    const holidayObj = holidays.reduce((acc, holiday, index) => {
      acc[`holiday${index + 1}`] = holiday.holiday_name;
      acc[`date${index + 1}`] = holiday.date;
      return acc;
    }, {});

    holidayObj.name = employee.name;

    return holidayObj;
  });

  // renderTableBody(tbody, eachReduceHoliday);
  removeDuplicatesandGroup(tbody, eachReducedHoliday);
};

const holidayMappedObject = {};
const removeDuplicatesandGroup = (tbody, eachReducedHoliday) => {
  eachReducedHoliday.forEach((el) => {
    const { holiday1, date1, holiday2, date2, name } = el;

    // Handle holiday1
    if (!holidayMappedObject[holiday1]) {
      holidayMappedObject[holiday1] = {
        holiday: holiday1,
        date: date1,
        names: [name],
      };
    } else {
      holidayMappedObject[holiday1].names.push(name);
    }

    // Handle holiday2
    if (!holidayMappedObject[holiday2]) {
      holidayMappedObject[holiday2] = {
        holiday: holiday2,
        date: date2,
        names: [name],
      };
    } else {
      holidayMappedObject[holiday2].names.push(name);
    }
  });

  const resultMappedObject = Object.values(holidayMappedObject);

  sortHolidayDates(tbody, resultMappedObject);
};

const sortHolidayDates = (tbody, mappedData) => {
  console.log(mappedData);
  const sortedData = mappedData.toSorted(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  renderTableBody(tbody, sortedData);
};

const renderTableBody = (tbody, data) => {
  data.forEach((el) => {
    // console.log(el);
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const sortedDay = new Date(el.date).getDay();

    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.textContent = `${el.date}`;
    const td2 = document.createElement("td");
    td2.textContent = days[sortedDay];
    const td3 = document.createElement("td");
    td3.textContent = `${el.holiday}`;

    tr.append(td1, td2, td3);
    tbody.appendChild(tr);
  });

  const tableRow = document.querySelectorAll("tr");
  [...tableRow].forEach((tr) => {
    tr.addEventListener("click", function (e) {
      console.log(e.target);
    });
  });
};

export const renderHolidayHead = (h, c, w) => {
  h.textContent = c;
  w.textContent = "All Holidays";
};
