```text
+==[ NIGHT OF AGENTS // GLOSSARY ]======[ TERMS: EXPLAINED ]==[ JARGON: DEFUSED ]==[ TOPICS: 6 ]=+

 ██████╗ ██╗      ██████╗ ███████╗███████╗ █████╗ ██████╗ ██╗   ██╗
██╔════╝ ██║     ██╔═══██╗██╔════╝██╔════╝██╔══██╗██╔══██╗╚██╗ ██╔╝
██║  ███╗██║     ██║   ██║███████╗███████╗███████║██████╔╝ ╚████╔╝
██║   ██║██║     ██║   ██║╚════██║╚════██║██╔══██║██╔══██╗  ╚██╔╝
╚██████╔╝███████╗╚██████╔╝███████║███████║██║  ██║██║  ██║   ██║
 ╚═════╝ ╚══════╝ ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝

+==[ IF A WORD STOPS YOU, LOOK IT UP HERE – THEN KEEP GOING. ]==========[ REFERENCE // ANY TIME ]+
```

# Glossary

Every technical term the workshop uses, in plain words. Terms are grouped by topic; *in the workshop* tells
you where you meet each one.

[Overview](../README.md) · [AI agents](#1-ai-agents-and-skills) · [The feature](#2-specification-and-process) ·
[Frontend](#3-frontend) · [Backend and API](#4-backend-and-api) · [Tools](#5-tools-and-workflow) ·
[NoC names](#6-names-of-the-noc-platform)

## 1. AI agents and skills

| Term | What it means | In the workshop |
|---|---|---|
| **LLM / model** | Large language model – the AI that reads text and writes text and code (GPT, Claude, Gemini, …). It knows what it saw during training, not your private code. | Behind every agent you use. |
| **AI coding agent** | A program built around a model that can also *act*: read and edit files, run commands, open a browser – in a loop, until a task is done. Examples: GitHub Copilot CLI, Claude Code, Codex, Cursor. | You run one in `app/`. |
| **Prompt** | The instruction you type to the agent. | Every module gives you exact prompts. |
| **Context** | Everything the model sees in one conversation: your prompts, files it read, command output. It is limited, so what goes in matters. | Skills keep it small by loading only when needed. |
| **Hallucination** | A confident answer that is made up – for example a component prop that doesn't exist. | The reason the agent must look things up in the docs. |
| **Agentic engineering** | Using AI agents in a structured way: clear input (a specification), a reviewed plan, small steps, checks after each step, a human who decides. The opposite of "try prompts until it works". | The whole workshop. |
| **Plan mode** | An agent mode in which it only proposes a plan and changes nothing. In Copilot CLI and Claude Code you switch to it with `Shift+Tab`. | Module 02. |
| **`AGENTS.md`** | A short Markdown file at the root of a project with rules for every agent – how to build, test, what never to do. Most agents read it automatically. | `app/AGENTS.md`. |
| **Skill** | A folder with a `SKILL.md` file: a *description* saying when it applies, then step-by-step instructions, optionally with reference files and scripts. The agent loads it only when a task matches. | `app/.agents/skills/`. |
| **Agent Skills** | The open standard behind `SKILL.md`, so one skill works in many different agents. | [agentskills.io](https://agentskills.io) |
| **Subagent** | A helper agent started by the main agent for one job (for example "read the docs and summarise"). It works in its own context and returns only the result. | Mentioned in Module 01 as an option. |
| **Plugin / marketplace** | A *plugin* bundles skills (and more) into one installable package; a *marketplace* is a Git repository that lists plugins, so a company can share them with all its teams. | Module 01, section 6. |
| **`llms.txt`** | A plain-text index of documentation written for AI: one line per page with what it covers, so an agent finds the right page fast. | `app/packages/platform/docs/llms.txt`. |

## 2. Specification and process

| Term | What it means | In the workshop |
|---|---|---|
| **Functional specification** | A document describing *what* a feature must do – screens, fields, rules, texts, errors – without saying how to code it. In companies it is often a "ticket". | `specification/programme/`. |
| **Mockup** | A picture of how a screen should look, made by a designer. Not code, just the visual target. | `specification/programme/mockups/`. |
| **Acceptance criteria (AC)** | A numbered list of checks that must all pass before the feature counts as done (`AC-01` … `AC-15`). | Module 04 – verify each one with evidence. |
| **Non-functional requirement (NFR)** | A requirement about *how well* something works rather than what it does – speed, accessibility, which libraries to use. | `NFR-1` … `NFR-5` in the spec. |
| **Design system** | A company's shared set of components, colours, fonts and rules, so all its apps look and behave the same. | `@noc/platform` is one. |
| **Code review** | Another person (or you) reads a change before it is accepted, looking for mistakes. | You review the agent's plans and diffs. |

## 3. Frontend

| Term | What it means | In the workshop |
|---|---|---|
| **Frontend / backend** | *Frontend* is what runs in the browser and the user sees. *Backend* is the server that stores and serves the data. | You build the frontend; the backend is mocked. |
| **React** | The most used JavaScript library for building user interfaces from **components**. | The whole app. |
| **Component** | A reusable piece of UI written as a function – a button, a table, a whole page. | `DataTable`, `Button`, `Page`, … |
| **Hook** | A React function whose name starts with `use…` that gives a component state or data, e.g. `useState`, `useSearchSessions`. | Generated API hooks, `useNocForm`. |
| **TypeScript** | JavaScript with **types** – you declare what shape data has, and the compiler catches mistakes before the code runs. | All code is `.ts` / `.tsx`. |
| **Type check** | Running the TypeScript compiler (`tsc`) to find type errors without running the app. | `npm run check:types`. |
| **Vite** | A fast tool that runs the app locally (**dev server**) and builds it for production. | `npm run dev` → <http://localhost:5173>. |
| **Route / routing** | Which screen is shown for which URL, e.g. `/programme` → the list, `/programme/s-ai-agents` → a detail. **React Router** does this. | `src/features/*/index.ts`. |
| **URL search params (query string)** | The part of a URL after `?`, e.g. `?type=WORKSHOP&page=2`. Keeping filters there means they survive going back and reloading. | The list screen keeps its filters there. |
| **TanStack Query** | A library that loads server data in components, caches it, retries failures and tells you if it is loading or failed. | Every request of the app. |
| **TanStack Table** | A library that sorts and pages table data; `@noc/platform`'s `DataTable` is built on it. | Hidden inside `DataTable`. |
| **Form validation** | Checking user input before using it ("at least 2 characters"). **react-hook-form** manages form state, **zod** describes the rules as a **schema**. | Filters on the list screen. |
| **Radix UI** | A library of accessible building blocks (select, switch, tooltip) without styling – `@noc/platform` adds the look. | Hidden inside the platform. |
| **Design tokens** | Named values for colours, spacing and fonts (`--noc-color-mint`) used instead of raw values, so a theme is changed in one place. | `packages/platform/src/styles/tokens.css`. |
| **Debounce** | Waiting until the user stops typing (here 400 ms) before reacting, so the app doesn't send a request on every key press. | Live filters. |
| **Skeleton / empty state / error state** | What a screen shows while loading (grey placeholder shapes), when there are no results, and when a request failed. | Required by the spec, not drawn in the mockup. |
| **Accessibility (a11y)** | Making apps usable for everyone, including keyboard and screen-reader users – labels, focus, keyboard support. | Rows open with Enter (`NFR-3`). |

## 4. Backend and API

| Term | What it means | In the workshop |
|---|---|---|
| **API** | Application Programming Interface – the agreed way two programs talk. Here: the URLs the frontend calls to get data from the backend. | The Programme API. |
| **HTTP, endpoint, method** | HTTP is the protocol of the web. An *endpoint* is one URL of an API; the *method* says what to do with it – `GET` reads, `POST` creates. | `GET /api/programme/sessions`. |
| **Status code** | A number in every HTTP response: `200` OK, `400` bad input, `404` not found, `500` server error. | The mocks return all four. |
| **JSON** | The text format APIs use to send data: `{ "title": "AI agents", "freeSpots": 4 }`. | Every response. |
| **OpenAPI (contract)** | A standard YAML/JSON file that describes an API completely – every endpoint, parameter, response and error. Frontend and backend teams agree on it first, then build in parallel. | `programme-openapi.yaml`. |
| **`operationId`** | The name of one operation in an OpenAPI file, e.g. `searchSessions`; generated code is named after it. | `searchSessions`, `getSession`, `getSpeaker`. |
| **Schema validation (Redocly)** | Checking that an OpenAPI file is correct before using it. Redocly is the tool. | `npm run validate:schema`. |
| **Code generation (orval)** | Writing code automatically from the contract instead of by hand – orval turns the OpenAPI file into typed TanStack Query hooks. Generated code is never edited by hand. | `npm run generate:api` → `src/api/programme/generated/`. |
| **HTTP client** | The one function that actually sends requests (`fetch`) – all generated code uses it, so errors are handled the same everywhere. | `src/api/http-client.ts`. |
| **Gateway** | A single entry point in front of all backends; the app calls `/api/<name>/…` and the gateway forwards it. | Every URL starts with `/api/programme`. |
| **Mock / Mock Service Worker (MSW)** | A *mock* is a fake backend answer. MSW intercepts the app's requests in the browser (and in tests) and returns mock data, so you can build screens before the real backend exists. | `src/mocks/programme/`. |
| **Pagination (paging)** | Splitting a long list into pages (here 10 rows) – the API returns one page plus the total count. | The programme table. |

## 5. Tools and workflow

| Term | What it means | In the workshop |
|---|---|---|
| **Terminal / shell** | The window where you type commands – Terminal on macOS, PowerShell or Git Bash on Windows. **WSL** runs Linux inside Windows. | All setup commands. |
| **IDE / editor** | The program you read and write code in – VS Code, IntelliJ IDEA, WebStorm, Cursor. | Reading the spec, reviewing changes. |
| **Node.js** | Runs JavaScript outside the browser; all the tools here (Vite, tests, the agent's helpers) run on it. | Version 22.12 or newer. |
| **npm, package, dependency** | *npm* installs JavaScript *packages* (libraries). The packages a project needs are its *dependencies*, listed in `package.json`; *dev dependencies* are only needed while developing (tests, tools). | `npm install`. |
| **npm workspace / monorepo** | One repository holding several packages that use each other directly. Here the app and the platform library live together. | `app/packages/platform`. |
| **git: clone, branch, commit, diff** | *Clone* copies a repository to your laptop. A *branch* is a separate line of work. A *commit* saves a set of changes. A *diff* shows exactly what changed. | Checkpoint branches `step-1-api`, `step-2-list`, `solution`. |
| **Checkpoint branch** | A branch with the finished state of one step, so anyone who falls behind can continue from there. | `git switch step-2-list`. |
| **Lint (ESLint)** | A tool that scans code for common mistakes and bad patterns. | `npm run lint`. |
| **Tests (Vitest, Testing Library)** | Code that checks other code automatically – e.g. "typing `ai` shows 4 sessions". | `npm test`. |
| **Playwright** | A tool that controls a real browser from code – clicks, types, takes screenshots. The agent uses it to look at the app. | The `playwright-cli` skill. |
| **Symlink** | A file or folder that points to another one, like a shortcut. Windows needs Developer Mode for them. | `app/.claude/skills` → `app/.agents/skills`. |
| **Docusaurus / GitHub Pages** | Docusaurus turns Markdown documentation into a website; GitHub Pages hosts such sites for free. | The [platform docs website](https://donorlin.github.io/noc-workshop/). |

## 6. Names of the NoC platform

These are names of the fictional platform, not general terms – explained in [Module 01](01-platform-and-skills.md).

| Name | What it is |
|---|---|
| **NoC Organizer** | The fictional back-office app you work on (`app/`). |
| **Programme feature** | The feature you build: a list of the evening's sessions and a session detail. |
| **`@noc/platform`** | The platform's UI library – components, forms, tables, patterns and their docs. |
| **`noc-platform-docs`** | Skill: look things up in the platform docs instead of guessing. |
| **`noc-api`** | Skill: OpenAPI contract → validated → generated hooks → mocks. |
| **`noc-screen`** | Skill: specification + mockup → plan → screen, checked in the browser. |
| **`playwright-cli`** | Skill from Microsoft: drive a browser from the terminal. |

[Overview](../README.md)
