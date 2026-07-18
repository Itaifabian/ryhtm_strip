# Rhythm Strip

An active-recall study platform for **cardiology**, **rheumatology**, **pulmonology**, **infectious diseases**, **allergy & immunology**, **geriatrics**, and **radiology**, built as a single self-contained HTML file. Flashcards, question banks, a drug reference (MOA / indications / cautions), and disease-classification maps — all generated from lecture summaries.

<p align="center"><em>Built with Claude Code. Content is a study aid, not a clinical reference.</em></p>

## Features

- **Flashcards** with flip, shuffle, a Leitner-style spaced-repetition schedule (Again/Good/Easy → 1/3/7/16/35/90-day intervals), "due only" filtering, and per-device mastery tracking
- **Quiz** with instant feedback, explanations, per-topic scoring, chapter/topic filters, a cross-chapter custom-mix generator, and priority ordering (new → wrong → low-confidence questions surface first)
- **Progress** — mastery and quiz accuracy per chapter and per topic, with a "quiz weakest topics" shortcut, plus a one-click **export/import backup** (`.json`) since progress lives in this browser's local storage — see "Backing up your progress" below
- **Flag for review** — tag any quiz question or flashcard with an optional note (wrong, unclear, worth double-checking); flagged items collect in a Progress-tab queue you can review, remove, or export — a hand-off point for a future content-review pass
- **Reference** — searchable index of every fact
- Select quiz questions include an embedded reference image (radiograph, CT, mammogram, or ultrasound) alongside the question
- **Drugs** — mechanism, indications, and key cautions, grouped pharmacologically
- **Classification** — high-level disease-classification schemes per subject
- **Compare** — side-by-side infographic comparison of drugs, or of topics' flashcards
- **AI Studio** — paste or upload reference text (.txt/.md/.pdf/.docx), draft flashcards or quiz questions with Claude, review and export a paste-ready snippet for a reviewed PR (see below)
- The core app (everything but AI Studio) works offline as a single dependency-free file; progress is stored locally in the browser
- **Installable on iPhone/iPad**, full-screen and fully offline after the first visit — see "Installing on iPhone/iPad" below

## Quickstart

```bash
git clone <your-repo-url> rhythm-strip
cd rhythm-strip
npm run dev        # builds and serves at http://localhost:8080
```

Core app scripts (build/validate/serve) use only Node's standard library — no install needed for those. `npm install` is only required to enable **AI Studio's** PDF/Word upload, which uses two small devDependencies (`pdf-parse`, `mammoth`) for text extraction — see below.

Other commands:

```bash
npm run build      # regenerate dist/index.html
npm run validate   # structural integrity check on the content
npm run check      # validate + build
```

Open `dist/index.html` directly in a browser if you don't want the dev server.

## How it's structured

Content lives in plain-JS data files under `src/data/`. `scripts/build.js` concatenates them into `src/shell.html` (at a `/*__DATA__*/` marker) to produce `dist/index.html`. Adding a topic or question means editing a data file — no framework, no shell changes.

See **`docs/AUTHORING_GUIDE.md`** for the data schemas.

## Backing up your progress

Flashcard/quiz progress is stored in this browser's `localStorage`, tied to whichever URL you load the app from. Rebuilding `dist/index.html` and reloading the same URL is safe — the content changes, the storage doesn't. What **does** reset it: opening the app a different way (e.g. double-clicking the file vs `npm run dev`'s `localhost:8080` vs a deployed URL — each is a separate storage bucket), clearing browser data, or switching browsers/devices.

The **Progress** tab has an "Export progress (.json)" / "Import progress" pair for exactly this — export before doing any of the above, or just periodically, and import to restore on the same or a different browser/device.

## AI Studio (optional)

The AI Studio tab lets you paste or upload reference text and draft flashcards/quiz questions with the Claude API, right in the browser. It requires the local dev server, since the API key must stay server-side:

```bash
npm install             # once, for the PDF/Word text-extraction libraries
cp .env.example .env    # then fill in ANTHROPIC_API_KEY
npm run dev
```

Without a key set, every other tab works exactly as before — AI Studio just shows a message telling you to set one. Uploading a `.pdf` or `.docx` sends its bytes to your own local server only, which extracts the text with `pdf-parse` / `mammoth` and drops it into the reference box — no data leaves your machine except the request to the Claude API when you click Generate. `.txt`/`.md` are read directly in the browser and don't need the server. Generated items land in an in-browser "AI Drafts" queue (never written into `src/data/`); review, edit, or discard them, then use "Build export snippet" to get a paste-ready block for the right `src/data/*.js` file. The normal **draft → validate → PR → human review → merge** workflow (`docs/CONTENT_WORKFLOW.md`) still applies — the app never publishes content on its own.

## Adding content with Claude Code

This repo is set up to be extended by an AI agent that turns lecture notes into review material — safely. The rule is **draft → validate → pull request → human review → merge**. The agent never publishes medical content on its own.

1. Drop a lecture file (PDF/DOCX/MD) into `sources/`.
2. Point Claude Code at it with one of the prompts in `docs/prompts/`.
3. The agent adds cards/questions to the right data file, runs `npm run validate`, and opens a PR describing what it added and where it was unsure.
4. **A human (ideally someone with clinical knowledge) reviews the PR** and merges.

The full flow is in **`docs/CONTENT_WORKFLOW.md`**. The agent's rules live in **`CLAUDE.md`**.

> ⚠️ **Medical disclaimer.** This is an educational tool generated from lecture summaries. It may contain errors. Always verify drug doses, contraindications, and clinical thresholds against an authoritative source before relying on them. Not for clinical decision-making.

## Deploying

The app is two static files (`dist/index.html` and `dist/sw.js`, its service worker — see below). Any static host works. A GitHub Pages workflow is included at `.github/workflows/deploy.yml` — enable Pages (Settings → Pages → "GitHub Actions") and it publishes `dist/` on each push to `main`.

## Installing on iPhone/iPad

AirDropping `index.html` and opening it from Files won't work — iOS opens local HTML in a stripped-down preview, not real Safari (no address bar, "Add to Home Screen" isn't available there, and JavaScript/storage behave unreliably). You need a real URL:

1. Deploy `dist/` somewhere reachable over **HTTPS** — GitHub Pages (above) is the zero-cost option, or drag `dist/` onto [Netlify Drop](https://app.netlify.com/drop) for a one-off `https://` link with no account.
2. Open that URL in **Safari** on the iPhone/iPad.
3. Tap **Share → Add to Home Screen**.

That gives you a full-screen app icon with no Safari chrome. It also works **fully offline after that first visit** — a service worker (`dist/sw.js`) caches the app so the icon keeps working with no connection at all (airplane mode, dead zone, etc.), not just spotty Wi-Fi. Reopen it online occasionally to pick up content updates; each rebuild's cache is versioned by content hash, so a redeploy replaces the old offline copy automatically.

One caveat: service workers only register over a secure context (HTTPS, or `localhost` for local dev) — a plain `http://` LAN address (e.g. testing via `npm run dev` from your Mac's IP) will *not* get offline support, by browser design. That's fine for a quick local test, just not for the app you actually keep on your phone.

## License

MIT for the code and tooling. Lecture-derived content is your own; review its licensing before publishing publicly.
