# @noc/platform docs website

[Docusaurus](https://docusaurus.io/) site for `@noc/platform`. It has no content of its own: the pages are the
library's MDX docs in [`../app/packages/platform/docs`](../app/packages/platform/docs) – the same files coding agents
read – plus a home page, live examples on every component page and a **Showcase** (the library's playground, embedded in an iframe).

```bash
cd ../app && npm install      # the showcase is built from the app's workspace
cd ../platform-docs && npm install
npm start                     # http://localhost:3000
npm run build                 # static site in build/ (DOCS_BASE_URL=/noc-workshop/ for GitHub Pages)
```

Edit the docs in `app/packages/platform/docs`, not here. Sidebar order: [`sidebars.ts`](sidebars.ts); a new page
must be added there. Theme: [`src/css/custom.css`](src/css/custom.css).

**Live examples.** Code blocks marked `tsx live` (optionally `noInline`, ending with `render(...)`) are editable
and render the real components ([`@docusaurus/theme-live-codeblock`](https://docusaurus.io/docs/markdown-features/code-blocks#interactive-code-editor)).
The library is compiled from its TypeScript source with the app's dependencies (plugin in
[`docusaurus.config.ts`](docusaurus.config.ts)); what the examples can use without imports is in
[`src/theme/ReactLiveScope`](src/theme/ReactLiveScope/index.js). Previews render inside `NocProvider` and the
`.noc-live` scope of [`src/css/platform-live.css`](src/css/platform-live.css), which applies the library's base
styles to the preview only; Infima sits in a CSS cascade layer so it never overrides the library.

Deployed to GitHub Pages by [`.github/workflows/docs.yml`](../.github/workflows/docs.yml) on every push to
`main`.
