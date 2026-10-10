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

One capture-and-check cycle at one temporary location. A Guard Session starts
after the user confirms selected stickers and ends after the user completes or
explicitly closes the item check.

### Guard Point / 守护点

The fixed place recorded when a Guard Session starts. It is not a continuous
route or a real-time tracker.

### Departure Candidate / 离场候选

A system inference that the user has meaningfully moved away from a Guard
Point. It is a prompt to check, not proof that the user has permanently left.

### Temporarily Away / 只是暂离

A user-selected Guard Session state for restroom, counter, or short-break
scenarios. It suppresses repeated departure decisions for a chosen duration.

### Important Item / 重要物品

An Item that must be confirmed individually during departure checking. Ordinary
items may be confirmed together.

### Last Seen Record / 最近出现记录

Evidence that an Item appeared in a Guard Session, including its Sticker
Variant, Guard Point, time, and temporary source-photo region when available.
It does not prove the Item remained there after the photograph.

### Daily Journal / 每日手账

A date-based visual projection containing one or more Guard Session cards. It
supports reflection and sharing without merging the underlying sessions.

### All Returned / 全员归队

The completion state and visual stamp used when required Item confirmations are
finished.

## Product distinctions

- A **partial notification sample** attracts attention; it is never the full
  checklist.
- An **Item** is stable; a **Sticker Variant** captures one visual appearance.
- A **Bag Template** is reusable; a **Guard Session** is a historical snapshot.
- A **Guard Point** records one place; the product does not record a route.
- **Last seen** is evidence from a past session; it is not real-time tracking.
- **Accumulation** rewards genuine use; there is no punitive strict streak.
