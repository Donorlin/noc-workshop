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

+==[ NIGHT OF CHANCES IT // 2026 ]=====[ FROM FUNCTIONAL SPECIFICATION TO WORKING UI ]=====[ 60 MIN ]+
```

# From Functional Specification to Working UI

**Night of Chances IT 2026** · 25 November, 18:00–19:00 · room AB35 · Daniel Jahodka, Slovenská sporiteľňa

Turn a functional specification and visual requirements into a working frontend application with an AI
agent – **while keeping the architecture, the design standards and the code quality** of the project.

**For** frontend developers (React/TypeScript) who want to build with AI agents systematically, not by
trial and error.

Your coding agent knows React. It has never seen **your** component library, **your** architecture or **your**
way of integrating backends, so it writes plausible code against an API it imagined. In this hour you give it
that knowledge – as documentation and **skills** – and take one feature from specification to verified screen.

| What you keep | How the agent keeps it |
|---|---|
| **Architecture** | `AGENTS.md` and `ARCHITECTURE.md` tell it where features, routes, API code and mocks live; a plan is reviewed before any code. |
| **Design standards** | It builds only with the project's UI library and looks every component and pattern up in its docs; the mockup is checked in a browser. |
| **Code quality** | Type check, lint and tests after every step; API code is generated, never hand-written; done means every acceptance criterion is met, with evidence. |

> **Agentic engineering is not "let the AI do it".** Skills make the agent repeat the workflows the team
> trusts. You still own the specification, the review and the merge.

## Before you come – set up your laptop

Bring your own laptop, **set up at home** – there is no time for installs in the room.

- [ ] **Node.js 22.12 or newer** – check with `node -v`.
- [ ] **git** – check with `git --version`.
- [ ] **An IDE or editor of your choice** – VS Code, IntelliJ IDEA / WebStorm, Cursor, Zed, … You use it to read
      the specification and review what the agent changes.
- [ ] **A terminal of your choice** – Terminal or iTerm on macOS, any shell on Linux, PowerShell, Windows
      Terminal or Git Bash on Windows (WSL works too). All commands below are the same in every one of them.
- [ ] **One AI coding agent you are signed in to** – GitHub Copilot CLI, Claude Code, Codex, Cursor, OpenCode,
      Gemini CLI or another one that supports [Agent Skills](https://agentskills.io).
- [ ] **Clone the repository:**
      `git clone https://github.com/donorlin/noc-workshop.git`
- [ ] **Install the app:**
      `cd noc-workshop/app` and `npm install`.
- [ ] **Run it:**
      `npm run dev` and open <http://localhost:5173> – you see the *Organizer* home page.
- [ ] **Start your agent in `app/`** (`copilot`, `claude`, `codex`, …) in a second terminal and ask:
      `Which skills are available in this project?` – it lists `noc-api`, `noc-screen`, `noc-platform-docs` and
      `playwright-cli`.

Good to know:

- **Nothing else to install.** The skills are part of the repository, and Playwright is a dev dependency – the
  agent downloads its browser itself the first time it looks at the app.
- **The specification is one level up**, in `../specification/`. Approve that directory when the agent first
  asks to read it.
- **Claude Code on Windows:** Claude reads `AGENTS.md` by itself, but loads skills only from `.claude/skills`,
  which in this repository is a symlink to `app/.agents/skills`. Enable
  Developer Mode in Windows settings and clone with
  `git clone -c core.symlinks=true https://github.com/donorlin/noc-workshop.git`. Other agents read
  `app/.agents/skills` directly and need nothing extra.
- **Falling behind is fine.** Every step has a branch: `git switch step-1-api`, `step-2-list`, `solution`.

## What is in this repository

```text
noc-workshop/
├── README.md                     # this page
├── workshop/                     # modules 01–04 and the presenter guide
├── specification/programme/      # the ticket: specification, mockups, OpenAPI contract
├── platform-docs/                 # Docusaurus website of the UI library (optional, not needed for the workshop)
└── app/                          # the application – start your agent here
    ├── AGENTS.md                 #   short rules every agent reads (Claude Code reads it too)
    ├── ARCHITECTURE.md, docs/    #   how the app is built – for people and agents
    ├── .agents/skills/           #   the platform's skills (.claude/skills links here)
    │   ├── noc-platform-docs/    #     look up the UI library in its docs
    │   ├── noc-api/              #     OpenAPI contract → hooks → mocks
    │   ├── noc-screen/           #     spec + mockup → screen, checked in the browser
    │   └── playwright-cli/       #     browser automation (from Microsoft)
    ├── src/                      #   the app code – the feature doesn't exist yet
    └── packages/platform/          #   the UI platform library – source, docs/ for agents, playground
```

## Plan of the hour

You follow along on your laptop; the presenter runs the same prompts on the screen.

|          Time | Module | What happens |
|--------------:|--------|--------------|
| 18:00 – 18:10 | [01 · The NoC platform and its skills](workshop/01-platform-and-skills.md) | Meet the fictional platform – UI library, app template, API and mocks – and the four skills that teach it to your agent. |
| 18:10 – 18:20 | [02 · Understand and plan](workshop/02-understand-and-plan.md) | Read the spec and the mockup, find the gaps, plan in steps. |
| 18:20 – 18:50 | [03 · Build](workshop/03-build.md) | API layer from the contract, then the list screen from spec + mockup. |
| 18:50 – 19:00 | [04 · Verify](workshop/04-verify.md) | Acceptance criteria with evidence. Homework: the detail screen. |

## Credits

Colours and typography are inspired by the [Night of Chances](https://www.nightofchances.com/) website. All
people, companies and sessions in the data are fictional. The `playwright-cli` skill is © Microsoft,
Apache-2.0.
