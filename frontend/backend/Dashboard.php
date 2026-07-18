<?php
$conn = mysqli_connect("localhost","root", "", "runningtrackingapp");


$sql = "SELECT SUM(distance_km) as total_distance,SUM(duration_seconds) as total_duration , AVG(average_pace) as average_pace ,count(*) as total_runs FROM runs";
;
$res=mysqli_query($conn,$sql);
$stats = mysqli_fetch_assoc($res);

echo json_encode($stats);
?>