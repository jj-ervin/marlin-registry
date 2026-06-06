# Sources

Research summaries and source links from Copilot Discovery Tab sessions. Each file captures
industry patterns, technical directions, requirements, and regulations relevant to the eco
ecosystem. Summaries are produced during discovery and are not reproductions of copyrighted
text — they extract signals, links, and conceptual relevance.

## Rules

- **Do not overwrite existing files.** Each source file is a permanent record.
- **Add in sequential order only.** The next file is always `source_NN.md` where `NN` is
  the next available number. Check `INDEX.md` to find the current highest slot.
- **Update `INDEX.md`** with a new row every time you add a source file.
- **One source file per discovery session or article cluster.** A source file may cover
  multiple related articles from the same session.

## File Format

Each source file uses this structure:

```
# Source NN

# === BEGIN SUMMARY BLOCK ===

## Links
- url1
- url2

## Article Details

### Article Title
- **Source:** Publication name
- **Summary:** ...
- **Conceptual Signals for eco:** ...

## Relevance to Eco
...

# === END SUMMARY BLOCK ===
```

## Index

See `INDEX.md` for the full table of all sources with title, publication, date, topics,
and relevance tags.

## Other Files

- `INDEX.md` — master index table
- `000-article-summaries.md` — article-level descriptions for the source set
- `sources-merged.md` — full merged compilation of all source content
