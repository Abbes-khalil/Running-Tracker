<?php
include '../config/database.php';

$run_type= $_POST['run_type'];
$distance_km= $_POST['distance'];
$average_pace= $_POST['average_pace'];
$duration= $_POST['duration'];
$average_heart_rate= $_POST['average_heart_rate'];
$calories_burned= $_POST['calories_burned'];
$note= $_POST['note'];
$run_date= $_POST['run_date'];

if (empty($run_type) || empty($distance_km) || empty($average_pace) || empty($duration) || empty($run_date)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}
$sql ="INSERT INTO runs (run_type, distance_km, average_pace, duration, average_heart_rate, calories_burned, note, run_date) VALUES ('$run_type', '$distance_km', '$average_pace', '$duration', '$average_heart_rate', '$calories_burned', '$note', '$run_date')";
$result= mysqli_query($conn, $sql);
if ($result) {
    echo json_encode(['status' => 'success', 'message' => 'Run logged successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error logging run: ' . mysqli_error($conn)]);
}
?>
