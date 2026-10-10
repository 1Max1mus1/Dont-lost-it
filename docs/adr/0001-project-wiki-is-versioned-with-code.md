@wiki id=dont-lost-it-adr-project-wiki type=adr domain=projects state=draft
@summary Keep canonical product, architecture, decision, and progress knowledge as versioned Markdown beside the code.
@terms ADR, project wiki, documentation, source of truth
@links dont-lost-it-overview, dont-lost-it-development-process

# ADR 0001: Project Wiki Is Versioned with the Code

## Status

Accepted on 2026-10-11.

## Context

Development will continue across more than one computer and may involve AI
agents. Product decisions, implementation state, and architecture must remain
recoverable without relying on chat history or one local machine.

## Decision

Canonical project documentation lives as Markdown in this repository.
`PROJECT.md`, `CONTEXT.md`, and `docs/INDEX.md` are the entry points.
Architecture, data flow, planning, progress, ADRs, and generated reference live
under `docs/`.

## Consequences

- One clone contains both implementation and durable project context.
- Documentation changes can be reviewed with code changes.
- `docs/progress/current.md` must be maintained rather than treated as history.
- Function-level inventories are generated from code; curated pages explain
  meaning, decisions, invariants, and failure modes.
- Chat messages and Figma comments may inform decisions but are not canonical
  until recorded here.
