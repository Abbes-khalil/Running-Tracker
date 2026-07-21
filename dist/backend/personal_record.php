<?php

$conn = mysqli_connect("localhost", "root", "", "runningtrackingapp");

// Check connection
if (mysqli_connect_errno()) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to connect to MySQL: " . mysqli_connect_error()]);
    exit;
}

// Get and sanitize the distance parameter
$pr_distance = isset($_POST["pr-distance"]) ? floatval($_POST["pr-distance"]) : 0;

// Validate input
if ($pr_distance <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid distance parameter"]);
    mysqli_close($conn);
    exit;
}

// Use prepared statement to prevent SQL injection
$stmt = mysqli_prepare($conn, "
    SELECT distance_km, average_pace, duration_seconds
    FROM runs
    WHERE distance_km = ?
    ORDER BY duration_seconds ASC
    LIMIT 1
");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "MySQL prepare error: " . mysqli_error($conn)]);
    mysqli_close($conn);
    exit;
}

// Bind parameters
mysqli_stmt_bind_param($stmt, "d", $pr_distance);

// Execute the query
if (!mysqli_stmt_execute($stmt)) {
    http_response_code(500);
    echo json_encode(["error" => "MySQL execute error: " . mysqli_stmt_error($stmt)]);
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
    exit;
}

// Get the result
$result = mysqli_stmt_get_result($stmt);
$row = mysqli_fetch_assoc($result);

// Return the data or null if no record found
if ($row) {
    echo json_encode($row);
} else {
    echo json_encode(null);
}

// Clean up
mysqli_stmt_close($stmt);
mysqli_close($conn);

?>