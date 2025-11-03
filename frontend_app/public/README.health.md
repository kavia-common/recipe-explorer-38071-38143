# Health endpoints

- Zero-bundle health page: /healthz.html
  - Served statically from public/healthz.html (created during postinstall/ci-start if not present)
  - Returns even before React bundle is compiled
- App root: /
  - Renders CRA app once compiled
