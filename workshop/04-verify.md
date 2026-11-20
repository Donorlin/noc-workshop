```text
+==[ NIGHT OF AGENTS // MODULE 04 ]===[ AC: CHECKING ]==[ EVIDENCE: CITED ]==[ HUMAN: DECIDES ]==+

██╗   ██╗███████╗██████╗ ██╗███████╗██╗   ██╗
██║   ██║██╔════╝██╔══██╗██║██╔════╝╚██╗ ██╔╝
██║   ██║█████╗  ██████╔╝██║█████╗   ╚████╔╝
╚██╗ ██╔╝██╔══╝  ██╔══██╗██║██╔══╝    ╚██╔╝
 ╚████╔╝ ███████╗██║  ██║██║██║        ██║
  ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝

+==[ DONE MEANS ACCEPTED, NOT GENERATED. ]====================================[ SESSION 04 // END ]+
```

# 04 · Verify

**Time:** 50–60 minutes · [Previous](03-build.md) | [Overview](../README.md)

## 1. Generated is not done

```text
Continue with step three. Report each acceptance criterion of the list screen as met, not met or cannot
verify, citing the file and line or the browser check that proves it. Don't change code.
```

- **Met** without a citation is a claim, not evidence.
- **Cannot verify** is honest: `NFR-4` (search within 1 second) needs the production backend.
- Pick one criterion marked met and check it yourself. Fix anything not met with one focused prompt per
  criterion: `AC-05 is not met: … Fix it and show me the diff.`

## 2. Take it home

1. **Homework – the detail screen.** `Build the session detail screen from ../specification/programme/02-session-detail.md.`
   It adds dependent requests (session, then its speakers), a partial failure (`/programme/s-ai-agents`) and
   a 404 (`/programme/does-not-exist`). Compare with `git diff solution`.
2. **For your own platform:**

| Ingredient | Here | For you |
|---|---|---|
| Docs an agent can read | MDX + `llms.txt` next to the library source | Ship docs with the library, versioned, indexed |
| An opinionated API | `DataTable`, `useLiveFilters`, `disabledReason` | Encode decisions in components, not wiki pages |
| Patterns, not only components | `docs/patterns/list-screen.mdx` | Document how screens are built and where state lives |
| A self-describing template | `AGENTS.md`, `ARCHITECTURE.md`, `docs/` | Short always-on rules, longer docs linked |
| Workflows as skills | `noc-api`, `noc-screen` | One skill per repeated workflow; share via a marketplace |
| A human in the loop | spec, plan review, acceptance criteria | Keep the decisions with people |

[Previous](03-build.md) | [Overview](../README.md)
