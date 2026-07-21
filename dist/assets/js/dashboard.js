fetch("../backend/Dashboard.php")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const hours = Math.floor(data.total_duration / 3600);
    const minutes = Math.floor((data.total_duration % 3600) / 60);
    const seconds = data.total_duration % 60;
    document.getElementById("total-distance").innerHTML = data.total_distance;
    document.getElementById("total-time").innerHTML =
      hours + ":" + minutes + ":" + seconds;
    document.getElementById("average-pace").innerHTML = data.average_pace;
    document.getElementById("workout-count").innerHTML = data.total_runs;
  });
