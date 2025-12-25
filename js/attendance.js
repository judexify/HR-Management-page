"use strict";

let tableContent = document.querySelector("#data-output");

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

const initApp = () => {
  fetch("./json/employee.json")
    .then((response) => response.json())
    .then((employees) => {
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

    const state = {
      successtext: "#86EFAC",
      successBg: "#14532D",
      warningText: "#FBBF24",
      warningBg: "#78350F",
      onDOM: () => {
        return document.querySelector(".truth");
      },
    };

    uiForLateonTime(workers, string, state);
  }
};

const uiForLateonTime = (workers, string, state) => {
  tableContent.insertAdjacentHTML("afterbegin", string);
  const truthCell = document.querySelector("tr .truth");
  if (workers.attendance.truth === "On Time") {
    truthCell.innerHTML = `<span style="
      color: ${state.successtext};
      background-color: ${state.successBg};
      padding: 0.6rem 1.2rem;
      border-radius: 5px;
      display: inline-block;
    ">${workers.attendance.truth}</span>`;
  } else if (workers.attendance.truth === "Late") {
    truthCell.innerHTML = `<span style="
      color: ${state.warningText};
      background-color: ${state.warningBg};
      padding: 0.6rem 1.2rem;
      border-radius: 5px;
      display: inline-block;
    ">${workers.attendance.truth}</span>`;
  }
};
