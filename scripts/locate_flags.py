#!/usr/bin/env python3
"""Locate the source of each flag sent from the app as a GitHub issue.

Usage:
  python3 scripts/locate_flags.py 42            # GitHub issue number (uses `gh`)
  python3 scripts/locate_flags.py flags.json    # exported flags file from the app

For every flag it prints the action (remove/review), reasons, note, and where the
item lives in the source:
  - Harrison topics (id harrison-chNNNN-*): study/questions/ch_NNNN.md question number,
    or study/anki/ch_NNNN.csv row. Edit those, then re-run scripts/harrison_to_app.py.
  - Everything else: the src/data/*.js file and line containing the text.
It only reads; it never edits content. See docs/FLAGS_WORKFLOW.md.
"""
import csv, json, re, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def load_flags(arg):
    if arg.isdigit():
        body = subprocess.run(["gh", "issue", "view", arg, "--json", "body", "-q", ".body"],
                              capture_output=True, text=True, check=True, cwd=ROOT).stdout
        m = re.search(r"```flags\n(.*?)```", body, re.S)
        if not m:
            sys.exit(f"issue {arg}: no ```flags block found")
        return [json.loads(l) for l in m.group(1).splitlines() if l.strip()]
    data = json.loads(Path(arg).read_text())
    out = []
    for f in data.get("flags", {}).values():
        out.append({"type": f["type"], "tid": f["tid"], "idx": f["idx"], "action": f.get("action", "review"),
                    "reasons": f.get("reasons", []), "note": f.get("note", ""), "text": f.get("excerpt", "")})
    return out


def norm(s):
    return re.sub(r"\s+", " ", s or "").strip().lower()


def locate_harrison(f):
    num = int(re.match(r"harrison-ch(\d+)", f["tid"]).group(1))
    probe = norm(f["text"])[:80]
    if f["type"] == "quiz":
        p = ROOT / f"study/questions/ch_{num:04d}.md"
        for line in p.read_text().split("## Answers")[0].splitlines():
            m = re.match(r"\*\*(\d+)\.\*\*\s*(.*)", line)
            if m and norm(m.group(2))[:80] == probe:
                hint = " (delete the question block AND its answer block)" if f["action"] == "remove" else " (edit question and answer blocks)"
                return f"{p.relative_to(ROOT)} — question {m.group(1)}{hint}"
        return f"{p.relative_to(ROOT)} — NOT FOUND by text (maybe already edited)"
    p = ROOT / f"study/anki/ch_{num:04d}.csv"
    with p.open(newline="") as fh:
        for i, row in enumerate(csv.DictReader(fh), start=2):
            if norm(row["Front"])[:80] == probe:
                return f"{p.relative_to(ROOT)} — line {i} (Front: {row['Front'][:60]})"
    return f"{p.relative_to(ROOT)} — NOT FOUND by text (maybe already edited)"


def locate_data(f):
    probe = (f["text"] or "")[:50]
    hits = []
    for p in sorted((ROOT / "src/data").glob("*.js")):
        for n, line in enumerate(p.read_text().splitlines(), start=1):
            if probe and probe in line:
                hits.append(f"{p.relative_to(ROOT)}:{n}")
    return ", ".join(hits) if hits else "NOT FOUND by text in src/data (maybe already edited)"


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    flags = load_flags(sys.argv[1])
    for k, f in enumerate(flags, 1):
        where = locate_harrison(f) if f["tid"].startswith("harrison-ch") else locate_data(f)
        print(f"[{k}] {f['action'].upper()} {f['type']} · {f['tid']} · reasons={','.join(f['reasons']) or '-'}")
        print(f"    text: {f['text'][:120]}")
        if f["note"]:
            print(f"    note: {f['note']}")
        print(f"    at:   {where}")
    rm = sum(1 for f in flags if f["action"] == "remove")
    print(f"\n{len(flags)} flags: {rm} remove, {len(flags) - rm} review")


if __name__ == "__main__":
    main()
