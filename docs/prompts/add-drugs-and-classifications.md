# Prompt — add drugs and classification schemes

Copy, fill in the blanks, and paste into Claude Code (run from the repo root).

## Add drug entries

Read `sources/<FILE>`.

Add the drugs it covers to `src/data/05-drugs.js` under the **<Cardiology|Rheumatology>** chapter, in the appropriate `group` (or a new group if none fits).

For each drug provide: `name`, `cls` (class), `moa` (mechanism), `ind` (indications/uses), `contra` (key cautions/contraindications).

- Ground every field in the source. For doses/thresholds, quote the source's figure; if it gives none, write the qualitative statement rather than inventing a number.
- Preserve the Drugs view's "confirm against a formulary" disclaimer.
- Follow `CLAUDE.md` and `docs/AUTHORING_GUIDE.md`.
- Run `npm run check`, then open a PR (summary + source + "Needs reviewer attention").

Do not merge. Do not push to `main`.

## Add classification schemes

Read `sources/<FILE>`.

Add disease-classification schemes to `src/data/06-classifications.js` under the **<Cardiology|Rheumatology>** chapter for the subject **<SUBJECT>**.

- A subject holds one or more `schemes`; each scheme is a `title` plus `rows` of `{label, detail}`.
- Keep entries high-level and faithful to the source.
- Run `npm run check`, then open a PR with the usual notes.

Do not merge. Do not push to `main`.
