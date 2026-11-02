# Don't Lose It

> 把桌上的随身物品剪成贴纸，离开时逐件提醒你带走的 AI 手账。

**An AI-powered personal-item guardian and scrapbook for iPhone.**

Don't Lose It 面向在图书馆、咖啡馆等临时地点学习的大学生。到达后拍一张桌面照片，把实际使用的物品变成个人贴纸并开启守护；离场时通过完整清单核对，避免遗漏耳机、触控笔、充电器、水杯和门禁卡等小物品。

它不是 AirTag 式实时追踪器，也不是普通库存清单。产品希望同时提供两种价值：**真正有用的离场核对**，以及**愿意每天收藏和回看的视觉手账**。

## 核心体验

```text
今日手账
→ 拍照 / 选择已有物品 / 添加名称标签
→ 识别轮廓并剪成个人贴纸
→ 确认物品身份、名称与重要程度
→ 开启自动提醒或使用手动核对
→ 暂离 / 离场提醒 / 主动核对
→ 全员归队或保留独立待找回记录
→ 每日手账、后续找回与隐私安全分享
```

关键规则：

- 普通物品可以批量确认，重要物品必须逐件确认。
- 同时最多一个当前守护；待找回记录不会阻止下一次守护。
- “只是暂离”只暂停提醒，不代表防盗保护。
- 草稿不代表已经开启守护。
- AI 结果始终可以纠正，识别失败也能使用名称标签继续。
- 拒绝相机、定位或通知权限后，保留诚实、可用的降级路径。

## 当前状态

最近更新：2026-11-03（Asia/Shanghai）。

| 工作项 | 状态 |
|---|---|
| 产品定义、PRD、领域语言与架构草案 | 已完成，仍随证据修订 |
| 24 条核心交互规则与八条用户流程 | 已记录 |
| 29 个低保真页面状态与八流程可点击原型 | 已完成开发者走查 |
| 复古 Traveler's Notebook 视觉方向 | 用户已选择，待评审细化 |
| 今日手账、当前守护、离场核对高保真样页 | 已制作，提供三种首页构图 |
| 独立新用户无指导测试 | 尚未完成 |
| 抠图与 iPhone 后台离场技术验证 | 尚未开始 |
| 完整高保真 Figma 与生产应用 | 尚未开始 |

当前仓库包含**产品 wiki 和一次性设计原型**，还没有正式 iOS 应用。所有相机、AI、定位、权限和导出行为均为模拟，不连接真实系统，不持久化数据。

## 本地预览

### 环境要求

- 任意现代浏览器。
- Python 3，仅用于启动静态文件服务器。
- 不需要 Node.js、npm 或安装第三方原型依赖。

### 1. 克隆项目

```powershell
git clone https://github.com/1Max1mus1/Dont-lost-it.git
cd Dont-lost-it
```

### 2. 低保真完整流程原型

在仓库根目录运行：

```powershell
python -m http.server 4173 --directory docs/design/low-fidelity-prototype
```

打开 **http://localhost:4173/?variant=A**。

可验证：

- 首次拍照、剪贴、身份确认和权限分流。
- 草稿恢复、识别失败、已有物品和名称标签回退。
- 当前守护、暂离、离场核对和重要物品追加提醒。
- 待找回、后续找回、每日手账与分享隐藏。
- 首次使用、已有草稿、当前守护和历史记录测试场景。

底部箭头或键盘 `←` / `→` 可切换首页 A/B/C 信息层级方案。

### 3. 复古手账高保真视觉样页

在另一个终端运行：

```powershell
python -m http.server 4174 --directory docs/design/visual-direction-prototype
```

打开 **http://localhost:4174/?variant=A**。

包含：

- 今日手账：自由拼贴、杂志网格、摊开手账三种构图。
- 当前守护：守护点、开始时间、物品清单和主动核对。
- 离场核对：普通物品批量确认、重要物品逐件确认和全员归队反馈。

视觉采用暖白纸纹、牛皮纸、和纸胶带、票根、印章、手写注释和低饱和学术色。参考照片只用于提炼风格，不直接复制其中的素材。

## MVP 范围

### 包含

- 手动开启的守护任务与可选自动离场提醒。
- 物品身份、多个贴纸版本和可复用包包模板。
- 普通与重要物品的分层核对。
- 暂离、最近出现证据、独立待找回与后续找回。
- 每日手账和默认脱敏的竖版分享卡。

### 暂不包含

- Android、Apple Watch 必需支持和成熟习惯预测。
- 连续路线记录、实时物品追踪和手机本身防丢。
- App 内关注、评论或公开动态广场。
- 严格连续打卡、无限提醒和强迫性完整库存录入。
- 生产级云同步、最终订阅定价和支付实现。

## 隐私原则

- 有定位时只记录一个固定守护点，不保存移动路线。
- 完整原图默认仅在任务期间保存在本机，完成后删除。
- 有待找回物品时默认只保留本机局部照片；找回后删除，除非用户主动保存。
- 名称-only 物品不生成虚假照片证据。
- 分享默认隐藏精确地点、详细时间和重要标记，并要求最终预览。
- 行为分析不收集原始照片或精确坐标。

## 项目文档

Markdown 是项目的正式知识库。产品决策、架构和当前证据与原型共同版本管理。

| 入口 | 内容 |
|---|---|
| [项目说明](PROJECT.md) | 目标、范围、运行方式和当前状态 |
| [文档总览](docs/README.md) | 全部项目材料的阅读顺序 |
| [PRD](docs/PRD.md) | MVP 需求、用户故事、指标、测试和范围 |
| [领域语言](CONTEXT.md) | Item、Sticker Variant、Guard Session 等统一定义 |
| [交互决策](docs/design/interaction-decisions.md) | 24 条用户确认规则与未决问题 |
| [用户流程](docs/design/user-flows.md) | 文字与 Mermaid 流程图 |
| [低保真页面清单](docs/design/low-fidelity-page-inventory.md) | 29 个状态、运行命令和八条验收路径 |
| [视觉方向](docs/design/visual-direction.md) | 复古拼贴风格、tokens、构图和样页评审 |
| [原型计划](docs/design/prototype-plan.md) | 关键流程、视觉系统和研究证据 |
| [架构概览](docs/architecture/overview.md) | 模块、接口、不变量和失败模式 |
| [数据流程](docs/architecture/data-flow.md) | 从照片到守护、找回和分享的数据传递 |
| [开发流程](docs/planning/development-process.md) | 阶段 0–8、交付物、证据门槛和 Git 工作流 |
| [当前进度](docs/progress/current.md) | 最新证据、风险和下一最小步骤 |

本项目采用的通用方法也已整理为[《从 0 到 1 的产品开发过程（手机应用）》](https://github.com/1Max1mus1/Victor-llm-wiki/blob/main/coding/standards/mobile-app-zero-to-one-development.md)。

## 仓库结构

```text
PROJECT.md                         项目入口
CONTEXT.md                         领域语言
docs/
├── PRD.md                         产品需求
├── design/                        流程、决策、视觉与两套原型
├── architecture/                  模块与数据流
├── adr/                           架构决策记录
├── planning/                      阶段化开发流程
├── progress/                      当前证据与下一步
└── generated/                     未来由代码生成的接口参考
```

## 开发与协作约定

1. 开始产品或架构修改前，阅读 `PROJECT.md`、`CONTEXT.md` 和 `docs/INDEX.md`。
2. 重要决策从 `draft` 开始，只有取得产品、原型或实现证据后才标记为 `verified`。
3. 修改行为时同步更新受影响的文档和 `docs/progress/current.md`。
4. 优先构建完整用户闭环，不把交付物数量当成验证证据。
5. 不提交私人照片、精确位置样本、凭据或未脱敏的用户测试记录。

详细规则见 [AGENTS.md](AGENTS.md)。
