# Healthcheck Notes

- CRA serves `/` by default. A basic HTTP healthcheck should request `/` and expect status 200.
- The application binds to `HOST=0.0.0.0` and `PORT` from `REACT_APP_PORT` (default 3000).
- For CI/low-memory environments, use `npm run start:ci` or `npm run start:lowmem` to avoid out-of-memory terminations (exit code 137).
