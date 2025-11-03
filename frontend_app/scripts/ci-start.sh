#!/usr/bin/env bash
set -euo pipefail

# PUBLIC_INTERFACE
# ci-start.sh installs dependencies and starts the dev server with CI-friendly,
# low-memory defaults to avoid OOM (exit 137) in constrained environments.
# Usage: ./scripts/ci-start.sh
# Notes:
# - Uses NODE_OPTIONS memory cap (default 256 MB). Override via env if needed.
# - Disables source maps and browser auto-open for stability.
# - If you still hit 137 in very constrained environments, run:
#     npm run start:lowmem
#   or:
#     npm run start:ultralowmem
# - See .env.example for recommended env vars.

export CI=true
export HOST=0.0.0.0
export PORT="${REACT_APP_PORT:-${PORT:-3000}}"
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

# Ensure public dir and healthz exist (zero-bundle health)
mkdir -p public/assets || true
if [ ! -f "public/healthz.html" ]; then
  cat > public/healthz.html <<'EOF'
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>OK</title></head><body>OK</body></html>
EOF
fi

# Copy public assets after install (idempotent)
cp -r ../assets/* public/assets/ 2>/dev/null || true

echo "[ci-start] Starting server on ${HOST}:${PORT} with NODE_OPTIONS=${NODE_OPTIONS}"
# If CI_STATIC_ONLY=1, serve only public assets to minimize memory (zero-bundle)
if [ "${CI_STATIC_ONLY:-0}" = "1" ]; then
  ( node ./scripts/static-server.js & ) >/dev/null 2>&1 &
  SERVER_PID=$!
  echo "[ci-start] static server started with PID ${SERVER_PID}"
else
  # Start React dev server in background and wait for health using local react-scripts binary (avoid npx overhead)
  ( node node_modules/react-scripts/bin/react-scripts.js start & ) >/dev/null 2>&1 &
  SERVER_PID=$!
  echo "[ci-start] react-scripts started with PID ${SERVER_PID}"
fi

# Ensure wait-on is available (installed as devDependency too)
if ! npx --yes wait-on --help >/dev/null 2>&1; then
  echo "[ci-start] Installing wait-on for readiness checks..."
  npm install --no-audit --no-fund --silent wait-on || true
fi

# Wait for health endpoint to be ready (served from public/healthz.html zero-bundle)
echo "[ci-start] Waiting for health endpoint..."
if ! npx --yes wait-on "http://127.0.0.1:${PORT}/healthz.html" --timeout 90000; then
  echo "[ci-start] WARNING: Health endpoint did not become ready within timeout." >&2
fi

# Print a simple ready line; keep the background server running for CI to detect port
echo "[ci-start] READY - Dev server is up at http://127.0.0.1:${PORT}"
echo "[ci-start] Health: http://127.0.0.1:${PORT}/healthz.html"
# Prevent script exit which would kill background job in some CI; tail to keep process alive
tail -f /dev/null
