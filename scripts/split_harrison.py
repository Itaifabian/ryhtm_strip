#!/usr/bin/env python3
"""Split Harrison's Principles of Internal Medicine (PDF) into per-chapter
Markdown files, score each chapter's priority for USMLE Step 2 CK, and build a
study queue.

Usage
  python scripts/split_harrison.py <pdf> --list-toc [--toc-level N]
  python scripts/split_harrison.py <pdf> --out harrison --tier-cutoff 2 [--sort] [--toc-level N] [--rescore]
  python scripts/split_harrison.py --rebuild-queue --out harrison --tier-cutoff 2

Outputs (under --out)
  chapters/ch_XXXX_slug.md   cleaned chapter text (references, figure fragments,
                             running heads and margin tabs removed)
  chapters.csv               num,title,part,tokens,tier   (edit `tier` by hand,
                             then --rebuild-queue; a re-split keeps hand-edited
                             tiers unless --rescore)
  progress.md                study queue (chapters with tier <= cutoff);
                             re-building keeps [x] marks
  concept_index.md           created empty if missing

Tiers: 1 = core Step 2 CK, 2 = useful / less commonly tested, 3 = skip
(basic science, research methods, health policy, emerging topics).

Chapter detection: by default every bookmark whose title starts with
"<number> <Title>" is a chapter, at whatever level it sits (Harrison's puts
chapters at level 2 in parts without sections and level 3 in parts with
sections). --toc-level N restricts detection to bookmark level N.
"""
import argparse
import csv
import os
import re
import sys
from collections import Counter

CH_RE = re.compile(r"^(\d{1,3})\s+(\S.*)$")
REF_RE = re.compile(r"^(?:■\s*)*(FURTHER READING|REFERENCES|SUGGESTED READINGS?|BIBLIOGRAPHY)\b", re.I)
BOX_HEADS = ("APPROACH TO THE PATIENT", "TREATMENT", "PREVENTION")
CSV_FIELDS = ["num", "title", "part", "tokens", "tier"]


# ---------------------------------------------------------------- TOC

def load_toc(doc, toc_level=None):
    """Return list of chapter dicts in book order."""
    toc = doc.get_toc()
    chapters, part, section = [], "", ""
    boundaries = []  # (page, kind) of every TOC entry that can end a chapter
    for level, title, page in toc:
        title = title.strip()
        m = CH_RE.match(title)
        is_ch = bool(m) and (toc_level is None or level == toc_level)
        if title.upper().startswith("PART "):
            part, section = title, ""
        elif title.upper().startswith("SECTION "):
            section = title
        if is_ch:
            chapters.append({"num": int(m.group(1)), "title": m.group(2).strip(),
                             "part": part, "section": section, "start": page})
        if page > 0:
            boundaries.append((page, title, is_ch))
    # end page = page of the next boundary entry that is a chapter, part,
    # or a level-1 entry (e.g. Index)
    for ch in chapters:
        nxt = None
        passed = False
        for page, title, is_ch in boundaries:
            if not passed:
                if is_ch and title.startswith(f"{ch['num']} "):
                    passed = True
                continue
            if is_ch or title.upper().startswith(("PART ", "INDEX")):
                nxt = (page, CH_RE.match(title).group(2).strip() if is_ch else None)
                break
        ch["end"] = nxt[0] if nxt else doc.page_count
        ch["next_title"] = nxt[1] if nxt else None
    return chapters


def list_toc(doc, toc_level):
    chapters = load_toc(doc, toc_level)
    lv = Counter(l for l, _, _ in doc.get_toc())
    print(f"pages={doc.page_count} bookmarks={sum(lv.values())} by level={dict(sorted(lv.items()))}")
    print(f"chapters detected: {len(chapters)}")
    for ch in chapters:
        print(f"{ch['num']:>4}  p{ch['start']:>5}-{ch['end']:<5} {ch['title'][:70]}")


# ---------------------------------------------------------------- text extraction

def norm(s):
    return re.sub(r"[^a-z0-9]", "", s.lower())


TABLE_RE = re.compile(r"^\s*TABLE\s+[A-Z]?\d+-\d+")
FIG_RE = re.compile(r"^\s*FIGURE\s+([A-Z]?\d+-\d+)")


def cell(s):
    return re.sub(r"\s+", " ", (s or "").replace("|", "/")).strip()


def table_md(tb):
    """Render a detected table as Markdown: bold title line + pipe table."""
    rows = [[cell(c) for c in r] for r in tb.extract()]
    rows = [r for r in rows if any(r)]
    if not rows:
        return ""
    title = ""
    if TABLE_RE.match(rows[0][0]) and not any(rows[0][1:]):
        title = rows.pop(0)[0]
    out = [f"**{title}**"] if title else []
    if rows:
        ncol = max(len(r) for r in rows)
        rows = [r + [""] * (ncol - len(r)) for r in rows]
        lines = []
        for i, r in enumerate(rows):
            vals = [v for v in r if v]
            if i > 0 and ncol > 1 and len(set(vals)) == 1 and len(vals) > 1:
                r = [f"**{vals[0]}**"] + [""] * (ncol - 1)   # merged section row
            lines.append("| " + " | ".join(r) + " |")
            if i == 0:
                lines.append("|" + "---|" * ncol)
        out.append("\n".join(lines))
    return "\n\n".join(out)


def figure_text(frags):
    """Join text fragments inside a figure into rows (by y), cells by x."""
    frags = sorted(frags, key=lambda b: (round(b[1] / 4), b[0]))
    rows, cur, cur_y = [], [], None
    for b in frags:
        if cur_y is not None and abs(b[1] - cur_y) > 4:
            rows.append(cur)
            cur = []
        if not cur:
            cur_y = b[1]
        cur.append(re.sub(r"\s+", " ", b[4]).strip())
    if cur:
        rows.append(cur)
    s = "; ".join(" | ".join(r) for r in rows)
    return s[:1500] + (" …" if len(s) > 1500 else "")


def page_blocks(page, sort, tables=True):
    """Return page items in reading order, plus raw blocks.

    Each item is (x0, y0, x1, y1, markdown, figure_clip_or_None, kind).
    Tables (detected only on pages that carry a 'TABLE N-N' heading) are rendered
    as Markdown tables; text inside figures is attached to the figure caption.
    """
    import pymupdf
    w = page.rect.width
    raw = [b for b in page.get_text("blocks") if b[6] == 0]
    tabs = []
    if tables and any(TABLE_RE.match(b[4]) for b in raw):
        tabs = [t for t in page.find_tables().tables if t.row_count >= 2]
    trects = [pymupdf.Rect(t.bbox) + (-2, -2, 2, 2) for t in tabs]

    def table_of(b):
        c = pymupdf.Point((b[0] + b[2]) / 2, (b[1] + b[3]) / 2)
        for i, r in enumerate(trects):
            if c in r:
                return i
        return None

    items, frags, done_tabs = [], [], set()
    for b in raw:
        x0, y0, x1, y1, txt = b[0], b[1], b[2], b[3], b[4]
        t = txt.strip()
        if not t:
            continue
        if x1 < 40 or x0 > w - 40:          # margin tabs / running heads
            continue
        if re.fullmatch(r"\d{1,4}", t):     # page numbers
            continue
        ti = table_of(b)
        if ti is not None:
            if ti not in done_tabs:
                done_tabs.add(ti)
                r = tabs[ti].bbox
                rot = any(TABLE_RE.match(x[4]) and (x[3] - x[1]) > 3 * (x[2] - x[0])
                          and pymupdf.Rect(x[:4]).intersects(trects[ti]) for x in raw)
                if rot:   # landscape table: text extraction loses headers; keep an upright image too
                    items.append((r[0], r[1], r[2], r[3], table_md(tabs[ti]),
                                  (pymupdf.Rect(r) + (-4, -4, 4, 4), False), "rtable"))
                else:
                    items.append((r[0], r[1], r[2], r[3], table_md(tabs[ti]), None, "table"))
            continue
        width = x1 - x0
        first = t.split("\n", 1)[0].strip("■ ").strip()
        heading_like = first.isupper() and len(first) > 3 and len(t) < 160 \
            and not FIG_RE.match(t)
        if width < 170 and not heading_like and not FIG_RE.match(t) and not TABLE_RE.match(t):
            frags.append(b)                  # figure labels etc.
            continue
        items.append((x0, y0, x1, y1, block_to_md(txt), None, "fig" if FIG_RE.match(t) else "text"))

    # attach figure regions: the area above each caption, bounded by the nearest
    # body item above it that overlaps horizontally
    used = set()
    imgs = [pymupdf.Rect(i["bbox"]) for i in page.get_image_info()]

    def para(o):
        return o[6] == "table" or (o[6] == "text" and len(o[4]) > 110)

    def body_like(o):
        # real paragraphs / tables bound a figure; a heading counts only if a
        # paragraph starts just below it in the same column (all-caps figure
        # labels like 'TOTAL' don't)
        if para(o):
            return True
        if o[6] == "text" and o[4].startswith("#"):
            return any(para(p) and 0 <= p[1] - o[3] < 30 and abs(p[0] - o[0]) < 40 for p in items)
        return False

    for it in [i for i in items if i[6] == "fig"]:
        cx0, cy0, cx1 = it[0] - 6, it[1], it[2] + 6
        top = 20
        for o in items:
            if o is it or o[6] == "fig" or not body_like(o):
                continue
            if o[3] <= cy0 + 1 and o[2] > cx0 and o[0] < cx1:
                top = max(top, o[3])
        clip = pymupdf.Rect(cx0, top, cx1, cy0)
        # short "text" items inside the figure area are figure labels, not body
        for o in list(items):
            if o[6] == "text" and not body_like(o) and \
                    pymupdf.Rect(o[:4]).intersects(clip) and o[1] >= top - 1:
                frags.append((o[0], o[1], o[2], o[3], re.sub(r"[#*]", "", o[4])))
                items.remove(o)
        k = items.index(it)
        inside = [j for j, f in enumerate(frags) if j not in used
                  and pymupdf.Rect(f[:4]).intersects(clip)]
        used.update(inside)
        md = it[4]
        ftxt = figure_text([frags[j] for j in inside])
        if ftxt:
            md += f"\n\nFigure text: {ftxt}"
        has_img = any(r.intersects(clip) for r in imgs)
        if clip.height < 25:
            clip = None
        items[k] = (it[0], it[1], it[2], it[3], md, (clip, has_img), "fig")

    # unruled tables: a 'TABLE N-N' title with no detected table under it.
    # Collect the label blocks directly beneath the title as rows.
    mid = w * 0.45
    det_tops = [t.bbox for t in tabs]
    for it in [i for i in items if i[6] == "text" and TABLE_RE.match(i[4].lstrip("*"))]:
        if any(abs(r[1] - it[1]) < 40 and r[0] - 20 < it[0] < r[2] for r in det_tops):
            continue
        left_col = it[0] < mid
        near = [f for f in frags if 0 <= f[1] - it[3] < 16]
        full = left_col and any(f[0] > mid for f in near)
        cx0 = it[0] - 10
        cx1 = (w - 35) if (full or not left_col) else mid + 10
        cands = [(f[0], f[1], f[2], f[3], f[4], "frag") for f in frags] + \
                [(o[0], o[1], o[2], o[3], re.sub(r"[#*]", "", o[4]), "item") for o in items
                 if o[6] == "text" and o is not it and not body_like(o)]
        cands = sorted([c for c in cands if c[1] >= it[3] - 2 and c[0] >= cx0 and c[2] <= cx1 + 10],
                       key=lambda c: c[1])
        stops = [o[1] for o in items if body_like(o) and o[1] > it[3] and o[0] < cx1 and o[2] > cx0]
        stop_y = min(stops) if stops else 1e9
        bottom, rows = it[3], []
        for c in cands:
            if c[1] >= stop_y or c[1] - bottom > 16:
                break
            rows.append(c)
            bottom = max(bottom, c[3])
        if not rows:
            continue
        for c in rows:
            if c[5] == "item":
                items[:] = [o for o in items if not (abs(o[0] - c[0]) < .1 and abs(o[1] - c[1]) < .1)]
            else:
                frags[:] = [f for f in frags if not (abs(f[0] - c[0]) < .1 and abs(f[1] - c[1]) < .1)]
        ttxt = figure_text([c[:5] for c in rows]).replace("; ", "\n- ")
        title = it[4].strip("*")
        md = f"**{title}** (unruled table; rows below, cells separated by |)\n\n- {ttxt}"
        clip = pymupdf.Rect(cx0, it[1], cx1, bottom + 2)
        k = items.index(it)
        items[k] = (it[0], it[1], it[2], it[3], md, (clip, False), "utable")

    if sort:
        def key(b):
            full = b[0] < mid - 40 and b[2] > mid + 40
            col = 2 if full else (0 if b[0] < mid else 1)
            return (col, b[1])
        items.sort(key=key)
    return items, raw


def find_title_y(raw, title, w):
    """Locate the block whose text starts with the chapter title; return its (x0, y0).
    Margin running heads (which also carry the title) are ignored."""
    full = tnorm(title)
    body = [b for b in raw if not (b[2] < 40 or b[0] > w - 40)]
    for b in body:                      # exact match first (avoids run-in subheadings)
        if full and tnorm(b[4]) == full:
            return b[0], b[1]
    for b in body:
        if full and tnorm(b[4]).startswith(full[:30]):
            return b[0], b[1]
    return None


def tnorm(s):
    """Normalize a title: drop leading chapter number and leading 'The'."""
    s = re.sub(r"^\s*\d{1,3}\s+", "", s)
    s = re.sub(r"^\s*the\s+", "", s, flags=re.I)
    return norm(s)


def before(b, pos, w):
    """Is block b before position pos in two-column reading order?"""
    mid = w * 0.45
    col_b = 0 if b[0] < mid else 1
    col_p = 0 if pos[0] < mid else 1
    return (col_b, b[1]) < (col_p, pos[1] - 1)


def block_to_md(t):
    t = t.replace("­", "")
    lines = [l.rstrip() for l in t.split("\n")]
    lines = [l for l in lines if l.strip() and l.strip() != "■"]
    if not lines:
        return ""
    lines = [l.lstrip("■").strip() for l in lines]
    out_head = None
    # box headings: TREATMENT / APPROACH TO THE PATIENT followed by a topic line
    if lines[0] in BOX_HEADS and len(lines) >= 2:
        out_head = f"### {lines[0].title()}: {lines[1]}"
        lines = lines[2:]
    else:
        heads = []
        while lines and sum(c.isalpha() for c in lines[0]) >= 3 and lines[0] == lines[0].upper() \
                and len(lines[0]) < 90 and not lines[0].startswith(("TABLE", "FIGURE")):
            heads.append(lines.pop(0))
        if heads:
            out_head = "## " + " ".join(heads)
    body = join_lines(lines)
    # run-in heading separated by an em space
    m = re.match(r"^([^ ]{2,90}) \s*(.*)$", body, re.S)
    if m:
        body = f"**{m.group(1).strip()}** {m.group(2)}"
    body = body.replace(" ", " ").replace(" ", " ")
    if body.startswith(("TABLE ", "FIGURE ")):
        body = f"*{body}*"
    parts = [p for p in (out_head, body.strip()) if p]
    return "\n\n".join(parts)


def join_lines(lines):
    s = ""
    for l in lines:
        if not s:
            s = l
        elif s.endswith("-") and l[:1].islower():
            s = s[:-1] + l
        else:
            s = s + " " + l
    return re.sub(r"[ \t]+", " ", s).strip()


def save_figure(page, it, fig_dir, num):
    """Save a JPEG crop of a figure/table; return the markdown line pointing at it."""
    import pymupdf
    clip, has_img = it[5]
    if it[6] in ("utable", "rtable"):
        m = re.search(r"TABLE\s+([A-Z]?\d+-\d+)", it[4][:200])
        prefix = "table"
    else:
        m = FIG_RE.match(it[4].lstrip("*"))
        prefix = "fig"
    if not clip or not m or not fig_dir:
        return ""
    os.makedirs(fig_dir, exist_ok=True)
    fn = os.path.join(fig_dir, f"{prefix}_{m.group(1)}.jpg")
    if it[6] == "rtable":
        if os.path.exists(fn):          # continued table on a later page
            fn = fn[:-4] + f"_p{page.number + 1}.jpg"
        mat = pymupdf.Matrix(110 / 72, 110 / 72).prerotate(90)
        pix = page.get_pixmap(clip=clip, matrix=mat)
    else:
        pix = page.get_pixmap(clip=clip, dpi=110)
    pix.save(fn, jpg_quality=70)
    if it[6] in ("utable", "rtable"):
        return f"\n\n[table image: {fn}]"
    kind = "photo/raster" if has_img else "vector diagram"
    return f"\n\n[figure image ({kind}): {fn}]"


def extract_chapter(doc, ch, sort, fig_dir=None, tables=True):
    paras = []
    for pno in range(ch["start"], ch["end"] + 1):
        if pno < 1 or pno > doc.page_count:
            continue
        page = doc[pno - 1]
        blocks, raw = page_blocks(page, sort, tables)
        w = page.rect.width
        if pno == ch["start"]:
            pos = find_title_y(raw, ch["title"], w)
            if pos:
                blocks = [b for b in blocks if not before(b, pos, w)]
            else:
                print(f"  warn: ch {ch['num']} title not found on p{pno}", file=sys.stderr)
        if pno == ch["end"]:
            if ch["next_title"]:
                pos = find_title_y(raw, ch["next_title"], w)
                if pos:
                    blocks = [b for b in blocks if before(b, pos, w)]
                else:
                    print(f"  warn: ch {ch['num']} next title not found on p{pno}", file=sys.stderr)
                if pos:
                    pass
                elif pno != ch["start"]:
                    continue
            elif pno != ch["start"]:
                continue  # end page belongs to the next part/index
        for b in blocks:
            md = b[4]
            if b[6] in ("fig", "utable", "rtable") and b[5]:
                md += save_figure(page, b, fig_dir, ch["num"])
            if md:
                paras.append(md)
    # strip title / author / chapter-number lines from the top
    cleaned = []
    for p in paras:
        if REF_RE.match(p.lstrip("#* ").strip()):
            break
        cleaned.append(p)
    # drop leading title echo and author block (ends with the chapter number)
    for _ in range(3):
        if cleaned and (tnorm(cleaned[0]) == tnorm(ch["title"])
                        or (re.search(rf"(^|\s){ch['num']}$", cleaned[0]) and len(cleaned[0]) < 200)):
            cleaned.pop(0)
    # merge paragraphs split across columns/pages
    merged = []
    for p in cleaned:
        if merged and p[:1].islower() and not merged[-1].startswith(("#", "*")) \
                and not merged[-1].rstrip().endswith((".", ":", "?", "!")):
            prev = merged[-1]
            merged[-1] = (prev[:-1] + p) if prev.endswith("-") else prev + " " + p
        else:
            merged.append(p)
    # drop lines repeated many times (running heads that slipped through)
    counts = Counter(merged)
    merged = [p for p in merged if counts[p] < 4 or len(p) > 120]
    return "\n\n".join(merged)


# ---------------------------------------------------------------- tiers

T3_PARTS = ("PART 16", "PART 17", "PART 20")
T3_WORDS = ["biology", "molecular", "genomic", "genetics", "genetic", "epigenetic", "cell death",
            "stem cell", "microbiome", "principles of", "introduction to", "approach to the",
            "physiology", "pathobiology", "metabolomics", "machine learning", "network medicine",
            "precision medicine", "disparities", "well-being", "behavioral economics", "telehealth",
            "imaging atlas", "atlas", "evolution", "clinical trials", "health care systems",
            "vaccine opposition", "climate", "space", "high-altitude", "diving", "bioterrorism",
            "radiation", "chemical terrorism", "mechanisms", "pathogenesis", "basis of",
            "global", "emerging", "physical examination", "cardiovascular screening"]
T1_WORDS = [
    # cardinal symptoms
    "chest discomfort", "abdominal pain", "headache", "back pain", "fever", "syncope", "dizziness",
    "weakness", "delirium", "coma", "dementia", "dyspnea", "cough", "hemoptysis", "edema",
    "murmur", "palpitations", "dysphagia", "nausea", "diarrhea", "weight loss", "gastrointestinal bleeding",
    "jaundice", "ascites", "azotemia", "electrolyte", "hypercalcemia", "acidosis", "anemia",
    "bleeding and thrombosis", "lymphadenopathy", "skin disorder", "eczema", "drug reactions",
    # cardio
    "heart failure", "myocardial infarction", "coronary", "angina", "atrial fibrillation",
    "tachyarrhythmia", "bradyarrhythmia", "hypertension", "valv", "aortic", "mitral", "pericard",
    "cardiomyopathy", "myocarditis", "endocarditis", "congenital heart", "dyslipid", "lipoprotein",
    "peripheral artery", "venous thrombo", "pulmonary embolism", "cardiac arrest", "shock",
    "electrocardiograph", "atherosclerosis",
    # pulm / crit
    "asthma", "chronic obstructive", "pneumonia", "interstitial lung", "pleura", "bronchiectasis",
    "cystic fibrosis", "sleep apnea", "pulmonary hypertension", "respiratory distress", "mechanical ventilat",
    "sepsis", "lung cancer", "sarcoidosis",
    # renal
    "kidney injury", "chronic kidney", "glomerul", "nephrolithiasis", "urinary tract infection",
    "tubulointerstitial", "dialysis", "renovascular",
    # GI / liver
    "peptic ulcer", "esophag", "inflammatory bowel", "irritable bowel", "diverticular", "malabsorption",
    "cirrhosis", "hepatitis", "liver", "gallbladder", "pancreatitis", "colorectal", "celiac",
    "appendicitis", "intestinal obstruction", "anorectal",
    # endo
    "diabetes", "thyroid", "adrenal", "pituitary", "hypoglycemia", "osteoporosis", "parathyroid",
    "obesity", "menopause", "infertility", "amenorrhea", "hirsutism", "testes", "hypogonadism",
    "calcium", "paget",
    # heme / onc
    "leukemia", "lymphoma", "myeloma", "breast cancer", "prostate", "colon", "ovarian", "cervical",
    "testicular", "bladder", "renal cell", "pancreatic cancer", "gastric", "head and neck",
    "melanoma", "skin cancer", "thrombocytopenia", "platelet", "coagulation", "hemoglobinopath",
    "iron deficiency", "megaloblastic", "hemolytic", "transfusion", "myeloproliferative",
    "myelodysplastic", "neutropenia", "oncologic emergencies", "paraneoplastic", "cancer screening",
    "thrombosis", "anticoagulant", "aplastic",
    # ID
    "hiv", "tuberculosis", "sexually transmitted", "syphilis", "meningitis", "encephalitis",
    "osteomyelitis", "skin and soft", "staphylococcal", "streptococcal", "pneumococcal",
    "lyme", "influenza", "herpes", "infectious diarrhea", "intraabdominal", "immunization",
    "travel", "malaria", "fungal", "candidiasis", "covid", "coronavirus", "clostridi",
    "transplant", "health care–associated", "febrile", "neutropenic",
    # rheum / immuno
    "lupus", "rheumatoid", "spondyl", "vasculitis", "gout", "crystal", "osteoarthritis",
    "sjögren", "scleroderma", "systemic sclerosis", "myositis", "polymyalgia", "giant cell",
    "fibromyalgia", "anaphylaxis", "urticaria", "allergic", "immunodeficienc", "septic arthritis",
    "periarticular", "joint", "amyloidosis",
    # neuro / psych
    "stroke", "cerebrovascular", "seizure", "epilepsy", "parkinson", "multiple sclerosis",
    "migraine", "guillain", "myasthenia", "neuropathy", "spinal cord", "head injury",
    "concussion", "subarachnoid", "intracranial", "alzheimer", "depress", "anxiety", "bipolar",
    "schizophrenia", "psychiatric", "alcohol", "opioid", "substance", "tobacco", "cannabis",
    "sleep disorders", "brain tumors", "vertigo", "eye", "hearing", "upper respiratory",
    # misc
    "poisoning", "overdose", "hypothermia", "heat-related", "envenomation", "bites",
    "palliative", "end-of-life", "screening", "prevention", "ethical", "geriatric", "aging",
    "falls", "pregnancy", "preoperative", "medical evaluation", "decision-making",
    "safety and quality", "diagnosis: reducing", "promoting good health", "nutrition",
    "malnutrition", "vitamin", "acid-base", "hyponatremia",
]


def score_tier(title, part):
    t = title.lower()
    if part.upper().startswith(T3_PARTS):
        return 3
    if any(w in t for w in T1_WORDS):
        return 1
    if any(w in t for w in T3_WORDS):
        return 3
    return 2


# ---------------------------------------------------------------- queue

def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:50].rstrip("-")


def read_csv(path):
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def write_csv(path, rows):
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=CSV_FIELDS)
        w.writeheader()
        for r in rows:
            w.writerow({k: r[k] for k in CSV_FIELDS})


def build_queue(out, cutoff):
    rows = read_csv(os.path.join(out, "chapters.csv"))
    prog = os.path.join(out, "progress.md")
    done = set()
    if os.path.exists(prog):
        for line in open(prog, encoding="utf-8"):
            m = re.match(r"^- \[x\] (\d+) ", line)
            if m:
                done.add(int(m.group(1)))
    q = [r for r in rows if int(r["tier"]) <= cutoff]
    q.sort(key=lambda r: (int(r["tier"]), int(r["num"])))
    todo = [r for r in q if int(r["num"]) not in done]
    tok_done = sum(int(r["tokens"]) for r in q if int(r["num"]) in done)
    tok_all = sum(int(r["tokens"]) for r in q)
    lines = [
        "# Harrison's -> Step 2 CK study queue",
        "",
        "Daily sessions: read only this header + the 'Next up' list. Mark a chapter",
        "done by changing `- [ ]` to `- [x]` in the full queue. Chapter text is at",
        "harrison/chapters/ch_<NNNN>_*.md. Tables are inline Markdown tables - use them.",
        "Figures: caption + 'Figure text' (labels extracted from the figure) are inline;",
        "a JPEG crop is linked as [figure image (...)]. Open an image only when the caption",
        "is high-yield and the figure text is thin (photos, imaging, ECGs, algorithms).",
        "Regenerate with",
        f"`python scripts/split_harrison.py --rebuild-queue --out {out} --tier-cutoff {cutoff}` (keeps [x]).",
        "",
        f"Tier cutoff: {cutoff} | Queue: {len(q)} chapters | Done: {len(q) - len(todo)} | "
        f"Tokens done: {tok_done // 1000}k / {tok_all // 1000}k",
        "",
        "## Next up",
        "",
    ]
    for r in todo[:6]:
        lines.append(f"{int(r['num'])} | {r['title']} | T{r['tier']} | {int(r['tokens']) // 1000}k tok")
    lines += ["", "## Full queue (tier 1 first, then tier 2; book order within tier)", ""]
    for r in q:
        mark = "x" if int(r["num"]) in done else " "
        lines.append(f"- [{mark}] {int(r['num'])} | {r['title']} | T{r['tier']} | {int(r['tokens']) // 1000}k")
    with open(prog, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    ci = os.path.join(out, "concept_index.md")
    if not os.path.exists(ci):
        with open(ci, "w", encoding="utf-8") as f:
            f.write("# Concept index\n\nOne line per concept already covered: `concept | ch_NNNN`\n\n")
    print(f"queue: {len(q)} chapters ({len(todo)} to do), {tok_all // 1000}k tokens")


# ---------------------------------------------------------------- main

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("pdf", nargs="?")
    ap.add_argument("--list-toc", action="store_true")
    ap.add_argument("--toc-level", type=int)
    ap.add_argument("--out", default="harrison")
    ap.add_argument("--tier-cutoff", type=int, default=2)
    ap.add_argument("--sort", action="store_true", help="force two-column reading order")
    ap.add_argument("--rebuild-queue", action="store_true")
    ap.add_argument("--rescore", action="store_true", help="ignore hand-edited tiers in existing chapters.csv")
    ap.add_argument("--only", help="comma-separated chapter numbers to (re)split, for testing")
    ap.add_argument("--no-tables", action="store_true", help="skip table detection (faster)")
    ap.add_argument("--no-images", action="store_true", help="do not save figure image crops")
    a = ap.parse_args()

    if a.rebuild_queue:
        build_queue(a.out, a.tier_cutoff)
        return
    if not a.pdf:
        ap.error("pdf path required")
    import pymupdf
    doc = pymupdf.open(a.pdf)
    if a.list_toc:
        list_toc(doc, a.toc_level)
        return

    chapters = load_toc(doc, a.toc_level)
    if not chapters:
        sys.exit("No chapters detected. Try --toc-level N (see --list-toc).")
    os.makedirs(os.path.join(a.out, "chapters"), exist_ok=True)
    csv_path = os.path.join(a.out, "chapters.csv")
    old = {}
    if os.path.exists(csv_path):
        old = {int(r["num"]): r for r in read_csv(csv_path)}
    only = {int(x) for x in a.only.split(",")} if a.only else None

    rows = []
    for ch in chapters:
        num = ch["num"]
        if only and num not in only:
            if num in old:
                rows.append(old[num])
            continue
        fig_dir = None if a.no_images else os.path.join(a.out, "figures", f"ch_{num:04d}")
        text = extract_chapter(doc, ch, a.sort, fig_dir, not a.no_tables)
        where = " · ".join(x for x in (ch["part"], ch["section"]) if x)
        md = f"# Chapter {num}: {ch['title']}\n<!-- {where} · pp. {ch['start']}-{ch['end']} -->\n\n{text}\n"
        fn = os.path.join(a.out, "chapters", f"ch_{num:04d}_{slug(ch['title'])}.md")
        with open(fn, "w", encoding="utf-8") as f:
            f.write(md)
        tier = score_tier(ch["title"], ch["part"])
        if num in old and not a.rescore:
            tier = int(old[num]["tier"])
        rows.append({"num": num, "title": ch["title"], "part": ch["part"],
                     "tokens": len(md) // 4, "tier": tier})
        if num % 50 == 0:
            print(f"  ... chapter {num}", file=sys.stderr)
    rows.sort(key=lambda r: int(r["num"]))
    write_csv(csv_path, rows)
    print(f"wrote {len(rows)} chapters to {a.out}/chapters, manifest {csv_path}")
    build_queue(a.out, a.tier_cutoff)


if __name__ == "__main__":
    main()
