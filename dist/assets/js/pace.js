function calculate() {
  const distance = document.getElementById("distance_km").value;
  const duration = document.getElementById("duration").value;

  const time = duration.split(":");
  duration_minuts = time[0] * 60 + time[1] * 60 + time[2] / 60;
  const pace = duration_minuts / distance;
  document.getElementById("pace-preview").innerHTML = duration_minuts;
}
