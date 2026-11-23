// Keeps the shipped documentation honest:
// - every doc has title, description and components frontmatter,
// - every public export of src/index.ts (except *Props types) is covered by a doc's `components`,
// - every relative link between docs resolves,
// - docs/llms.txt is generated from the frontmatter (run with --write to regenerate it).
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = join(root, "docs");
const write = process.argv.includes("--write");
const errors = [];

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(join(dir, entry.name))
      : entry.name.endsWith(".mdx")
        ? [join(dir, entry.name)]
        : [],
  );

const order = ["getting-started.mdx", "foundations/", "components/", "patterns/", "utilities/"];
const rank = (path) => order.findIndex((prefix) => path.startsWith(prefix));
const docs = walk(docsDir)
  .map((file) => {
    const path = relative(docsDir, file);
    const source = readFileSync(file, "utf8");
    const match = source.match(/^---\n([\s\S]*?)\n---/);
    if (!match) errors.push(`${path}: missing frontmatter`);
    const field = (name) => match?.[1].match(new RegExp(`^${name}:\\s*(.*)$`, "m"))?.[1].trim();
    const components = (field("components") ?? "")
      .replace(/^\[|\]$/g, "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const name of ["title", "description"]) if (!field(name)) errors.push(`${path}: missing ${name}`);
    for (const [, link] of source.matchAll(/\]\(((?!https?:|#)[^)#]+)(#[^)]*)?\)/g)) {
      if (!existsSync(join(dirname(file), link))) errors.push(`${path}: broken link ${link}`);
    }
    return { path, source, title: field("title"), description: field("description"), components };
  })
  .sort((a, b) => rank(a.path) - rank(b.path) || a.path.localeCompare(b.path));

const exported = [
  ...readFileSync(join(root, "src/index.ts"), "utf8").matchAll(/export\s+(?:type\s+)?\{([^}]*)\}/g),
]
  .flatMap(([, names]) => names.split(","))
  .map((name) => name.replace(/^\s*type\s+/, "").trim())
  .filter((name) => name && !name.endsWith("Props"));
const documented = new Set(docs.flatMap((doc) => doc.components));
for (const name of exported)
  if (!documented.has(name)) errors.push(`export ${name} is not listed in any doc's components`);
for (const name of documented)
  if (!exported.includes(name)) errors.push(`components lists ${name}, which is not exported`);

const sections = {
  foundations: "Foundations",
  components: "Components",
  patterns: "Patterns",
  utilities: "Utilities",
};
const lines = [
  "# @noc/platform",
  "",
  "> UI platform library of Night of Chances applications: opinionated React components, forms, tables and",
  "> patterns built on Radix UI, TanStack Table and react-hook-form + zod. Read the relevant page before",
  "> writing code with the library; every page lists the exports it documents in its `components` frontmatter.",
  "",
];
let current;
for (const doc of docs) {
  const section = sections[doc.path.split("/")[0]] ?? "Start here";
  if (section !== current) lines.push(`## ${section}`, "");
  current = section;
  lines.push(`- [${doc.title}](${doc.path}): ${doc.description} Exports: ${doc.components.join(", ")}.`);
  if (
    docs[docs.indexOf(doc) + 1] &&
    (sections[docs[docs.indexOf(doc) + 1].path.split("/")[0]] ?? "Start here") !== section
  )
    lines.push("");
}
const llms = `${lines.join("\n")}\n`;
const llmsPath = join(docsDir, "llms.txt");
if (write) writeFileSync(llmsPath, llms);
else if (!existsSync(llmsPath) || readFileSync(llmsPath, "utf8") !== llms)
  errors.push("docs/llms.txt is stale – run `npm run check:docs -- --write`");

if (errors.length) {
  console.error(errors.map((error) => `✖ ${error}`).join("\n"));
  process.exit(1);
}
console.log(
  `✔ ${docs.length} docs, ${exported.length} exports documented${write ? ", llms.txt written" : ""}`,
);
