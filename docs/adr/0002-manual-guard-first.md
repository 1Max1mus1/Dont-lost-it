@wiki id=dont-lost-it-adr-manual-guard-first type=adr domain=projects state=draft
@summary Ship and validate manually started guard sessions before habit-based automatic activation.
@terms ADR, MVP, manual guard, automatic guard, activation
@links dont-lost-it-prd, dont-lost-it-development-process

# ADR 0002: Manual Guard First

## Status

Accepted on 2026-10-11.

## Context

Automatic mode cannot know which belongings were actually taken out at a
temporary location. It also depends on unproven habit inference and background
location behavior. The core product still needs both visual delight and useful
departure checking.

## Decision

The MVP centers on a manually started Guard Session after the user arrives and
unpacks at a library or café. Mature daily schedule learning and automatic
activation are deferred. Manual capture provides the most accurate session list
and the strongest test of the cut-and-paste ritual.

## Consequences

- Users may forget to start; activation remains a primary pilot risk.
- The first implementation can evaluate cutout quality, session state, and
  departure reminders without pretending to know the user's daily loadout.
- Bag Templates remain optional and prepare for later automation.
- Future automatic mode must distinguish confirmed Items from habit-based
  guesses and offer optional capture for higher precision.
