<?php
include '../config.php';
$sql= "SELECT * FROM runs WHERE user_id = 1 ORDER BY run_date DESC";
$result= mysqli_query($conn, $sql);
$runs= [];
while ($row = mysqli_fetch_assoc($result)) {
    $runs[] = $row;
}

echo json_encode($runs);
?>