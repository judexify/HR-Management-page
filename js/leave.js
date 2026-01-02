"use strict";

const dashBoard = document.querySelector(".dashboard");

export const renderLeave = (data) => {
  dashBoard.innerHTML = "";
  const leavePageContainer = document.createElement("div");
  leavePageContainer.classList.add("attendance-table-container");
  leavePageContainer.style.cssText = `
  display:flex;
  flex-direction:column;
  align-items-center
  
  `;

  const notificationHead = document.createElement("div");
  notificationHead.classList.add("notificationHead");

  notificationHead.style.cssText = `
  display : flex;
  align-items:center;
  justify-content: space-between

  `;

  const notificationHeadText = document.createElement("h3");
  notificationHeadText.className = "notificationHeadText";
  notificationHeadText.textContent = "Notifications";
  notificationHeadText.style.cssText = `
font-size:2.4rem;
color: #e5e7eb;
font-weight: 500;
`;

  const attendanceControls = document.createElement("div");
  attendanceControls.classList.add("attendance-controls");

  const label = document.createElement("label");
  label.setAttribute("for", "numbers");
  label.textContent = "Showing:";

  const select = document.createElement("select");
  select.id = "filterOldtoNew";
  select.name = "number";

  const optionValueOne = document.createElement("option");
  optionValueOne.id = "newest";

  optionValueOne.value = optionValueOne.textContent = "Newest First";
  const optionValueTwo = document.createElement("option");
  optionValueTwo.value = optionValueTwo.textContent = "Oldest First";
  optionValueTwo.id = "oldest";

  const notificationBox = document.createElement("div");
  notificationBox.classList.add("notificationBox");

  dashBoard.appendChild(leavePageContainer);
  leavePageContainer.append(notificationHead, notificationBox);
  notificationHead.append(notificationHeadText, attendanceControls);
  attendanceControls.append(label, select);
  select.append(optionValueOne, optionValueTwo);

  const [hrNotificationArray, ...rest] = data;
  const notificationArray = hrNotificationArray.notifications;

  const renderNotifs = (notificationArray) => {
    notificationArray.forEach((eachNotifs) => {
      const eachNotification = document.createElement("div");
      eachNotification.classList.add("eachNotiv");
      eachNotification.style.cssText = `
    display:flex;
    align-items : center;
    justify-content:space-between;
    padding: 1.6rem;
    border-bottom:1px solid #e5e7eb4c;
    cursor:pointer;
    `;

      const boxHoldingEachNotisUser = document.createElement("div");
      boxHoldingEachNotisUser.classList.add("boxHoldingEachNotisUser");

      const timeBox = document.createElement("div");
      timeBox.classList.add("timeBox");
      const time = document.createElement("p");
      time.classList.add("time");
      time.textContent = `${eachNotifs.timestamp}`;
      timeBox.appendChild(time);
      time.style.cssText = `  
    color: #9ca3af;
    font-size: 1.4rem;`;

      const contentAndTopic = document.createElement("div");
      contentAndTopic.classList.add("contentAndTopic");

      const contentTopic = document.createElement("h4");
      contentTopic.classList.add("contentTopic");
      contentTopic.textContent = `${eachNotifs.message}`;
      contentTopic.style.cssText = `
    color :#e5e7eb;
    font-size:1.6rem;
    font-weight: 500;
    margin-bottom:1.2rem
    `;

      const contents = document.createElement("p");
      contents.classList.add("contents");
      contents.textContent = `${eachNotifs.content}`;
      contents.style.cssText = `
    color : #9ca3af;
    font-size: 1.4rem;
    `;

      notificationBox.appendChild(eachNotification);
      eachNotification.append(boxHoldingEachNotisUser, timeBox);
      boxHoldingEachNotisUser.appendChild(contentAndTopic);
      contentAndTopic.append(contentTopic, contents);
    });
  };

  renderNotifs(notificationArray);

  const SORT_OPTIONS = {
    NEWEST: "Newest First",
    OLDEST: "Oldest First",
  };

  const sortNotification = (data, notisBox) => {
    const selectBtn = document.querySelector("#filterOldtoNew");
    if (!selectBtn) return;

    const handleSort = (e) => {
      const sortedData =
        e.target.value === SORT_OPTIONS.OLDEST ? data.toReversed() : data;
      notisBox.innerHTML = "";
      renderNotifs(sortedData);
    };

    selectBtn.addEventListener("change", handleSort);
  };

  sortNotification(notificationArray, notificationBox);
};

export const renderLeaveHead = (h, c, w) => {
  h.textContent = c;
  w.textContent = "All Notifications";
};
