# recipe-explorer-38071-38143

Frontend (React) quickstart in CI/containers:
- cd frontend_app
- npm ci
- npm run start:safe
- Healthcheck (zero-bundle): http://localhost:3000/healthz.html
- Programmatic wait: npm run ci:health

If you experience exit code 137 (OOM), try:
- npm run start:lowmem
- npm run start:ultralowmem

Environment sample: see frontend_app/.env.example