# recipe-explorer-38071-38143

Note: In CI or constrained environments, start the frontend with:
- cd frontend_app
- npm ci
- npm run start:safe

This minimizes memory usage and reduces the chance of exit code 137 (OOM). You can further reduce memory by using:
- npm run start:lowmem
- npm run start:ultralowmem

If you see Browserslist warnings during dev, you can update the database (not required for CI) with:
- cd frontend_app && npm run browserslist:update

Health:
- Zero-bundle health endpoint: http://localhost:3000/healthz.html

Recommended env for stability in CI/containers (add to .env):
- BROWSER=none
- CHOKIDAR_USEPOLLING=false
- WDS_SOCKET_PORT=0
- NODE_OPTIONS=--max-old-space-size=256
- REACT_APP_ENABLE_SOURCE_MAPS=false
