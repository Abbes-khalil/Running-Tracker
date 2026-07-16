fetch("../backend/runs/Dashboard.php")
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("total-distance").innerHTML = data.total_distance;
    document.getElementById("total-time").innerHTML = data.total_duration;
    document.getElementById("total-runs").innerHTML = data.total_runs;
  });
