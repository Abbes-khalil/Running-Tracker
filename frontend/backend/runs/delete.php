<?php 

include '../config.php';
$run_id = $_POST['run_id'];
$sql = "DELETE FROM runs WHERE id='$run_id'";
$result = mysqli_query($conn, $sql);
if ($result) {
    echo json_encode(['status' => 'success', 'message' => 'Run deleted successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error deleting run: ' . mysqli_error($conn)]);
}


?>