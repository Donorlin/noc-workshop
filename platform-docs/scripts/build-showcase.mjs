// Builds the platform playground (app/packages/platform/playground) into static/showcase-app, where the Showcase page
// embeds it in an iframe – so the library's global styles never mix with the documentation site.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const app = fileURLToPath(new URL("../../app", import.meta.url));
const outDir = fileURLToPath(new URL("../static/showcase-app", import.meta.url));
// Absolute asset paths, so the page works with or without a trailing slash. Same base as docusaurus.config.ts.
const base = `${(process.env.DOCS_BASE_URL ?? "/").replace(/\/?$/, "/")}showcase-app/`;

if (!existsSync(`${app}/node_modules`)) {
  console.error("The showcase needs the app's dependencies: run `npm install` in app/ first.");
  process.exit(1);
}

execFileSync(
  "npx",
  ["vite", "build", "--config", "packages/platform/playground/vite.config.ts", "--base", base, "--outDir", outDir, "--emptyOutDir", "--logLevel", "warn"],
  { cwd: app, stdio: "inherit", shell: process.platform === "win32" },
);
console.log("✔ showcase built");
