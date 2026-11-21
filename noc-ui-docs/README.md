# noc-ui docs website

[Docusaurus](https://docusaurus.io/) site for `@donorlin/noc-ui`. It has no content of its own: the pages are the
library's MDX docs in [`../app/packages/noc-ui/docs`](../app/packages/noc-ui/docs) – the same files coding agents
read – plus a home page and a live **Showcase** (the library's playground, embedded in an iframe).

```bash
cd ../app && npm install      # the showcase is built from the app's workspace
cd ../noc-ui-docs && npm install
npm start                     # http://localhost:3000
npm run build                 # static site in build/ (DOCS_BASE_URL=/noc-workshop/ for GitHub Pages)
```

Edit the docs in `app/packages/noc-ui/docs`, not here. Sidebar order: [`sidebars.ts`](sidebars.ts); a new page
must be added there. Theme: [`src/css/custom.css`](src/css/custom.css).

Deployed to GitHub Pages by [`.github/workflows/docs.yml`](../.github/workflows/docs.yml) on every push to
`main`.
