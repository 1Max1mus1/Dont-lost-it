@wiki id=dont-lost-it-prototype-plan type=runbook domain=projects state=draft
@summary Figma prototype scope covering eight critical flows, scrapbook visual states, motion studies, and usability-test tasks.
@terms Figma, prototype, wireframe, interaction design, scrapbook UI
@links dont-lost-it-prd, dont-lost-it-development-process, dont-lost-it-data-flow

# Figma Prototype Plan

## Objective

Validate that the product is simultaneously delightful enough to revisit and
clear enough to prevent loss. The prototype must test the complete behavioral
loop rather than a gallery of attractive isolated screens.

## Current planning evidence

Updated 2026-11-02 (Asia/Shanghai). The [interaction decisions](interaction-decisions.md)
and [user flows](user-flows.md) are connected in the [29-state low-fidelity
prototype](low-fidelity-page-inventory.md). The user has selected a [vintage
Traveler's Notebook collage direction](visual-direction.md), with visual samples
for Today Journal, Active Guard and Departure Checklist plus three Today Journal
compositions. Independent usability evidence, full Figma production and device
validation remain pending. Visual exploration does not pass the low-fidelity gate.

## Critical flows

### 1. Today Journal and start

- Empty-day and returning-user states.
- One dominant “剪下今天带来的东西” action.
- Active-session state replaces the start action with session status.
- Direct first-run entry without standalone onboarding; journal/item-library tabs,
  calendar history, bag templates inside inventory and settings at upper right.
- Secondary existing-item route, template items initially unchecked with select-all.
- Restore/discard one draft; a draft must not imply active protection.
- Resolve the existing current session before starting another.

### 2. Capture and AI outline

- Camera guidance for a spread-out tabletop.
- Processing state.
- Successful detections, missed detection, processing failure, and retry.
- Manual-name fallback when image processing fails; off-camera new Items without
  stickers use handwritten name labels.

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
- Review editable suggested names together, without mandatory per-item naming popups.
- Optional importance toggles and an inline off-camera addition prompt.

### 5. Active guard

- Guard Point, elapsed time, selected Items, and privacy explanation.
- Location and notification permission prompts in context.
- Manual-check fallback when permission is denied.
- Explain permissions after item confirmation; offer automatic reminders or manual
  checking before native requests, and clearly label manual mode.
- Always-visible manual departure checking and in-session item additions.

### 6. Departure and checklist

- Playful first notification with a partial item sample.
- `只是暂离` duration selection.
- `准备离开` full checklist.
- Bulk ordinary-item confirmation and individual Important Item confirmation.
- Direct one-time follow-up for an ignored Important Item.
- Ordinary Items also support individual checks and missing-item actions.
- Short-distance filtering is a device-validation target; farther intentional
  absence uses temporary away without closing the session.
- Reliable-return resumption plus `我回来了`; one neutral expiry prompt if still
  away, continued suppression after no response, and extend/check actions.

### 7. Missing-item recovery

- `还没找到` transition.
- Sticker, highlighted source-photo region, Guard Point, time, and recent
  appearances.
- `找到了` and `暂时找不到` endings.
- Close checking while retaining independent unresolved records; no all-returned
  stamp, no blockage of a new session.
- Local contextual crop retention after closure, deletion after recovery unless
  saved, and honest name-only states without fabricated photo evidence.
- Later found date and `找回啦` animation/stamp, distinct from all-returned;
  static history replay and Reduce Motion alternative.

### 8. Daily Journal and share

- Multiple session cards under one day.
- `全员归队` stamp and cumulative collection.
- Optional layout editing.
- Privacy controls, exact share preview, and exported vertical card.
- Journal Items initially included, tap to hide; precise place, detailed times
  and importance flags hidden by default, export only after preview confirmation.

## Selected visual direction

The user selected a vintage Traveler's Notebook collage reference on 2026-11-02.
The [visual direction](visual-direction.md) records warm paper, kraft stock, washi
tape, stamps, handwriting, muted academic colors and real item cutouts. Three Today
Journal compositions explore free collage, editorial grid and open-notebook layouts;
they are compositions within one direction, not three competing brand systems.

All samples must remain recognizably scrapbook rather than becoming a generic
cartoon game. Evaluate collectibility, glanceability, accessibility, animation fit
and ease of producing daily share cards.

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
- Full high-fidelity Figma production begins after the low-fidelity gate passes.
  Small throwaway visual-direction samples may be explored earlier; they do not
  pass the low-fidelity gate or start full phase-3 production.
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
- Understanding of manual mode versus drafts and paused reminder state.
- Whether temporary-away expiry without response causes mistaken expectations.
- Whether users distinguish original departure success from later recovery.

## Next deliverable

Review the [visual-direction samples](visual-direction.md), select or combine the
Today Journal compositions and verify that Active Guard and Departure Checklist
remain glanceable. In parallel, run the eight low-fidelity tasks with independent
new users and begin the image and departure spikes. Record evidence before full
high-fidelity Figma production. Final copy, motion timings and device thresholds
remain open.
