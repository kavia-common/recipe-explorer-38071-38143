'use strict';

/**
 * PUBLIC_INTERFACE
 * Minimal Express static file server to serve public/ and a /healthz.html endpoint.
 * Designed for ultra-low memory CI where webpack dev server is too heavy.
 *
 * Usage:
 *   node scripts/static-server.js
 * Environment:
 *   - PORT or REACT_APP_PORT: port to listen on (default 3000)
 *   - HOST: host to bind to (default 0.0.0.0)
 */
const express = require('express');

function main() {
  const app = express();
  // Prefer numeric PORT values and consistent precedence
  const port = Number(process.env.REACT_APP_PORT || process.env.PORT || 3000);
  const host = process.env.HOST || '0.0.0.0';

  // Serve static files from public/
  app.use(express.static('public'));

  // Health endpoint (zero-bundle)
  app.get('/healthz.html', (req, res) => {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.type('html').send('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>OK</title></head><body>OK</body></html>');
  });

  app.listen(port, host, () => {
    // eslint-disable-next-line no-console
    console.log(`Static server at http://${host}:${port}`);
  });
}

if (require.main === module) {
  main();
}
