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

  const jobArray = Object.entries(jobsData);
  const activeJobs = jobArray[0][1].active;

  activeJobs.forEach((el) => {
    const activeJobDiv = document.createElement("div");
    activeJobDiv.className = "active-jobs";

    const statusTag = document.createElement("p");
    statusTag.className = "status-tag";
    statusTag.textContent = "Active Jobs";

    const eachJobsPerStatus = document.createElement("div");
    eachJobsPerStatus.className = "each-jobs-per-status";

    const eachJobHeader = document.createElement("div");
    eachJobHeader.className = "each-job-header";

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
    eachJobHeader.append(icon, jobDesigTitle);
    eachJobsPerStatus.appendChild(eachJobHeader);
    activeJobDiv.append(statusTag, eachJobsPerStatus);

    jobsBox.appendChild(activeJobDiv);
  });

  const inActiveJobs = jobArray[0][1].inactive;
  inActiveJobs.forEach((el) => {
    const inActiveJobsDiv = document.createElement("div");
    inActiveJobsDiv.className = "inactive-jobs";

    const statusTag = document.createElement("p");
    statusTag.className = "inActive-status-tag";
    statusTag.textContent = "InActive Jobs";

    const eachJobsPerStatus = document.createElement("div");
    eachJobsPerStatus.className = "each-jobs-per-status";

    const eachJobHeader = document.createElement("div");
    eachJobHeader.className = "each-job-header";

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
    eachJobHeader.append(icon, jobDesigTitle);
    eachJobsPerStatus.appendChild(eachJobHeader);
    activeJobDiv.append(statusTag, eachJobsPerStatus);

    jobsBox.appendChild(activeJobDiv);
  });

  jobsPageContainer.append(tableStructureHTML, jobsBox);
  dashBoard.appendChild(jobsPageContainer);
};

export const renderJobHead = (h, c, w) => {
  h.textContent = c;
  w.textContent = "Show All Jobs";
};
