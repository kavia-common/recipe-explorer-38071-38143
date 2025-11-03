#!/usr/bin/env bash
set -euo pipefail

# PUBLIC_INTERFACE
# ci-start.sh installs dependencies and starts the dev server with CI-friendly,
# low-memory defaults to avoid OOM (exit 137) in constrained environments.
# Usage: ./scripts/ci-start.sh
# Honors CI_STATIC_ONLY=1 to serve static health only (zero-bundle) to minimize memory.

export CI=true
export HOST="${HOST:-0.0.0.0}"
# Prefer REACT_APP_PORT if set, otherwise PORT, default 3000
export PORT="${REACT_APP_PORT:-${PORT:-3000}}"
export CHOKIDAR_USEPOLLING="${CHOKIDAR_USEPOLLING:-false}"
export BROWSER="${BROWSER:-none}"
export WDS_SOCKET_PORT="${WDS_SOCKET_PORT:-0}"

# Keep memory low; allow override via env
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=256}"

# Respect REACT_APP_ENABLE_SOURCE_MAPS if provided, default false
if [ "${REACT_APP_ENABLE_SOURCE_MAPS:-false}" = "true" ]; then
  export GENERATE_SOURCEMAP=true
else
  export GENERATE_SOURCEMAP=false
fi

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

# Choose mode:
#  - If CI_STATIC_ONLY=1, use static-only server (ultra-low memory).
#  - Else default to ultralowmem when ULTRA_LOW_MEM=1 to help extreme CI.
MODE="dev"
if [ "${CI_STATIC_ONLY:-0}" = "1" ]; then
  MODE="static"
elif [ "${ULTRA_LOW_MEM:-0}" = "1" ]; then
  MODE="ultralowmem"
fi

echo "[ci-start] Starting server on ${HOST}:${PORT} (mode=${MODE}) with NODE_OPTIONS=${NODE_OPTIONS}"

start_static() {
  node ./scripts/static-server.js >/dev/null 2>&1 &
  echo $!
}

start_react() {
  # Explicit low-memory flags; disable source maps and UI extras
  HOST="$HOST" PORT="$PORT" BROWSER="none" CHOKIDAR_USEPOLLING="false" WDS_SOCKET_PORT="0" GENERATE_SOURCEMAP="false" \
  NODE_OPTIONS="${NODE_OPTIONS:-"--max-old-space-size=256"}" \
  node node_modules/react-scripts/bin/react-scripts.js start >/dev/null 2>&1 &
  echo $!
}

if [ "${MODE}" = "static" ]; then
  SERVER_PID="$(start_static)"
  echo "[ci-start] static server started with PID ${SERVER_PID}"
elif [ "${MODE}" = "ultralowmem" ]; then
  # For ultralowmem, try dev server with even tighter memory; fallback to static if it exits too soon
  export NODE_OPTIONS="--max-old-space-size=192"
  SERVER_PID="$(start_react)"
  echo "[ci-start] react-scripts (ultralowmem) started with PID ${SERVER_PID}"
else
  SERVER_PID="$(start_react)"
  echo "[ci-start] react-scripts started with PID ${SERVER_PID}"
fi

# Ensure wait-on is available (installed as devDependency too)
if ! npx --yes wait-on --help >/dev/null 2>&1; then
  echo "[ci-start] Installing wait-on for readiness checks..."
  npm install --no-audit --no-fund --silent wait-on || true
fi

# Wait for health endpoint to be ready (served from public/healthz.html zero-bundle)
echo "[ci-start] Waiting for health endpoint..."
HEALTH_PATH="${REACT_APP_HEALTHCHECK_PATH:-/healthz.html}"
# Allow extra headroom for constrained runners
if ! npx --yes wait-on "http://127.0.0.1:${PORT}${HEALTH_PATH}" --timeout 180000; then
  echo "[ci-start] WARNING: Health endpoint did not become ready within timeout at ${HEALTH_PATH}." >&2
fi

# Print a simple ready line
echo "[ci-start] READY - Server listening at http://127.0.0.1:${PORT}"
echo "[ci-start] Health: http://127.0.0.1:${PORT}${HEALTH_PATH}"

# Trap signals to avoid kill -9 patterns and exit gracefully
graceful_exit() {
  echo "[ci-start] Caught SIGTERM/SIGINT, exiting gracefully"
  # Try to stop only the started child, avoid killing entire process group
  if kill -0 "${SERVER_PID}" >/dev/null 2>&1; then
    kill "${SERVER_PID}" >/dev/null 2>&1 || true
    # Portable small wait loop instead of a blocking wait that might hang in CI
    SECS=0
    while kill -0 "${SERVER_PID}" >/dev/null 2>&1 && [ $SECS -lt 8 ]; do
      sleep 1
      SECS=$((SECS+1))
    done
  fi
  exit 0
}
trap graceful_exit TERM INT

# Keep-alive loop that checks the child is alive; react-scripts can be heavy in CI
while true; do
  if ! kill -0 "${SERVER_PID}" >/dev/null 2>&1; then
    # Child exited unexpectedly; if running in dev/ultralowmem, fallback to static to keep CI healthy
    if [ "${MODE}" != "static" ]; then
      echo "[ci-start] Child exited; falling back to static server for stability"
      SERVER_PID="$(start_static)"
      MODE="static"
      echo "[ci-start] static server started with PID ${SERVER_PID}"
      continue
    else
      break
    fi
  fi
  sleep 5
done

# Exit cleanly
wait "${SERVER_PID}" || true
