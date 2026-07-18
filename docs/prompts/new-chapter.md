# Prompt — add a new topic (or chapter) from a lecture

Copy, fill in the blanks, and paste into Claude Code (run from the repo root).

## New topic in an existing chapter

Read `sources/<FILE>`.

Create a **new topic** in the **<Cardiology|Rheumatology>** chapter covering **<SUBJECT>**.

Requirements:
- Add the topic object to the correct array: `TOPICS` (cardiology) or `RHEUM_TOPICS` / `RHEUM_EXTRA_TOPICS` (rheumatology). Give it a unique kebab-case `id`.
- Include a concise `blurb`, a solid set of `flashcards` (high-yield recall prompts), and a `quiz` (4 options each, one correct, short explanations).
- Ground everything strictly in the source; flag anything you extrapolate.
- Follow `CLAUDE.md` and `docs/AUTHORING_GUIDE.md`.
- Run `npm run check`. Fix any validation errors.
- Open a PR with a summary, the source citation, and a "Needs reviewer attention" section.

Do not merge. Do not push to `main`.

## A whole new chapter (e.g. Nephrology)

Additional steps beyond the above:
- Create a new data file `src/data/07-<chapter>.js` declaring `const <CHAPTER>_TOPICS = [ … ]` with your topics.
- In `src/shell.html`, extend the **ASSEMBLE CHAPTERS** block: tag those topics with `t.chapter='<Chapter>'` and push them into `TOPICS` (mirror how `RHEUM_TOPICS` is handled).
- Optionally add matching entries to `DRUGS` and `CLASSIFICATIONS` under the new chapter key.
- Build, verify the new chapter appears in Overview / Flashcards / Quiz / Reference, then open the PR.

If any shell change is unclear, ask before editing `src/shell.html`.
