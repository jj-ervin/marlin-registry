# Source Normalization State — 2026-06-05

## What happened

At some point today Claude overwrote source files in `sources-root/` with placeholder stubs
and generated content. Three recovery attempts were made, producing the current fragmented
state across multiple directories. This document captures the exact state before any
normalization work begins.

---

## Directory inventory

### 1. `git HEAD docs/sources/` — authoritative originals

The last committed state. All real content is intact in git history.

| Range | Status | Size range |
|---|---|---|
| source_01–56 | Real articles, full content | 1,372–12,454 bytes |
| source_57–60 | Empty stubs (blank YAML frontmatter) | 145 bytes each |

- `INDEX.md`: populated rows for source_01–10 only; 11–56 rows all show `—` (INDEX was never updated for that batch)
- **This is the ground truth.** Nothing here is lost.

---

### 2. `sources-eco/` — intact copy, untracked

Created at some point as a working copy. Contains source_01–56 only (no 57–60).

| File | Status |
|---|---|
| source_01–56 | **Byte-for-byte identical to git HEAD** (CRLF line endings vs git's LF — zero content difference) |
| `000-article-summaries.md` | Meta-index with article descriptions for all 56 sources — **not in git**, unique |
| `sources-merged.md` | Full merged compilation of all 56 articles — **not in git**, unique |

`sources-eco/` contains no unique article content beyond git HEAD, but the two extra files
(`000-article-summaries.md`, `sources-merged.md`) exist only here.

---

### 3. `sources-root/` — active working directory, heavily damaged

This is where the damage is concentrated.

#### Active files (source_01–60)

| Range | Status | Detail |
|---|---|---|
| source_01–10 | **Wrong content** | Claude-generated stubs ~3–4KB, derived from `_overwritten_by_claude/source_45–54`. These are not the correct articles for these slots. |
| source_11–56 | **Complete data loss** | All 46 files are the same identical 167-byte empty template. No content. |
| source_57 | **Claude-written article** | 3,622-byte HSCC AI Cyber Governance article written by Claude into this slot. Same content as sources-root/source_01 (duplicated). Not the original source_57 (which was a stub in git). |
| source_58–60 | **Near-empty stubs** | 146 bytes, slightly different from git's 145-byte stubs |

Summary: **all 56 real article slots in sources-root are either wrong content (01–10) or empty (11–56).**

#### Backup subdirectories

| Directory | Contents | Redundancy status |
|---|---|---|
| `_overwritten_by_claude_20260605T104751/` | source_45–54 as Claude first wrote them | Content now duplicated in sources-root/source_01–10. Unique as a timestamped record of first overwrite. |
| `_bad_source_01_45_before_restore_20260605T105153/` | source_01–45 | **Exact copy of git HEAD source_01–45** (and sources-eco/source_01–45). Fully redundant. |
| `_bad_source_46_60_before_restore_20260605T105306/` | source_46–56 + stubs for 57–60 | **Exact copy of git HEAD source_46–56** + 146-byte stubs. Fully redundant. |

#### `INDEX.md`

Identical to git HEAD INDEX.md — populated rows for source_01–10, empty rows for 11–56.
Does not reflect the damage to sources-root (still points to the slot numbers as if content exists).

---

## Duplicate map

| Duplicate group | Files |
|---|---|
| Identical to git HEAD | All 56 files in `sources-eco/` = all 56 in `_bad_source_01_45/` = all 45 in `_bad_source_46_60/` |
| 167-byte empty stub | `sources-root/source_11` through `source_56` (46 files, all identical) |
| Same Claude article in two slots | `sources-root/source_01` = `sources-root/source_57` = `_overwritten_by_claude/source_45` |
| Overwrite content recycled as new slots | `sources-root/source_01–10` = `_overwritten_by_claude/source_45–54` (shifted by -44) |
| git stubs slightly differ | git source_57–60 (145b) ≠ sources-root source_58–60 (146b) — same template, one extra byte |

---

## What is unique and irreplaceable

| Item | Location | Notes |
|---|---|---|
| All 56 real articles | git HEAD `docs/sources/source_01–56` | Primary canonical copy |
| All 56 real articles | `sources-eco/source_01–56` | CRLF copy; redundant with git but accessible without git |
| Article meta-index | `sources-eco/000-article-summaries.md` | Not in git; describes all 56 sources |
| Merged compilation | `sources-eco/sources-merged.md` | Not in git; full text merge of all 56 |
| Overwrite forensics | `sources-root/_overwritten_by_claude_20260605T104751/` | Timestamped record of Claude's first writes |

---

## Damage summary

- **46 article files** (source_11–56 in sources-root) reduced to identical 167-byte stubs
- **10 article files** (source_01–10 in sources-root) contain wrong Claude-generated content
- **1 slot** (source_57 in sources-root) contains a valid-looking article but it is a Claude write, not an original, and duplicates source_01
- **0 content is permanently lost** — git HEAD has the full set of 56 real articles intact

---

## Notes on format

The git-committed articles use this internal structure:
```
# Source XX

# === BEGIN SUMMARY BLOCK ===
## Links
...
## Article Details
...
# === END SUMMARY BLOCK ===
```

The YAML frontmatter block that appears in `sources-root/source_01–10` and in the
`_overwritten_by_claude/` files is a Claude-introduced format, not the original format.
The original articles do not use YAML frontmatter.

The `sources-eco/` files use the same `# Source XX` format as git HEAD (CRLF copy).
