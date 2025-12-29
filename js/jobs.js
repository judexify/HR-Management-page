"use strict";

const dashBoard = document.querySelector(".dashboard");

export const getJobs = async () => {
  const res = await fetch("./json/jobs.json");
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
};

export const renderJobNav = (jobsData) => {
  dashBoard.innerHTML = "";

  const jobsPageContainer = document.createElement("div");
  jobsPageContainer.classList.add("attendance-page");

  const tableStructureHTML = document.createElement("div");
  tableStructureHTML.classList.add("attendance-table-container");

  const jobsBox = document.createElement("div");
  jobsBox.classList.add("jobsBox");

  const searchWrapper = document.createElement("div");
  searchWrapper.className = "Jobs-search-wrapper";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.id = "search-job-bar";
  searchInput.placeholder = "Search...";

  searchWrapper.appendChild(searchInput);

  // Add search wrapper to tableStructureHTML
  tableStructureHTML.appendChild(searchWrapper);

  jobsPageContainer.appendChild(tableStructureHTML);
  jobsPageContainer.appendChild(jobsBox);
  dashBoard.appendChild(jobsPageContainer);

  const jobArray = Object.entries(jobsData)[0][1];

  // Create container to hold the three status boxes
  const jobsStatusContainer = document.createElement("div");
  jobsStatusContainer.className = "jobs-status-container";

  const createStatusBox = (jobsList, label, boxClass) => {
    const statusBox = document.createElement("div");
    statusBox.className = boxClass;

    const statusTitle = document.createElement("p");
    statusTitle.className = `${boxClass}-title`;
    statusTitle.textContent = label;
    statusBox.appendChild(statusTitle);

    jobsList.forEach((el) => {
      const jobDiv = document.createElement("div");
      jobDiv.className = "each-jobs-per-status";

      const jobHeader = document.createElement("div");
      jobHeader.className = "each-job-header";

      const icon = document.createElement("i");
      icon.className = "fa-solid fa-briefcase";

      const jobDesigTitle = document.createElement("div");
      jobDesigTitle.className = "job-desig-title";

      const jobTitle = document.createElement("p");
      jobTitle.className = "job-title";
      jobTitle.textContent = el.title;

      const jobDesig = document.createElement("p");
      jobDesig.className = "job-desig";
      jobDesig.textContent = el.department;

      jobDesigTitle.append(jobTitle, jobDesig);
      jobHeader.append(icon, jobDesigTitle);
      jobDiv.appendChild(jobHeader);

      statusBox.appendChild(jobDiv);
    });

    return statusBox;
  };

  // Create each box
  const activeBox = createStatusBox(
    jobArray.active,
    "Active Jobs",
    "active-jobs-box"
  );
  const inactiveBox = createStatusBox(
    jobArray.inactive,
    "Inactive Jobs",
    "inactive-jobs-box"
  );
  const completedBox = createStatusBox(
    jobArray.completed,
    "Completed Jobs",
    "completed-jobs-box"
  );

  jobsStatusContainer.append(activeBox, inactiveBox, completedBox);
  jobsBox.appendChild(jobsStatusContainer);

  // Add jobsBox to tableStructureHTML so everything is inside it
  tableStructureHTML.appendChild(jobsBox);
};

export const renderJobHead = (h, c, w) => {
  h.textContent = c;
  w.textContent = "Show All Jobs";
};
