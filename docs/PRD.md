@wiki id=dont-lost-it-prd type=project-overview domain=projects state=draft
@summary MVP requirements for an iPhone AI item-guardian scrapbook focused on libraries and cafés.
@terms PRD, MVP, AI 手账, 防遗失, product requirements
@links dont-lost-it-overview, dont-lost-it-architecture, dont-lost-it-development-process

# AI 随身物品守护手账 PRD

> 状态：V0.2 已确认
>
> 更新：2026-10-11（Asia/Singapore）
>
> 平台：iPhone
>
> 首批用户：大学生
>
> 首批场景：图书馆与咖啡馆
> 核心定位：把桌上的随身物品剪成贴纸，离开时逐件叫你带走的 AI 手账。

## Product Summary

这是一款兼具实用提醒与情感收藏价值的 AI 产品。用户到达图书馆或咖啡馆后，拍摄桌面上准备使用的物品。AI 识别物品并描边，用户通过“剪刀裁剪”交互把真实物品变成个人贴纸，确认后自动贴入当天手账并开启守护。

App 在用户离开守护地点时提醒核对物品。普通物品可以一次确认，电脑、钥匙、证件等重要物品必须逐件确认。完成核对后，本次手账获得“全员归队”印章。用户可以积累物品贴纸、按天回顾守护记录，并生成隐私安全的分享卡。

产品不是实时追踪器，也不是通用库存管理工具。它解决的是一个更具体的问题：用户在临时地点使用多件随身物品后，离场时可能无感地遗漏一两件小物品。

## Problem Statement

大学生在图书馆和咖啡馆学习时，经常会把电脑、平板、触控笔、耳机、充电器、水杯、门禁卡等物品分散摆放在桌面、椅背或桌下。离开时通常处于赶时间、聊天或切换任务的状态，很容易遗漏一两件小物品，而且不会立即察觉。

现有做法存在明显不足：

- 依靠记忆核对不稳定，尤其在物品多或注意力被打断时。
- 普通清单需要手动维护，不能反映某次真实使用了哪些物品。
- 单纯拍照虽然留下证据，但不会在正确的离场时刻主动提醒。
- 蓝牙追踪器适合少数贵重物品，不适合给所有充电线、触控笔或门禁卡逐个安装。
- 传统防丢工具强调风险和警报，缺少让用户愿意每天主动打开的视觉与情感体验。

用户需要一种低摩擦的方法，在开始学习时快速记录本次摊开的物品，并在离场时得到及时、清晰且不令人厌烦的提醒。与此同时，记录过程本身应足够好看、有趣，能够形成每日手账与收藏习惯。

## Product Goals

1. 让首次用户在两分钟内完成拍照、选择物品、生成贴纸并开始守护。
2. 在用户离开图书馆或咖啡馆时，及时触发可操作的物品核对提醒。
3. 通过个人贴纸、每日手账和累计印章建立长期使用意愿。
4. 对物品照片与位置数据采取默认克制、透明、可删除的隐私策略。
5. 用真实使用行为验证产品价值，而不是仅依赖概念好感度。

## Success Metrics

第一轮由 5–8 位可持续访谈的大学生进行为期一周的测试。

- 所有测试者能够在无需口头指导的情况下，于两分钟内完成首次守护。
- 至少一半测试者在一周内主动完成 3 次或以上守护，而不是被研究者提醒后才使用。
- 大多数有效离场提醒在用户离开守护点约 3 分钟或 150 米内出现；具体阈值通过测试调整。
- 明显误报控制在每位用户每天不超过一次。
- 至少一半测试者主动保存一张每日手账或生成一张分享卡。
- AI 识别或匹配错误可以在数秒内被用户修正，不导致任务中断。
- 任何一次“提醒使用户及时找回原本会遗漏的物品”都作为强价值信号单独记录，但不要求所有用户在一周内遇到遗失事件。

## Solution

### 1. 今日手账首页

App 默认打开“今日手账”，而不是直接启动相机。首页突出唯一的主操作：“剪下今天带来的东西”。正在守护时，主操作切换为查看当前守护状态。

同一天可以包含多张守护卡片，例如上午的图书馆和下午的咖啡馆。数据上每次守护彼此独立，视觉上统一收纳在当天手账中。

### 2. 拍照、识别与剪贴

用户到达图书馆或咖啡馆并展开准备使用的物品后，拍摄一张桌面照片。系统完成以下流程：

1. 扫描照片并识别可见物品。
2. 给识别出的物品显示清晰轮廓。
3. 用户逐件点击需要守护的物品。
4. 剪刀沿轮廓裁剪，物品成为带白边的照片贴纸。
5. 已裁剪贴纸落下并叠成一摞。
6. 用户确认后，贴纸自动排版进本次手账卡片。
7. 守护任务立即开始。

逐件点击同时承担两个作用：确认 AI 识别结果，以及选择本次真正需要守护的物品。用户可以连续快速点击，动画不得阻塞下一次输入。对大量熟悉物品提供“一键剪下全部”。AI 漏识别时，用户可以手动圈选或添加已有物品。

### 3. 个人物品栏

物品栏保存用户已经确认过的具体物品，而不是只保存通用品类。

例如，“通勤 AirPods Pro”和“黑色头戴式耳机”属于同一品类，但拥有不同的物品档案、重要等级、主贴纸和历史记录。

识别匹配分为三种情况：

- 高置信度匹配已有物品：默认关联，但必须让用户能够轻松纠正。
- 存在多个相似候选：询问“这是哪一个？”或“这是新物品吗？”
- 无可靠候选：建议创建新物品。

外观完全相同的多个物品无法仅靠视觉可靠区分，系统必须让用户手动选择，不得伪装成确定识别。

每个具体物品在物品栏中只存在一次，但可以积累多个不同角度、光线和日期产生的贴纸版本。物品拥有一张主贴纸，本次裁出的新贴纸用于当前手账，用户可以选择将其设为新的主贴纸。

### 4. 包包模板

“包包”是一套引用物品栏条目的常用清单模板，而不是严格的物理库存位置。

- 同一件物品可以出现在多个包包模板中。
- 用户可以创建“上课包”“咖啡馆学习包”等模板。
- 选择包包后，系统可以提示常见但未入镜的物品。
- 用户不必先选择包包，可以直接拍照开始守护。
- 守护任务可以包含口袋、手提或临时携带、不属于任何包包模板的物品。

### 5. 守护任务

用户确认贴纸清单后，系统在设备本地创建守护任务，记录开始时间和固定守护点。系统不保存两地之间的完整移动路线。

守护任务至少包含以下状态：

- 草稿：照片已拍摄，但用户尚未确认物品。
- 守护中：物品清单和守护点已确认。
- 暂时离开：用户明确表示稍后返回，离场判断暂时静默。
- 待核对：系统判断用户正在离开，等待用户处理提醒。
- 寻找中：至少一件物品尚未找到。
- 已完成：所有必要物品均已确认，或用户明确结束任务。

开始守护后，原始照片仅保存在设备本地。任务完成后自动删除，除非用户主动选择将完整照片保存在手账中。

### 6. 离场判定

MVP 仅支持用户主动开始的守护任务。系统根据守护点、离开距离和持续移动综合判断离场，不因一次位置漂移或短距离走动立即触发。

初始测试参数可以采用约 100 米离开半径与持续移动条件，但这些数值属于可调策略，不应散落硬编码在界面或业务流程中。

定位被拒绝时，用户仍可创建贴纸、使用物品栏、编辑每日手账，并通过手动结束守护进入核对页；只是无法获得自动离场提醒。

### 7. 提醒与核对

第一次离场提醒使用轻松、有角色感的物品拟人文案，并展示 2–3 件物品以吸引注意，例如：“AirPods 说它不想独自在咖啡馆过夜。”通知中的部分物品不得被呈现为完整清单；用户打开后必须看到本次完整清单。

通知提供两个固定动作：

- 只是暂离：可选择 10、30 或 60 分钟，期间保持任务但暂停离场判断。
- 准备离开：打开完整核对页。

核对规则：

- 普通物品允许一键确认“都带齐了”。
- 用户标记为重要的物品必须逐件确认。
- 第一次提醒未回应且用户继续移动时，如果仍有重要物品未确认，2–3 分钟后追加一次更直接的提醒。
- 普通物品最多提醒一次，重要物品最多追加一次，不无限追问。
- 第二次提醒应直接、明确，不使用羞辱、威胁或制造焦虑的语言。

有手表时可以在后续版本同步震动提醒，但 MVP 不依赖手表，也不承诺保护手机本身或处理“手机和整个包一起被留下”的情况。

### 8. 未找到与最近出现记录

用户将物品标记为“还没找到”后，任务进入寻找中状态。系统展示：

- 物品贴纸与名称。
- 守护开始时原始照片中该物品的位置高亮。
- 本次守护地点名称和开始时间。
- 最近几个包含该物品的守护点。

用户可以选择“找到了”或“暂时找不到”。找到后，贴纸回到手账并完成对应确认；暂时找不到时保留最近出现记录，但不持续无限通知。

这不是实时追踪能力。系统只能说明物品最近在哪次守护照片和地点记录中出现。

### 9. 每日手账与养成

每天的多次守护任务按时间组织在同一张每日手账中。自动排版是默认行为，用户确认后无需手动装饰即可立即开始守护；拖动、旋转、缩放、文字和纸胶带等编辑能力是可选增强。

视觉遵循“日常浏览浓手账、关键核对轻手账”的原则：

- 首页、历史与分享页可以使用纸张纹理、胶带、印章、错落贴纸和手写标题。
- 离场提醒与核对页必须高对比、信息清晰、可在走路时快速扫读。
- 真实物品抠图加白边，作为主要视觉资产。
- 物品通过手写便签或气泡“开口说话”，但不得遮挡关键信息。
- 动效应体现剪、叠、贴、盖章，不做与手账风格冲突的游戏化表演。

养成机制以累计收藏为主，不设置断一天即清零的严格连续打卡。用户可以查看本月完成的守护次数、“全员归队”印章数量和新收集的贴纸版本。

### 10. 分享

MVP 提供可导出的竖版每日分享卡，不提供 App 内关注、评论或公开动态广场。

- 用户在分享前选择展示哪些物品。
- 默认隐藏精确地点、详细时间和重要物品标记。
- 可以显示“今日在咖啡馆学习”等模糊场景。
- 分享前必须提供最终预览。
- 品牌标识应克制，不破坏手账美感。

### 11. 未来自动模式

自动模式不承担 MVP 的成败，作为后续实验能力保留方向：

- 学习用户常见出门时间。
- 出门前展示“今日装备”卡片，默认沿用常用清单。
- 用户可以一键确认“今天还是这些”，或快速增删物品。
- 未回应时可以基于习惯推测开启，但推测物品必须明确标记，不能伪装成已确认。
- 离家后进入待命；在非家庭地点形成有意义的停留后建立临时守护点。
- 自动模式只能推测今日携带物品，无法知道用户在现场具体拿出了什么；用户可以补拍照片提高精度。

## User Stories

### 首次使用与权限

1. As a first-time user, I want to understand the product promise immediately, so that I know why I should take a photo.
2. As a first-time user, I want to create my first useful guard session within two minutes, so that I can experience value before doing extensive setup.
3. As a privacy-conscious user, I want location permission requested only when I start a guard session, so that the request has clear context.
4. As a user who declines location permission, I want to keep using stickers and journals, so that I am not locked out of the product.
5. As a user who declined permission earlier, I want a clear way to enable it later, so that I can gain automatic departure reminders.
6. As a user, I want a plain-language explanation of photo and location retention, so that I can make an informed decision.

### 拍照、识别与裁剪

7. As a student arriving at a study location, I want to start from the Today Journal with one obvious action, so that I can begin quickly.
8. As a user, I want the app to identify and outline objects in one photo, so that I do not need to type a list.
9. As a user, I want to tap each outlined object to cut it into a sticker, so that selection feels deliberate and enjoyable.
10. As a user, I want to tap several objects rapidly without waiting for each animation, so that the ritual does not become slow.
11. As a returning user, I want to collect all recognized objects at once, so that familiar sessions remain fast.
12. As a user, I want to exclude irrelevant detected objects, so that the guard list contains only items I care about.
13. As a user, I want to add an object the AI missed, so that recognition errors do not block me.
14. As a user, I want to add an off-camera item such as an umbrella or coat, so that the photo does not create false completeness.
15. As a user, I want the app to auto-layout confirmed stickers, so that I can start studying instead of arranging a page.
16. As a creative user, I want to optionally rearrange my journal later, so that I can personalize it without delaying the guard session.

### 物品身份与物品栏

17. As a user with multiple kinds of headphones, I want each specific item represented separately, so that reminders identify the correct object.
18. As a returning user, I want the app to match a detected object to an existing item, so that my inventory does not fill with duplicates.
19. As a user with visually similar items, I want the app to ask which item it is, so that uncertain AI matches do not corrupt my records.
20. As a user, I want to explicitly create a new item when no existing item matches, so that my inventory can grow over time.
21. As a user, I want to name an item and assign its importance, so that reminders use language meaningful to me.
22. As a user, I want one item to accumulate multiple sticker versions, so that my journal remains visually fresh without duplicating identity.
23. As a user, I want to choose a main sticker for an item, so that the inventory has a stable recognizable image.
24. As a user, I want to correct a mistaken match after it happens, so that errors are reversible.

### 包包模板

25. As a user, I want to create reusable bag templates from existing items, so that common combinations are easy to recall.
26. As a user, I want one item included in several bag templates, so that I do not need duplicate item records.
27. As a user, I want to start a session without choosing a bag, so that bag management never blocks the core flow.
28. As a user who selected a bag, I want to see familiar items that were not in the photo, so that I can add off-camera items quickly.
29. As a user, I want to include loose or pocketed items in a session, so that the system does not assume everything belongs to a bag.

### 守护与离场

30. As a user, I want the current place recorded when guard mode starts, so that I can later remember where an item was last seen.
31. As a user, I want the app to avoid recording my full route, so that guard mode does not become continuous surveillance.
32. As a user, I want the app to recognize meaningful departure instead of every movement, so that I do not receive constant false alarms.
33. As a user temporarily going to the restroom or counter, I want to mark “just stepping away,” so that my session remains active without repeated reminders.
34. As a user leaving for good, I want one action to open the complete checklist, so that I can verify everything quickly.
35. As a user, I want the first notification to feel playful and personal, so that I pay attention without feeling scolded.
36. As a user, I want the complete list clearly distinguished from the few items shown in the notification, so that I do not mistake a partial list for a complete check.
37. As a user, I want to confirm ordinary items together, so that low-risk checks remain fast.
38. As a user, I want important items confirmed individually, so that one broad tap does not create false confidence.
39. As a user who missed the first notification, I want one follow-up for unconfirmed important items, so that a missed alert does not defeat the product.
40. As a user, I want reminder escalation capped, so that the app does not harass me indefinitely.
41. As a user without location permission, I want to manually end the session and open the checklist, so that the core workflow still works.

### 寻找与完成

42. As a user who cannot find an item, I want to see where it appeared in the original session photo, so that I can search the right area.
43. As a user who may have lost an item earlier, I want to see its recent guard points, so that I can identify likely locations.
44. As a user, I want to mark an item as found, so that it can return to the journal and complete the session.
45. As a user who cannot recover an item immediately, I want to preserve its latest appearance record, so that I can continue searching later.
46. As a user who found everything, I want a satisfying “all returned” stamp, so that completion feels rewarding.

### 手账、回顾与分享

47. As a user with multiple sessions in one day, I want them grouped under one date, so that the history reads like a daily journal.
48. As a user, I want each place represented as a separate card, so that item lists from different stops do not mix.
49. As a user, I want cumulative guard counts and collected stickers, so that progress feels meaningful without a strict streak.
50. As a user who does not go out every day, I want missing days to carry no penalty, so that the app does not manufacture anxiety.
51. As a user, I want to generate an attractive vertical daily share card, so that I can share the journal outside the app.
52. As a privacy-conscious user, I want precise locations, times and importance labels hidden by default, so that sharing does not expose sensitive routines.
53. As a user, I want to choose which stickers appear in a shared card, so that I control what others can infer about my belongings.
54. As a user, I want to preview the exact exported image, so that nothing private is shared accidentally.

### 付费与长期能力

55. As a free user, I want core manual guard and important-item reminders to remain usable, so that basic protection is not held behind a paywall.
56. As a paying user, I want richer themes, animations, automation and long-term summaries, so that payment increases convenience and expression.
57. As a student, I want optional one-time theme purchases, so that a recurring subscription is not the only way to personalize the app.

## Implementation Decisions

### Product and Platform Decisions

- Build for iPhone first. Android is not part of this PRD.
- Optimize the MVP for university library and café sessions, not all travel and packing scenarios.
- The manual session is the reliable MVP path. Habit-based automatic activation is a later experiment.
- The app starts on Today Journal with one dominant capture action.
- The visual system uses rich scrapbook styling for browsing and restrained scrapbook styling for safety-critical checks.
- Core protection remains free. Future paid value comes from automation, customization, richer history and cloud capabilities.

### Domain Model

- Item represents one specific real-world possession.
- StickerVariant represents one cutout image associated with an Item.
- BagTemplate represents a reusable set of Item references; it does not assert current physical location.
- GuardSession represents one capture-and-check cycle at one guard point.
- GuardSessionItem snapshots the item, sticker and importance used for that session so later item edits do not rewrite history.
- GuardPoint stores one session location and user-facing place label; it is not a route.
- DailyJournal projects one or more GuardSessions into a date-based presentation.
- ReminderAttempt records only the minimum information needed to enforce escalation limits and measure behavior.

### Deep Modules and Interfaces

#### 1. Sticker Creation Module

Interface responsibility: accept a captured image and return a draft containing detected regions, cutout assets, confidence and possible inventory matches.

The module hides image orientation, preprocessing, object detection, segmentation, background removal, outline generation, thumbnail generation and temporary asset handling. AI-provider-specific behavior remains behind an internal seam so the rest of the app does not depend on one model vendor.

#### 2. Personal Inventory Module

Interface responsibility: resolve a detected region to an existing Item or a proposed new Item, then manage item names, importance, sticker variants and BagTemplate membership.

The module owns identity invariants: one real-world item maps to one Item record; uncertainty must be surfaced; a single Item may belong to many BagTemplates.

#### 3. Guard Session Module

Interface responsibility: start a session from selected items and a guard point, accept user or system events, and return the current state plus permitted next actions.

This is the central state machine. It owns transitions among draft, guarding, temporarily away, awaiting check, searching and completed. Location, notification and persistence implementations do not own business transitions.

#### 4. Departure Detection Module

Interface responsibility: consume authorized location and motion observations for an active session and emit a departure candidate or no event.

It hides noisy location data, accuracy filtering, radius policy, sustained-movement policy and temporary-away suppression. Production uses iOS location observations; tests use deterministic recorded observations through a fake adapter.

#### 5. Reminder Policy Module

Interface responsibility: given session state, item importance, prior reminder attempts and current movement state, return either no reminder or a fully specified reminder intent.

The intent includes urgency, named item candidates, allowed actions and tone tier. Notification delivery is an adapter; policy remains testable without the operating system. User-visible wording must follow the object-voice style but may use curated templates rather than unrestricted generated copy in the MVP.

#### 6. Journal Module

Interface responsibility: project sessions and sticker variants into a stable daily journal model, completion stamps and cumulative summaries.

The module owns grouping by local calendar date and prevents later item edits from changing historical pages. Visual rendering consumes the projection but does not reproduce journal rules.

#### 7. Privacy-Safe Share Module

Interface responsibility: accept a journal projection plus explicit user selections and return a redacted share model ready for image rendering.

The module removes precise coordinates, detailed times, importance flags and unselected items by default. Share rendering must consume only this redacted model, not raw session entities.

### Adapters and Seams

- iOS camera capture is an adapter used by the Sticker Creation Module.
- The selected AI image-processing implementation and a deterministic test implementation sit at the image-processing seam.
- Core Location observations and recorded test traces sit at the departure-observation seam.
- iOS local notification delivery and an in-memory notification recorder sit at the notification seam.
- Local persistence and an in-memory persistence adapter sit at the storage seam.
- Share-image rendering consumes only the privacy-safe share model.

Ports are introduced only where a production and a test adapter are both justified. Internal implementation details are not exposed merely to make tests convenient.

### AI and Matching Behavior

- AI output is always an editable draft, never unquestionable truth.
- High-confidence item matches may be preselected but remain reversible.
- Ambiguous matches must be presented as a user decision.
- Exact visual identity is not promised for indistinguishable objects.
- Exact model provider, on-device/cloud split and cost controls remain implementation research decisions.
- If cloud processing is used, the product must disclose transmission and retention behavior before launch.

### Animation and Interaction Behavior

- The scissors animation communicates a real state change: an object is selected into the current session.
- Animation cannot block rapid multi-selection.
- The user can skip or accelerate repeated animations.
- Auto-layout starts the session immediately after confirmation; later editing is optional.
- Motion-reduction settings must replace cutting, stacking and stamping motion with simple transitions while preserving all information.

### Location and Privacy Behavior

- Record one guard point when a session begins; do not record a continuous route.
- Keep the original photo locally only while the session is active, unless the user explicitly saves it.
- Persist cropped sticker assets because they are part of the item collection.
- Precise guard-point data is private by default and excluded from exported share content.
- Provide clear deletion controls for session and location history.
- The product must remain partially usable when camera, location or notification permission is unavailable, with the degraded capability clearly explained.

### Analytics

The MVP should measure behavior needed for product validation without collecting raw photos or precise coordinates in analytics.

Recommended events include:

- First capture started and completed.
- Time from first capture to active guard session.
- Number of detected, selected, manually added and corrected items.
- Session started, departure candidate generated, reminder delivered, reminder opened and session completed.
- Temporary-away action selected.
- Item marked missing and later found.
- Journal saved and share card generated.
- Permission accepted or declined, without storing sensitive location values.

## Testing Decisions

### What Makes a Good Test

- Tests assert observable outcomes through a module interface, not private functions or implementation state.
- Tests describe product rules and survive internal refactors.
- Time, location observations, AI results, persistence and notification delivery are injected or represented by deterministic adapters.
- Snapshot tests are not used as a substitute for behavioral assertions.
- Animation correctness is judged by state changes and accessibility behavior in automated tests, and by visual quality in prototype and device review.

### Modules to Test

#### Sticker Creation Module

- Converts orientation and detection results into stable selectable regions.
- Preserves user corrections when a draft changes.
- Produces cutouts and outlines with valid dimensions and transparent backgrounds.
- Handles no detections, overlapping detections and failed processing without losing the original local photo.

#### Personal Inventory Module

- Reuses an existing item after confirmed matching.
- Requires a decision for ambiguous candidates.
- Prevents accidental duplicate identity creation.
- Allows multiple StickerVariants and multiple BagTemplate memberships.
- Correctly reverses a mistaken match.

#### Guard Session Module

- Covers every valid state transition and rejects invalid transitions.
- Handles temporary-away durations and resumption.
- Enforces per-item confirmation for important items.
- Allows bulk confirmation only for ordinary items.
- Keeps a session open when an item is missing.
- Deletes or retains the original photo according to the completion decision.

#### Departure Detection Module

- Ignores location jitter and poor-accuracy observations.
- Does not trigger within the configured guard radius.
- Emits one departure candidate after sustained movement outside the radius.
- Suppresses candidates while temporarily away.
- Does not create repeated candidates for one unchanged departure.

#### Reminder Policy Module

- Generates a playful first reminder with a clearly partial item sample.
- Generates at most one follow-up for unconfirmed important items.
- Does not follow up indefinitely.
- Produces direct rather than playful wording for escalation.
- Exposes the “just stepping away” and “prepare to leave” actions when appropriate.

#### Journal Module

- Groups sessions by the user’s local date.
- Keeps sessions from different places separate.
- Preserves historical sticker and importance snapshots.
- Computes cumulative counts without strict-streak penalties.

#### Privacy-Safe Share Module

- Removes coordinates, detailed times and importance flags by default.
- Includes only explicitly selected stickers.
- Cannot access the raw active-session photo.
- Produces the same redacted model regardless of visual template.

### Integration and Device Testing

- Test the complete capture-to-guard-to-check flow on physical iPhones.
- Test background and foreground transitions around a real library and café.
- Test denied, limited and later-granted permissions.
- Test poor network conditions and AI-processing failure.
- Test notification actions when the app is foregrounded, backgrounded and terminated where supported by iOS.
- Test large text, VoiceOver labels, sufficient contrast and Reduce Motion behavior.
- Test interruption during photo processing, sticker selection, guard activation and completion.

### Visual Validation

- Use the approved Figma prototype as the visual source of truth.
- Review clipping quality on reflective, transparent, dark and overlapping objects.
- Verify that rich scrapbook screens remain legible and that safety-critical screens can be read at a glance.
- Verify animation pacing on older supported devices and with rapid repeated taps.

### Prior Art

There is no existing codebase or test suite in the repository. Initial tests should therefore establish module-interface conventions rather than imitate nonexistent local patterns.

## Out of Scope

- Android support.
- Mature automatic activation based on daily departure habits.
- Continuous location history or route recording.
- Real-time item tracking comparable to AirTag.
- Protecting the phone itself or detecting that both phone and bag were left behind.
- Apple Watch as a required part of the experience.
- App-internal public feed, following, comments or direct messaging.
- Strict daily streaks that reset or punish missed days.
- Perfect visual identification of indistinguishable duplicate objects.
- Mandatory full-bag inventory before first use.
- Required bag selection before every session.
- Unlimited notification escalation.
- Final subscription pricing, theme catalog and payment implementation.
- Production-ready automatic cloud synchronization.

## Further Notes

### Principal Product Risks

1. **Activation risk:** users who forget belongings may also forget to start a manual guard session.
2. **Reminder-quality risk:** background location may alert too early, too late or during a temporary absence.
3. **Visual-quality risk:** low-quality object cutouts undermine the emotional reason to return.
4. **Repetition risk:** a delightful cutting animation can become friction after repeated use.
5. **Trust risk:** unclear photo or location handling can prevent permission grants and adoption.
6. **False-confidence risk:** incomplete photos or incorrect AI matches can make users believe the list is complete when it is not.

The MVP deliberately tests the manual path before relying on automation. It must treat “good-looking” and “useful” as simultaneous quality bars rather than choosing one over the other.

### Open Decisions for Design and Technical Discovery

- Product name and final brand system.
- Exact scrapbook visual language, typefaces, color palette and motion timings.
- Exact first-run education and permission copy.
- Whether image segmentation can meet quality, latency, privacy and cost goals on-device or requires cloud processing.
- Minimum supported iPhone and iOS versions.
- Exact location radius and movement thresholds after physical pilot testing.
- Whether a temporary-away reminder should also warn about theft risk for unattended valuables.
- Local-only launch versus optional account and backup.
- Exact premium packaging and student pricing.

### Recommended Next Deliverables

1. Low-fidelity end-to-end user flow covering first use, capture, cutting, active guard, departure, checking, missing item and daily share.
2. Two to three visual directions for the scrapbook system, followed by one chosen design system.
3. High-fidelity Figma prototype with interactive cutting, stacking, sticking and reminder flows.
4. Five-user usability test using the Figma prototype before production implementation.
5. Technical spikes for cutout quality and background departure detection.
6. iPhone MVP implementation with analytics limited to non-sensitive behavioral events.

### Commercial Direction

Basic manual guard, important-item reminders, inventory, daily journal and a basic share card remain free. Future paid capabilities may include automatic guard routines, premium journal themes, special motion packs, richer monthly reviews, advanced bag templates and encrypted cloud backup. The product should not use feed-style advertising.
