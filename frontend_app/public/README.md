This directory contains zero-bundle health endpoints used by CI to confirm the server is responsive without requiring the React bundle to compile.

Files:
- healthz.html: HTML OK page
- healthz: Plain text OK

These are served both by the webpack dev server and the fallback static server.
