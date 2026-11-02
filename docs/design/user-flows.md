@wiki id=dont-lost-it-user-flows type=runbook domain=projects state=draft
@summary Markdown user flows derived from confirmed interaction decisions; low-fidelity screens and clickable prototype are not yet built.
@terms 用户流程, 低保真, 守护, 暂离, 找回, 分享
@links dont-lost-it-interaction-decisions, dont-lost-it-prd, dont-lost-it-prototype-plan

# 用户流程与状态说明

整理日期：2026-10-28（Asia/Shanghai）；原型连接更新于 2026-10-29。

本页将既有 PRD 与[已确认的设计决策](interaction-decisions.md)整理为 Markdown 流程。图中节点表示行为和分支；对应界面已连接为[低保真可点击原型](low-fidelity-page-inventory.md)，但系统权限、定位和动画均为模拟，尚未经过新用户或真机验证。

## 导航

```text
手账
├─ 今日手账 / 当前守护
├─ 日历 → 历史手账 → 守护卡 / 待找回记录
├─ 拍照剪贴（主入口）
└─ 从已有物品开始（次入口）

物品栏
├─ 具体物品 → 贴纸版本 / 重要程度 / 最近出现
└─ 包包模板 → 选择今天实际携带的物品

右上角 → 设置
```

## 1. 首次使用与开始

1. 直接打开空白今日手账，显示一句用途说明和主操作。
2. 用户选拍照，或通过次入口选择已有物品。
3. 有未完成草稿时，可继续整理或丢弃；草稿不显示为正在守护。
4. 同一时间已有守护任务时，先进入旧任务核对，再开启新任务。

## 2–4. 拍照、剪贴、身份与确认

```mermaid
flowchart TD
    home[今日手账] --> route{开始方式}
    route -->|拍照| capture[拍照并识别轮廓]
    route -->|已有物品| library[物品栏或包包模板]
    library --> select[勾选本次携带物品；模板默认不选，可全选]
    capture --> result{识别与抠图结果}
    result -->|成功| cut[点选轮廓，剪下、叠放贴纸]
    result -->|遗漏| add[手动圈选或补充物品]
    result -->|失败| fallback{用户选择}
    fallback -->|重试| capture
    fallback -->|手动继续| add
    cut --> identity[确认具体物品身份；不明确时选择候选或新物品]
    add --> identity
    select --> review[清单确认]
    identity --> review
    review --> edit[检查建议名称、重要开关及未入镜物品]
    edit --> permission{首次权限说明}
    permission -->|开启自动提醒| request[请求系统权限]
    permission -->|先用手动核对| manual[进入手动守护]
    request -->|满足自动提醒条件| auto[进入自动提醒模式的守护]
    request -->|拒绝所需权限| manual
```

确认页包含本次物品、可编辑建议名称、可选“重要”开关、“还有没拍到的东西吗？”与“添加物品”。未入镜且无已有贴纸的新物品，用手写名称标签表示。新物品不逐件弹窗命名。已有物品可沿用旧贴纸，不要求重新抠图。

剪贴动画不阻塞连续点选，熟悉物品可一键剪下全部；用户确认后自动排版，无需先手工装饰。

## 5. 守护中与较远距离暂离

守护页始终能“准备离开，开始核对”，也可补充物品或主动选择“只是暂离”。补充物品沿用当前地点和手账卡。自动提醒不可用时明确展示手动模式，不伪装成后台提醒已生效。

```mermaid
flowchart TD
    guard[守护中] --> near[去洗手间或附近移动]
    near --> filter[距离、持续移动和精度过滤；设计目标为不误报]
    filter --> guard
    guard --> away[物品留在原处，去吃饭或小卖部]
    away --> pause[主动选择只是暂离，10 / 30 / 60 分钟]
    pause --> return{已返回守护点？}
    return -->|可靠定位确认返回或点击我回来了| guard
    return -->|仍在远处，时间未到| pause
    return -->|仍在远处，时间已到| prompt[一次中性提示：延长暂离或开始核对]
    prompt -->|延长| pause
    prompt -->|开始核对| check[完整核对清单]
    prompt -->|未回应| remain[保留任务，继续暂停离场提醒]
    remain -->|返回或点击我回来了| guard
    remain -->|主动处理| prompt
```

图中的“主动处理”是用户重新打开已有暂离状态，不表示系统循环发送到期通知。定位不可用时使用“我回来了”恢复；具体返回判定阈值待真机验证。

## 6. 离场提醒与核对

1. 用户主动点击核对，或距离与持续移动满足策略后收到离场提醒。
2. 首次提醒只展示 2–3 件物品作为样本，必须明确它不是完整清单。
3. “只是暂离”进入上述暂离流程；“准备离开”打开完整清单。
4. 每件普通物品可标记“已带走 / 还没找到”，也可一键确认普通物品。
5. 重要物品必须逐件确认，普通物品的一键按钮不包含重要物品。
6. 初次提醒未回应且继续移动、仍有重要物品未确认时，按既有策略最多追加一次直接提醒；不无限追问。
7. 离场核对中全部带齐，结束本次任务并盖“全员归队”。

## 7. 待找回与后续找回

```mermaid
flowchart TD
    check[完整核对] --> missing[某件还没找到]
    missing --> evidence[最近出现：贴纸或名称、可用照片证据、地点和时间]
    evidence --> action{处理结果}
    action -->|核对期间找到| done[完成该物品确认]
    done --> all{本次必要物品已全部确认？}
    all -->|是| returned[全员归队，结束任务]
    all -->|否| check
    action -->|暂时找不到并结束核对| pending[独立待找回记录，不盖全员归队]
    pending --> crop[本机仅保留失物局部照片；默认删除整张原图]
    crop --> later[后来标记找到了]
    later --> found[历史卡改为已找回，记录实际找回日期]
    found --> feedback[贴纸回归和找回啦印章；不补盖全员归队]
    feedback --> cleanup[删除局部照片，除非用户主动保存]
```

只有名称、没有照片证据的物品，展示已有名称与记录，不生成虚假的原图高亮。独立待找回记录不占用当前守护任务名额。找回动画只在确认时播放，回看静态，提供减少动态效果版本；时长等参数未定。

## 8. 每日手账、历史与分享

1. 同一天的多次守护按时间收纳为不同卡片；不同地点的物品清单不混成一次守护。
2. 通过日历查看历史。区分“全员归队”“待找回”“已找回”，后续找回注明真实日期。
3. 分享时默认带入手账物品，用户可在预览中隐藏个别物品。
4. 精确地点、详细时间和重要标记默认隐藏，可用模糊场景描述。
5. 用户确认最终预览后导出竖版卡片。

## 已制作及后续验证

- 八条流程的低保真页面、具体文案与可点击连接已写入[页面清单与原型](low-fidelity-page-inventory.md)。
- 草稿恢复、错误身份修正、权限拒绝、识别失败等恢复路径已连接并完成开发者走查。
- 仍需通过新用户测试验证暂离持续暂停、返回恢复、单一当前任务及独立待找回的理解程度。
- 真实 iPhone 的离场与返回判定能力尚未验证；可点击原型不代表技术验证已通过。

本页不选择最终视觉风格、技术栈、最小 iOS 版本或定位阈值。阶段验收见[开发流程](../planning/development-process.md)，原型范围见[原型计划](prototype-plan.md)。
