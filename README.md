# Runform — full-stack running tracker

Runform is a small complete CRUD application built with plain HTML, CSS, JavaScript, PHP 8, and MySQL/MariaDB. It includes a live dashboard, activity creation/editing/deletion, a run calendar, and automatically calculated personal records.

## Project structure

```text
frontend/
  index.html                 Dashboard
  pages/                     Activities, add form, calendar, records
  assets/css/base.css        Design system and responsive styles
  assets/js/api.js           Shared API client and formatters
  assets/js/*.js             Page behavior
  backend/config/            Database connection and API helpers
  backend/runs/              CRUD endpoints
runningtrackingapp.sql       Database schema and starter row
vite.config.js               Frontend build, PHP proxy, backend copy
```

## Requirements

- Node.js 20.19+ or 22.12+
- PHP 8.1+ with the `mysqli` extension
- MySQL 8+ or MariaDB 10.4+

XAMPP is fine for PHP and MariaDB on Windows.

## First-time setup

1. Install frontend dependencies:

   ```powershell
   npm install
   ```

2. Start MySQL/MariaDB, then import `runningtrackingapp.sql`. With the MySQL command line:

   ```powershell
   mysql -u root -p < runningtrackingapp.sql
   ```

   You can also import the file through phpMyAdmin. The script creates the database, the tables, a local user, and one starter activity.

3. If your database is not the common local `root` user with no password, set the connection variables before starting PHP:

   ```powershell
   $env:DB_HOST = "127.0.0.1"
   $env:DB_PORT = "3306"
   $env:DB_NAME = "runningtrackingapp"
   $env:DB_USER = "root"
   $env:DB_PASSWORD = "your-password"
   ```

## Run in development

Open two PowerShell terminals in the project folder.

Terminal 1 — PHP API:

```powershell
npm run dev:backend
```

Terminal 2 — Vite frontend:

```powershell
npm run dev
```

Open `http://localhost:5173`. Vite forwards `/backend` requests to PHP on port 8000.

## Production-style build

```powershell
npm run build
npm run serve:production
```

Open `http://127.0.0.1:8080`. The Vite build copies the PHP API into `dist/backend`, so the built folder is a complete application. On Apache or Nginx, point the site document root at `dist` and configure PHP normally.

## API contract

All endpoints return JSON:

- `GET /backend/runs/list.php`
- `POST /backend/runs/create.php`
- `PUT /backend/runs/update.php`
- `DELETE /backend/runs/delete.php`

Create and update accept `run_type`, `run_date`, `distance_km`, `duration_seconds`, optional `average_heart_rate`, and optional `notes`. Pace and speed are calculated on the server.

## Current scope

The app intentionally uses one seeded local user (`user_id = 1`). Authentication is the next backend layer to add before putting the app on the public internet.
