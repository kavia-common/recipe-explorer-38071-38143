# Browserslist Update

If you see a message like:
"The Browserslist: caniuse-lite is outdated. Please run next command `npx update-browserslist-db@latest`"

Note: This notice is informational and unrelated to exit code 137. It does not block CI. Use the low-memory start scripts if you face OOM.

You can update the database with:
- npm run browserslist:update

Notes:
- This updates your local caniuse-lite DB used by Browserslist (no code changes).
- Not required for CI to pass, but reduces deprecation notices during dev.
- The Webpack Dev Server deprecation warnings (onAfterSetupMiddleware/onBeforeSetupMiddleware) stem from react-scripts@5 and are harmless in CI and do not affect readiness/health.
