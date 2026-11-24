import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { themes as prismThemes } from "prism-react-renderer";

const siteDir = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const appDir = resolve(siteDir, "../app");

// The pages are the library's own docs – the same MDX files agents read in app/packages/platform/docs.
const config: Config = {
  title: "NoC Platform",
  tagline: "The UI platform library of Night of Chances applications",
  favicon: "img/favicon.svg",
  url: "https://donorlin.github.io",
  baseUrl: process.env.DOCS_BASE_URL ?? "/",
  organizationName: "Donorlin",
  projectName: "noc-workshop",
  trailingSlash: false,
  onBrokenLinks: "throw",
  markdown: { hooks: { onBrokenMarkdownLinks: "throw" } },
  i18n: { defaultLocale: "en", locales: ["en"] },
  // Infima goes into a CSS layer, so the library's own styles win inside live examples.
  future: { v4: { useCssCascadeLayers: true } },
  presets: [
    [
      "classic",
      {
        docs: {
          path: "../app/packages/platform/docs",
          routeBasePath: "docs",
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/Donorlin/noc-workshop/tree/main/app/packages/platform/docs/",
        },
        blog: false,
        theme: { customCss: ["./src/css/custom.css", "./src/css/platform-live.css"] },
      } satisfies Preset.Options,
    ],
  ],
  themes: [
    "@docusaurus/theme-live-codeblock",
    [
      "@easyops-cn/docusaurus-search-local",
      { hashed: true, docsDir: "../app/packages/platform/docs", docsRouteBasePath: "docs", indexBlog: false, indexPages: false },
    ],
  ],
  plugins: [
    // Live examples run the library from its TypeScript source, with the app's dependencies (one copy of React).
    () => ({
      name: "noc-platform-source",
      configureWebpack: () => ({
        resolve: {
          alias: {
            "@noc/platform$": resolve(appDir, "packages/platform/src/index.ts"),
            react: dirname(require.resolve("react/package.json")),
            "react-dom": dirname(require.resolve("react-dom/package.json")),
          },
          modules: ["node_modules", resolve(appDir, "node_modules")],
        },
      }),
    }),
  ],
  themeConfig: {
    liveCodeBlock: { playgroundPosition: "top" },
    colorMode: { respectPrefersColorScheme: true },
    navbar: {
      title: "NoC Platform",
      logo: { alt: "Night of Chances", src: "img/logo.svg" },
      items: [
        { type: "docSidebar", sidebarId: "docs", position: "left", label: "Docs" },
        { to: "/docs/patterns/list-screen", label: "Patterns", position: "left" },
        { to: "/showcase", label: "Showcase", position: "left" },
        { href: "https://github.com/Donorlin/noc-workshop", label: "GitHub", position: "right" },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Getting started", to: "/docs/getting-started" },
            { label: "Components", to: "/docs/components/data-table" },
            { label: "Patterns", to: "/docs/patterns/list-screen" },
          ],
        },
        {
          title: "Workshop",
          items: [
            { label: "From Functional Specification to Working UI", href: "https://github.com/Donorlin/noc-workshop" },
            { label: "Night of Chances", href: "https://www.nightofchances.com/" },
          ],
        },
      ],
      copyright:
        "A workshop project inspired by the Night of Chances visual identity – not an official Night of Chances product.",
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula, additionalLanguages: ["bash", "json"] },
  } satisfies Preset.ThemeConfig,
};

export default config;
