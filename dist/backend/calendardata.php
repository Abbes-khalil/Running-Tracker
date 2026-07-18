<?php
$conn = mysqli_connect("localhost","root", "", "runningtrackingapp");

$sql="SELECT created_at,run_type,distance_km from runs ";

$res=mysqli_query($conn,$sql);
$runs = [];
while ($row =  mysqli_fetch_assoc($res)) {
    $runs[] = $row;
};      

echo json_encode($runs);
?>