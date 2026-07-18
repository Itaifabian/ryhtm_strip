# Prompt — add questions to an existing topic

Copy, fill in the blanks, and paste into Claude Code (run from the repo root).

---

Read `sources/<FILE>` (or use the content already in the repo for the topic below).

Add **<N> new quiz questions**<, and optionally new flashcards,> to the topic with id **`<TOPIC-ID>`**.

Requirements:
- Follow `CLAUDE.md` and the schema in `docs/AUTHORING_GUIDE.md`.
- First read the topic's existing `flashcards` and `quiz` so you don't duplicate content.
- Add questions either to the topic's `quiz` array or to the matching extra-quiz map (`EXTRA_CARDIO_QUIZ` / `EXTRA_RHEUM_QUIZ`) — whichever keeps the diff clean.
- Ground every question in the source. Do not introduce facts, doses, or thresholds that aren't in it. If you extrapolate, note it.
- One unambiguous correct answer per question; plausible distractors; a one-sentence explanation each.
- Run `npm run validate` and fix any errors.
- Open a pull request. In the description, list what you added, cite the source, and add a "Needs reviewer attention" section (write "none" if nothing).

Do not merge. Do not push to `main`.
