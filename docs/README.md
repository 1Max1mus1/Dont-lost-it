@wiki id=dont-lost-it-document-guide type=runbook domain=projects state=draft
@summary Human-readable guide to all project Markdown documents, including the roadmap and user-confirmed design interview outcomes.
@terms 文档总览, Markdown, 流程, 设计访谈, 项目资料
@links dont-lost-it-development-process, dont-lost-it-interaction-decisions, dont-lost-it-user-flows, dont-lost-it-current-progress

# Don't Lose It 项目文档总览

整理日期：2026-11-02（Asia/Shanghai）。本仓库的 Markdown 是项目正式知识库，所有链接均指向本地相对路径，便于迁移到另一台电脑或在 GitHub 阅读。

目前已有产品定义、开发路线、架构草案、设计访谈记录、八流程低保真原型和三张复古手账高保真视觉样页。完整 Figma、独立用户测试、技术验证和生产代码尚未完成。`draft` 表示内容仍待原型或实现证据验证，不表示访谈规则或样页制作没有完成。

## 优先阅读

| 文档 | 内容 |
|---|---|
| [开发流程](planning/development-process.md) | 阶段 0–8、当前阶段、每阶段交付物和通过条件，以及跨电脑 Git 工作流 |
| [设计决策记录](design/interaction-decisions.md) | 已确认的 24 条规则、理由、用户修正与尚未决定的内容 |
| [用户流程](design/user-flows.md) | 首页、拍照剪贴、名称回退、权限、守护、暂离、核对、找回和分享的文字与 Mermaid 图 |
| [低保真页面清单](design/low-fidelity-page-inventory.md) | 29 个页面状态、原型运行命令和八条可点击验收路径 |
| [复古手账视觉方向](design/visual-direction.md) | 用户选择的拼贴风格、初始 tokens、三种首页构图和三张视觉样页 |
| [PRD V0.3](PRD.md) | 产品需求、设计规则、用户故事、成功指标和范围 |
| [原型计划](design/prototype-plan.md) | 八条关键流程、界面状态、视觉候选、组件和测试任务 |
| [当前进度](progress/current.md) | 已完成的材料、证据、未完成工作、风险和下一步 |

## 其他已有文档

| 文档 | 用途 |
|---|---|
| [仓库入口](../README.md) | 项目简介、原型启动、克隆方式及入口 |
| [项目说明](../PROJECT.md) | 目标、范围和当前项目状态 |
| [领域语言](../CONTEXT.md) | 物品、贴纸、包包模板、守护、暂离、待找回及两种印章的统一定义 |
| [根索引](../INDEX.md) | 根级路由 |
| [知识索引](INDEX.md) | 带稳定 wiki ID 的页面路由 |
| [架构概览](architecture/overview.md) | 模块边界、接口职责、不变量和失败模式 |
| [数据流程](architecture/data-flow.md) | 图片、身份、守护、提醒、找回和分享的数据传递 |
| [ADR 0001：文档与代码共同版本管理](adr/0001-project-wiki-is-versioned-with-code.md) | 为什么采用仓库 Markdown 知识库 |
| [ADR 0002：先验证手动守护](adr/0002-manual-guard-first.md) | MVP 优先手动开启，自动激活后续验证 |
| [ADR 0003：隐私默认值](adr/0003-privacy-by-default.md) | 固定守护点、照片生命周期和分享脱敏 |
| [ADR 0004：守护与找回生命周期](adr/0004-session-and-recovery-lifecycle.md) | 单一当前任务、独立待找回、暂离恢复和局部证据保留 |
| [代理协作规则](../AGENTS.md) | 阅读顺序、文档规则和完成检查 |
| [生成文档目录说明](generated/README.md) | 未来从代码生成函数级参考的位置，目前没有应用实现 |

## 阅读顺序与使用方式

1. 回顾项目做什么：项目说明 → PRD → 领域语言。
2. 回顾推进流程：开发流程 → 当前进度。
3. 接续本轮设计：设计决策记录 → 用户流程 → 低保真页面清单 → 视觉方向 → 原型计划。
4. 进入工程设计前：架构概览 → 数据流程 → ADR。

这些文档各自维护一种内容，避免把完整 PRD 重复复制到多个文件。设计决策和流程中的图可在支持 Mermaid 的 Markdown 阅读器或 GitHub 中显示；普通阅读器仍可读取相邻文字步骤。
