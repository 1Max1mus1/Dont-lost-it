@wiki id=dont-lost-it-development-process type=runbook domain=projects state=draft
@summary Stage-gated delivery plan from confirmed PRD through Figma validation, iPhone vertical slice, campus pilot, and beta.
@terms development process, roadmap, stage gates, Figma, iPhone MVP
@links dont-lost-it-prd, dont-lost-it-prototype-plan, dont-lost-it-current-progress

# Development Process

This process keeps the useful parts of a large product organization—clear
artifacts, parallel risk reduction, review gates, and measurable evidence—while
remaining lightweight enough for a student-led project.

## Operating principles

- Validate the riskiest assumption before scaling implementation.
- Keep one canonical artifact for each kind of decision.
- Design and technical discovery may run in parallel after the PRD is stable.
- Build vertical user outcomes rather than isolated technical layers.
- A stage ends only when its evidence gate is satisfied.
- Update `docs/progress/current.md` whenever a gate is passed or a major risk
  changes.

## Phase 0 — Product definition

Status: complete.

Deliverables:

- Confirmed problem, audience, first scenarios, and positioning.
- MVP PRD with user stories, privacy rules, success metrics, and exclusions.
- Canonical domain language and proposed module architecture.

Gate:

- The product can be explained in one sentence.
- MVP and non-MVP behavior are distinguishable.
- Core flows contain no unresolved product decision that blocks prototyping.

## Phase 1 — Low-fidelity experience design

Status: next.

Deliverables:

- End-to-end user-flow map.
- Low-fidelity screens for the critical happy path and recovery states.
- Permission timing, reminder actions, missing-item flow, and degraded states.
- A clickable prototype with no final visual polish.

Gate:

- A new user can complete the first guard flow without verbal explanation.
- Every destructive, privacy-sensitive, and failure action has a visible exit or
  recovery path.
- The prototype covers the eight tasks in `docs/design/prototype-plan.md`.

## Phase 2 — Parallel risk spikes

Status: planned; begins once the low-fidelity flow stabilizes.

### Image spike

- Test common student belongings under varied lighting and backgrounds.
- Measure detection, segmentation, transparent-edge quality, latency, and cost.
- Compare feasible on-device and cloud-assisted approaches.
- Produce sample Sticker Variants suitable for visual-design work.

### Departure spike

- Test one manually started session at a real library and café.
- Record only consented synthetic or team-owned traces.
- Explore accuracy filtering, radius, sustained movement, background execution,
  notification timing, and permission degradation.
- Document what iOS can reliably guarantee and what remains heuristic.

Gate:

- A recommended implementation path exists for each spike.
- Known limits are reflected in UX copy and the PRD.
- Neither spike reveals a blocker that invalidates the core promise.

## Phase 3 — Visual system and high-fidelity Figma prototype

Deliverables:

- Two or three scrapbook visual directions using the same low-fidelity flow.
- One selected design direction and reusable design tokens.
- Components for item stickers, outlines, stacks, journal cards, buttons,
  checklists, permission explanations, notifications, and stamps.
- Interactive motion studies for scan, cut, stack, paste, departure, and return.
- A high-fidelity prototype sized for the selected iPhone baseline.

Gate:

- Rich journal screens feel collectible.
- Departure and recovery screens remain legible at a glance.
- Animations allow rapid input, Reduce Motion alternatives, and skip paths.
- Prototype copy clearly distinguishes partial samples from complete lists.

## Phase 4 — Prototype usability test

Participants: five students who use iPhones and regularly study in libraries or
cafés. Include both self-described forgetful and organized users.

Tasks:

- Complete first use and create a Guard Session.
- Correct an ambiguous item match.
- Add an off-camera item.
- Respond to a departure prompt as temporarily away.
- Complete an actual departure check.
- Find a missing-item Last Seen Record.
- Review the Daily Journal.
- Generate a privacy-safe share card.

Gate:

- All participants can finish the core happy path.
- Major confusion is resolved in the prototype and PRD before app development.
- Visual appeal and utility both meet the qualitative bar; neither is accepted
  as compensation for failure of the other.

## Phase 5 — Engineering design and backlog

Deliverables:

- Chosen iOS technology stack and minimum supported iOS version.
- Persistence schema and privacy retention plan.
- Module-interface contracts and adapter choices.
- Analytics event dictionary excluding photos and precise coordinates.
- Tracer-bullet implementation issues with acceptance criteria.
- Test plan mapped to module interfaces and end-to-end behaviors.

Gate:

- The first vertical slice can be implemented without inventing product rules.
- Risks have owners, evidence plans, and bounded fallback behavior.
- Every issue produces a demonstrable user-visible increment.

## Phase 6 — Vertical-slice internal alpha

Build one complete path before expanding breadth:

1. Capture one photo.
2. Use controlled or stubbed detections to select one or more Items.
3. Create stickers and an active Guard Session.
4. Inject or simulate a Departure Candidate.
5. Complete the checklist.
6. Create the Daily Journal card and delete the temporary photo.

Replace controlled adapters with production image and location adapters only
after the state flow and persistence behavior are stable.

Gate:

- The complete path runs on a physical iPhone.
- Core module behavior is covered through public interfaces.
- Privacy lifecycle is observable and verified.
- No critical crash, data-loss, or stuck-session issue remains.

## Phase 7 — Campus pilot

Participants: 5–8 classmates for one week.

Measure the PRD success metrics: first-session completion time, voluntary repeat
use, reminder timing, false alerts, correction friction, journal saves, share
generation, and any prevented loss.

Gate:

- At least half of participants voluntarily complete three Guard Sessions.
- Reminder behavior is useful enough to continue iteration.
- Cutout and journal quality are good enough that users choose to keep or share
  the result.

## Phase 8 — Beta and V1 decision

- Fix pilot blockers and repeat the smallest necessary validation.
- Add onboarding polish, accessibility, crash reporting, support copy, and
  privacy disclosures.
- Decide whether automation, accounts, cloud backup, payments, or Android earn
  inclusion based on evidence rather than roadmap momentum.
- Publish only when the manual Guard Session is trustworthy and repeatable.

## Git workflow across computers

Before starting work:

```powershell
git switch main
git pull --rebase
git switch -c codex/short-task-name
```

Before sharing work:

```powershell
git status
git diff --check
git add <intended-files>
git commit -m "type: concise outcome"
git push -u origin codex/short-task-name
```

Use pull requests for implementation and major product changes. Small canonical
documentation setup may be committed directly to `main` when explicitly
authorized. Never develop separately on two computers without pulling first.

## Definition of done

- User-visible behavior matches the current PRD and prototype.
- Relevant module-interface tests and end-to-end checks pass.
- Accessibility and degraded-permission paths have been exercised.
- No private image, exact location trace, credential, or user-test recording is
  committed.
- Architecture, ADRs, generated reference, and current progress are updated in
  the same change that makes them stale.
- The change is reviewable as one coherent outcome.
