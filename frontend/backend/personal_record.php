<?php

$conn = mysqli_connect("localhost","root","","runningtrackingapp");

$pr_distance = $_POST["pr-distance"];

$stmt = $conn->prepare("
    SELECT distance_km, average_pace, duration_seconds
    FROM runs
    WHERE distance_km = ?
    ORDER BY duration_seconds ASC
    LIMIT 1
");

$stmt->bind_param("d", $pr_distance);

$stmt->execute();

$result = $stmt->get_result();

echo json_encode($result->fetch_assoc());
?>