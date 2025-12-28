"use strict";

const dashBoard = document.querySelector(".dashboard");

const getJobs = () => {
  return fetch("./json/jobs.json").then((response) => response.json());
};

// initApp();
const initApp = () => {
  getJobs().then((jobs) => {
    renderJobTable(jobs);
  });
};

const renderJobTable = (jobs) => {
  const mappedJobs = jobs
    .map((job) => {
      return ``;
    })
    .join("");
};

export const renderJobNav = () => {
  dashBoard.innerHTML = "";
};
//

//  dashBoard.innerHTML = "";
//   const jobsPageContainer = document.createElement("div");
//   jobsPageContainer.classList.add("attendance-page");
//   console.log(jobsArr);

//   // Search bar HTML
//   const searchBarHTML = `
//     <div class="Jobs-search-wrapper">
//       <input type="text" id="search-job-bar" placeholder="Search..." />
//     </div>
//   `;
//   //   The Job section
//   const jobsBox = jobsPageContainer.createElement("div");
//   jobsBox.classList.add("jobsBox");
//   jobsPageContainer.appendChild(jobsBox);

//   dashBoard.appendChild(jobsPageContainer);
