function loadCalendarRuns(month, year) {
  fetch("../backend/calendardata.php")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((run) => {
        const date = new Date(run.created_at);
        const cell = document.querySelector(
          `.day-events[data-day="${date.getDate()}"]`,
        );

        if (!cell) return;

        cell.innerHTML += `
            <div class="calendar-run">
              <strong>${run.run_type}</strong><br>
              ${run.distance_km} km
            </div>
          `;
      });
    })
    .catch((err) => console.error(err));
}
