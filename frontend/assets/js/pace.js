function calculate() {
  const distance = document.getElementById("distance_km").value;
  const duration = document.getElementById("duration").value;

  const time = duration.split(":");
  duration_minuts =
    Number(time[0]) * 60 + Number(time[1]) + Number(time[2] / 60);
  const pace = duration_minuts / distance;
  var rest = 0;
  if (Number.isInteger(pace) == false) {
    rest = pace - parseInt(pace);
    rest = rest * 60;
  }
  document.getElementById("pace-preview").innerHTML =
    parseInt(pace) + ":" + rest + " km/min";
}
