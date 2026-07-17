document.addEventListener("DOMContentLoaded", function () {
  var calendar = document.getElementById("calendar");

  if (!calendar) {
    return;
  }

  var date = new Date();
  var currentMonth = date.getMonth();
  var currentYear = date.getFullYear();
  var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function renderCalendar(month, year) {
    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var html = "";

    html += "<div style='display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;'>";
    html += "<button type='button' id='prevMonth'>Previous</button>";
    html += "<h2 style='margin:0;'>" + monthNames[month] + " " + year + "</h2>";
    html += "<button type='button' id='nextMonth'>Next</button>";
    html += "</div>";

    html += "<table border='1' cellspacing='0' cellpadding='8'>";
    html += "<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>";

    var day = 1;
    for (var i = 0; i < 6; i++) {
      html += "<tr>";
      for (var j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || day > daysInMonth) {
          html += "<td></td>";
        } else {
          html += "<td>" + day + "</td>";
          day++;
        }
      }
      html += "</tr>";

      if (day > daysInMonth) {
        break;
      }
    }

    html += "</table>";
    calendar.innerHTML = html;

    document.getElementById("prevMonth").onclick = function () {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar(currentMonth, currentYear);
    };

    document.getElementById("nextMonth").onclick = function () {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar(currentMonth, currentYear);
    };
  }

  renderCalendar(currentMonth, currentYear);
});
