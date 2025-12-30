"use strict";

const dashBoard = document.querySelector(".dashboard");

export const getCandidates = async () => {
  const res = await fetch("./json/candidates.json");
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
};

export const renderCandidates = (candidatesData) => {
  dashBoard.innerHTML = "";

  const candidatePageContainer = document.createElement("div");
  candidatePageContainer.classList.add("attendance-page");

  const tableStructureHTML = document.createElement("div");
  tableStructureHTML.classList.add("attendance-table-container");

  const candidatesBox = document.createElement("div");
  candidatesBox.classList.add("jobsBox");

  const searchWrapper = document.createElement("div");
  searchWrapper.className = "candidate-search-wrapper";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.id = "search-candidate-bar";
  searchInput.placeholder = "Search...";

  searchWrapper.appendChild(searchInput);

  // Add search wrapper to tableStructureHTML
  tableStructureHTML.appendChild(searchWrapper);

  candidatePageContainer.appendChild(tableStructureHTML);
  candidatePageContainer.appendChild(candidatesBox);
  dashBoard.appendChild(candidatePageContainer);

  // table structure
  const table = document.createElement("table");
  table.className = "candidate-table";

  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  tbody.id = "data-output";
  tbody.className = "data-output";
  table.append(thead, tbody);

  const tr = document.createElement("tr");
  thead.appendChild(tr);

  const th1 = document.createElement("th");
  th1.textContent = "Index";
  const th2 = document.createElement("th");
  th2.textContent = "Candidate Name";
  const th3 = document.createElement("th");
  th3.textContent = "Applied For";
  const th4 = document.createElement("th");
  th4.textContent = "Applied Date";
  const th5 = document.createElement("th");
  th5.textContent = "Email Address";
  const th6 = document.createElement("th");
  th6.textContent = "Mobile Number";
  const th7 = document.createElement("th");
  th7.textContent = "Status";

  tr.append(th1, th2, th3, th4, th5, th6, th7);

  tableStructureHTML.appendChild(table);

  const candidatesDataArr = candidatesData.candidates;

  const candidateRowsHTML = candidatesDataArr
    .map((candidate) => {
      const statusStyles = {
        Selected: { color: "#86EFAC", bg: "#14532D" },
        "In Progress": { color: "#FBBF24", bg: "#78350F" },
        Rejected: { color: "#FCA5A5", bg: "#7F1D1D" },
      };

      const status = candidate.status;
      const style = statusStyles[status];

      return `
        <tr>
        <td>${candidate.id}</td>
          <td>
            <img src="${candidate.avatar}" alt="${candidate.name}">
            <p>${candidate.name}</p>
          </td>
          <td>${candidate.appliedFor}</td>
          <td>${candidate.appliedDate}</td>
          <td>${candidate.email}</td>
          <td>${candidate.mobile}</td>
          <td class="truth"><span style="
                color: ${style.color};
                background-color: ${style.bg};
                padding: 0.6rem 1.2rem;
                border-radius: 5px;
                display: inline-block;
              ">${status}</span></td>
        </tr>
      `;
    })
    .join("");
  tbody.innerHTML = candidateRowsHTML;
  console.log(candidatesData.candidates);
};

export const renderCandidatesHead = (h, c, w) => {
  h.textContent = c;
  w.textContent = "All Candidate Records";
};
