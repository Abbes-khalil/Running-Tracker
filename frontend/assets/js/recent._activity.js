fetch("../backend/recentact.php")
  .then((response) => response.json())
  .then((runs) => {
    const container = document.getElementById("activities-list");
    const containerDash = document.getElementById("recent-runs");

    if (container) container.innerHTML = "";
    if (containerDash) containerDash.innerHTML = "";

    runs.forEach((run) => {
      const cardHtml = `
        <div class="activity-card">
          <div class="activity-header">
            <h3>${run.run_type}</h3>
            <span>${run.run_date}</span>
          </div>

          <div class="activity-stats">
            <div>
              <strong>${run.distance_km} km</strong>
              <small>Distance</small>
            </div>

            <div>
              <strong>${run.average_pace}</strong>
              <small>Pace</small>
            </div>
          </div>
        </div>
      `;

      if (container) container.innerHTML += cardHtml;
      if (containerDash) containerDash.innerHTML += cardHtml;
    });
  })
  .catch((err) => console.error(err));
