document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("calendar-grid");
  const title = document.getElementById("current-month");
  const prevButton = document.getElementById("previous-month");
  const nextButton = document.getElementById("next-month");

  if (!grid || !title || !prevButton || !nextButton) return;

  const monthNames = [
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

  const today = new Date();

  window.currentMonth = today.getMonth();
  window.currentYear = today.getFullYear();

  function renderCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let html = "";

    title.textContent = monthNames[month] + " " + year;

    for (let i = 0; i < firstDay; i++) {
      html += `<div class="calendar-cell muted"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      html += `
        <div class="calendar-cell ${isToday ? "today" : ""}">
            <div class="day-number">${day}</div>

            <div class="day-events" data-day="${day}"></div>
        </div>
      `;
    }

    grid.innerHTML = html;

    // Call the function from calendardata.js
    loadRuns(month, year);
  }

  prevButton.onclick = function () {
    window.currentMonth--;

    if (window.currentMonth < 0) {
      window.currentMonth = 11;
      window.currentYear--;
    }

    renderCalendar(window.currentMonth, window.currentYear);
  };

  nextButton.onclick = function () {
    window.currentMonth++;

    if (window.currentMonth > 11) {
      window.currentMonth = 0;
      window.currentYear++;
    }

    renderCalendar(window.currentMonth, window.currentYear);
  };

  renderCalendar(window.currentMonth, window.currentYear);
});
