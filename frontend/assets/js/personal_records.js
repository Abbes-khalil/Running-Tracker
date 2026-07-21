function formatDuration(seconds) {
  seconds = Number(seconds);

  if (isNaN(seconds)) return "--";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  return `${minutes}:${String(secs).padStart(2, "0")}`;
}

function fetchPersonalRecord(distance) {
  fetch("../backend/personal_record.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `pr-distance=${distance}`,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (data) {
        document.getElementById("distance").textContent =
          data.distance_km || "--";

        document.getElementById("pace").textContent = data.average_pace || "--";

        document.getElementById("duration").textContent = formatDuration(
          data.duration_seconds,
        );
      } else {
        document.getElementById("distance").textContent = "--";
        document.getElementById("pace").textContent = "--";
        document.getElementById("duration").textContent = "--";
      }
    })
    .catch((error) => {
      console.error("Error fetching personal record:", error);

      document.getElementById("distance").textContent = "Error";
      document.getElementById("pace").textContent = "Error";
      document.getElementById("duration").textContent = "Error";
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const distanceSelect = document.getElementById("pr-distance");

  fetchPersonalRecord(distanceSelect.value);

  distanceSelect.addEventListener("change", function () {
    fetchPersonalRecord(this.value);
  });
});
