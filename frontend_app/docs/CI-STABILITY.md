# CI Stability Guide (Exit 137 Mitigation)

This project includes scripts and configuration to run in low-memory CI containers without OOM (exit 137).

Quick start in CI:
- cp .env.example .env
- npm ci
- npm run ci:start
  - Serves zero-bundle health endpoints (public/healthz.html, /healthz)
  - Falls back to a static server if the dev server exits early
- To force static-only (ultra-low memory): CI_STATIC_ONLY=1 npm run ci:start

Health endpoints (zero-bundle):
- http://localhost:${PORT}/healthz.html
- http://localhost:${PORT}/healthz

Memory tips:
- Ensure NODE_OPTIONS=--max-old-space-size=256 (in .env or CI job)
- Disable source maps: REACT_APP_ENABLE_SOURCE_MAPS=false
- Keep WDS websocket port fixed: WDS_SOCKET_PORT=0
- Avoid auto-open browser: BROWSER=none

Verification:
- npm run ci:health (programmatically wait for health endpoint to be ready)
- Check logs for "[ci-start] READY"

Graceful shutdown:
- Start scripts and static server handle SIGTERM/SIGINT gracefully; no "kill -9" patterns are used.
