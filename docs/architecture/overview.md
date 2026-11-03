@wiki id=dont-lost-it-architecture type=module domain=projects state=draft
@summary Proposed deep-module architecture for capture, identity, guarding, departure, reminders, journals, and safe sharing.
@terms Don't Lose It, architecture, modules, interfaces, adapters
@links dont-lost-it-prd, dont-lost-it-data-flow, dont-lost-it-adr-manual-guard-first

# Architecture Overview

## Modules

### Sticker Creation Module

Accepts a captured image and returns an editable draft of detected regions,
transparent cutouts, outlines, confidence, and inventory match candidates. It
hides orientation repair, preprocessing, object detection, segmentation,
background removal, asset sizing, and temporary-file lifecycle.

### Personal Inventory Module

Resolves detections to existing Items or proposed new Items. It owns stable
identity, names, importance, Sticker Variants, main-sticker selection, and Bag
Template membership. Ambiguous identity is always surfaced to the user.

### Guard Session Module

Owns the central state machine: draft, guarding, temporarily away, awaiting
check, searching, and completed. It accepts user and system events and returns
the new state plus permitted actions. It enforces one current session, preserves
one unfinished draft, and allows explicit item additions while active. Closing
checking with missing items leaves independent recovery records, freeing the
current-session slot. OS adapters never own business state.

### Departure Detection Module

Consumes authorized location and motion observations and emits at most one
Departure Candidate for the current evidence. It hides accuracy filtering,
radius policy, sustained movement, jitter handling, and temporary-away
suppression, plus reliable return observations for resuming after temporary away.
Exact distance and sustained-movement thresholds require physical-device evidence.

### Reminder Policy Module

Decides whether to remind, which items to sample, which actions to expose, and
whether wording is playful or direct. It enforces the one-follow-up maximum for
unconfirmed Important Items. Notification delivery remains an adapter.

Temporary-away expiry is a distinct neutral prompt, sent at most once per selected
interval. No response keeps departure reminders paused until return or user action.

### Journal Module

Projects immutable Guard Session snapshots into Daily Journals, completion
stamps, and cumulative summaries. Later Item edits cannot silently rewrite
historical pages.

Explicit current-session additions and later dated recovery events are valid
updates. Recovery after closure preserves the original departure outcome and
shows “已找回” with the actual date and separate “找回啦” feedback.

### Privacy-Safe Share Module

Creates a redacted share model from an approved Daily Journal selection. It
removes coordinates, detailed times, importance flags, and unselected items
before any image renderer receives the data.

## Interfaces

Interfaces should remain smaller than their implementations:

- Sticker Creation: captured image in; editable sticker draft out.
- Personal Inventory: detection and user decision in; resolved Item out.
- Guard Session: session event in; state and permitted actions out.
- Departure Detection: observation sequence in; candidate or no event out.
- Reminder Policy: state and history in; reminder intent or no reminder out.
- Journal: session snapshots in; date-based journal projection out.
- Privacy-Safe Share: journal selection in; redacted render model out.

Production and test adapters are justified for image processing, location
observations, notifications, persistence, clock, and share rendering. Internal
seams stay private to their owning module.

## Invariants

- One real-world possession maps to one Item; uncertainty is not hidden.
- One Item may own multiple Sticker Variants and belong to many Bag Templates.
- A Guard Session stores selected Item snapshots with stickers or name labels.
  Automatic departure detection requires a valid Guard Point; manual mode does not.
- At most one current session exists; unresolved recovery records do not block it.
- A Guard Point is not a route.
- Important Items require individual departure confirmation.
- A partial notification sample is never presented as the complete checklist.
- Original session photos stay local and are removed after completion unless
  the user explicitly saves them.
- Recovery after closure keeps only a local contextual crop by default, deleted
  when found unless explicitly saved. Name-only items have no photo evidence.
- A draft is not active guarding; temporary-away pauses reminders without closing
  the session. Its timer alone never resumes departure alarms.
- Share rendering cannot read raw sessions or precise locations.
- Reminder escalation is finite.
- The product never describes last-seen evidence as real-time tracking.

## Failure modes

- AI misses an object, creates an unusable cutout, or proposes the wrong Item.
- Two visually identical Items cannot be distinguished reliably.
- Background location is unavailable, inaccurate, delayed, or denied.
- A restroom or counter visit appears to be a permanent departure.
- A notification is delayed, suppressed, or ignored.
- The user forgets to start a manual Guard Session.
- The source photo is incomplete and creates false confidence.
- Rich scrapbook styling makes a safety-critical screen hard to scan.
- Cloud image processing introduces unacceptable privacy, latency, or cost.
- Animation delight becomes repeated-use friction.

Every failure must degrade to an honest, recoverable state. The app may ask for
manual correction or manual checking; it must not manufacture certainty.

Lifecycle constraints and their evidence are recorded in
[ADR 0004](../adr/0004-session-and-recovery-lifecycle.md).
