@wiki id=dont-lost-it-prototype-plan type=runbook domain=projects state=draft
@summary Figma prototype scope covering eight critical flows, scrapbook visual states, motion studies, and usability-test tasks.
@terms Figma, prototype, wireframe, interaction design, scrapbook UI
@links dont-lost-it-prd, dont-lost-it-development-process, dont-lost-it-data-flow

# Figma Prototype Plan

## Objective

Validate that the product is simultaneously delightful enough to revisit and
clear enough to prevent loss. The prototype must test the complete behavioral
loop rather than a gallery of attractive isolated screens.

## Critical flows

### 1. Today Journal and start

- Empty-day and returning-user states.
- One dominant “剪下今天带来的东西” action.
- Active-session state replaces the start action with session status.

### 2. Capture and AI outline

- Camera guidance for a spread-out tabletop.
- Processing state.
- Successful detections, missed detection, processing failure, and retry.

### 3. Cut, stack, and paste

- Tap an outline to animate scissors around the object.
- Rapid multi-tap without blocking.
- One-tap collect-all for familiar detections.
- Sticker stack, confirmation, auto-layout, and guard-start transition.

### 4. Identity resolution

- Confident existing Item.
- Two similar candidate Items.
- Create new Item.
- Correct a mistaken association.
- Add an off-camera Item or a suggestion from a Bag Template.

### 5. Active guard

- Guard Point, elapsed time, selected Items, and privacy explanation.
- Location and notification permission prompts in context.
- Manual-check fallback when permission is denied.

### 6. Departure and checklist

- Playful first notification with a partial item sample.
- `只是暂离` duration selection.
- `准备离开` full checklist.
- Bulk ordinary-item confirmation and individual Important Item confirmation.
- Direct one-time follow-up for an ignored Important Item.

### 7. Missing-item recovery

- `还没找到` transition.
- Sticker, highlighted source-photo region, Guard Point, time, and recent
  appearances.
- `找到了` and `暂时找不到` endings.

### 8. Daily Journal and share

- Multiple session cards under one day.
- `全员归队` stamp and cumulative collection.
- Optional layout editing.
- Privacy controls, exact share preview, and exported vertical card.

## Visual directions to explore

All directions must use real cutout stickers and remain recognizably scrapbook
rather than becoming a generic cartoon game.

1. **Quiet study journal:** warm paper, restrained tape, pencil annotations,
   muted academic colors.
2. **Playful sticker album:** brighter accents, layered labels, lively stamps,
   stronger object voices.
3. **Modern editorial scrapbook:** clean grid, generous whitespace, tactile
   cutouts, limited hand-drawn details.

Evaluate each direction on collectibility, glanceability, accessibility,
animation fit, and ease of producing daily share cards.

## Design-system inventory

- Color, typography, spacing, paper texture, borders, shadows, and focus states.
- Item outline, uncut object, cut Sticker Variant, stack, selected, important,
  missing, and returned states.
- Journal card, Bag Template, Item Library card, checklist row, place label,
  privacy note, permission explainer, notification preview, and stamp.
- Motion tokens for scan, cut, stack, paste, shake, highlight, and stamp.
- Reduce Motion alternatives for every essential transition.

## Prototype fidelity rules

- Low fidelity validates sequence, hierarchy, state, copy, and recovery.
- High fidelity begins only after the low-fidelity gate passes.
- Use representative student belongings rather than abstract placeholders.
- Never hide a required action inside decorative animation.
- Make the complete checklist visually unmistakable.
- Use fake locations and synthetic belongings in design artifacts.

## Test evidence to capture

- Time to begin the first Guard Session.
- Missed taps, backtracking, and requests for explanation.
- Whether users understand Item versus Sticker Variant.
- Whether users recognize a notification sample as incomplete.
- Whether “只是暂离” is discoverable and correctly interpreted.
- Whether users can recover from an ambiguous AI match.
- Whether the journal is attractive enough to save or share voluntarily.
- Any privacy concern raised without prompting.
