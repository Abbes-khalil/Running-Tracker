# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands
This is a static website. There are no build, lint, or test commands.
- **Run**: Open `index.html` in any web browser.

## Code Architecture
The project is a simple client-side application for tracking running activities.

### Structure
- `index.html`: Main entry point and home page.
- `activities.html`: Page for viewing/managing activities.
- `addMenu.html`: Page/Menu for adding new activities.
- `style.css`: Global styles and layout definitions.
- `scripts/functions.js`: Contains client-side JavaScript for utility functions (e.g., calculating speed, toggling the navigation menu).

### Key Implementation Details
- **Navigation**: Uses a side-bar (`<navbar>`) that can be toggled via `toggleMenu()` in `functions.js`.
- **Calculations**: `speedcal()` in `functions.js` calculates running speed based on distance and time inputs.
- **Layout**: The main content is offset by 250px to accommodate the fixed side navigation bar.
