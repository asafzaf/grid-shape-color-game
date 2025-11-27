# Grid Shape Color Game

A small puzzle game where you match shapes and colors on a grid to clear tiles and score points.

## How to use
- Place the provided `.env` file in the project root (e.g. `cp /path/to/.env .` or on Windows `copy C:\path\to\.env .`).
- Install dependencies and any required global CLI tools:
    - Install root local deps: `npm install`
    - Install shared types: `cd ./shared && npm run build`
- Start the services with Docker Compose from the project root:
    - `docker compose up -d` (or `docker-compose up --build -d`)

- Open `localhost:5173` in your browser.

- Enjoy! :)