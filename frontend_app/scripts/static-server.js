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

  // Health endpoints (zero-bundle)
  const sendHealth = (res, isHtml = false) => {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    if (isHtml) {
      res.type('html').send('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>OK</title></head><body>OK</body></html>');
    } else {
      res.type('text').send('OK');
    }
  };
  app.get('/healthz.html', (req, res) => sendHealth(res, true));
  app.get('/healthz', (req, res) => sendHealth(res, false));

  app.listen(port, host, () => {
    // eslint-disable-next-line no-console
    console.log(`Static server at http://${host}:${port}`);
  });
}

if (require.main === module) {
  main();
}
