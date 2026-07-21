CREATE DATABASE IF NOT EXISTS runningtrackingapp
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE runningtrackingapp;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  age INT NOT NULL DEFAULT 0,
  weight DECIMAL(5,2) NOT NULL DEFAULT 0,
  height DECIMAL(5,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO users (id, full_name, email, password, age, weight, height)
VALUES (1, 'Local Runner', 'runner@example.test', '$2y$10$IiYSbMKKXuoY0b4XCzxYK.nrdJYhcO/09rz4CLxYcIdNY0kRggrTa', 0, 0, 0)
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);

CREATE TABLE IF NOT EXISTS runs (
  id INT AUTO_INCREMENT,
  user_id INT NOT NULL DEFAULT 1,
  run_type VARCHAR(100) NOT NULL,
  distance_km DECIMAL(7,2) NOT NULL,
  duration_seconds INT NOT NULL,
  average_pace VARCHAR(10) NOT NULL,
  average_speed DECIMAL(6,2) NOT NULL,
  average_heart_rate INT NULL,
  max_heart_rate INT NULL,
  calories INT NOT NULL DEFAULT 0,
  elevation_gain INT NOT NULL DEFAULT 0,
  notes TEXT NOT NULL,
  run_date DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id, user_id),
  INDEX idx_runs_user_date (user_id, run_date),
  CONSTRAINT fk_runs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Optional starter data. Remove this INSERT if you prefer a blank tracker.
INSERT INTO runs
  (user_id, run_type, distance_km, duration_seconds, average_pace, average_speed, average_heart_rate, max_heart_rate, calories, elevation_gain, notes, run_date)
SELECT 1, 'Easy run', 5.00, 1800, '6:00', 10.00, 148, NULL, 0, 0, 'Comfortable first run.', CURRENT_DATE
WHERE NOT EXISTS (SELECT 1 FROM runs WHERE user_id = 1);
