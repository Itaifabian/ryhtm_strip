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

### Optional: `caseQ` (Cases tab eligibility)

A quiz item may include `caseQ: true` to mark it as a **case question** for the Cases tab — a clinical vignette that asks either which drug to use, or an important feature of the relevant drug (e.g. a toxicity, a contraindication, a pharmacokinetic quirk). This is a small, deliberately curated subset: most quiz items (definitional questions, non-drug management questions, "which lab/imaging finding" questions) should NOT be tagged. When authoring a new vignette question that fits this pattern, add `caseQ: true`; otherwise omit the field entirely (it defaults to not shown in Cases).

```js
{ q: "A patient with MRSA pneumonia needs treatment. Which agent should specifically be AVOIDED for this indication despite covering MRSA well in other infections?",
  options: ["Vancomycin", "Linezolid", "Daptomycin", "Ceftaroline"],
  answer: 2,
  explain: "Daptomycin is inactivated by pulmonary surfactant and should never be used for pneumonia.",
  caseQ: true }
```

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
