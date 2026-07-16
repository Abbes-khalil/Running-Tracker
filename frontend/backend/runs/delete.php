<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/api.php';
require_method('DELETE');
require_once __DIR__ . '/../config/database.php';

$data = request_data();
$id = filter_var($data['id'] ?? null, FILTER_VALIDATE_INT);
if (!$id) {
    respond(['status' => 'error', 'message' => 'A valid activity ID is required.'], 422);
}

$statement = $conn->prepare('DELETE FROM runs WHERE id = ? AND user_id = 1');
$statement->bind_param('i', $id);
$statement->execute();

if ($statement->affected_rows === 0) {
    respond(['status' => 'error', 'message' => 'Activity not found.'], 404);
}
respond(['status' => 'success', 'message' => 'Activity deleted.']);
