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
items after arriving and unpacking, confirms AI cutouts, starts a location-bound
session, and checks items when departure is detected.

The MVP includes personal item identity, sticker variants, optional bag
templates, tiered item confirmation, temporary-away handling, last-seen
evidence, daily journals, and privacy-safe share cards.

Mature automatic activation, Android, continuous route tracking, real-time item
tracking, phone protection, and an in-app social network are out of scope.

## Run

There is no application implementation yet. Clone the repository and use the
project wiki to continue product and prototype work:

```powershell
git clone https://github.com/1Max1mus1/Dont-lost-it.git
cd Dont-lost-it
```

Implementation setup commands will be added after the iOS technical stack and
minimum supported OS version are selected.

## Key entry points

- [`docs/PRD.md`](docs/PRD.md): complete MVP product requirements.
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

As of 2026-10-11 (Asia/Singapore), product discovery and the first PRD are
complete. The project-local wiki is initialized. No production app code exists.
The next approved work is low-fidelity flow design followed by technical spikes
and a high-fidelity Figma prototype.
