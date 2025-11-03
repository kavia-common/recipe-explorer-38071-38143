# Browserslist Update

If you see a message like:
"The Browserslist: caniuse-lite is outdated. Please run next command `npx update-browserslist-db@latest`"

You can update the database with:
- npm run browserslist:update

Notes:
- This updates your local caniuse-lite DB used by Browserslist (no code changes).
- Not required for CI to pass, but reduces deprecation notices during dev.
