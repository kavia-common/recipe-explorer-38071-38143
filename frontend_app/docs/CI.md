# CI Stability and Exit 137 (OOM) Mitigation

This app includes CI-friendly scripts and configuration to avoid exit code 137 when starting the React dev server in low-memory containers.

Key recommendations:
- Use npm start (alias to start:safe) or npm run start:lowmem / start:ultralowmem.
- Ensure NODE_OPTIONS=--max-old-space-size=256 and REACT_APP_ENABLE_SOURCE_MAPS=false.
- Keep BROWSER=none, CHOKIDAR_USEPOLLING=false, and WDS_SOCKET_PORT=0 in CI.

Zero-bundle health endpoint:
- http://localhost:3000/healthz.html, served from public/healthz.html
- Programmatic wait: npm run ci:health

Static-only startup (ultra-low memory):
- Set CI_STATIC_ONLY=1 and run: npm run ci:start
  - This serves only the public/ directory (including healthz.html) without starting the React dev server bundle.
  - Useful for pipelines that only need a responsive port/health without building the JS bundle.

Environment template:
- Copy .env.example to .env and commit environment settings required by your CI.
- In extremely tight environments, consider `CI_STATIC_ONLY=1 npm run ci:start` to serve only static health without building the bundle.
