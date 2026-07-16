<?php
$conn = mysqli_connect("localhost","root", "", "runningtrackingapp");

$run_type= $_POST["run_type"];
$run_date = $_POST["run_date"];
$distance_km = $_POST["distance_km"];
$duration = $_POST["duration"];
$average_heart_rate = $_POST["average_heart_rate"];
$notes = $_POST["notes"];

[$hours, $minutes, $seconds] = array_pad(explode(":", $duration), 3, 0);
$duration_seconds = ((int) $hours * 3600) + ((int) $minutes * 60) + (int) $seconds;

$pace_seconds = (int) round($duration_seconds / $distance_km);
$pace_minutes = intdiv($pace_seconds, 60);
$pace_remainder = $pace_seconds % 60;
$average_pace = sprintf("%d:%02d", $pace_minutes, $pace_remainder);
$average_speed = round($distance_km / ($duration_seconds / 3600), 2);

  $sql = "INSERT INTO runs
  (run_type,distance_km,duration_seconds,average_pace,average_speed,average_heart_rate,calories,elevation_gain,notes,run_date)
      VALUES ('$run_type',
          $distance_km,
          $duration_seconds,
          '$average_pace',
          $average_speed,
          $average_heart_rate,
          200,
          50,
          '$notes',
          '$run_date'
      )";
mysqli_query($conn,$sql);
?>