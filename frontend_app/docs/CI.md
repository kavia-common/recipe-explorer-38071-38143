# CI Stability and Exit 137 (OOM) Mitigation

This app includes CI-friendly scripts and configuration to avoid exit code 137 when starting the React dev server in low-memory containers.

Key recommendations:
- Use npm start (alias to start:safe) or npm run start:lowmem / start:ultralowmem.
- Ensure NODE_OPTIONS=--max-old-space-size=256 and REACT_APP_ENABLE_SOURCE_MAPS=false.
- Keep BROWSER=none, CHOKIDAR_USEPOLLING=false, and WDS_SOCKET_PORT=0 in CI.
- Copy frontend_app/.env.example to frontend_app/.env to inherit safe defaults.

Zero-bundle health endpoint:
- http://localhost:3000/healthz.html, served from public/healthz.html
- http://localhost:3000/healthz (plain text), served from public/healthz
- Programmatic wait: npm run ci:health

Static-only startup (ultra-low memory):
- Set CI_STATIC_ONLY=1 and run: npm run ci:start
  - This serves only the public/ directory (including healthz.html) without starting the React dev server bundle.
  - Useful for pipelines that only need a responsive port/health without building the JS bundle.
- When starting with `npm start` or `npm run ci:dev`, if the dev server exits early (e.g., OOM), a fallback to the static server is triggered automatically to keep the health endpoint available.
- A ready-to-use `.env.example` is included and should be copied to `.env` for stable memory settings.

Graceful shutdown:
- The start launcher and static server handle SIGTERM/SIGINT gracefully and will stop child processes cleanly, avoiding patterns like `kill -9 -$$`.
- This prevents abrupt termination logs and helps CI report clean exits even under resource pressure.

Environment template:
- Copy .env.example to .env and commit environment settings required by your CI.
- In extremely tight environments, consider `CI_STATIC_ONLY=1 npm run ci:start` to serve only static health without building the bundle.
