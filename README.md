# RunTracker

RunTracker is a lightweight running log that helps runners record activities, review training history, monitor overall progress, and view personal bests. The application uses a plain HTML/CSS/JavaScript frontend with PHP endpoints backed by MySQL.

## Overview

RunTracker provides a simple dashboard for managing running activities. Users can add a run with its type, date, distance, duration, heart rate, and notes. The application calculates pace and speed from the submitted distance and duration, then exposes the saved data through dashboard statistics, an activity history, a calendar, and distance-based personal records.

## Features

- Dashboard with total distance, total running time, average pace, and total run count.
- Add-run form with support for:
  - Run type: easy, long, tempo, intervals, recovery, or race.
  - Date, distance, and duration.
  - Optional average heart rate and notes.
- Automatic pace preview while entering a run.
- Automatic calculation and storage of average pace and average speed.
- Recent activity list on the dashboard.
- Activities page for viewing saved runs.
- Calendar view with month navigation and run markers.
- Personal-record view for 1 km, 5 km, 10 km, half-marathon, and marathon distances.
- Responsive layout for desktop, tablet, and mobile screen sizes.
- Accessible labels, status regions, focus styles, and semantic page structure.

## Technologies

- PHP for backend endpoints and database operations.
- MySQL for users and running activity data.
- JavaScript using browser `fetch()` requests and ES modules.
- HTML5 for the page structure and forms.
- CSS for responsive layout, styling, and UI states.
- Vite for frontend development and production builds.
- Node.js and npm for development scripts and build tooling.

## Installation

### Prerequisites

Install the following locally:

- PHP 8 or later with the MySQLi extension enabled.
- MySQL 5.7+ or MariaDB.
- Node.js 18+ and npm.

### Clone and install dependencies

```bash
git clone <repository-url>
cd first-website
npm install
```

### Configure the database connection

The PHP endpoints currently connect using the following local MySQL credentials:

```text
Host:     localhost
User:     root
Password: empty
Database: runningtrackingapp
```

If your local MySQL setup uses different credentials, update the `mysqli_connect()` calls in the files under `frontend/backend/` before starting the application. For a production deployment, move these values into environment-based configuration and avoid committing credentials to source control.

## Database setup

1. Start the MySQL or MariaDB service.
2. Import the included schema and seed data:

   ```bash
   mysql -u root -p < runningtrackingapp.sql
   ```

   If the local root account has no password, omit `-p`.

3. The SQL file creates the `runningtrackingapp` database and these tables:

   - `users`: stores runner profile information.
   - `runs`: stores run type, distance, duration, pace, speed, heart rate, calories, elevation, notes, and date.

The schema includes a sample user (`runner@example.test`) and one optional starter run. Remove the starter `INSERT INTO runs` statement if you want to begin with an empty activity list.

## Running the project

### Recommended development mode

Run the Vite development server and PHP backend together:

```bash
npm run dev
```

Open the Vite URL shown in the terminal, normally:

```text
http://localhost:5173
```

Vite proxies requests beginning with `/backend` to the PHP server at `http://127.0.0.1:8000`.

### Run the PHP backend separately

```bash
npm run dev:backend
```

This serves the `frontend` directory through PHP at:

```text
http://127.0.0.1:8000
```

### Build and preview the production frontend

```bash
npm run build
npm run preview
```

The build outputs the frontend and copied backend/static assets into `dist/`.

To serve the generated files with PHP:

```bash
npm run serve:production
```

This starts a PHP server at `http://127.0.0.1:8080`.

## Project structure

```text
.
├── frontend/
│   ├── index.html                 # Dashboard
│   ├── pages/
│   │   ├── activities.html        # Activity history
│   │   ├── addMenu.html           # Add-run form
│   │   ├── calendar.html          # Training calendar
│   │   └── pr.html                # Personal records
│   ├── assets/
│   │   ├── css/base.css           # Shared responsive styles
│   │   └── js/
│   │       ├── dashboard.js       # Dashboard statistics
│   │       ├── recent._activity.js# Activity lists
│   │       ├── pace.js             # Pace preview calculation
│   │       ├── calendar.js         # Calendar rendering/navigation
│   │       ├── calendardata.js     # Calendar activity loading
│   │       └── personal_records.js # Personal-record loading
│   └── backend/
│       ├── addrun.php             # Saves a run
│       ├── Dashboard.php           # Returns dashboard totals
│       ├── recentact.php           # Returns recent activities
│       ├── calendardata.php        # Returns calendar activity data
│       └── personal_record.php     # Returns the best run for a distance
├── runningtrackingapp.sql          # Database schema and starter data
├── scripts/dev.mjs                 # Starts Vite and PHP together
├── vite.config.js                  # Vite configuration and asset copying
├── package.json                    # npm scripts and dependencies
└── dist/                           # Generated production output
```

## Usage

1. Open the dashboard to review aggregate running statistics and recent activities.
2. Select **Add run** and enter the activity type, date, distance, and duration.
3. Optionally add average heart rate and notes.
4. Review the estimated pace shown in the form, then save the activity.
5. Use **Activities** to review the saved run history.
6. Use **Calendar** to move between months and see recorded runs by day.
7. Use **Records** to select a supported distance and view the fastest matching activity.

## Future improvements

- Use prepared statements and input validation for every PHP endpoint.
- Centralize database configuration and use environment variables.
- Add authentication and user-specific activity filtering.
- Implement the edit and delete activity actions in the backend and frontend.
- Improve calendar date handling so events use the selected month and the run date consistently.
- Add pagination, filtering, and sorting to the activity history.
- Add charts for weekly distance, pace trends, and training consistency.
- Calculate calories and elevation from user/device data instead of fixed starter values.
- Add automated tests for pace calculations, API responses, and database operations.
- Add stronger error handling for database failures and unavailable backend services.
- Add CSRF protection, stricter validation, and production security hardening.
- Add deployment documentation for Apache/Nginx and PHP hosting environments.

## Author

Created by **[Your Name]**.

Replace the placeholder above with the project author’s name and profile link before publishing the repository.

