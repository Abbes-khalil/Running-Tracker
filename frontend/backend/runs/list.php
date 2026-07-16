<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/api.php';
require_method('GET');
require_once __DIR__ . '/../config/database.php';

$result = $conn->query(
    'SELECT id, run_type, distance_km, duration_secondes AS duration_seconds, average_pace, average_speed,
            average_heart_rate, notes, run_date, created_at
     FROM runs WHERE user_id = 1 ORDER BY run_date DESC, id DESC'
);

respond(['status' => 'success', 'data' => $result->fetch_all(MYSQLI_ASSOC)]);
