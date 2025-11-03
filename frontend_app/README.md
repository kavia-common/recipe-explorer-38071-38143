# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

If running in CI or low-memory environments, prefer:

### `npm run start:ci`

Starts the dev server with CI-friendly defaults:
- Disables source maps (`GENERATE_SOURCEMAP=false`) to reduce memory usage
- Avoids opening a browser (`BROWSER=none`)
- Binds to `0.0.0.0` for container access
- Sets a conservative memory cap for Node via `--max_old_space_size=256`
- Uses `WDS_SOCKET_PORT=0` to avoid websocket port negotiation issues in containers

If your CI is extremely memory constrained, you can use:

### `npm run start:lowmem`

Same as above but enforces the Node memory cap more strictly by invoking `node --max-old-space-size=256`.

### `npm run start:ultralowmem`

For extremely constrained CI (to avoid OOM/Exit 137), this sets an even lower memory cap and disables source maps and websocket port negotiation aggressively.

### `npm test`

Runs tests once in CI mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### Browserslist database

If you see a notice that the Browserslist database is out of date, you can update it with:

```
npm run browserslist:update
```

You can also read docs/browserslist.md for more info.

## Environment Variables

See `.env.example` for variables you can configure (port, flags, URLs).

## Customization

### Colors

The main brand colors and tokens are defined as CSS variables in `src/App.css`.

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
