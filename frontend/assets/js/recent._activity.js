fetch("../backend/recentact.php")
  .then((response) => response.json())
  .then((runs) => {
    const container = document.getElementById("activities-list");

    container.innerHTML = "";

    runs.forEach((run) => {
      container.innerHTML += `
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
            <strong>${run.duration_seconds}</strong>
            <small>Pace</small>
        </div>
    </div>
</div>
`;
    });
  })
  .catch((err) => console.error(err));
