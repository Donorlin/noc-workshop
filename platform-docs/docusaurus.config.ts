import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

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
        theme: { customCss: "./src/css/custom.css" },
      } satisfies Preset.Options,
    ],
  ],
  themes: [
    [
      "@easyops-cn/docusaurus-search-local",
      { hashed: true, docsDir: "../app/packages/platform/docs", docsRouteBasePath: "docs", indexBlog: false, indexPages: false },
    ],
  ],
  themeConfig: {
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
