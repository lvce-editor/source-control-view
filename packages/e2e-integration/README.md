# Application integration tests

These tests moved from `lvce-editor` and run in this repository's `Integration` workflow. The workflow builds this repository, checks out a pinned LVCE application, and installs the local build into that disposable checkout before running the tests. Existing standalone e2e coverage stays in `packages/e2e`.

The application checkout supplies the renderer, extensions, CSS, Electron launcher, and test runner required by these scenarios. Update its commit in `.github/workflows/integration.yml` when a newer application runtime is needed.

To run locally, build this repository and install the pinned application checkout's dependencies, then run:

```sh
node packages/e2e-integration/prepare.mjs /path/to/disposable/lvce-editor
cd /path/to/disposable/lvce-editor/packages/extension-host-worker-tests
npm run e2e:headless
```

Use a disposable checkout: preparation replaces its test inventory and overlays the local build. See the workflow for initial settings and additional script commands.

The native source-control regression is staged separately so the consumer can run
it with its published packages. It checks list layout, toolbar updates, native
scrolling/context menus, file opening, staging, and repeated input focus:

```sh
node packages/e2e-integration/stage-native-source-control.mjs /path/to/disposable/lvce-editor
cd /path/to/disposable/lvce-editor/packages/extension-host-worker-tests
npm run e2e:headless -- --test-name-prefix=viewlet.source-control-native-interactions --browser-test=/path/to/source-control-view/packages/e2e-integration/scripts/test-native-source-control.mjs
```

Use `stage-native-source-control.mjs APPLICATION --clean` to remove the staged test.
