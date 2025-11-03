# recipe-explorer-38071-38143

Frontend (React) quickstart in CI/containers:
- cd frontend_app
- npm ci
- npm run start:safe
- Healthcheck (zero-bundle): http://localhost:3000/healthz.html
- Programmatic wait: npm run ci:health

CI Low-memory tips:
- Use npm run start:safe (default) or npm run start:ultralowmem for very tight memory.
- Ensure NODE_OPTIONS=--max-old-space-size=256 and REACT_APP_ENABLE_SOURCE_MAPS=false.
- Health endpoint is static and should return even before bundle compiles.
- Copy frontend_app/.env.example to frontend_app/.env to inherit safe, CI-friendly settings.

If you experience exit code 137 (OOM), try:
- npm run start:lowmem
- npm run start:ultralowmem
- Or run ultra + wait together: `npm run ci:dev`
- For extreme constraints, start static-only (zero-bundle): `npm run ci:dev:static` or set `CI_STATIC_ONLY=1 npm run ci:start`
- The launcher now handles graceful shutdown and avoids forceful kill patterns in CI logs.

Environment sample: see frontend_app/.env.example

Note: For CI runners with tight memory where you saw exit code 137, copy frontend_app/.env.example to frontend_app/.env before starting to inherit safe defaults (no source maps, memory cap, static health endpoint).