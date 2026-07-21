<?php
$conn = mysqli_connect("localhost","root", "", "runningtrackingapp");

$sql="SELECT run_type,run_date,distance_km,duration_seconds,average_pace,average_heart_rate,notes from runs ORDER by run_date DESC";

$res=mysqli_query($conn,$sql);
$runs = [];

while ($row =  mysqli_fetch_assoc($res)) {
    $runs[] = $row;
};  

echo json_encode($runs );

?>