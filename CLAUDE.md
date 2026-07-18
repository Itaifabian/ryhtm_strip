# CLAUDE.md — operating manual for this repository

This file tells Claude Code how to work in the Rhythm Strip project. Read it fully before making changes.

## What this project is

A single-file, offline-capable study web app covering **cardiology**, **rheumatology**, **pulmonology**, **infectious diseases**, **allergy & immunology**, **geriatrics**, and **radiology**. It has nine views: Overview, Progress, Flashcards, Quiz, Reference, Drugs, Classification, Compare, and AI Studio. All content lives in plain-JS data files under `src/data/`. A build step concatenates them into `src/shell.html` to produce `dist/index.html`.

Progress (flashcard mastery, quiz stats) lives in the browser's `localStorage`, keyed to the origin/URL the app is loaded from — rebuilding `dist/index.html` does NOT clear it as long as the user keeps loading it from the same URL. It's lost if they switch access method (e.g. `file://` vs `http://localhost:8080` vs a deployed URL — each is a separate storage bucket), clear browser data, or switch browsers/devices. The Progress tab's "Back up your progress" section (export/import to a `.json` file) is the safety net for that — point users there rather than promising storage guarantees the browser doesn't provide.

The core app has **no framework and no runtime dependency**. Keep it that way unless the human explicitly asks otherwise. The one exception is the optional **AI Studio** tab: its PDF/Word text-extraction endpoint (in `scripts/serve.js`) uses two devDependencies (`pdf-parse`, `mammoth`), and its question-generation endpoint calls the Claude API when `ANTHROPIC_API_KEY` is set. Neither is required for the rest of the app.

## Repository map

```
src/
  shell.html              App template (HTML/CSS/JS). Contains the /*__DATA__*/ marker.
  data/
    01-cardiology.js         const TOPICS               (cardiology topics)
    02-cardiology-extra-quiz.js  const EXTRA_CARDIO_QUIZ (extra Qs keyed by topic id)
    03-rheumatology.js       const RHEUM_TOPICS         (rheumatology topics)
    04-rheumatology-extra.js const RHEUM_EXTRA_TOPICS + const EXTRA_RHEUM_QUIZ
    05-drugs.js              const DRUGS                (drug reference)
    06-classifications.js    const CLASSIFICATIONS      (disease-classification maps)
    07-pulmonology.js        const PULM_TOPICS          (pulmonology topics)
    08-infectious-diseases.js const ID_TOPICS           (infectious diseases topics)
    09-allergy-immunology.js const ALLERGY_TOPICS       (allergy & immunology topics)
    10-geriatrics.js         const GERIATRIC_TOPICS     (geriatrics topics)
    11-radiology-images.js  const RADIOLOGY_IMAGES     (embedded base64 images for radiology quiz items; loads before 11-radiology.js)
    11-radiology.js          const RADIOLOGY_TOPICS     (radiology topics)
scripts/
  build.js       Assembles dist/index.html
  validate.js    Structural integrity gate (run before every PR) — must know about every
                 topic array (TOPICS/RHEUM_TOPICS/RHEUM_EXTRA_TOPICS/PULM_TOPICS/ID_TOPICS/ALLERGY_TOPICS/GERIATRIC_TOPICS/...);
                 when adding a new chapter's topic array, add a matching countTopics(...) call here.
  serve.js       Local preview server + AI Studio's /api/generate and /api/extract-text
docs/
  AUTHORING_GUIDE.md    Data schemas with examples
  CONTENT_WORKFLOW.md   The "drop a lecture → reviewed PR" flow
  prompts/              Copy-paste prompt templates
dist/index.html         Built output (do not hand-edit)
```

## Commands

- `npm run validate` — structural check (must pass before any PR).
- `npm run build` — regenerate `dist/index.html`.
- `npm run check` — validate then build.
- `npm run dev` — build and serve at http://localhost:8080.

Always run `npm run check` after editing data and before committing.

## ⚠️ Medical-content safety rules — non-negotiable

This app is a **study aid**, not a clinical reference. Wrong facts here can mislead a student on an exam or, worse, in practice. Therefore:

1. **Never auto-merge medical content.** Every change to `src/data/**` must land through a pull request that a human reviews and approves. Do not push to `main` directly. Do not enable auto-merge for content PRs.
2. **Ground every card in the provided source.** When generating questions/flashcards/drugs/classifications, use only the lecture material the human supplied (or content already in the repo). Do not invent facts, doses, thresholds, or antibody associations from general memory. If the source doesn't state it, don't assert it.
3. **Flag uncertainty, don't paper over it.** If a source is ambiguous, contradictory, or you're extrapolating, say so explicitly in the PR description under a "Needs reviewer attention" heading. Never silently guess.
4. **Doses and contraindications get extra care.** Prefer to quote the source's exact figure. If the source gives no number, write the qualitative statement rather than inventing a value. The Drugs view already carries a "confirm against a formulary" disclaimer — preserve it.
5. **One correct answer per quiz item.** Make distractors plausible but unambiguously wrong per the source. Avoid "all of the above", trick negatives, and two-defensible-answers questions.
6. **No patient data, ever.** This repo contains only general medical education content.
7. **Preserve existing correct content.** When asked for "more questions", add to the arrays — don't rewrite or delete existing items unless the human points out an error.

If a request would violate these rules, stop and ask the human rather than proceeding.

## How to add content (mechanics)

### More quiz questions for an existing topic
Append objects to that topic's `quiz` array (in `01-cardiology.js` / `03-rheumatology.js`), **or** add them to the extra-quiz map keyed by the topic `id` (`02-…` / `04-…`). Either works; the build merges the extra maps into their topics at load.

### A new topic
Add a topic object to `TOPICS` (cardiology), `RHEUM_TOPICS`, or `RHEUM_EXTRA_TOPICS` (rheumatology). Give it a unique `id`. The app auto-places it in the correct chapter and it appears everywhere (Overview, Flashcards, Quiz, Reference) with no shell edits.

### A whole new chapter
Chapters are derived from each topic's `chapter` field, which the shell assigns during assembly (`'Cardiology'` / `'Rheumatology'` / `'Pulmonology'` / `'Infectious Diseases'` / `'Allergy & Immunology'` / `'Geriatrics'`). To add another chapter (e.g. "Nephrology"): create `src/data/11-nephrology.js` declaring `const NEPHRO_TOPICS = [...]`, then in `src/shell.html` extend the ASSEMBLE CHAPTERS block to tag those topics with `t.chapter='Nephrology'` and push them into `TOPICS` — follow the `GERIATRIC_TOPICS` block there as the pattern. Also add `countTopics(S.NEPHRO_TOPICS, 'NEPHRO_TOPICS')` to `scripts/validate.js`, or the new chapter's structure silently goes unchecked. Keep the same topic schema. Ask the human before introducing shell changes if unsure.

### Quiz item `ref` field (optional)

A quiz item may include `ref: <index>` — a 0-based index into that same topic's own `flashcards` array, pointing at the flashcard that best supports the answer. The Quiz tab's "View in Reference" link uses it to deep-link straight to that flashcard (highlighted) in the Reference tab; if `ref` is omitted, the app falls back to a client-side keyword-overlap match against the topic's flashcards. When authoring new quiz items, set `ref` explicitly whenever a specific flashcard clearly grounds the answer — it's cheap to add while writing the content and gives a precise link instead of a best-effort guess.

### Drugs / classifications
Add entries to `DRUGS` / `CLASSIFICATIONS` under the right chapter key, following the schema in `docs/AUTHORING_GUIDE.md`.

## Data schemas (quick reference — full examples in AUTHORING_GUIDE.md)

```js
// Topic
{ id:"kebab-case-unique", name:"Display Name", blurb:"one line for the card",
  flashcards:[ {front:"prompt", back:"answer"} , … ],
  quiz:[ {q:"stem", options:["A","B","C","D"], answer:2, explain:"why", ref:0} , … ] } // ref is optional — see "Quiz item ref field" below

// Extra-quiz map (keyed by an existing topic id)
{ "topic-id": [ {q,options,answer,explain,ref}, … ] }

// Drug (under DRUGS[chapter] → group.items[])
{ name:"", cls:"class", moa:"mechanism", ind:"indications", contra:"cautions/contraindications" }

// Classification (under CLASSIFICATIONS[chapter])
{ subject:"", schemes:[ {title:"", rows:[ {label:"", detail:""}, … ]} , … ] }
```

## Style conventions

- Answers/explanations are concise and specific. Prefer the source's own terminology.
- Use straight quotes inside JS strings; avoid an unescaped `"` inside a double-quoted string (use single quotes for inner quoting, e.g. `'Wellens syndrome'`).
- Keep flashcard fronts as genuine recall prompts, not statements.
- Match the register of existing content; don't introduce emoji or informal tone.
- Numeric-prefix new data files so build order stays deterministic.

## Definition of done for a content PR

1. `npm run validate` passes with no errors.
2. `npm run build` succeeds.
3. PR description lists what was added, cites the source lecture/file, and has a "Needs reviewer attention" section (even if it just says "none").
4. No edits to `main` without human approval.
