const variantNames = {
  A: "A · 自由拼贴",
  B: "B · 杂志网格",
  C: "C · 摊开手账"
};

const reviewCopy = {
  home: ["今日手账 · 浓手账", "比较三种构图的收藏感与主操作层级。胶带和贴纸不参与操作，唯一主按钮保持清晰。"],
  guard: ["当前守护 · 中等密度", "保留纸张、票根和印章，但地点、时间、物品与主动核对入口必须一眼可读。"],
  checklist: ["离场核对 · 轻手账", "装饰退到背景。普通物品可批量确认，重要物品必须逐件确认，完整清单始终明确。"]
};

const items = [
  { id: "airpods", name: "通勤 AirPods Pro", important: true },
  { id: "pencil", name: "Apple Pencil", important: false },
  { id: "bottle", name: "蓝色水杯", important: false },
  { id: "notebook", name: "方格笔记本", important: false }
];

const app = document.querySelector("#app");
let state = {
  screen: "home",
  variant: readVariant(),
  confirmed: [],
  returned: false
};

function readVariant() {
  const value = new URLSearchParams(window.location.search).get("variant");
  return variantNames[value] ? value : "A";
}

function itemArt(id) {
  const art = {
    airpods: `<svg viewBox="0 0 120 120" role="img" aria-label="AirPods"><path d="M28 39Q28 25 43 24h34q15 1 15 15v38q0 15-15 16H43q-15-1-15-16z" fill="#fffdf7" stroke="#fff" stroke-width="10"/><path d="M28 39Q28 25 43 24h34q15 1 15 15v38q0 15-15 16H43q-15-1-15-16z" fill="#f8f7f1" stroke="#8b8c87" stroke-width="2"/><path d="M29 43h62" stroke="#b8b7ae" stroke-width="2"/><path d="M52 27h16" stroke="#c4c3ba" stroke-width="2"/><circle cx="60" cy="83" r="2" fill="#78826a"/><path d="M42 48q8-5 14 1v19q-1 7-8 7t-7-7V53" fill="#fff" stroke="#a5a59e" stroke-width="1.5"/><path d="M65 48q8-5 13 1v19q-1 7-7 7t-7-7V53" fill="#fff" stroke="#a5a59e" stroke-width="1.5"/><path d="M49 72v24m20-24v24" stroke="#faf9f4" stroke-width="7" stroke-linecap="round"/><path d="M49 72v24m20-24v24" stroke="#a5a59e" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    pencil: `<svg viewBox="0 0 140 90" role="img" aria-label="Apple Pencil"><path d="M22 53 105 16l16 12-83 38z" fill="#fff" stroke="#fff" stroke-width="9" stroke-linejoin="round"/><path d="M22 53 105 16l16 12-83 38z" fill="#fbfaf4" stroke="#96978f" stroke-width="1.5" stroke-linejoin="round"/><path d="m105 16 9-6 7 18-8 5z" fill="#d8d9d2" stroke="#96978f" stroke-width="1.5"/><path d="m22 53-9 13 25 0z" fill="#e7e5dc" stroke="#96978f" stroke-width="1.5"/><path d="m31 51 8 11" stroke="#c3c2ba" stroke-width="2"/></svg>`,
    bottle: `<svg viewBox="0 0 100 140" role="img" aria-label="蓝色水杯"><path d="M33 20h34v19l9 20v61q0 8-8 8H32q-8 0-8-8V59l9-20z" fill="#fff" stroke="#fff" stroke-width="10"/><path d="M33 20h34v19l9 20v61q0 8-8 8H32q-8 0-8-8V59l9-20z" fill="#6f929c" stroke="#3f616c" stroke-width="2"/><path d="M31 15h38v15H31z" fill="#d9d6c9" stroke="#716e65" stroke-width="2"/><path d="M26 61h48v39H26z" fill="#87a6ad" opacity=".8"/><path d="M35 70q15-9 29 0v21q-15 8-29 0z" fill="#efe4cc" stroke="#85755e" stroke-width="1.5"/><path d="M41 77h17M41 82h12" stroke="#7b6c57" stroke-width="1.5"/></svg>`,
    notebook: `<svg viewBox="0 0 120 120" role="img" aria-label="方格笔记本"><path d="M24 18h72v88H24z" fill="#fff" stroke="#fff" stroke-width="10"/><path d="M24 18h72v88H24z" fill="#c9b18b" stroke="#76664e" stroke-width="2"/><path d="M34 18v88" stroke="#77644c" stroke-width="3"/><path d="M44 34h40M44 47h40M44 60h40M44 73h40M44 86h40M50 27v68M62 27v68M74 27v68" stroke="#9c896a" stroke-width="1" opacity=".6"/><path d="M23 32h13M23 49h13M23 66h13M23 83h13M23 99h13" stroke="#55554f" stroke-width="3"/></svg>`
  };
  return art[id];
}

function header(title = "") {
  return `<header class="app-header"><span class="app-brand">DON'T LOSE IT</span>${title ? `<strong class="app-title">${title}</strong>` : "<span></span>"}<button aria-label="设置">···</button></header>`;
}

function bottomTabs() {
  return `<nav class="bottom-tabs" aria-label="应用导航"><button class="active" data-screen="home"><span>01</span>手账</button><button data-action="show-library"><span>02</span>物品栏</button></nav>`;
}

function stickers(layout = "collage") {
  return `<div class="${layout}"><div class="item-sticker sticker-airpods">${itemArt("airpods")}<span class="sticker-label">AirPods</span></div><div class="item-sticker sticker-pencil">${itemArt("pencil")}</div><div class="item-sticker sticker-bottle">${itemArt("bottle")}<span class="sticker-label">my blue bottle</span></div></div>`;
}

function renderHomeA() {
  return `<div class="screen">${header()}<main class="journal-page">
    <div class="date-lockup"><div class="date-main"><span class="date-month">November</span><strong class="date-day">02</strong><span class="date-meta">MONDAY<br>2026 · WEEK 45</span></div><div class="postage">DAILY<br>JOURNAL</div></div>
    <section class="journal-title"><span class="eyebrow">TODAY'S LITTLE THINGS</span><h1>把今天带来的，<br><em>都好好带走。</em></h1><p>用一张照片，收集今天陪你的东西。</p></section>
    <div class="collage"><div class="collage-note"><i class="tape"></i>今天也要记得，<br>把小红点变成归队。<small>— library day</small></div>${stickers("")}<i class="paper-clip"></i><span class="pencil-note">collect, don't forget.</span></div>
    <section class="start-strip"><span class="caption">今日还没有守护卡 · 从眼前的东西开始</span><button class="primary-button" data-screen="guard">剪下今天带来的东西</button><button class="text-button" data-action="show-library">从已有物品开始</button></section>
  </main>${bottomTabs()}</div>`;
}

function renderHomeB() {
  return `<div class="screen">${header()}<main class="journal-page editorial-page">
    <div class="editorial-mast"><div class="editorial-date">02<small>NOV. 2026<br>MONDAY</small></div><div><h1>今日手账，<br>从随身携带开始。</h1><p>VOL. 001 · LIBRARY EDITION</p></div></div>
    <div class="editorial-grid"><div class="editorial-card">${itemArt("airpods")}<span>通勤 AirPods</span></div><div class="editorial-card">${itemArt("bottle")}<span>蓝色水杯</span></div><div class="editorial-card">${itemArt("pencil")}<span>Apple Pencil</span></div><div class="editorial-card">${itemArt("notebook")}<span>方格笔记本</span></div></div>
    <p class="editorial-note">物品不只是清单，也是今天的生活。</p>
    <section class="start-strip"><span class="caption">4 件最近收藏 · 今天由你重新确认</span><button class="primary-button" data-screen="guard">剪下今天带来的东西</button><button class="text-button" data-action="show-library">从已有物品开始</button></section>
  </main>${bottomTabs()}</div>`;
}

function renderHomeC() {
  return `<div class="screen">${header()}<main class="spread-page">
    <div class="spread"><i class="tape tape-navy" style="left:39%;top:-8px"></i><section class="spread-left"><span class="eyebrow">NOVEMBER</span><div class="spread-date">02</div><p>MONDAY<br>2026 · WEEK 45</p><div class="mini-stamp">Daily<br>Journal</div><p class="hand">把今天带来的，<br>都好好带走。</p></section><section class="spread-right"><span class="hand">today's collection</span><h1>今天陪我<br>学习的东西</h1><div class="spread-stickers">${itemArt("airpods") ? `<div class="item-sticker sticker-airpods">${itemArt("airpods")}</div><div class="item-sticker sticker-pencil">${itemArt("pencil")}</div><div class="item-sticker sticker-bottle">${itemArt("bottle")}</div>` : ""}</div></section></div>
    <section class="start-strip spread-cta"><span class="caption">一张照片，开始今天的守护</span><button class="primary-button" data-screen="guard">剪下今天带来的东西</button><button class="text-button" data-action="show-library">从已有物品开始</button></section>
  </main>${bottomTabs()}</div>`;
}

function renderGuard() {
  return `<div class="screen guard-screen">${header("当前守护")}<main class="light-page">
    <section class="guard-heading"><span class="eyebrow">GUARDING · SESSION 01</span><h1>安心学习吧。</h1><p>今天带来的东西，已经记在这一页。</p><div class="mini-stamp">守护中</div></section>
    <section class="ticket"><i class="tape"></i><div><span>GUARD POINT · 守护点</span><strong>图书馆 · 3 层</strong></div><div><span>STARTED AT · 开始</span><strong>今天 14:00</strong></div></section>
    <section class="guard-items"><div class="guard-items-head"><h2>本次 4 件物品</h2><button data-action="show-add">＋ 补充</button></div>${items.map(item => `<div class="guard-item">${itemArt(item.id)}<div><strong>${item.name}</strong><small>${item.important ? "重要物品 · 离场逐件确认" : "普通物品"}</small></div>${item.important ? '<span class="important-label">重要</span>' : ""}</div>`).join("")}</section>
    <div class="guard-actions"><button class="secondary-button" data-action="show-away">只是暂离</button><button class="primary-button" data-screen="checklist">准备离开，开始核对</button></div>
    <p class="privacy-note">只记录一个固定守护点，不记录移动路线。<br>这是视觉样页，自动离场能力尚未验证。</p>
  </main></div>`;
}

function renderChecklist() {
  const allConfirmed = state.confirmed.length === items.length;
  return `<div class="screen checklist-screen">${header("离场核对")}<main class="light-page">
    <section class="check-heading"><span class="eyebrow">BEFORE YOU LEAVE</span><h1>都带回去了吗？</h1><p>最后看一眼，再离开今天的位置。</p></section>
    <div class="complete-banner"><strong>本次 ${items.length} 件 · 完整清单</strong><span>已确认 ${state.confirmed.length} / ${items.length}</span></div>
    <button class="secondary-button bulk-check" data-action="confirm-ordinary">普通物品都带齐了</button><p class="bulk-note">一键确认不包含重要物品</p>
    <section class="check-list">${items.map(item => {
      const confirmed = state.confirmed.includes(item.id);
      return `<div class="check-item ${item.important ? "important" : ""} ${confirmed ? "confirmed" : ""}">${itemArt(item.id)}<div><strong>${item.name}</strong><small>${item.important ? "重要 · 请逐件确认" : confirmed ? "已带走" : "还没找到？点右侧确认"}</small></div><button class="check-toggle" data-action="toggle-item" data-id="${item.id}" aria-label="${confirmed ? "取消确认" : "确认已带走"}${item.name}" aria-pressed="${confirmed}">${confirmed ? "✓" : ""}</button></div>`;
    }).join("")}</section>
    <div class="check-actions"><button class="primary-button" data-action="complete" ${allConfirmed ? "" : "disabled"}>${allConfirmed ? "完成核对" : "请确认所有必要物品"}</button><button class="text-button" data-screen="guard">返回当前守护</button></div>
  </main>${state.returned ? `<section class="returned-overlay"><div class="returned-stamp">全员<br>归队</div><h2>今天的东西，都带齐了。</h2><p>本次守护已完成。<br>把这一刻，贴进今日手账。</p><button class="primary-button" data-screen="home">查看今日手账</button></section>` : ""}</div>`;
}

function render() {
  document.querySelectorAll("[data-screen]").forEach(button => {
    button.classList.toggle("active", button.dataset.screen === state.screen && button.closest(".sample-nav"));
  });
  if (state.screen === "guard") app.innerHTML = renderGuard();
  else if (state.screen === "checklist") app.innerHTML = renderChecklist();
  else if (state.variant === "B") app.innerHTML = renderHomeB();
  else if (state.variant === "C") app.innerHTML = renderHomeC();
  else app.innerHTML = renderHomeA();
  app.scrollTop = 0;

  document.querySelector("#variant-label").textContent = variantNames[state.variant];
  const [title, copy] = reviewCopy[state.screen];
  document.querySelector("#review-copy").innerHTML = `<strong>${title}</strong><p>${copy}</p>`;
  document.querySelector("#state-readout").textContent = JSON.stringify({
    screen: state.screen,
    variant: state.variant,
    confirmed: state.confirmed,
    returned: state.returned,
    persistence: false
  }, null, 2);
}

function navigate(screen) {
  state.screen = screen;
  if (screen !== "checklist") state.returned = false;
  render();
}

function cycleVariant(direction) {
  const variants = Object.keys(variantNames);
  const index = variants.indexOf(state.variant);
  state.variant = variants[(index + direction + variants.length) % variants.length];
  const url = new URL(window.location.href);
  url.searchParams.set("variant", state.variant);
  window.history.replaceState({}, "", url);
  state.screen = "home";
  render();
}

const actions = {
  reset: () => { state.confirmed = []; state.returned = false; state.screen = "home"; render(); },
  "previous-variant": () => cycleVariant(-1),
  "next-variant": () => cycleVariant(1),
  "show-library": () => {
    document.querySelector("#review-copy").innerHTML = "<strong>物品栏不在本轮样页</strong><p>当前只验证今日手账、当前守护和离场核对的视觉语言，流程仍沿用低保真原型。</p>";
  },
  "show-add": () => {
    document.querySelector("#review-copy").innerHTML = "<strong>补充物品</strong><p>沿用低保真流程，不改变当前地点和手账卡。本轮不重复制作该页面。</p>";
  },
  "show-away": () => {
    document.querySelector("#review-copy").innerHTML = "<strong>只是暂离</strong><p>暂离只暂停提醒，不是防盗保护。本轮视觉重点是当前守护和完整核对。</p>";
  },
  "confirm-ordinary": () => {
    state.confirmed = [...new Set([...state.confirmed, ...items.filter(item => !item.important).map(item => item.id)])];
    render();
  },
  "toggle-item": id => {
    state.confirmed = state.confirmed.includes(id) ? state.confirmed.filter(itemId => itemId !== id) : [...state.confirmed, id];
    render();
  },
  complete: () => {
    if (state.confirmed.length !== items.length) return;
    state.returned = true;
    render();
  }
};

document.addEventListener("click", event => {
  const screenButton = event.target.closest("[data-screen]");
  if (screenButton) {
    navigate(screenButton.dataset.screen);
    return;
  }
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton || actionButton.disabled) return;
  const action = actions[actionButton.dataset.action];
  if (action) action(actionButton.dataset.id);
});

document.addEventListener("keydown", event => {
  if (event.target.matches("input, textarea, [contenteditable]")) return;
  if (event.key === "ArrowLeft") cycleVariant(-1);
  if (event.key === "ArrowRight") cycleVariant(1);
});

render();
