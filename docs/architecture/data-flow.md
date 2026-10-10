@wiki id=dont-lost-it-data-flow type=module domain=projects state=draft
@summary End-to-end data flow from photo capture through sticker identity, guarding, departure checking, recovery, journal, and sharing.
@terms Don't Lose It, data flow, capture, guard session, reminder
@links dont-lost-it-architecture

# Data Flow

## Inputs

- A user-captured tabletop photo.
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
   and one Guard Point, then enters `guarding`.

### Movement to departure check

1. The location adapter supplies observations while a session is active.
2. Departure Detection filters poor accuracy and location jitter.
3. When distance and sustained movement meet policy, it emits one Departure
   Candidate.
4. Guard Session enters `awaiting-check`.
5. Reminder Policy produces a playful reminder with a clearly partial item
   sample and actions for `只是暂离` and `准备离开`.
6. `只是暂离` moves the session to `temporarily-away` for the chosen duration.
7. `准备离开` opens the full checklist.

### Check to completion or search

1. Ordinary Items may be confirmed together; Important Items are confirmed
   individually.
2. If all required confirmations finish, the session becomes `completed`, the
   journal receives the `全员归队` stamp, and the original photo is deleted
   unless explicitly retained.
3. If an Item is missing, the session becomes `searching`.
4. The app shows the Sticker Variant, highlighted source-photo region, Guard
   Point, time, and recent Guard Sessions containing that Item.
5. `找到了` completes that Item; `暂时找不到` retains the Last Seen Record
   without infinite reminders.

### Journal to share card

1. Journal groups immutable session cards by the user's local calendar date.
2. The user selects which Items and coarse context may appear.
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
