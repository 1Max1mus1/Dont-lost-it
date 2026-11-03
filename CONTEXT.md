# Project Language

This file defines the canonical product language. Use these terms consistently
in product design, code, analytics, tests, and user-facing documentation.

## Core terms

### Item / 物品

One specific real-world possession, not a generic category. A user's AirPods
and over-ear headphones are separate Items even though both are headphones.

### Sticker Variant / 贴纸版本

A transparent-background cutout created from one photograph of an Item. One
Item has one stable identity and may accumulate many Sticker Variants. One
variant can be selected as the main sticker.

### Item Library / 物品栏

The user's persistent collection of Items. Repeated recognition should resolve
to an existing Item whenever confidence is sufficient and the user agrees.

### Bag Template / 包包模板

A reusable list of Item references such as “上课包”. It is a planning preset,
not a claim about an Item's current physical location. One Item may belong to
several Bag Templates.

### Guard Session / 守护任务

One user-started record-and-check cycle at one temporary location. A Guard Session
starts after the user confirms selected items (stickers or name labels) and ends
after the user completes or explicitly closes the item check. At most one current
session exists. Independent unresolved recovery records may remain after closure.

### Guard Point / 守护点

The fixed place recorded when location is available for a Guard Session. It is
not a continuous route or a real-time tracker. Manual sessions without location
must not invent a guard point or claim automatic departure detection.

### Departure Candidate / 离场候选

A system inference that the user has meaningfully moved away from a Guard
Point. It is a prompt to check, not proof that the user has permanently left.

### Temporarily Away / 只是暂离

A user-selected state for intentional longer-distance departures, such as leaving
belongings at the library while going to lunch. It preserves the session and pauses
departure reminders. Nearby movement should instead be filtered automatically.
The selected duration triggers at most one neutral expiry prompt; no response
keeps reminders paused until return or explicit action. Reliable return detection
or “我回来了” resumes the session's reminder behavior.

### Important Item / 重要物品

An Item that must be confirmed individually during departure checking. Ordinary
items may be confirmed together.

### Last Seen Record / 最近出现记录

Evidence that an Item was recorded in a Guard Session, including its sticker or
name, available location, time, and photo evidence when available. After closure,
unresolved recovery keeps only a local contextual crop, not the full source photo
by default. Delete the crop when found unless explicitly saved. Name-only items
have no fabricated photo evidence. A record does not prove the Item remained there.

### Name Label / 手写名称标签

A text representation for an off-camera or manually added Item without a usable
sticker. It allows manual guarding without inventing a photo or requiring a cutout.

### Recovery Record / 待找回记录

An unresolved item record that can persist independently after the user explicitly
closes departure checking. It does not block a new Guard Session. Later recovery
updates the historical card with the actual recovery date and “已找回”.

### Found Again / 找回啦

The distinct recovery stamp and one-time feedback after later finding an item.
The original departure outcome is preserved; no retroactive “全员归队” is awarded.

### Daily Journal / 每日手账

A date-based visual projection containing one or more Guard Session cards. It
supports reflection and sharing without merging the underlying sessions.

### All Returned / 全员归队

The visual stamp awarded when all required Item confirmations finish during
departure checking. Closing with unresolved items does not award it; later
recovery uses “找回啦” and the actual recovery date.

## Product distinctions

- A **partial notification sample** attracts attention; it is never the full
  checklist.
- An **Item** is stable; a **Sticker Variant** captures one visual appearance.
- A **Bag Template** is reusable; a **Guard Session** is a historical snapshot.
- A **Guard Point** records one place; the product does not record a route.
- **Last seen** is evidence from a past session; it is not real-time tracking.
- **Accumulation** rewards genuine use; there is no punitive strict streak.
