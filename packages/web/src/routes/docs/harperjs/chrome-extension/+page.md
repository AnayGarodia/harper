---
title: Chrome Extensions
---

Chrome extensions using Manifest V3 cannot execute remotely hosted JavaScript, so the CDN approach described in the previous section will not work inside an extension. Bundle `harper.js` and its WebAssembly module with the rest of the extension instead.

Harper includes a [minimal Vite example](https://github.com/Automattic/harper/tree/master/packages/harper.js/examples/chrome-extension) that creates a popup, loads a locally bundled `LocalLinter`, and displays lint messages. Its manifest also shows the `wasm-unsafe-eval` content security policy directive required to initialize WebAssembly under Manifest V3.

The example keeps linting in the popup to make the moving parts easy to see. For an extension that lints continuously, initialize one linter in a background worker and send requests to it from content scripts. This avoids loading Harper's WebAssembly module separately in every page.
