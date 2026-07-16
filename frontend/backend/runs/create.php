<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/api.php';
require_method('POST');
require_once __DIR__ . '/../config/database.php';

[$type, $distance, $duration, $pace, $speed, $heartRate, $notes, $date] = normalize_run(request_data());
$userId = 1;

// This version is intentionally a single-user local app. Ensure its local profile exists.
$localPassword = password_hash('local-development-only', PASSWORD_DEFAULT);
$profile = $conn->prepare(
    'INSERT IGNORE INTO users (id, full_name, email, password, age, weight, height)
     VALUES (1, ?, ?, ?, 0, 0, 0)'
);
$localName = 'Local Runner';
$localEmail = 'runner@example.test';
$profile->bind_param('sss', $localName, $localEmail, $localPassword);
$profile->execute();

$zero = 0;
$statement = $conn->prepare(
    'INSERT INTO runs (user_id, run_type, distance_km, duration_secondes, average_pace, average_speed,
     average_heart_rate, max_heart_rate, calories, elevation_gain, notes, run_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
);
$statement->bind_param('isdisdiiiiss', $userId, $type, $distance, $duration, $pace, $speed, $heartRate, $zero, $zero, $zero, $notes, $date);
$statement->execute();

respond(['status' => 'success', 'message' => 'Activity saved.', 'id' => $statement->insert_id], 201);
