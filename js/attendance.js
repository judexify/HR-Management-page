"use strict";

let tableContent = document.querySelector("#data-output");

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

export const getEmployees = () => {
  return fetch("./json/employee.json").then((response) => response.json());
};

const initApp = () => {
  getEmployees().then((employees) => {
    renderTableUI(employees);
  });
};

const renderTableUI = (organization) => {
  const lastSevenItems = organization.slice(-7);
  for (let workers of lastSevenItems) {
    const string = `
    <tr>
    <td><img src="${workers.imagePath}"> <p>${workers.name}</p></td>
    <td>${workers.department}</td>
    <td>${workers.employment_type}</td>
    <td>${workers.attendance.check_in}</td>
    <td class="truth">${workers.attendance.truth}</td>
    </tr>
    `;

    uiForLateonTime(workers, string);
  }
};
const uiForLateonTime = (workers, string) => {
  const state = {
    successtext: "#86EFAC",
    successBg: "#14532D",
    warningText: "#FBBF24",
    warningBg: "#78350F",
    onDOM: () => {
      return document.querySelector(".truth");
    },
  };

  tableContent.insertAdjacentHTML("afterbegin", string);
  const insertedRow = tableContent.firstElementChild;
  const truthCell = insertedRow.querySelector(".truth");

  const statusStyles = {
    "On Time": { color: state.successtext, bg: state.successBg },
    Late: { color: state.warningText, bg: state.warningBg },
  };

  const status = workers.attendance.truth;
  const style = statusStyles[status];

  if (style) {
    truthCell.innerHTML = `<span style="
      color: ${style.color};
      background-color: ${style.bg};
      padding: 0.6rem 1.2rem;
      border-radius: 5px;
      display: inline-block;
    ">${status}</span>`;
  }
};
