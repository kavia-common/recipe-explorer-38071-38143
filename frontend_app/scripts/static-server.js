'use strict';

/**
 * PUBLIC_INTERFACE
 * Minimal Express static file server to serve public/ and health endpoints.
 * Designed for ultra-low memory CI where webpack dev server is too heavy.
 *
 * Usage:
 *   node scripts/static-server.js
 * Environment:
 *   - PORT or REACT_APP_PORT: port to listen on (default 3000)
 *   - HOST: host to bind to (default 0.0.0.0)
 */
const express = require('express');
const path = require('path');

function main() {
  const app = express();

  const parsePort = (v) => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : 3000;
  };
  const port = parsePort(process.env.REACT_APP_PORT || process.env.PORT || 3000);
  const host = process.env.HOST || '0.0.0.0';
  const publicDir = path.resolve('public');

  // Global no-cache headers for stability
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  });

  // Serve static files from public/
  app.use(express.static(publicDir, { etag: false, lastModified: false }));

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
  app.get('/health.json', (req, res) => {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.json({ status: 'ok' });
  });

  // Default route to index.html so that root path responds even without CRA
  app.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
  });

  const server = app.listen(port, host, () => {
    // eslint-disable-next-line no-console
    console.log(`[static-server] Listening at http://${host}:${port}`);
  });

  // Graceful shutdown to avoid hard kill patterns in CI
  const shutdown = () => {
    try {
      // eslint-disable-next-line no-console
      console.log('[static-server] Received signal, shutting down gracefully');
      server.close(() => process.exit(0));
      // Safety timeout
      setTimeout(() => process.exit(0), 3000).unref();
    } catch {
      process.exit(0);
    }
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

if (require.main === module) {
  main();
}
