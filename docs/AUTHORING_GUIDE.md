# Authoring Guide — data schemas

All content is plain JavaScript in `src/data/*.js`. Each file declares one or two top-level `const`s that the app reads as globals after the build concatenates them. Files are loaded in filename order (numeric prefixes).

After any edit: `npm run validate && npm run build`.

---

## Topics

A topic is one study unit. It appears in Overview, Flashcards, Quiz, and Reference automatically.

- Cardiology topics live in `01-cardiology.js` → `const TOPICS = [ … ]`
- Rheumatology topics live in `03-rheumatology.js` → `const RHEUM_TOPICS = [ … ]`
- Additional rheumatology topics live in `04-rheumatology-extra.js` → `const RHEUM_EXTRA_TOPICS = [ … ]`

```js
{
  id: "rheum-gout",                 // unique, kebab-case, stable (used as a key)
  name: "Gout & Crystal Arthritis", // shown on cards and dropdowns
  blurb: "Uric acid, flares, tophi, allopurinol vs colchicine, CPPD.", // one line
  flashcards: [
    { front: "Crystal-induced arthritis — cause",
      back:  "Serum uric acid above the solubility threshold → crystal formation. Most patients have impaired clearance; a minority overproduce." },
    // …
  ],
  quiz: [
    { q: "Allopurinol lowers urate by inhibiting:",
      options: ["COX-2", "Xanthine oxidase", "PAD enzyme", "IL-1"],
      answer: 1,                    // 0-based index of the correct option
      explain: "Allopurinol inhibits xanthine oxidase, reducing urate production." },
    // …
  ]
}
```

Rules:
- `id` must be unique across **all** topic arrays.
- `answer` is a 0-based index; it must point at a real option.
- Every quiz item should have an `explain`. Every flashcard needs `front` and `back`.

### Optional: image-bearing quiz items

A quiz item may include `img` (a data URI or URL) and `imgCaption` (a short caption string) to show an image above the answer options — used for "identify the finding" style questions (see `src/data/11-radiology.js` for examples). Keep embedded images as small, tightly-cropped, compressed JPEGs (base64 data URIs) in their own numerically-earlier data file (e.g. `11-radiology-images.js`, which sorts before `11-radiology.js`) so the image constants are defined before the topic file references them — the app has no bundler, so load order is plain filename order. Only use real or clearly-sourced illustrative images; note any provenance uncertainty in the PR description per CLAUDE.md.

### Deprecated: `caseQ`

Some older quiz items carry `caseQ: true`. This field previously marked a question for the old Cases-tab vignette-quiz walkthrough. **The Cases tab no longer reads this field** — it now shows `DIAGNOSTIC_TREES` (see below). `caseQ: true` still appears on existing quiz items but is inert; don't add it to new questions.

---

## Diagnostic trees (the "Cases" tab)

The Cases tab is a single interactive mode: **"walk the workup yourself."** The user answers one
test/finding at a time; each answer adds a new step to the right, building a visible left-to-right
path down to a specific diagnosis and its treatment (e.g. ACS: "ST elevation on ECG?" → yes → STEMI
→ PCI; no → "troponin elevated?" → …). Clicking an option in an *earlier* step re-branches the path
from there (everything after it is replaced) — there's no separate "back" action. This is **not a
quiz** — there are no distractors.

A nav sidebar (searchable, grouped by chapter → disease `group`) lists every tree so it stays
navigable as more are added — pick one to start it. Text is deliberately terse: `treatment`/`notes`
are short bullet fragments (3–6 words each where possible), not sentences, since each card is read
at a glance mid-flow.

- Trees live in `26-diagnostic-trees.js` → `const DIAGNOSTIC_TREES = [ … ]`

Each tree is `{ id, chapter, group, name, root }`, where `root` is a **node**. A node is either a
decision node (a test/finding with 2+ possible answers) or a leaf (a diagnosis + its treatment):

```js
{
  id: "dtree-wct",             // unique, kebab-case, stable
  chapter: "Cardiology",       // an existing app chapter
  group: "Arrhythmia",         // groups related trees in the nav sidebar (system → subject)
  name: "Wide Complex Tachycardia", // shown as the nav entry / detail header
  root: {
    q: "Hemodynamically unstable?",
    options: [
      { label: "Yes", next: { leaf: true, diagnosis: "Unstable WCT", treatment: ["Synchronized cardioversion"] } },
      { label: "No", next: {
        q: "Prior MI or cardiomyopathy?",
        options: [
          { label: "Yes", next: { leaf: true, diagnosis: "Treat as VT until proven otherwise", treatment: ["Antiarrhythmic (amiodarone/procainamide)", "Expert evaluation"] } },
          { label: "No",  next: { leaf: true, diagnosis: "Stable monomorphic VT (default)", treatment: ["Antiarrhythmic (amiodarone/procainamide)", "Expert evaluation"] } }
        ]
      } }
    ]
  }
}
```

A decision node can also carry an optional `clues` array — short tags shown as chips under the
question, for a finding with several recognizable features (see `dtree-syncope`'s root: `clues:
["Exertional syncope", "Syncope while supine", "No prodrome", …]`), instead of stuffing them all into
the `q` sentence itself.

Rules:
- `id` must be unique across `DIAGNOSTIC_TREES`.
- `chapter` must be one of the app's existing chapters (same `KNOWN_CHAPTERS` list `validate.js` checks Past Exams against).
- `group` is purely for nav organization (mirrors the disease-family groupings used elsewhere in the app, e.g. `"Acute Coronary Syndrome"`, `"Heart Failure"`, `"Pulmonary Embolism"`) — pick an existing group when a new tree belongs with others, or introduce a new group name for a new disease family.
- A decision node has `q` (the test/finding, phrased as a short question), an optional `clues` array (short recognition tags, not full sentences), and `options` (2+ items, each `{label, next}`); `next` is itself a node (nested arbitrarily deep).
- A leaf node has `leaf: true`, `diagnosis`, a `treatment` array (short bullet fragments, most important first), and an optional `notes` array (short escalation/caveat bullets, e.g. "Shock → urgent PCI + IABP/Impella + pressors" — a good place for a related complication or cross-cutting rule, like anticoagulation choice, that doesn't need its own branch point).
- Keep every bullet short — a few words, not a clause-laden sentence.
- Order branches the way a clinician would actually sequence the workup (most specific/urgent test first), not alphabetically. When a disease group's topics form a real differential (e.g. STEMI vs NSTEMI vs unstable angina), branch on the test/finding that actually separates them; when a group is really one disease staged by severity/risk (e.g. aortic stenosis), branch on the situational factors that change management instead.
- Ground every question, clue, and leaf bullet in an actual source (lecture material, or a previously-reviewed PR) — never invent a diagnostic threshold, dose, or recommendation.
- `validate.js` walks the tree recursively and checks: unique tree ids, required `chapter` (must be a known chapter) / `group` / `name`, every decision node has `q` + 2+ labeled options (+ non-empty `clues` array if present), every leaf has `diagnosis` + a non-empty `treatment` array (+ non-empty `notes` array if present).

---

## Extra-quiz maps

A convenient way to add questions to an existing topic without editing the topic object. Keyed by topic `id`.

- `02-cardiology-extra-quiz.js` → `const EXTRA_CARDIO_QUIZ = { … }` (keys are cardiology topic ids)
- `04-rheumatology-extra.js` → `const EXTRA_RHEUM_QUIZ = { … }` (keys are rheumatology topic ids)

```js
const EXTRA_RHEUM_QUIZ = {
  "rheum-gout": [
    { q: "Which urate-lowering agent can be used in CKD because it is bile-cleared?",
      options: ["Allopurinol", "Febuxostat", "Probenecid", "Losartan"],
      answer: 1,
      explain: "Febuxostat is bile-eliminated and usable in renal impairment." }
  ]
};
```

The build merges these into the matching topic's `quiz` at load time. `validate.js` errors if a key isn't a real topic id.

---

## Past exams

A **Past Exams** array holds one or more full historical exams, shown as-is in their original language (right-to-left where applicable), distinct from the topic/quiz system: no flashcards, no fabricated `explain` text (only transcribe a rationale if the source actually provides one — most exam answer keys don't), and each question carries a `chapter` tag from the app's existing chapter list rather than living inside a specific topic.

- Exams live in `21-past-exams.js` → `const PAST_EXAMS = [ … ]`
- Any embedded images (ECGs, photos, gram stains, etc.) live in an earlier-sorting file, `20-past-exam-images.js` → `const PAST_EXAM_IMAGES = { … }`, following the same image-file-loads-before-data-file convention as `11-radiology-images.js`.

```js
const PAST_EXAMS = [
{
  id: "im-2024-01-moed-a",           // unique, kebab-case, stable
  name: "פנימית יק\"ר — מועד א' תשפ\"ד", // shown in the exam picker
  dateLabel: "24.1.24",
  source: "One-line provenance note — cite the source file/reconstruction status",
  timeLimitMin: 210,                 // informational only; the app times elapsed, it does not enforce a countdown
  questions: [
    { num: 1,                        // sequential, 1-based, unique within the exam
      stem: "...",                   // verbatim from the source, original language
      options: ["...", "...", "...", "..."], // verbatim, original order (2-5 items)
      answer: 2,                     // 0-based index — must come from the source's own marked/confirmed key, never inferred from general knowledge
      chapter: "Cardiology",         // must be one of the app's existing CHAPTERS values (see src/shell.html's ASSEMBLE CHAPTERS block) — a first-pass classification, editable in-app
      img: PAST_EXAM_IMAGES.q1ecg,   // optional
      imgCaption: "אק\"ג" }          // optional, required if img is set
    // …
  ]
}
];
```

Rules:
- **Never infer the correct answer from clinical knowledge alone.** If a source doesn't clearly mark which option is correct (e.g. ambiguous or missing highlighting), don't guess — ask the human for a reliable answer key rather than fabricating one, per CLAUDE.md's sourcing rule.
- No `explain` field — the in-app UI shows only which option was correct, since inventing a rationale the source doesn't provide would violate CLAUDE.md's "don't invent facts" rule. If a future source *does* include real rationale text, it's fine to add an `explain` field and update the renderer to show it.
- `chapter` must match an existing chapter exactly (case-sensitive) — it's the same taxonomy already used across `TOPICS`/`RHEUM_TOPICS`/etc., not a new one. The in-app subject-tag dropdown on each question lets the user correct a wrong classification; corrections are stored client-side (`progress.examTagOverrides`) and exportable via the results screen's "Copy corrections" button, for a human to fold back into this file in a later PR.
- Preserve source anomalies (a missing option letter, a duplicated/ambiguous highlight) rather than silently fixing them — flag them in the PR/CHANGELOG instead.

`validate.js` checks: unique sequential-looking `num`s, 2-5 options, `answer` in range, and `chapter` against the known chapter list.

---

## Drugs

`05-drugs.js` → `const DRUGS = { Chapter: [ group, … ] }`.

```js
const DRUGS = {
  "Rheumatology": [
    {
      group: "Urate-lowering (gout)",
      items: [
        { name: "Allopurinol",
          cls:  "Xanthine oxidase inhibitor",
          moa:  "Blocks purine metabolism → less urate; stable metabolites excreted renally.",
          ind:  "Urate-lowering therapy; prevents flares, stones, tophi.",
          contra: "Rash, marrow suppression; give with colchicine for the first 6 months." },
        // …
      ]
    }
  ]
};
```

Fields: `name`, `cls` (class), `moa`, `ind` (indications/uses), `contra` (cautions/contraindications; use `"—"` or omit if none). Chapter keys should match the chapter names used by topics (`"Cardiology"`, `"Rheumatology"`).

---

## Classifications

`06-classifications.js` → `const CLASSIFICATIONS = { Chapter: [ subject, … ] }`.

```js
const CLASSIFICATIONS = {
  "Rheumatology": [
    {
      subject: "Vasculitis",
      schemes: [
        { title: "By vessel size",
          rows: [
            { label: "Large vessel",  detail: "Aorta & main branches — GCA, Takayasu." },
            { label: "Medium vessel", detail: "Renal/abdominal arteries — PAN." },
            { label: "Small vessel",  detail: "Arterioles/venules — ANCA & immune-complex." }
          ] },
        // more schemes for the same subject …
      ]
    }
  ]
};
```

A subject can hold several schemes (e.g. "By vessel size" and "ANCA subtypes"). Each scheme is a titled list of `{label, detail}` rows.

---

## String-escaping tip

Data is embedded in a `<script>` in one HTML file. Inside a double-quoted JS string, use single quotes for any inner quoting:

```js
back: "Biphasic T waves in V2–V3 — 'Wellens syndrome' — signal critical LAD stenosis."
```

Avoid an unescaped `</script>` sequence anywhere in the data (unlikely, but it would end the script tag). `validate.js` will still parse-check everything.
