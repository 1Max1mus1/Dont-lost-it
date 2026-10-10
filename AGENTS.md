# Project Agent Rules

## Required context

Read `PROJECT.md`, `CONTEXT.md`, and `docs/INDEX.md` before changing product or
architecture decisions. Read the linked PRD, architecture page, ADR, or current
progress page relevant to the task before editing implementation.

## Documentation rules

- Markdown in this repository is the canonical project wiki.
- Keep the first four routing lines of managed wiki pages intact.
- Use stable lowercase kebab-case IDs and relative Markdown links.
- New decisions begin as `draft`; mark them `verified` only after product,
  prototype, or implementation evidence exists.
- Record durable architecture changes in an ADR.
- Update project documentation in the same change that invalidates it.
- Keep function-level reference generated from code under `docs/generated/`;
  do not manually duplicate the implementation.
- Never commit secrets, raw credentials, private location samples, personal
  photos, or unsanitized user-test recordings.

## Completion checks

- Confirm links from `docs/INDEX.md` still resolve.
- Run relevant tests and formatting checks once implementation exists.
- Update `docs/progress/current.md` with evidence and the next smallest step.
