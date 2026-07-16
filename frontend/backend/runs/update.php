<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/api.php';
require_method('PUT');
require_once __DIR__ . '/../config/database.php';

$data = request_data();
$id = filter_var($data['id'] ?? null, FILTER_VALIDATE_INT);
if (!$id) {
    respond(['status' => 'error', 'message' => 'A valid activity ID is required.'], 422);
}

[$type, $distance, $duration, $pace, $speed, $heartRate, $notes, $date] = normalize_run($data);
$statement = $conn->prepare(
    'UPDATE runs SET run_type = ?, distance_km = ?, duration_secondes = ?, average_pace = ?,
     average_speed = ?, average_heart_rate = ?, notes = ?, run_date = ? WHERE id = ? AND user_id = 1'
);
$statement->bind_param('sdisdissi', $type, $distance, $duration, $pace, $speed, $heartRate, $notes, $date, $id);
$statement->execute();

if ($statement->affected_rows === 0) {
    $check = $conn->prepare('SELECT id FROM runs WHERE id = ? AND user_id = 1');
    $check->bind_param('i', $id);
    $check->execute();
    if ($check->get_result()->num_rows === 0) {
        respond(['status' => 'error', 'message' => 'Activity not found.'], 404);
    }
}

respond(['status' => 'success', 'message' => 'Activity updated.']);
