@wiki id=dont-lost-it-data-flow type=module domain=projects state=draft
@summary End-to-end data flow from photo capture through sticker identity, guarding, departure checking, recovery, journal, and sharing.
@terms Don't Lose It, data flow, capture, guard session, reminder
@links dont-lost-it-architecture

# Data Flow

## Inputs

- A user-captured tabletop photo, existing Item selection, or manual names.
- User taps selecting outlined objects.
- Identity decisions for existing, ambiguous, or new Items.
- Optional Bag Template suggestions and off-camera additions.
- One Guard Point and session start time.
- Authorized location and motion observations.
- Notification actions and checklist confirmations.
- Explicit journal edit and share selections.

## Transformations

### Capture to active guard

1. Camera adapter returns a local image.
2. Sticker Creation produces an editable detection draft.
3. The user selects, removes, or manually adds objects.
4. Personal Inventory resolves each selected object to an Item.
5. Current cutouts become Sticker Variants linked to stable Items.
6. The user confirms the stack; Journal auto-layout creates a session card.
7. Guard Session records selected snapshots, start time, source-photo regions,
   and one Guard Point when location is available, then enters `guarding`.

The existing-item route reuses stickers; a manually added Item without one uses a
name label. Detection failure allows retry or manual continuation. The confirmation
page collects editable suggested names, optional importance and off-camera additions.
First-time permission explanation offers automatic reminders or manual checking;
denial must not block manual use. One draft can be restored or discarded, but it
never claims active protection.

At most one current session exists. Opening a new one first routes through the old
check. Users may add items to the current session without changing its place or card.

### Movement to departure check

1. The location adapter supplies observations while a session is active.
2. Departure Detection filters poor accuracy and location jitter.
3. When distance and sustained movement meet policy, it emits one Departure
   Candidate.
4. Guard Session enters `awaiting-check`.
5. Reminder Policy produces a playful reminder with a clearly partial item
   sample and actions for `只是暂离` and `准备离开`.
6. `只是暂离` moves the session to `temporarily-away`, preserving items and pausing
   departure reminders. It is also available before departure from the active page.
7. `准备离开` opens the full checklist.

Near-distance movement should be filtered, not require a temporary-away action.
Temporary away covers intentional farther trips such as lunch while belongings
remain at the library. At the selected 10 / 30 / 60 minute interval, if still away,
send one neutral prompt to extend or check. No response keeps reminders paused.
Reliable return detection or `我回来了` resumes. The active page always exposes
manual checking, including when automatic reminders are enabled.

### Check to completion or search

1. Ordinary Items may be confirmed together or individually; Important Items are
   confirmed individually. Each Item can instead be marked missing.
2. If all required confirmations finish, the session becomes `completed`, the
   journal receives the `全员归队` stamp, and the original photo is deleted
   unless explicitly retained.
3. If an Item is missing, the session becomes `searching`.
4. The app shows the Sticker Variant, highlighted source-photo region, Guard
   Point, time, and recent Guard Sessions containing that Item.
5. `找到了` during checking completes that Item. `暂时找不到` allows explicit
   closure with independent unresolved records, no `全员归队` stamp and no infinite
   reminders; a new session is then allowed.
6. On closure with unresolved records, retain only local contextual crops for
   missing Items; delete the full original by default. No photo input means no
   fabricated source-photo region. Explicit user saving remains an exception.
7. Later recovery appends the actual found date, changes the historical display to
   `已找回`, and gives distinct `找回啦` feedback; it does not rewrite the original
   departure result or retroactively award `全员归队`. Delete the recovery crop
   unless explicitly saved. Replay of the historical card remains static.

### Journal to share card

1. Journal groups session snapshots by the user's local calendar date; explicit
   later recovery events are appended without rewriting the departure outcome.
2. A preview initially includes journal Items; the user may hide any of them.
   Precise locations, detailed times and importance flags are hidden by default.
3. Privacy-Safe Share creates a redacted render model.
4. The renderer exports a vertical image only from that model.

## Outputs

- Persistent Item records and Sticker Variants.
- Optional Bag Templates.
- Active and historical Guard Session snapshots.
- One fixed Guard Point per session, never a route.
- Bounded local notification intents.
- Last Seen Records for unresolved Items.
- Daily Journal pages and cumulative completion counts.
- Privacy-safe exported share images.

Raw photos are temporary by default. Precise coordinates and raw location
observations never flow into analytics or the share renderer.

See [user flows](../design/user-flows.md) for the user-facing Markdown diagrams
and [ADR 0004](../adr/0004-session-and-recovery-lifecycle.md) for lifecycle decisions.
