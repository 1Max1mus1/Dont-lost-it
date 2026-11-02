const flows = [
  { id: 1, label: "今日手账与开始", screens: ["home", "library"] },
  { id: 2, label: "拍照与 AI 轮廓", screens: ["camera", "processing", "failure"] },
  { id: 3, label: "剪贴、叠放与贴入", screens: ["cutting"] },
  { id: 4, label: "身份与清单确认", screens: ["review"] },
  { id: 5, label: "权限与当前守护", screens: ["permission", "system-permission", "guard", "add-active"] },
  { id: 6, label: "离场、暂离与核对", screens: ["notification", "away-duration", "away", "checklist", "followup"] },
  { id: 7, label: "待找回与后续找回", screens: ["last-seen", "close-check", "all-returned", "found-later"] },
  { id: 8, label: "每日手账与分享", screens: ["journal", "share", "exported"] }
];

const tasks = {
  home: ["从今日手账开始", "主操作应清晰可见；草稿、当前守护和历史状态不能互相混淆。"],
  library: ["选择今天实际携带的物品", "模板默认不勾选。可直接全选，也可以只选本次物品。"],
  camera: ["拍摄一张桌面照片", "使用合成物品，不请求相机权限。可继续成功路径或模拟识别失败。"],
  processing: ["观察处理中与取消路径", "处理动画不代表真实 AI；取消后回到拍照引导。"],
  failure: ["从识别失败恢复", "重试和手动名称继续都必须能完成守护。"],
  cutting: ["选择需要守护的物品", "连续点选不会等待动画；也可一键剪下全部或取消选择。"],
  review: ["确认身份、名称与重要程度", "先解决 AirPods 的相似身份，再补充未入镜物品并确认清单。"],
  permission: ["选择提醒方式", "自动提醒需要模拟权限；手动核对应始终可用。"],
  "system-permission": ["处理模拟系统授权", "允许进入自动守护；拒绝后明确降级为手动守护。"],
  guard: ["检查当前守护状态", "可补充物品、暂离、主动核对，或用原型控制模拟离场。"],
  "add-active": ["给当前任务补充物品", "新增内容沿用当前地点和手账卡，不创建第二个守护。"],
  notification: ["处理首次离场提醒", "通知只显示部分样本。选择暂离或打开完整核对清单。"],
  "away-duration": ["选择暂离时长", "暂离只暂停提醒，不代表物品受到防盗保护。"],
  away: ["验证暂离暂停与恢复", "模拟到期后只出现一次中性提示；未回应仍暂停，返回后恢复。"],
  checklist: ["完成完整离场核对", "普通物品可批量确认，重要物品必须逐件确认。"],
  followup: ["处理重要物品追加提醒", "第二次提醒更直接，最多一次，打开仍是完整清单。"],
  "last-seen": ["寻找还没找到的物品", "照片物品显示局部高亮；名称-only 物品明确没有照片证据。"],
  "close-check": ["保留待找回并结束核对", "结束后不盖全员归队，独立待找回记录不阻止下一次守护。"],
  "all-returned": ["查看全员归队结果", "只有本次必要物品全部确认后才出现该印章。"],
  "found-later": ["查看后续找回反馈", "找回啦使用实际日期，不回溯改写原来的离场结果。"],
  journal: ["查看同日多张守护卡", "全员归队、待找回和已找回必须可区分；待找回可继续处理。"],
  share: ["检查隐私安全分享预览", "物品默认带入，可点选隐藏；精确地点、详细时间和重要标记不显示。"],
  exported: ["确认模拟导出结果", "导出内容与最终预览一致；这里不会写入真实相册或文件。"]
};

const variantNames = {
  A: "A — 纸面主操作",
  B: "B — 最近物品优先",
  C: "C — 三步理解"
};

const itemTemplates = [
  { id: "airpods", name: "通勤 AirPods Pro", shape: "airpods", important: true, identity: "2 个相似候选" },
  { id: "pencil", name: "Apple Pencil", shape: "pencil", important: false, identity: "新物品" },
  { id: "bottle", name: "蓝色水杯", shape: "bottle", important: false, identity: "已有物品" },
  { id: "notebook", name: "方格笔记本", shape: "notebook", important: false, identity: "新物品" }
];

const app = document.querySelector("#app");
const inspector = document.querySelector("#state-inspector");
const taskNote = document.querySelector("#task-note");
const scenarioSelect = document.querySelector("#scenario");
let toastTimer;

function initialVariant() {
  const value = new URLSearchParams(window.location.search).get("variant");
  return variantNames[value] ? value : "A";
}

function cloneItems() {
  return itemTemplates.map(item => ({ ...item, confirmed: false, missing: false, nameOnly: false }));
}

function freshState() {
  return {
    screen: "home",
    variant: initialVariant(),
    draft: false,
    confirmDiscard: false,
    items: cloneItems(),
    selected: [],
    manualItems: [],
    sessionItems: [],
    session: "none",
    permission: "unknown",
    guardPoint: null,
    startedAt: null,
    identityResolved: false,
    addingItem: false,
    missingId: null,
    recovery: null,
    originalOutcome: null,
    away: null,
    reminderCount: 0,
    homeHistory: false,
    shareHidden: [],
    fullPhotoDeleted: false,
    recoveryCrop: false,
    failProcessing: false
  };
}

let state = freshState();

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);
}

function itemArt(item) {
  const shapes = {
    airpods: '<rect x="23" y="21" width="34" height="29" rx="6"/><path d="M25 29h30M34 50v17m12-17v17M31 67h6m6 0h6"/>',
    pencil: '<path d="M19 60 55 17l8 7-36 43-12 3zM52 21l8 7M19 60l8 7"/>',
    bottle: '<path d="M31 12h18v10l5 9v35H26V31l5-9zM31 22h18M28 40h24"/>',
    notebook: '<path d="M20 14h42v54H20zM29 14v54M36 27h18M36 37h18M36 47h13"/>',
    charger: '<path d="M26 25h28v30H26zM33 25V13m14 12V13M40 55v12M25 38h-8m46 0h-8"/>'
  };
  if (item.nameOnly || item.shape === "name") {
    return `<span class="name-label">${escapeHtml(item.name)}</span>`;
  }
  return `<div class="item-art" aria-hidden="true"><svg viewBox="0 0 80 80" fill="#fff" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${shapes[item.shape] || shapes.notebook}</svg></div>`;
}

function currentItems() {
  return [
    ...state.items.filter(item => state.selected.includes(item.id)),
    ...state.manualItems
  ];
}

function activeItems() {
  return state.sessionItems.length ? state.sessionItems : currentItems();
}

function findItem(id) {
  return [...state.sessionItems, ...state.manualItems, ...state.items].find(item => item.id === id);
}

function header(title, backAction = "go-home", right = "") {
  return `<header class="screen-header">
    <button class="icon-button" data-action="${backAction}" aria-label="返回">←</button>
    <h1>${title}</h1>
    <div class="header-action">${right}</div>
  </header>`;
}

function bottomTabs(active = "journal") {
  return `<nav class="bottom-tabs" aria-label="应用主导航">
    <button data-action="go-home" class="${active === "journal" ? "active" : ""}">手账</button>
    <button data-action="go-library" class="${active === "library" ? "active" : ""}">物品栏</button>
  </nav>`;
}

function draftBanner() {
  if (!state.draft) return "";
  if (state.confirmDiscard) {
    return `<div class="draft-banner"><strong>丢弃这份整理草稿？</strong>已选物品和本次编辑会被清除。草稿从未开始守护。
      <div class="button-row"><button class="button button-small button-secondary" data-action="cancel-discard">保留草稿</button><button class="button button-small button-danger" data-action="confirm-discard">确认丢弃</button></div>
    </div>`;
  }
  return `<div class="draft-banner"><strong>有一份未完成的整理</strong>草稿尚未开始守护。
    <div class="inline-actions"><button class="text-button" data-action="continue-draft">继续整理</button><button class="text-button" data-action="discard-draft">丢弃</button></div>
  </div>`;
}

function historyPreview() {
  if (!state.homeHistory) return '<div class="empty-mark">今天还没有<br>守护卡</div>';
  return `<div class="history-card"><div class="history-card-head"><div><h3>图书馆 · 学习守护</h3><span class="caption">今天 14:00 · 模拟记录</span></div><span class="mini-stamp">${state.originalOutcome === "all-returned" ? "全员归队" : state.recovery?.status === "found" ? "已找回" : "待找回"}</span></div><p class="small muted">${activeItems().length} 件物品 · ${state.originalOutcome === "all-returned" ? "本次全部带齐" : "原始离场结果保留"}</p><button class="text-button" data-action="go-journal">查看今日手账 →</button></div>`;
}

function homePrimary() {
  if (["guarding", "temporarily-away", "awaiting-check", "searching"].includes(state.session)) {
    return `<button class="button" data-action="go-guard">查看当前守护</button>`;
  }
  return `<button class="button" data-action="start-capture">剪下今天带来的东西</button>`;
}

function renderHome() {
  const active = ["guarding", "temporarily-away", "awaiting-check", "searching"].includes(state.session);
  const commonStart = `<div class="screen"><header class="screen-header"><span class="header-spacer"></span><h1>今日手账</h1><button class="icon-button" data-action="show-settings" aria-label="设置">···</button></header><div class="screen-body home-variant-${state.variant.toLowerCase()}">${draftBanner()}`;
  const commonEnd = `</div>${bottomTabs("journal")}</div>`;

  if (state.variant === "B") {
    return `${commonStart}
      <p class="caption">10 月 29 日 · 今天</p>
      <h2>${active ? "东西正在等你带回去。" : "先记住今天带来的。"}</h2>
      <div class="recent-strip"><div class="recent-chip">AirPods<br><span class="muted">重要</span></div><div class="recent-chip">蓝色水杯<br><span class="muted">常用</span></div><div class="recent-chip">方格笔记本<br><span class="muted">最近使用</span></div></div>
      <div class="journal-paper"><h3>今日卡片</h3>${historyPreview()}</div>
      <div class="home-actions">${homePrimary()}<button class="button button-quiet" data-action="start-library">从已有物品开始</button></div>
    ${commonEnd}`;
  }

  if (state.variant === "C") {
    return `${commonStart}
      <p class="caption">10 月 29 日 · 今天</p>
      <h2>${active ? "当前守护" : "离开时，不再靠记忆。"}</h2>
      <p class="muted small">拍一张，剪成贴纸，离开时逐件核对。</p>
      ${active ? `<div class="notice"><strong>${state.session === "temporarily-away" ? "暂离中，提醒已暂停" : "守护正在进行"}</strong>${state.guardPoint || "手动模式"} · ${activeItems().length} 件物品</div>` : `<ol class="step-list"><li>摊开物品并拍一张照片</li><li>点选真正要带走的物品</li><li>离开时打开完整清单核对</li></ol>`}
      ${historyPreview()}
      <div class="home-actions">${homePrimary()}<button class="button button-quiet" data-action="start-library">从已有物品开始</button></div>
    ${commonEnd}`;
  }

  return `${commonStart}
    <div class="journal-paper">
      <p class="caption">10 月 29 日 · 今天</p>
      <h2>${active ? "正在守护今天带来的东西" : "把今天带来的东西，剪进手账。"}</h2>
      ${active ? `<div class="notice"><strong>${state.session === "temporarily-away" ? "只是暂离 · 提醒暂停中" : "守护中"}</strong>${state.guardPoint || "手动核对模式"}<br>${activeItems().length} 件物品 · 开始于 ${state.startedAt}</div>` : historyPreview()}
      <div class="home-actions">${homePrimary()}<button class="button button-quiet" data-action="start-library">从已有物品开始</button></div>
    </div>
  ${commonEnd}`;
}

function tableItems(selectable = false) {
  return state.items.map(item => {
    const selected = state.selected.includes(item.id);
    if (!selectable) {
      return `<div class="table-item item-${item.id}">${itemArt(item)}<span>${escapeHtml(item.name)}</span></div>`;
    }
    return `<button class="table-item item-${item.id} selectable ${selected ? "selected" : ""}" data-action="toggle-cut" data-id="${item.id}" aria-pressed="${selected}">${itemArt(item)}<span>${escapeHtml(item.name)}</span></button>`;
  }).join("");
}

function renderCamera() {
  return `<div class="screen">${header("拍摄桌面", "leave-draft")}
    <div class="camera-view"><div class="table-grid"></div><div class="camera-guide"></div>${tableItems()}</div>
    <div class="screen-body"><p class="small muted">把物品摊开，避免重叠。这里使用合成场景，不会打开真实相机。</p><button class="shutter" data-action="take-photo" aria-label="模拟拍摄"></button><div class="button-row"><button class="button button-small button-secondary" data-action="simulate-failure">模拟识别失败</button><button class="button button-small button-quiet" data-action="manual-from-camera">手动添加</button></div></div>
  </div>`;
}

function renderProcessing() {
  return `<div class="screen">${header("识别物品", "cancel-processing")}<div class="processing-panel"><div class="processing-outline"></div><h2>正在寻找物品轮廓</h2><p class="muted small">照片仅用于本次模拟流程。</p><button class="button button-quiet" data-action="cancel-processing">取消</button></div></div>`;
}

function renderFailure() {
  return `<div class="screen">${header("识别没有完成", "start-capture")}<div class="screen-body"><div class="empty-mark">无法生成<br>可靠轮廓</div><h2>这次没有看清物品</h2><p class="muted small">可以换光线重试，也可以不依赖照片，使用名称标签继续守护。</p><div class="notice">不会用虚构的图片替代没有拍到的物品。</div></div><footer class="screen-footer"><button class="button" data-action="retry-processing">重试</button><button class="button button-secondary" data-action="manual-from-failure">手动添加物品并开始守护</button></footer></div>`;
}

function renderCutting() {
  const selectedItems = currentItems();
  return `<div class="screen">${header("剪下要守护的物品", "leave-draft", '<button class="text-button" data-action="select-all">全选</button>')}
    <div class="camera-view"><div class="table-grid"></div>${tableItems(true)}</div>
    <div class="selection-summary"><span>贴纸摞</span><strong>已选 ${selectedItems.length} 件</strong><button class="text-button" data-action="clear-selection">清空</button></div>
    <div class="sticker-stack">${selectedItems.length ? selectedItems.map(item => `<div class="sticker">${itemArt(item)}</div>`).join("") : '<span class="caption">点选物品轮廓，贴纸会在这里叠放</span>'}</div>
    <div class="screen-body"><button class="text-button" data-action="show-add-item">+ 手动圈选或添加未入镜物品</button><p class="caption">连续点选无需等待动画；一键剪下全部仍可在下一步修改。</p></div>
    <footer class="screen-footer"><button class="button" data-action="confirm-cutting" ${selectedItems.length ? "" : "disabled"}>确认贴纸，整理清单</button></footer>
  </div>`;
}

function manualAddForm() {
  if (!state.addingItem) return "";
  return `<div class="card"><h3>添加未入镜物品</h3><label for="new-item-name" class="caption">物品名称</label><input id="new-item-name" class="text-input full-width" type="text" value="折叠伞" placeholder="例如：折叠伞"><p class="caption">没有可用贴纸时使用手写名称标签，不生成照片证据。</p><div class="button-row"><button class="button button-small button-quiet" data-action="cancel-add-item">取消</button><button class="button button-small" data-action="save-manual-item">添加</button></div></div>`;
}

function identityPanel() {
  if (!state.selected.includes("airpods") || state.identityResolved) return "";
  return `<div class="notice warning"><strong>这是哪一个 AirPods？</strong>发现两个外观相似的已有物品。视觉结果不能确定具体身份，请选择。
    <div class="candidate-list"><button class="candidate" data-action="resolve-identity" data-name="通勤 AirPods Pro">通勤 AirPods Pro <span class="muted">上次在图书馆使用</span></button><button class="candidate" data-action="resolve-identity" data-name="备用 AirPods Pro">备用 AirPods Pro <span class="muted">外观几乎相同</span></button><button class="candidate" data-action="resolve-identity" data-name="我的新 AirPods">这是新物品</button></div>
  </div>`;
}

function reviewRows() {
  return currentItems().map(item => `<div class="item-row"><div class="sticker">${itemArt(item)}</div><div><input class="text-input" type="text" aria-label="物品名称" data-action="edit-name" data-id="${item.id}" value="${escapeHtml(item.name)}"><small>${item.nameOnly ? "名称标签 · 无照片证据" : escapeHtml(item.identity || "本次新增")} ${item.id === "airpods" && state.identityResolved ? "· 身份已确认" : ""}</small>${item.id === "airpods" && state.identityResolved ? '<br><button class="text-button" data-action="correct-identity">更改物品关联</button>' : ""}</div><label class="switch-label"><input type="checkbox" data-action="toggle-important" data-id="${item.id}" ${item.important ? "checked" : ""}>重要</label></div>`).join("");
}

function renderReview() {
  const needsIdentity = state.selected.includes("airpods") && !state.identityResolved;
  return `<div class="screen">${header("确认本次清单", state.draft ? "leave-draft" : "back-to-cutting")}
    <div class="screen-body"><div class="stack">${identityPanel()}<div class="card">${reviewRows() || '<p class="muted small">还没有物品。请添加名称或返回选择。</p>'}</div>${manualAddForm()}<button class="button button-secondary" data-action="show-add-item">+ 还有没拍到的东西吗？添加物品</button><div class="notice privacy"><strong>重要物品需要逐件核对</strong>普通物品离场时可批量确认；重要物品不会被一键确认包含。</div></div></div>
    <footer class="screen-footer"><button class="button" data-action="confirm-review" ${!currentItems().length || needsIdentity ? "disabled" : ""}>${needsIdentity ? "先确认相似物品身份" : "确认清单"}</button></footer>
  </div>`;
}

function renderPermission() {
  return `<div class="screen">${header("选择守护方式", "back-to-review")}<div class="screen-body"><div class="permission-graphic">一个守护点<br>不是移动路线</div><h2>离开时，如何提醒你？</h2><p class="muted small">自动提醒使用本次守护点和通知权限。只记录一个地点，不保存完整移动路线。</p><div class="notice privacy"><strong>手动模式同样保留完整功能</strong>你可以随时从守护页点击“准备离开，开始核对”。</div></div><footer class="screen-footer"><button class="button" data-action="choose-automatic">开启自动提醒</button><button class="button button-secondary" data-action="choose-manual">先用手动核对</button></footer></div>`;
}

function renderSystemPermission() {
  return `<div class="screen"><div class="screen-body"><div class="system-sheet"><h2>允许“Don't Lose It”使用位置并发送通知？</h2><p class="small muted">用于在本次守护期间判断可能离场，并发送物品核对提醒。这是原型模拟，不会请求真实系统权限。</p><div class="button-row"><button class="button" data-action="deny-permission">不允许</button><button class="button" data-action="allow-permission">允许</button></div></div></div></div>`;
}

function guardContent() {
  const away = state.session === "temporarily-away";
  const manual = state.permission !== "granted";
  return `<div class="guard-hero"><div class="guard-status ${away ? "paused" : ""}">${away ? "暂离中" : "守护中"}</div><h2>${away ? "提醒已暂停" : manual ? "手动核对模式" : "自动提醒已开启"}</h2><p class="small muted">${away ? "返回后点击“我回来了”恢复" : manual ? "不会自动判断离场；离开时请主动核对" : "附近移动会被过滤，候选离场才提醒"}</p></div>
    <div class="guard-meta"><div><span class="caption">守护点</span><strong>${state.guardPoint || "未记录地点"}</strong></div><div><span class="caption">开始时间</span><strong>${state.startedAt || "14:00"}</strong></div></div>
    <div class="card"><div class="check-row-head"><h3>本次 ${activeItems().length} 件物品</h3><button class="text-button" data-action="add-active">+ 补充</button></div>${activeItems().map(item => `<div class="item-row"><div>${itemArt(item)}</div><div><strong>${escapeHtml(item.name)}</strong><small>${item.important ? "重要物品 · 逐件确认" : "普通物品"}</small></div>${item.important ? '<span class="important-badge">重要</span>' : ""}</div>`).join("")}</div>
    <div class="prototype-control"><span class="caption">原型控制 · 非产品按钮</span><div class="button-row"><button class="button button-small button-secondary" data-action="simulate-departure">模拟离场提醒</button>${state.reminderCount === 1 ? '<button class="button button-small button-secondary" data-action="simulate-followup">模拟追加提醒</button>' : ""}</div></div>`;
}

function renderGuard() {
  return `<div class="screen">${header("当前守护", "go-home")}<div class="screen-body">${guardContent()}<div class="notice privacy small"><strong>隐私说明</strong>只保留本次固定守护点，不记录移动路线。完整原图默认在任务完成后删除。</div></div><footer class="screen-footer">${state.session === "temporarily-away" ? '<button class="button" data-action="return-from-away">我回来了</button>' : '<button class="button button-secondary" data-action="choose-away">只是暂离</button>'}<button class="button" data-action="open-checklist">准备离开，开始核对</button>${state.permission !== "granted" ? '<button class="button button-quiet" data-action="choose-automatic">以后开启自动提醒</button>' : ""}</footer></div>`;
}

function renderAddActive() {
  return `<div class="screen">${header("补充到当前守护", "go-guard")}<div class="screen-body"><p class="muted small">新增物品沿用当前守护点和手账卡，不重建任务。</p><div class="stack"><button class="card candidate" data-action="add-active-item" data-kind="photo">拍照补充 <span class="muted">模拟加入充电器</span></button><button class="card candidate" data-action="add-active-item" data-kind="existing">从物品栏选择 <span class="muted">加入方格笔记本</span></button><button class="card candidate" data-action="add-active-item" data-kind="name">手写名称标签 <span class="muted">加入折叠伞，无照片证据</span></button></div></div></div>`;
}

function renderNotification() {
  const sample = activeItems().slice(0, 3);
  return `<div class="screen">${header("离场提醒预览", "go-guard")}<div class="screen-body"><p class="caption">锁屏通知 · 原型模拟</p><div class="notification"><div class="notification-head"><strong>DON'T LOSE IT</strong><span>现在</span></div><h3>${escapeHtml(sample[0]?.name || "你的物品")}说它不想独自留在这里。</h3><p class="small">你可能正在离开，准备核对一下吗？</p><div class="notification-items">${sample.map(itemArt).join("")}</div><p class="caption">这里只是 ${sample.length} 件物品样本，不是完整清单。打开后查看全部 ${activeItems().length} 件。</p></div><div class="button-row"><button class="button button-secondary" data-action="choose-away">只是暂离</button><button class="button" data-action="open-checklist">准备离开</button></div></div></div>`;
}

function renderAwayDuration() {
  return `<div class="screen">${header("只是暂离", "go-guard")}<div class="screen-body"><h2>准备离开多久？</h2><p class="muted small">物品仍留在原处时，保留任务并暂停离场提醒。</p><div class="duration-options">${[10, 30, 60].map(minutes => `<button class="button button-secondary" data-action="start-away" data-minutes="${minutes}"><strong>${minutes}</strong>分钟</button>`).join("")}</div><div class="notice warning"><strong>暂离不是防盗保护</strong>到期仍在远处只提示一次；未回应不会自动恢复报警。</div></div></div>`;
}

function renderAway() {
  const expired = state.away?.expired;
  return `<div class="screen">${header("只是暂离", "go-guard")}<div class="screen-body"><div class="guard-hero"><div class="guard-status paused">暂停中</div><h2>${expired ? "还没回来？" : `暂离 ${state.away?.minutes} 分钟`}</h2><p class="small muted">${expired ? "可延长暂离或开始核对" : "离场提醒暂时静默，任务和清单仍保留"}</p></div>${expired ? '<div class="notice warning"><strong>一次中性到期提示</strong>未回应会继续保持暂停，不会直接变成遗失报警。</div>' : '<div class="notice">附近移动由系统过滤；这里处理的是较远距离的有意暂离。</div>'}<div class="prototype-control"><span class="caption">原型控制 · 非产品按钮</span><div class="button-row">${!expired ? '<button class="button button-small button-secondary" data-action="expire-away">模拟暂离到期</button>' : '<button class="button button-small button-secondary" data-action="ignore-away-expiry">模拟不回应</button>'}<button class="button button-small button-secondary" data-action="extend-away">延长 30 分钟</button></div></div></div><footer class="screen-footer"><button class="button button-secondary" data-action="open-checklist">开始核对</button><button class="button" data-action="return-from-away">我回来了</button></footer></div>`;
}

function renderFollowup() {
  const important = activeItems().filter(item => item.important && !item.confirmed);
  return `<div class="screen">${header("重要物品提醒", "go-guard")}<div class="screen-body"><div class="notification"><div class="notification-head"><strong>DON'T LOSE IT</strong><span>2 分钟后</span></div><h3>还有重要物品没有确认</h3><p class="small">${important.map(item => escapeHtml(item.name)).join("、") || "重要物品"}仍在本次清单中。请打开完整清单核对。</p></div><div class="notice">这是最多一次的追加提醒，不会继续无限追问。</div></div><footer class="screen-footer"><button class="button" data-action="open-checklist">查看完整清单</button></footer></div>`;
}

function checklistRow(item) {
  return `<div class="check-row"><div>${itemArt(item)}</div><div><div class="check-row-head"><strong>${escapeHtml(item.name)}</strong>${item.important ? '<span class="important-badge">重要 · 逐件</span>' : '<span class="status-badge">普通</span>'}</div>${item.confirmed ? '<p class="confirmed-label">已带走</p>' : `<div class="check-actions"><button class="button button-small button-secondary" data-action="confirm-item" data-id="${item.id}">已带走</button><button class="button button-small button-quiet" data-action="missing-item" data-id="${item.id}">还没找到</button></div>`}</div></div>`;
}

function renderChecklist() {
  const items = activeItems();
  const allConfirmed = items.every(item => item.confirmed);
  const ordinaryRemaining = items.some(item => !item.important && !item.confirmed);
  return `<div class="screen">${header("完整离场核对", "go-guard")}<div class="screen-body"><h2>本次 ${items.length} 件，都在身边吗？</h2><p class="small muted">这是完整清单，不是通知中的部分样本。</p><button class="button button-secondary full-width" data-action="confirm-ordinary" ${ordinaryRemaining ? "" : "disabled"}>普通物品都带齐了</button><p class="caption">不包含需要逐件确认的重要物品。</p><div>${items.map(checklistRow).join("")}</div></div><footer class="screen-footer"><button class="button" data-action="complete-checklist" ${allConfirmed ? "" : "disabled"}>${allConfirmed ? "完成核对" : "请确认所有必要物品"}</button></footer></div>`;
}

function renderAllReturned() {
  return `<div class="screen"><div class="screen-body"><div class="stamp">全员<br>归队</div><h2>今天的东西，都带齐了。</h2><p class="muted">本次守护已完成。完整原图已按默认规则删除，贴纸保留在物品栏和今日手账中。</p></div><footer class="screen-footer"><button class="button" data-action="go-journal">查看今日手账</button></footer></div>`;
}

function renderLastSeen() {
  const item = findItem(state.missingId) || activeItems()[0];
  const evidence = item.nameOnly ? '<div class="notice"><strong>只有名称记录</strong>这个物品没有照片输入，因此没有原图高亮或虚构的照片证据。</div>' : `<div class="evidence-photo"><div class="table-grid"></div><div class="table-item item-${item.id}">${itemArt(item)}</div><div class="evidence-highlight"><span>最近出现在这里</span></div></div>`;
  return `<div class="screen">${header("最近出现", "open-checklist")}<div class="screen-body"><div class="check-row-head"><h2>${escapeHtml(item.name)}</h2><span class="status-badge missing">寻找中</span></div><p class="small muted">最近出现是过去证据，不是实时位置。</p>${evidence}<div class="card"><p class="small"><strong>本次守护点</strong><br>${state.guardPoint || "手动守护 · 未记录地点"}<br>今天 ${state.startedAt || "14:00"}</p><p class="small"><strong>近期记录</strong><br>10 月 28 日 · 图书馆（模拟）<br>10 月 25 日 · 咖啡馆（模拟）</p></div></div><footer class="screen-footer"><button class="button button-secondary" data-action="found-during-check">找到了</button><button class="button" data-action="temporarily-missing">暂时找不到</button></footer></div>`;
}

function renderCloseCheck() {
  const item = findItem(state.missingId);
  return `<div class="screen">${header("结束本次核对", "back-to-last-seen")}<div class="screen-body"><h2>保留“${escapeHtml(item?.name || "这件物品")}”为待找回？</h2><div class="stack"><div class="notice warning"><strong>不会盖“全员归队”</strong>本次离场结果会保留为有物品待找回。</div><div class="notice"><strong>独立记录，不阻止新守护</strong>稍后可以从历史手账继续处理，不占用当前守护名额。</div><div class="notice privacy"><strong>只保留局部照片证据</strong>${item?.nameOnly ? "名称-only 物品没有照片证据。" : "默认删除完整原图，只在本机保留物品及周围一小块照片；找回后再删除。"}</div></div></div><footer class="screen-footer"><button class="button button-secondary" data-action="back-to-last-seen">继续寻找</button><button class="button" data-action="confirm-close-missing">保留待找回并结束</button></footer></div>`;
}

function renderFoundLater() {
  const item = findItem(state.recovery?.itemId || state.missingId);
  return `<div class="screen"><div class="screen-body"><div class="stamp recovery">找回啦</div><h2>${escapeHtml(item?.name || "物品")}回来了。</h2><p class="muted">实际找回日期：2026 年 10 月 29 日</p><div class="notice"><strong>原始离场结果没有改变</strong>历史仍保留“离场时有 1 件待找回”，现在追加“已找回”和实际日期，不补盖全员归队。</div><p class="caption">局部照片证据已按默认规则删除；回看时印章保持静态。</p></div><footer class="screen-footer"><button class="button" data-action="go-journal">查看历史手账</button></footer></div>`;
}

function journalCards() {
  const items = activeItems();
  const currentStatus = state.originalOutcome === "all-returned" ? "全员归队" : state.recovery?.status === "found" ? "已找回" : "待找回";
  return `<article class="history-card"><div class="history-card-head"><div><h3>图书馆 · 学习守护</h3><span class="caption">今天 14:00 · ${items.length} 件物品</span></div><span class="mini-stamp">${currentStatus}</span></div><div class="history-stickers">${items.map(item => itemArt(item)).join("")}</div>${state.recovery ? `<p class="small">原始离场：1 件待找回<br>${state.recovery.status === "found" ? "已找回 · 实际日期 10 月 29 日" : "仍在寻找 · 不阻止开始新守护"}</p>${state.recovery.status === "pending" ? '<button class="button button-small button-secondary" data-action="found-later">标记找回</button>' : ""}` : '<p class="small">本次全部带齐 · 原始结果已保存</p>'}</article>
    <article class="history-card"><div class="history-card-head"><div><h3>咖啡馆 · 早间守护</h3><span class="caption">今天 09:20 · 3 件物品</span></div><span class="mini-stamp">全员归队</span></div><div class="history-stickers">${state.items.slice(1, 4).map(item => itemArt(item)).join("")}</div><p class="small">同日独立守护，清单不会合并。</p></article>`;
}

function renderJournal() {
  return `<div class="screen"><header class="screen-header"><button class="icon-button" data-action="go-home" aria-label="返回">←</button><h1>10 月 29 日</h1><button class="text-button" data-action="share">分享</button></header><div class="screen-body"><h2>今日手账</h2><p class="caption">2 次守护 · 累计收藏以真实使用为基础，不设置断签惩罚</p>${journalCards()}<button class="button button-secondary full-width" data-action="share">生成隐私安全分享卡</button></div>${bottomTabs("journal")}</div>`;
}

function shareCard(interactive) {
  const items = activeItems().filter(item => interactive || !state.shareHidden.includes(item.id));
  return `<div class="share-card"><p class="caption">DON'T LOSE IT · 今日手账</p><h2>今天在图书馆学习</h2><p class="small">带来的东西，都有了记录。</p><div class="share-items">${items.map(item => {
    const hidden = state.shareHidden.includes(item.id);
    const content = `${itemArt(item)}<span>${escapeHtml(item.name)}${interactive && hidden ? " · 已隐藏" : ""}</span>`;
    return interactive ? `<button class="share-item ${hidden ? "hidden-item" : ""}" data-action="toggle-share-item" data-id="${item.id}" aria-pressed="${!hidden}">${content}</button>` : `<div class="share-item">${content}</div>`;
  }).join("")}</div><div class="share-privacy">精确地点、详细时间和重要物品标记默认隐藏。<br>${interactive ? "点按物品可隐藏或恢复；导出前请确认最终预览。" : "内容已与最终预览核对。"}</div></div>`;
}

function renderShare() {
  return `<div class="screen">${header("分享卡最终预览", "go-journal")}<div class="screen-body">${shareCard(true)}<p class="caption">默认带入物品；已隐藏的物品不会进入导出模型。</p></div><footer class="screen-footer"><button class="button" data-action="export-share">确认预览并导出</button></footer></div>`;
}

function renderExported() {
  return `<div class="screen">${header("导出完成", "back-to-share")}<div class="screen-body">${shareCard(false)}<div class="notice"><strong>模拟导出成功</strong>原型不会写入真实相册或文件。正式实现只能由脱敏模型渲染分享图。</div></div><footer class="screen-footer"><button class="button button-secondary" data-action="back-to-share">返回编辑</button><button class="button" data-action="go-journal">完成</button></footer></div>`;
}

function renderLibrary() {
  const selectedLibrary = state.items.filter(item => state.selected.includes(item.id));
  return `<div class="screen">${header("从已有物品开始", "go-home")}<div class="screen-body"><h2>今天实际带了哪些？</h2><p class="small muted">“上课包”模板只提供候选，默认不勾选，不证明今天携带。</p><div class="card"><div class="check-row-head"><h3>上课包</h3><button class="text-button" data-action="select-all">全选</button></div>${state.items.map(item => `<label class="item-row"><div>${itemArt(item)}</div><div><strong>${escapeHtml(item.name)}</strong><small>${item.identity}</small></div><input type="checkbox" data-action="toggle-library" data-id="${item.id}" ${state.selected.includes(item.id) ? "checked" : ""}></label>`).join("")}</div><div class="notice">也可以不选模板，返回首页直接拍照。</div></div><footer class="screen-footer"><button class="button" data-action="confirm-library" ${selectedLibrary.length ? "" : "disabled"}>使用已选 ${selectedLibrary.length} 件物品</button></footer>${bottomTabs("library")}</div>`;
}

function render() {
  const renderers = {
    home: renderHome,
    library: renderLibrary,
    camera: renderCamera,
    processing: renderProcessing,
    failure: renderFailure,
    cutting: renderCutting,
    review: renderReview,
    permission: renderPermission,
    "system-permission": renderSystemPermission,
    guard: renderGuard,
    "add-active": renderAddActive,
    notification: renderNotification,
    "away-duration": renderAwayDuration,
    away: renderAway,
    checklist: renderChecklist,
    followup: renderFollowup,
    "all-returned": renderAllReturned,
    "last-seen": renderLastSeen,
    "close-check": renderCloseCheck,
    "found-later": renderFoundLater,
    journal: renderJournal,
    share: renderShare,
    exported: renderExported
  };
  app.innerHTML = (renderers[state.screen] || renderHome)();
  app.scrollTop = 0;

  document.querySelector("#variant-label").textContent = variantNames[state.variant];
  const [title, description] = tasks[state.screen] || tasks.home;
  taskNote.innerHTML = `<strong>${title}</strong><p>${description}</p>`;
  document.querySelector("#flow-nav").innerHTML = flows.map(flow => `<button class="flow-link ${flow.screens.includes(state.screen) ? "active" : ""}" data-action="jump-flow" data-flow="${flow.id}"><span>${String(flow.id).padStart(2, "0")}</span><span>${flow.label}</span></button>`).join("");
  inspector.textContent = JSON.stringify({
    screen: state.screen,
    variant: state.variant,
    draft: state.draft,
    session: state.session,
    permission: state.permission,
    guardPoint: state.guardPoint,
    selected: state.selected,
    items: activeItems().map(item => ({ name: item.name, important: item.important, confirmed: item.confirmed, missing: item.missing, nameOnly: item.nameOnly })),
    away: state.away,
    reminderCount: state.reminderCount,
    originalOutcome: state.originalOutcome,
    recovery: state.recovery,
    fullPhotoDeleted: state.fullPhotoDeleted,
    recoveryCrop: state.recoveryCrop,
    shareHidden: state.shareHidden
  }, null, 2);
}

function navigate(screen) {
  state.screen = screen;
  render();
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = window.setTimeout(() => { toast.hidden = true; }, 2400);
}

function startProcessing(shouldFail = false) {
  state.failProcessing = shouldFail;
  navigate("processing");
  window.setTimeout(() => {
    if (state.screen !== "processing") return;
    navigate(state.failProcessing ? "failure" : "cutting");
  }, 650);
}

function startGuard(permission) {
  state.permission = permission;
  state.sessionItems = currentItems().map(item => ({ ...item }));
  if (!state.sessionItems.length) {
    state.sessionItems = cloneItems();
    state.selected = state.sessionItems.map(item => item.id);
    state.items = cloneItems();
  }
  state.session = "guarding";
  state.startedAt = "14:00";
  state.guardPoint = permission === "granted" ? "图书馆 · 3 层（模拟）" : null;
  state.draft = false;
  state.away = null;
  state.reminderCount = 0;
  navigate("guard");
}

function prepareHistory() {
  state.items = cloneItems();
  state.selected = state.items.map(item => item.id);
  state.sessionItems = cloneItems();
  state.sessionItems[0].missing = true;
  state.session = "completed";
  state.permission = "granted";
  state.guardPoint = "图书馆 · 3 层（模拟）";
  state.startedAt = "14:00";
  state.homeHistory = true;
  state.originalOutcome = "pending";
  state.missingId = "airpods";
  state.recovery = { itemId: "airpods", status: "pending", foundDate: null };
  state.fullPhotoDeleted = true;
  state.recoveryCrop = true;
}

function resetScenario(scenario = "fresh") {
  const variant = state.variant;
  state = freshState();
  state.variant = variant;
  if (scenario === "draft") {
    state.draft = true;
    state.selected = ["airpods", "pencil"];
  }
  if (scenario === "active") {
    state.selected = state.items.map(item => item.id);
    state.identityResolved = true;
    startGuard("granted");
    return;
  }
  if (scenario === "history") prepareHistory();
  render();
}

function cycleVariant(direction) {
  const keys = Object.keys(variantNames);
  const index = keys.indexOf(state.variant);
  state.variant = keys[(index + direction + keys.length) % keys.length];
  const url = new URL(window.location.href);
  url.searchParams.set("variant", state.variant);
  window.history.replaceState({}, "", url);
  navigate("home");
}

function jumpFlow(flowId) {
  resetScenario("fresh");
  if (flowId === 1) return;
  if (flowId === 2) return navigate("camera");
  state.selected = state.items.map(item => item.id);
  if (flowId === 3) return navigate("cutting");
  if (flowId === 4) return navigate("review");
  state.identityResolved = true;
  startGuard("granted");
  if (flowId === 5) return;
  if (flowId === 6) {
    state.session = "awaiting-check";
    state.reminderCount = 1;
    return navigate("notification");
  }
  if (flowId === 7) {
    state.session = "searching";
    state.missingId = "airpods";
    state.sessionItems[0].missing = true;
    return navigate("last-seen");
  }
  prepareHistory();
  navigate("journal");
}

const actions = {
  reset: () => resetScenario("fresh"),
  "previous-variant": () => cycleVariant(-1),
  "next-variant": () => cycleVariant(1),
  "go-home": () => navigate("home"),
  "go-library": () => navigate("library"),
  "go-journal": () => { state.homeHistory = true; navigate("journal"); },
  "go-guard": () => navigate(state.session === "temporarily-away" ? "away" : "guard"),
  "show-settings": () => showToast("设置不在本轮低保真验证范围内"),
  "start-capture": () => {
    if (["guarding", "temporarily-away", "awaiting-check", "searching"].includes(state.session)) {
      showToast("请先核对当前守护，再开始新任务");
      return navigate("guard");
    }
    state.sessionItems = [];
    state.draft = true;
    navigate("camera");
  },
  "start-library": () => {
    if (["guarding", "temporarily-away", "awaiting-check", "searching"].includes(state.session)) return navigate("guard");
    state.selected = [];
    state.manualItems = [];
    state.sessionItems = [];
    state.identityResolved = true;
    state.draft = true;
    navigate("library");
  },
  "leave-draft": () => { state.draft = true; navigate("home"); },
  "continue-draft": () => navigate("cutting"),
  "discard-draft": () => { state.confirmDiscard = true; render(); },
  "cancel-discard": () => { state.confirmDiscard = false; render(); },
  "confirm-discard": () => { const variant = state.variant; state = freshState(); state.variant = variant; render(); },
  "take-photo": () => startProcessing(false),
  "simulate-failure": () => startProcessing(true),
  "retry-processing": () => startProcessing(false),
  "cancel-processing": () => navigate("camera"),
  "manual-from-camera": () => { state.addingItem = true; state.identityResolved = true; navigate("review"); },
  "manual-from-failure": () => { state.addingItem = true; state.identityResolved = true; navigate("review"); },
  "toggle-cut": id => {
    state.selected = state.selected.includes(id) ? state.selected.filter(itemId => itemId !== id) : [...state.selected, id];
    if (id === "airpods") state.identityResolved = false;
    render();
  },
  "select-all": () => { state.selected = state.items.map(item => item.id); render(); },
  "clear-selection": () => { state.selected = []; state.identityResolved = false; render(); },
  "confirm-cutting": () => { state.addingItem = false; navigate("review"); },
  "back-to-cutting": () => navigate(state.selected.length ? "cutting" : "camera"),
  "show-add-item": () => { state.addingItem = true; navigate("review"); },
  "cancel-add-item": () => { state.addingItem = false; render(); },
  "save-manual-item": () => {
    const input = document.querySelector("#new-item-name");
    const name = input?.value.trim() || "未命名物品";
    state.manualItems.push({ id: `manual-${Date.now()}`, name, shape: "name", important: false, identity: "手动添加", confirmed: false, missing: false, nameOnly: true });
    state.addingItem = false;
    render();
  },
  "resolve-identity": (id, element) => {
    state.identityResolved = true;
    const item = findItem("airpods");
    item.name = element.dataset.name;
    item.identity = element.dataset.name === "我的新 AirPods" ? "新物品" : "已有物品 · 用户确认";
    render();
  },
  "correct-identity": () => { state.identityResolved = false; render(); },
  "confirm-review": () => navigate("permission"),
  "confirm-library": () => { state.identityResolved = true; navigate("review"); },
  "back-to-review": () => navigate("review"),
  "choose-automatic": () => navigate("system-permission"),
  "choose-manual": () => startGuard("manual"),
  "allow-permission": () => startGuard("granted"),
  "deny-permission": () => { showToast("已降级为手动守护，未开启自动提醒"); startGuard("manual"); },
  "add-active": () => navigate("add-active"),
  "add-active-item": (id, element) => {
    const kind = element.dataset.kind;
    let item;
    if (kind === "photo") item = { id: `charger-${Date.now()}`, name: "充电器", shape: "charger", important: false, identity: "守护中拍照补充", nameOnly: false };
    if (kind === "existing") item = { ...cloneItems()[3], id: `notebook-${Date.now()}`, identity: "守护中从物品栏补充" };
    if (kind === "name") item = { id: `umbrella-${Date.now()}`, name: "折叠伞", shape: "name", important: false, identity: "守护中名称补充", nameOnly: true };
    state.sessionItems.push({ ...item, confirmed: false, missing: false });
    showToast("已补充到当前守护，地点和手账卡不变");
    navigate("guard");
  },
  "simulate-departure": () => { state.session = "awaiting-check"; state.reminderCount = 1; navigate("notification"); },
  "simulate-followup": () => { state.reminderCount = 2; navigate("followup"); },
  "choose-away": () => navigate("away-duration"),
  "start-away": (id, element) => {
    state.session = "temporarily-away";
    state.away = { minutes: Number(element.dataset.minutes), expired: false, prompted: false };
    navigate("away");
  },
  "expire-away": () => { state.away = { ...state.away, expired: true, prompted: true }; render(); },
  "ignore-away-expiry": () => showToast("未回应：提醒继续暂停，不会自动变成遗失报警"),
  "extend-away": () => { state.away = { minutes: 30, expired: false, prompted: false }; showToast("已延长暂离 30 分钟"); render(); },
  "return-from-away": () => { state.session = "guarding"; state.away = null; showToast("已返回，离场提醒恢复"); navigate("guard"); },
  "open-checklist": () => { state.session = "awaiting-check"; navigate("checklist"); },
  "confirm-item": id => { const item = findItem(id); item.confirmed = true; item.missing = false; render(); },
  "confirm-ordinary": () => { activeItems().filter(item => !item.important).forEach(item => { item.confirmed = true; }); render(); },
  "missing-item": id => { const item = findItem(id); item.missing = true; state.missingId = id; state.session = "searching"; navigate("last-seen"); },
  "found-during-check": () => { const item = findItem(state.missingId); item.confirmed = true; item.missing = false; state.session = "awaiting-check"; navigate("checklist"); },
  "complete-checklist": () => {
    state.session = "completed";
    state.originalOutcome = "all-returned";
    state.homeHistory = true;
    state.fullPhotoDeleted = true;
    navigate("all-returned");
  },
  "temporarily-missing": () => navigate("close-check"),
  "back-to-last-seen": () => navigate("last-seen"),
  "confirm-close-missing": () => {
    state.session = "completed";
    state.originalOutcome = "pending";
    state.homeHistory = true;
    state.fullPhotoDeleted = true;
    state.recoveryCrop = !findItem(state.missingId)?.nameOnly;
    state.recovery = { itemId: state.missingId, status: "pending", foundDate: null };
    navigate("journal");
  },
  "found-later": () => {
    state.recovery = { ...state.recovery, status: "found", foundDate: "2026-10-29" };
    state.recoveryCrop = false;
    navigate("found-later");
  },
  share: () => { state.shareHidden = []; navigate("share"); },
  "toggle-share-item": id => {
    state.shareHidden = state.shareHidden.includes(id) ? state.shareHidden.filter(itemId => itemId !== id) : [...state.shareHidden, id];
    render();
  },
  "export-share": () => navigate("exported"),
  "back-to-share": () => navigate("share"),
  "jump-flow": (id, element) => jumpFlow(Number(element.dataset.flow))
};

document.addEventListener("click", event => {
  const element = event.target.closest("[data-action]");
  if (!element || element.disabled) return;
  const action = actions[element.dataset.action];
  if (action) action(element.dataset.id, element);
});

document.addEventListener("change", event => {
  const element = event.target;
  if (element.id === "scenario") {
    resetScenario(element.value);
    return;
  }
  const action = element.dataset.action;
  const id = element.dataset.id;
  if (action === "toggle-library") {
    state.selected = element.checked ? [...state.selected, id] : state.selected.filter(itemId => itemId !== id);
    render();
  }
  if (action === "toggle-important") {
    findItem(id).important = element.checked;
    render();
  }
  if (action === "edit-name") {
    findItem(id).name = element.value.trim() || "未命名物品";
    render();
  }
});

document.addEventListener("keydown", event => {
  if (event.target.matches("input, textarea, [contenteditable]")) return;
  if (event.key === "ArrowLeft") cycleVariant(-1);
  if (event.key === "ArrowRight") cycleVariant(1);
});

render();
