# Content Workflow — from a lecture to a reviewed pull request

This is the safe pipeline for growing the study material with Claude Code. The guiding principle: **the agent drafts, a human approves.** Medical content never reaches `main` without review.

```
   ┌────────────┐   ┌───────────────┐   ┌──────────────┐   ┌───────────────┐   ┌────────┐
   │ 1. Add a   │──▶│ 2. Agent      │──▶│ 3. Validate  │──▶│ 4. Open a PR  │──▶│ 5. Human│
   │  source    │   │  drafts cards │   │  (structure) │   │  (with notes) │   │  review │──▶ merge
   └────────────┘   └───────────────┘   └──────────────┘   └───────────────┘   └────────┘
```

## 1. Add a source

Put the lecture file in `sources/` (create it if missing): `sources/nephrology-lecture.pdf`, `sources/gout-update.docx`, etc. Anything the agent can read — PDF, DOCX, Markdown, or pasted text.

## 2. Ask the agent to draft

Open Claude Code in the repo and use one of the templates in `docs/prompts/`. For example:

> Read `sources/gout-update.docx`. Add new quiz questions to the `rheum-gout` topic covering material not already in the question bank. Follow CLAUDE.md and the schema in docs/AUTHORING_GUIDE.md. Do not invent anything not in the source.

The agent will:
- Read the source and the existing data for that topic (to avoid duplicates).
- Add items to the appropriate data file.
- Note anywhere it was uncertain or had to extrapolate.

## 3. Validate

The agent runs (or you run):

```bash
npm run check     # validate structure, then build
```

`validate.js` catches structural problems — out-of-range answer indices, duplicate ids, extra-quiz keys that don't match a topic, malformed drug/classification entries. **It does not check medical correctness.** That's step 5.

## 4. Open a pull request

The agent commits to a branch and opens a PR. A good PR description includes:

- **What was added** — e.g. "6 quiz questions + 3 flashcards to `rheum-gout`."
- **Source** — which file/lecture it came from.
- **Needs reviewer attention** — anything ambiguous, extrapolated, or dose/threshold-related. If nothing, say "none."

Never merge to `main` directly. Never enable auto-merge for content PRs.

## 5. Human review (the important step)

A reviewer — ideally someone with clinical/subject knowledge — checks each new item against the source and against their own knowledge:

- Is the stated fact correct and unambiguous?
- Is there exactly one defensible correct answer?
- Are doses, thresholds, and antibody/drug associations right?
- Does the explanation actually justify the answer?

Approve and merge, or request changes. On merge, CI rebuilds `dist/` and (if Pages is enabled) redeploys.

---

## Optional: scheduled drafting

If you want the "keeps updating" behaviour, do it as *scheduled drafting into PRs*, never scheduled publishing. For example, a GitHub Action (or a local cron running Claude Code) that once a week:

1. picks a topic with the fewest questions,
2. drafts a handful of new questions from existing repo content or a designated source,
3. opens a PR for human review.

This keeps the bank growing while preserving the human gate. A starter workflow is sketched in `.github/workflows/draft-questions.yml.example` — rename and wire up your own Claude Code invocation and credentials to enable it. It is intentionally left disabled.

## Guardrails recap

- Draft in a branch, open a PR, human approves. Always.
- Ground everything in the supplied source; flag extrapolation.
- Extra care on doses and contraindications.
- One unambiguous correct answer per question.
- `npm run validate` must pass before review.
