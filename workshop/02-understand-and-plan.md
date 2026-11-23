```text
+==[ NIGHT OF AGENTS // MODULE 02 ]==========[ SPEC: READ ]==[ GAPS: FOUND ]==[ PLAN: 3 STEPS ]==+

███████╗██████╗ ███████╗ ██████╗
██╔════╝██╔══██╗██╔════╝██╔════╝
███████╗██████╔╝█████╗  ██║
╚════██║██╔═══╝ ██╔══╝  ██║
███████║██║     ███████╗╚██████╗
╚══════╝╚═╝     ╚══════╝ ╚═════╝
    ██████╗ ██╗      █████╗ ███╗   ██╗
    ██╔══██╗██║     ██╔══██╗████╗  ██║
    ██████╔╝██║     ███████║██╔██╗ ██║
    ██╔═══╝ ██║     ██╔══██║██║╚██╗██║
    ██║     ███████╗██║  ██║██║ ╚████║
    ╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝

+==[ TEN MINUTES OF READING SAVE AN HOUR OF REWRITING. ]=============[ SESSION 02 // NO CODE YET ]+
```

# 02 · Understand and plan

**Time:** 18:10 – 18:20 · [Previous: The NoC platform](01-platform-and-skills.md) | [Overview](../README.md) | [Glossary](glossary.md) | [Next: Build](03-build.md)

## 1. The ticket

**PROG-12 – Programme management** in `../specification/programme/`: an overview with acceptance criteria
(`README.md`), the list screen (`01-programme-list.md`), the detail screen (`02-session-detail.md`), mockups
and the OpenAPI contract. Today you build the API layer and the **list**; the detail is homework.

## 2. Read, compare, question

```text
We are going to build the feature specified in ../specification/programme/. Don't code yet. Read all files, including
the mockup images and the OpenAPI contract, then:
1. summarize the list screen in your own words – data, filters, states, what survives navigation;
2. list every difference between mockups/01-programme-list.png and 01-programme-list.md;
3. list anything ambiguous or missing for an implementation in this app, with a proposed default.
```

Check the answer:

- Filters and page live **in the URL**; filters apply automatically – the mockup's **Search** button
  contradicts the spec, and the spec wins (NFR-5).
- `New session` is out of scope but **visible and disabled** with the tooltip `Coming soon`.
- Loading, empty and error states are specified but not drawn.

Accept the defaults you agree with in one message, so they stay in the session:

```text
Accept your proposed defaults, except: <number> – <decision>. Remember them for the whole implementation.
```

## 3. Plan

Switch to plan mode if your agent has one (Copilot CLI, Claude Code: `Shift+Tab`):

```text
Plan the implementation in three steps: 1. API layer – the Programme API generated from the contract and
mocks for all operations, with every test-data case of the specification; 2. the list screen;
3. verification of the list's acceptance criteria. For each step name the files, the skill you will use and
how to verify it. Don't implement anything yet.
```

Review it like a teammate's plan: does every step end with a check you can run? Does it use the skills
(`noc-api`, `noc-screen`) instead of hand-writing what they do? Does it add dependencies (`AGENTS.md`
forbids that)?

[Previous: The NoC platform](01-platform-and-skills.md) | [Overview](../README.md) | [Next: Build](03-build.md)
