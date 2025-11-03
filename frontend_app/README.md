# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- Lightweight: No heavy UI frameworks - uses only vanilla CSS and React
- Modern UI: Clean, responsive design with KAVIA brand styling
- Fast: Minimal dependencies for quick loading times
- Simple: Easy to understand and modify

## Getting Started

In the project directory, you can run:

First, install dependencies (required in CI as well):

- npm ci
  or
- npm install

Then:

### `npm start`

Alias to start with CI-friendly low-memory defaults (no source maps, memory capped).
Open http://localhost:3000 to view it in your browser.

Health page (zero-bundle) for CI:
- http://localhost:3000/healthz.html
- Or set REACT_APP_HEALTHCHECK_PATH to a custom path
- If webpack dev server cannot start in tight memory, scripts automatically fall back to the static server while still serving this endpoint.

This endpoint is served statically from public/healthz.html so it returns even if the React app bundle hasn't finished loading yet.

If your CI is extremely memory constrained (exit code 137/SIGKILL), you can avoid starting the JS bundle entirely and still pass health checks by running:
- `CI_STATIC_ONLY=1 npm run ci:start`
or
- `npm run ci:dev:static`
Both serve only the public/ folder (including healthz.html) with minimal memory footprint.

Alternatively:
- `npm run start:static` will serve only the static public directory locally without the React dev server.
- For CI that previously exited with code 137, prefer:
  - `npm run ci:dev` (ultralowmem + wait). You can force static-only with `CI_STATIC_ONLY=1 npm run ci:dev`.
  - `npm run ci:dev:static` (static-only + wait; zero-bundle)
  - Ensure `.env` includes `NODE_OPTIONS=--max-old-space-size=256` and `REACT_APP_ENABLE_SOURCE_MAPS=false`.

Quick fix for exit 137:
- Copy `.env.example` to `.env` to inherit safe defaults.
- Run `npm run start:safe` or `npm run ci:start`. The launcher falls back to a static health server if the dev server exits.
- The health endpoints `/healthz.html` and `/healthz` are served statically from `public/` to allow readiness without building the bundle.

Stability notes:
- `npm start` automatically falls back to the static server if the dev server exits non-zero or via signal.
- To guarantee zero-bundle in very tight memory, set `CI_STATIC_ONLY=1` before `npm start` or use `npm run ci:dev:static`.

If running in CI or low-memory environments, prefer:

### `npm run start:safe`

CI-friendly defaults:
- Disables source maps (`GENERATE_SOURCEMAP=false`) to reduce memory usage
- Avoids opening a browser (`BROWSER=none`)
- Binds to `0.0.0.0` for container access
- Caps Node memory via `--max-old-space-size=256`
- Uses `WDS_SOCKET_PORT=0` to avoid websocket port negotiation issues in containers

If your CI is extremely memory constrained, you can use:

### `npm run start:lowmem`

Same as above but enforces the Node memory cap more strictly by invoking `node --max-old-space-size=256`.

### `npm run start:ultralowmem`

For extremely constrained CI (to avoid OOM/Exit 137), this sets an even lower memory cap and disables source maps and websocket port negotiation aggressively.

### `npm test`

Runs tests once in CI mode.

### `npm run build`

Builds the app for production to the `build` folder, disabling source maps by default to keep memory low.

### Browserslist database

If you see a notice that the Browserslist database is out of date, you can update it with:

```
npm run browserslist:update
```

See docs/browserslist.md for more info.

## Environment Variables

See `.env.example` for variables you can configure (port, flags, URLs). Key ones for stability:
- `REACT_APP_ENABLE_SOURCE_MAPS=false`
- `NODE_OPTIONS=--max-old-space-size=256`
- `BROWSER=none`
- `WDS_SOCKET_PORT=0`

A ready-to-use `.env.example` is included to avoid OOM on CI.

## CI Stability Tips (Exit 137/OOM)

If your CI runner kills the dev server with exit code 137:
- Use `npm start` or `npm run start:safe` which cap Node memory and disable source maps.
- Ensure `REACT_APP_ENABLE_SOURCE_MAPS=false` in your env (or `.env`).
- Keep `BROWSER=none`, `CHOKIDAR_USEPOLLING=false`, and `WDS_SOCKET_PORT=0` to minimize overhead and avoid websocket port issues in containers.
- Export `NODE_OPTIONS=--max-old-space-size=256` explicitly in your CI job if needed.
- Use the `healthcheck:wait` script to block until the server serves `/healthz.html`.
- Alternatively, to both start and hold the process open for CI, run:
  - `npm run ci:start` (falls back to static server automatically if dev server exits)
  - Set `CI_STATIC_ONLY=1` to serve static-only in ultra-tight memory

## Healthcheck

Verify the server is up (from the same container) with:
```
npm run healthcheck
```
Or access the lightweight health page:
- http://localhost:3000/healthz.html

The health endpoint is served statically via `public/healthz.html`, so it responds without loading the React bundle.

## Customization

### Colors
The main brand colors and tokens are defined as CSS variables in `src/App.css`.

### Components
This template uses pure HTML/CSS components instead of a UI framework. Component styles can be found in `src/App.css`. 

## Learn More

To learn React, check out the React documentation: https://reactjs.org/
