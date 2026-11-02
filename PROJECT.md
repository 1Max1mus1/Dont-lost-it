@wiki id=dont-lost-it-overview type=project-overview domain=projects state=draft
@summary iPhone AI scrapbook that records visible belongings and prompts a departure checklist at temporary study locations.
@terms Don't Lose It, 防遗失, AI 手账, item guardian, scrapbook
@links dont-lost-it-prd, dont-lost-it-architecture, dont-lost-it-current-progress

# Don't Lose It

## Purpose

Help students avoid leaving small personal belongings behind after studying in
libraries and cafés. The product combines a useful departure reminder with a
collectible visual ritual: AI turns the user's real belongings into stickers
that become both the current checklist and a daily scrapbook.

## Scope

The MVP targets iPhone and manually started guard sessions. A user photographs
items after arriving and unpacking or selects existing items, confirms cutouts
or name labels, and starts guarding. Automatic departure reminders require
permissions and a guard point; manual checking remains available without them.

The MVP includes personal item identity, sticker variants, optional bag
templates, tiered item confirmation, temporary-away handling, last-seen
evidence, daily journals, and privacy-safe share cards.

Mature automatic activation, Android, continuous route tracking, real-time item
tracking, phone protection, and an in-app social network are out of scope.

## Run

There is no production application implementation yet. Clone the repository and
use the project wiki to continue product and prototype work:

```powershell
git clone https://github.com/1Max1mus1/Dont-lost-it.git
cd Dont-lost-it
```

Run the throwaway low-fidelity prototype from the repository root:

```powershell
python -m http.server 4173 --directory docs/design/low-fidelity-prototype
```

Open `http://localhost:4173/?variant=A`. For the vintage visual samples, run
`python -m http.server 4174 --directory docs/design/visual-direction-prototype`
and open `http://localhost:4174/?variant=A`. Camera, AI, location, permissions and
export are simulated in memory. Implementation setup commands will be added after
the iOS technical stack and minimum supported OS version are selected.

## Key entry points

- [`docs/PRD.md`](docs/PRD.md): complete MVP product requirements.
- [`docs/README.md`](docs/README.md): human-readable guide to all Markdown documents.
- [`docs/design/interaction-decisions.md`](docs/design/interaction-decisions.md):
  user-confirmed design interview outcomes and remaining open questions.
- [`docs/design/user-flows.md`](docs/design/user-flows.md): Markdown user flows
  derived from the PRD and design interview.
- [`docs/design/low-fidelity-page-inventory.md`](docs/design/low-fidelity-page-inventory.md):
  29 page states, prototype run command and eight validation paths.
- [`docs/design/visual-direction.md`](docs/design/visual-direction.md): selected
  vintage collage direction, tokens and high-fidelity visual samples.
- [`CONTEXT.md`](CONTEXT.md): canonical domain terms and distinctions.
- [`docs/architecture/overview.md`](docs/architecture/overview.md): module map,
  interfaces, invariants, and failure modes.
- [`docs/architecture/data-flow.md`](docs/architecture/data-flow.md): capture,
  guard, departure, search, journal, and share flows.
- [`docs/planning/development-process.md`](docs/planning/development-process.md):
  staged delivery plan and quality gates.
- [`docs/design/prototype-plan.md`](docs/design/prototype-plan.md): Figma scope,
  states, and usability-test tasks.
- [`docs/progress/current.md`](docs/progress/current.md): current evidence,
  risks, and next work.

## Current state

As of 2026-11-02 (Asia/Shanghai), product definition and clickable low-fidelity
flows are recorded, and the user has selected a vintage Traveler's Notebook collage
direction. Three high-fidelity visual samples and three Today Journal compositions
exist for review. Independent usability evidence, full Figma production, technical
spikes and production app code remain pending; no evidence gate has been skipped.
