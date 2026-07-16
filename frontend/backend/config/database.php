<?php
declare(strict_types=1);

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$host = getenv('DB_HOST') ?: '127.0.0.1';
$port = (int) (getenv('DB_PORT') ?: 3306);
$name = getenv('DB_NAME') ?: 'runningtrackingapp';
$user = getenv('DB_USER') ?: 'root';
$pass = getenv('DB_PASSWORD') ?: '';

try {
    $conn = new mysqli($host, $user, $pass, $name, $port);
    $conn->set_charset('utf8mb4');
} catch (mysqli_sql_exception $error) {
    http_response_code(503);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'status' => 'error',
        'message' => 'The database is unavailable. Check the setup instructions and database credentials.'
    ]);
    exit;
}
