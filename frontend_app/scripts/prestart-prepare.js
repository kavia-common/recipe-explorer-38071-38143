'use strict';

/**
 * PUBLIC_INTERFACE
 * Prepare static assets and health/index stubs safely before start/install.
 * - Creates public/assets and copies ../assets if present (shallow).
 * - Ensures public/healthz.html and public/healthz exist (zero-bundle health).
 * - Ensures public/index.html exists (CRA mount point).
 * This runs very fast and avoids heavy operations to keep memory low.
 */
const fs = require('fs');
const path = require('path');

function ensureDir(p) {
  try {
    fs.mkdirSync(p, { recursive: true });
  } catch (e) {
    // noop for idempotency
  }
}

function ensureFile(p, content) {
  try {
    if (!fs.existsSync(p)) {
      ensureDir(path.dirname(p));
      fs.writeFileSync(p, content);
    }
  } catch (e) {
    // Intentionally silent to avoid failing CI on FS quirks
  }
}

function shallowCopy(src, dst) {
  try {
    if (!fs.existsSync(src)) return;
    ensureDir(dst);
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const e of entries) {
      const s = path.join(src, e.name);
      const d = path.join(dst, e.name);
      if (e.isDirectory()) {
        // create dir only; avoid deep traversal to keep memory low
        ensureDir(d);
        // copy only first-level files
        const sub = fs.readdirSync(s, { withFileTypes: true }).filter(se => se.isFile());
        for (const se of sub) {
          const ss = path.join(s, se.name);
          const dd = path.join(d, se.name);
          try {
            fs.copyFileSync(ss, dd);
          } catch { /* ignore */ }
        }
      } else {
        try {
          fs.copyFileSync(s, d);
        } catch { /* ignore */ }
      }
    }
  } catch (e) {
    // ignore errors to prevent startup fail
  }
}

(function main() {
  const publicDir = path.resolve('public');
  const assetsDst = path.join(publicDir, 'assets');
  ensureDir(assetsDst);

  // Copy ../assets -> public/assets if available (shallow)
  shallowCopy(path.resolve('..', 'assets'), assetsDst);

  // Health page (zero-bundle)
  ensureFile(
    path.join(publicDir, 'healthz.html'),
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>OK</title></head><body>OK</body></html>'
  );
  // Provide /healthz (no extension) for environments probing this path
  ensureFile(path.join(publicDir, 'healthz'), 'OK');

  // Index mount point for CRA dev server
  ensureFile(
    path.join(publicDir, 'index.html'),
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>Recipe Explorer</title></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div></body></html>'
  );
})();
