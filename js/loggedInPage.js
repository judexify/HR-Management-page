"use strict";

const daysContainer = document.querySelector("#days");
const monthYear = document.querySelector("#month-year");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

const renderCalendar = (date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = `${months[month]} ${year}`;

  daysContainer.innerHTML = "";

  previousMonthDays(year, month, firstDay);
  renderDays(lastDay, month, year);
  nextMonthDays(year, month);
};

const previousMonthDays = (year, month, firstDay) => {
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  for (let i = firstDay; i > 0; i--) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = prevMonthLastDay - i + 1;
    dayDiv.classList.add("fade");
    daysContainer.appendChild(dayDiv);
  }
};

const renderDays = (lastDay, month, year) => {
  const today = new Date();

  for (let i = 1; i <= lastDay; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = i;
    dayDiv.setAttribute("tabindex", "0");

    if (
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayDiv.classList.add("today");
    }

    daysContainer.appendChild(dayDiv);
  }
};

const nextMonthDays = (year, month) => {
  const lastDayIndex = new Date(year, month + 1, 0).getDay();
  const trailingDays = 6 - lastDayIndex;

  for (let i = 1; i <= trailingDays; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = i;
    dayDiv.classList.add("fade");
    daysContainer.appendChild(dayDiv);
  }
};

document.addEventListener("DOMContentLoaded", (e) => {
  let currentDate = new Date();

  prev.addEventListener("click", function () {
    previousMonth(currentDate);
  });

  next.addEventListener("click", function (e) {
    nextMonth(currentDate);
  });

  renderCalendar(currentDate);
  renderDateToStatGrid();
});

const nextMonth = (currentDate) => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
};

const previousMonth = (currentDate) => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
};

// CHARTS
const ctx = document.getElementById("weeklyChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Base",
        data: [60, 60, 60, 30, 60, 60, 60],
        backgroundColor: "#3b82f6",
        borderRadius: {
          bottomLeft: 10,
          bottomRight: 10,
        },
        stack: "stack1",
        barThickness: 14,
      },
      {
        label: "Target",
        data: [0, 20, 30, 0, 20, 25, 30],
        backgroundColor: "#facc15",
        stack: "stack1",
        barThickness: 14,
      },
      {
        label: "Overflow",
        data: [0, 0, 5, 0, 0, 0, 10],
        backgroundColor: "#ef4444",
        borderRadius: {
          topLeft: 10,
          topRight: 10,
        },
        stack: "stack1",
        barThickness: 14,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: {
          color: "#6b7280",
        },
      },
      y: {
        stacked: true,
        min: 0,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
          color: "#6b7280",
        },
        grid: {
          color: "rgba(255,255,255,0.08)",
        },
      },
    },
  },
});

const renderDateToStatGrid = () => {
  const updatedWhen = document.querySelectorAll(".updated-time");
  for (let dates of updatedWhen) {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthName = months[month];

    let currentDate = `${monthName} ${day},${year}`;
    dates.textContent = currentDate;
  }
};
