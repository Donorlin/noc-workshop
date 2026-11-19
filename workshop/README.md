```text
███╗   ██╗██╗ ██████╗ ██╗  ██╗████████╗     ██████╗ ███████╗
████╗  ██║██║██╔════╝ ██║  ██║╚══██╔══╝    ██╔═══██╗██╔════╝
██╔██╗ ██║██║██║  ███╗███████║   ██║       ██║   ██║█████╗
██║╚██╗██║██║██║   ██║██╔══██║   ██║       ██║   ██║██╔══╝
██║ ╚████║██║╚██████╔╝██║  ██║   ██║       ╚██████╔╝██║
╚═╝  ╚═══╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝        ╚═════╝ ╚═╝
 █████╗  ██████╗ ███████╗███╗   ██╗████████╗███████╗
██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔══╝██╔════╝
███████║██║  ███╗█████╗  ██╔██╗ ██║   ██║   ███████╗
██╔══██║██║   ██║██╔══╝  ██║╚██╗██║   ██║   ╚════██║
██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║   ███████║
╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

+==[ NIGHT OF CHANCES IT // 2026 ]========[ AGENTIC ENGINEERING ON YOUR OWN PLATFORM ]==[ 60 MIN ]+
```

# Agentic engineering on your own platform

Your coding agent knows React. It has never seen **your** component library or **your** way of integrating
backends, so it writes plausible code against an API it imagined. In one hour you will see how a platform
team closes that gap with **skills**, and how a developer uses them to go from a specification to a verified
feature.

> **Agentic engineering is not "let the AI do it".** Skills make the agent repeat the workflows the platform
> team trusts: read the docs before writing code, generate API clients the same way every time, mock every
> state, look at the result in a browser. You still own the specification, the review and the merge.

## Setup – 3 minutes

You need **Node.js 22.12+**, **git** and **one coding agent** you are signed in to – GitHub Copilot CLI,
Claude Code, Codex, Cursor, OpenCode, Gemini CLI… The skills are already inside this repository, so there is
nothing to install for them.

```bash
git clone https://github.com/donorlin/noc-app.git
cd noc-app
npm install
npm run dev          # http://localhost:5173 – the Organizer home page
```

Then start your agent in `noc-app` (`copilot`, `claude`, `codex`, …) in a second terminal.

Optional – lets the agent look at the app in a browser: `npm install -g @playwright/cli@latest`.

## What is in this repository

```text
noc-app/
├── AGENTS.md                 # short rules every agent reads (CLAUDE.md links to it)
├── ARCHITECTURE.md, docs/    # how the app is built – for people and agents
├── .agents/skills/           # the platform's skills (.claude/skills links here)
│   ├── noc-ui-docs/          #   look up the UI library in its docs
│   ├── noc-api/              #   OpenAPI contract → hooks → mocks
│   ├── noc-screen/           #   spec + mockup → screen, checked in the browser
│   └── playwright-cli/       #   browser automation (from Microsoft)
├── specs/programme/          # the ticket: specification, mockups, OpenAPI contract
├── src/                      # the app – the feature doesn't exist yet
└── packages/noc-ui/          # the UI platform library – source, docs/ for agents, playground
```

## Plan of the hour

|  Time | Module | What happens |
|------:|--------|--------------|
|  0–10 | [01 · Platform and skills](01-platform-and-skills.md) | Why agents need platform knowledge; instructions vs. skills; how skills are shared. |
| 10–20 | [02 · Understand and plan](02-understand-and-plan.md) | Read the spec and the mockup, find the gaps, plan in steps. |
| 20–50 | [03 · Build](03-build.md) | API layer from the contract, then the list screen from spec + mockup. |
| 50–60 | [04 · Verify](04-verify.md) | Acceptance criteria with evidence. Homework: the detail screen. |

Behind at any point? Every step has a branch: `git switch step-1-api`, `step-2-list`, `solution`.

## Credits

Colours and typography are inspired by the [Night of Chances](https://www.nightofchances.com/) website. All
people, companies and sessions in the data are fictional. The `playwright-cli` skill is © Microsoft,
Apache-2.0.
