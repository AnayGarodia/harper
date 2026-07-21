# `chrome-extension`

A minimal Manifest V3 extension that bundles `harper.js` and its WebAssembly binary into a popup. It lints entirely on-device and does not request any extension permissions.

Chrome extensions cannot execute remotely hosted JavaScript, so importing `harper.js` from a CDN is not an option here. Vite bundles the package locally, while the manifest's `wasm-unsafe-eval` directive allows Harper's bundled WebAssembly module to start under Manifest V3's content security policy.

## Build and load the extension

From the Harper repository root:

```sh
just build-harperjs
pnpm --filter harperjs-chrome-extension-example build
```

Then open `chrome://extensions`, enable **Developer mode**, select **Load unpacked**, and choose `packages/harper.js/examples/chrome-extension/dist`.

The example uses `LocalLinter` because a small popup is short-lived and self-contained. A production extension doing continuous linting should keep one linter in a background worker, as Harper's own browser extension does, rather than creating one in every content script.
