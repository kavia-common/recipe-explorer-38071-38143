#!/usr/bin/env bash
set -euo pipefail

# PUBLIC_INTERFACE
# ci-start.sh installs dependencies and starts the dev server with CI-friendly,
# low-memory defaults to avoid OOM (exit 137) in constrained environments.
# Usage: ./scripts/ci-start.sh

export CI=true
export HOST=0.0.0.0
export PORT="${REACT_APP_PORT:-3000}"
export CHOKIDAR_USEPOLLING=false
export BROWSER=none
export WDS_SOCKET_PORT=0
export GENERATE_SOURCEMAP=false
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=256}"

echo "[ci-start] Installing dependencies..."
if command -v npm >/dev/null 2>&1; then
  npm ci --silent || npm install --no-audit --no-fund --silent
else
  echo "[ci-start] ERROR: npm not found" >&2
  exit 1
fi

echo "[ci-start] Starting dev server on ${HOST}:${PORT} with NODE_OPTIONS=${NODE_OPTIONS}"
npx react-scripts start
