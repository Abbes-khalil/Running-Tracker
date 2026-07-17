document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("calendar-grid");
  var title = document.getElementById("current-month");
  var prevButton = document.getElementById("previous-month");
  var nextButton = document.getElementById("next-month");

  if (!grid || !title || !prevButton || !nextButton) {
    return;
  }

  var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  var today = new Date();
  var currentMonth = today.getMonth();
  var currentYear = today.getFullYear();

  function renderCalendar(month, year) {
    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var html = "";

    title.textContent = monthNames[month] + " " + year;

    for (var i = 0; i < firstDay; i++) {
      html += "<div class='calendar-cell muted'></div>";
    }

    for (var day = 1; day <= daysInMonth; day++) {
      var isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      html += "<div class='calendar-cell" + (isToday ? " today" : "") + "'>";
      html += "<div class='day-number'>" + day + "</div>";
      html += "</div>";
    }

    grid.innerHTML = html;
  }

  prevButton.onclick = function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  };

  nextButton.onclick = function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  };

  renderCalendar(currentMonth, currentYear);
});