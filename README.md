# Grid Shape Color Game

A small puzzle game where you match shapes and colors on a grid to clear tiles and score points.

## How to use
- Place the provided `.env` file in the project root (e.g. `cp /path/to/.env .` or on Windows `copy C:\path\to\.env .`).
- Install dependencies and any required global CLI tools:
    - Install root local deps: `npm install`
    - If a global package/CLI is required (see package.json), install it: `npm install -g <package-name>`
- Start the services with Docker Compose from the project root:
    - `docker compose up -d` (or `docker-compose up --build -d`)

- Open `localhost:5173` in your browser.

## Basic rules & controls
- Click or tap tiles to select and match shapes/colors.
- Match required patterns or reach the target score to finish a level.
- Use keyboard shortcuts if provided by the game (check the in-game help).

## Tips
- Plan moves to create chain reactions and higher scores.
- Watch the timer or move limit for each level.

## Development
- Edit source files in the project folder and refresh the browser to test changes.
- Dependencies and build steps (if any) are listed in the project README or package files.

## License
- See the project repository for license and contribution guidelines.