# Flags workflow: from your phone to a reviewed PR

## On the phone (the app)
1. Tap the **flag** icon on any quiz question or flashcard.
2. Pick quick reasons (Irrelevant / Wrong answer / Unclear / Duplicate) and optionally type a note.
3. Either **Save flag** (keep it, mark for review) or **🗑 Mark for removal** — the item is
   hidden from your decks on this device immediately.
4. When ready, open **Progress → Flagged for review → Send to GitHub**. This opens a
   pre-filled GitHub issue (label `flags`) containing your unsent flags; tap **Submit new issue**.
   Large batches are split; tap Send again for the rest. If you didn't submit, tap **undo**.

Flags stay in the phone's `localStorage` (they're included in nothing else). After a content
update, the app re-matches flags to items by text; flags that were sent and whose item no
longer exists are cleared automatically.

## Processing an issue (agent or human)
1. `python3 scripts/locate_flags.py <issue-number>` — lists each flag with its source location.
2. Work on a branch, never `main` (CLAUDE.md rule 1).
3. For each flag:
   - **remove** — delete the item from its source.
     - Harrison topics: delete the question block *and* its answer block in
       `study/questions/ch_NNNN.md` (numbering gaps are fine), or the row in
       `study/anki/ch_NNNN.csv`; then run `python3 scripts/harrison_to_app.py`.
     - Other content: delete the object from the `src/data/*.js` file. If a later quiz item
       in the same topic has `ref:` indices into flashcards you removed, fix them.
   - **review** — fix only what the note/reason identifies, grounded in the source chapter or
     lecture (CLAUDE.md rule 2). If the fix can't be grounded, leave it and list it in the PR.
4. Keep answer letters balanced when editing a question's options.
5. `npm run check`, commit, open a PR that references the issue (`Closes #N`) and lists every
   flag with what was done. The human reviews and merges; nothing auto-merges.
