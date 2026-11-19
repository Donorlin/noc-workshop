```text
+==[ NIGHT OF AGENTS // MODULE 01 ]=============[ PLATFORM: NOC ]==[ SKILLS: 4 ]==[ SETUP: NONE ]=+

███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
███████╗█████╔╝ ██║██║     ██║     ███████╗
╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
███████║██║  ██╗██║███████╗███████╗███████║
╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝

+==[ TEACH THE AGENT THE PLATFORM BEFORE IT TOUCHES THE CODE. ]=============[ SESSION 01 // GO ]=+
```

# 01 · Platform and skills

**Time:** 0–10 minutes · [Overview](README.md) | [Next: Understand and plan](02-understand-and-plan.md)

## 1. The gap

Ask any agent to "build the programme list with `@donorlin/noc-ui`" and it writes confident React against a
library it has never seen: invented component names, invented props, a debounced filter re-implemented with
`useEffect`. Sometimes it compiles. It is wrong in ways that cost a reviewer an hour.

The knowledge exists – in the library's docs and in the template's conventions. How does it reach the agent?

| Option | Problem |
|---|---|
| Paste it into every prompt | Everyone does it differently and forgets half. |
| Put it all into `AGENTS.md` | Loaded on every request, so it must stay short. |
| **Package it as skills** | Loaded only when the task needs it, with its own workflow. Same for everyone. |

## 2. What makes this platform agent-ready

1. **The UI library is documented for agents** – `packages/noc-ui/docs/`, next to its source and versioned with
   it, starting with an `llms.txt` index. A docs check fails when an export is undocumented. Open it.
2. **The template describes itself** – a short `AGENTS.md`, plus `ARCHITECTURE.md` and `docs/`.
3. **Workflows are skills** – `.agents/skills/*/SKILL.md`. Open `noc-screen/SKILL.md`: a description that says
   *when* it applies, then the steps the platform team trusts.

## 3. Ask the agent what it got

```text
Which skills are available in this project? For each one, explain in one or two sentences what it does,
when it activates and which other skills it uses. Read their SKILL.md files instead of guessing. Don't
change any files.
```

## 4. How skills are shared beyond one repository

Here the skills live in the project, so cloning is the whole setup. A platform team with many applications
publishes them once instead:

| Agent | Distribution |
|---|---|
| GitHub Copilot CLI | Plugin marketplace – a Git repo with `marketplace.json`; `copilot plugin marketplace add <repo>`, `copilot plugin install <plugin>@<marketplace>` |
| Claude Code | The same plugin format – `/plugin marketplace add <repo>`, `/plugin install …` |
| Codex, Cursor, OpenCode, … | [`npx skills add <repo-url>`](https://github.com/vercel-labs/skills) copies skills into the agent's folder |

The format underneath is the open [Agent Skills](https://agentskills.io) standard – one `SKILL.md` works in
every agent. Plugins can also carry **subagents**, e.g. a docs researcher that reads in its own context, or a
read-only design reviewer.

[Overview](README.md) | [Next: Understand and plan](02-understand-and-plan.md)
