<?php
include '../config.php';
$run_id = $_POST['run_id'];
$run_type= $_POST['run_type'];
$distance_km= $_POST['distance'];
$average_pace= $_POST['average_pace'];
$duration= $_POST['duration'];
$average_heart_rate= $_POST['average_heart_rate'];
$calories_burned= $_POST['calories_burned'];
$note= $_POST['note'];
if (empty($run_type) || empty($distance_km) || empty($average_pace) || empty($duration)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}
$sql= "UPDATE runs SET run_type='$run_type', distance_km='$distance_km', average_pace='$average_pace', duration='$duration', average_heart_rate='$average_heart_rate', calories_burned='$calories_burned', note='$note' WHERE id='$run_id'";
$result= mysqli_query($conn, $sql);
if ($result) {
    echo json_encode(['status' => 'success', 'message' => 'Run updated successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error updating run: ' . mysqli_error($conn)]);
}
?>