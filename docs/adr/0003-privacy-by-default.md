@wiki id=dont-lost-it-adr-privacy-default type=adr domain=projects state=draft
@summary Store one guard point instead of a route, keep source photos local and temporary, and redact share data by default.
@terms ADR, privacy, location, photos, sharing
@links dont-lost-it-prd, dont-lost-it-data-flow

# ADR 0003: Privacy by Default

## Status

Accepted on 2026-10-11.

## Context

The product handles photos of personal possessions and repeated study
locations. These data can reveal routines and valuable belongings. The product
cannot earn location and notification permission without a narrow, honest data
model.

## Decision

- Record one Guard Point when location is available; do not record a route or
  invent a point for location-denied manual sessions.
- Keep the original source photo on-device only while the session is active,
  unless the user explicitly saves it.
- Persist cropped Sticker Variants as part of the user's collection.
- Exclude precise coordinates, detailed times, importance flags, and
  unselected Items from share output by default.
- Keep analytics free of raw photos and precise location values.
- Preserve useful non-location features when permission is denied.

### 2026-10-28 lifecycle clarification

[ADR 0004](0004-session-and-recovery-lifecycle.md) adds user-confirmed recovery
behavior, still pending implementation verification. When checking closes with
unresolved Items, retain only on-device contextual crops, deleting the full source
photo by default. Delete a recovery crop when the Item is found unless explicitly
saved. A name-only Item has no fabricated photo evidence. This does not change the
explicit-save exception for a full original photo.

## Consequences

- Missing-item recovery can show last-seen evidence but cannot provide
  real-time tracking.
- Temporary photo deletion and share redaction require explicit tests.
- Any future cloud image processing or backup feature needs a separate privacy
  review and transparent retention statement.
- Product copy must never imply certainty beyond available evidence.
