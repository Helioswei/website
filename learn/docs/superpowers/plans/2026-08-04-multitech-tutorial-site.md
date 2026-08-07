# 多技术教程网站（Kotlin + LVGL）实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `kotlin-tutorial` GitHub Pages 站点从单一 Kotlin 教程升级为统一设计的 Kotlin + LVGL 双技术线教程网站（含新门户、JS 驱动导航、16 章 LVGL 新教程、Kotlin 章节迁移）。

**Architecture:** 零依赖静态 HTML。统一设计系统写在 `style.css`（CSS tokens，两条技术线共用，仅强调色随 `body.track-*` 切换）；导航单一来源 `site-nav.js`（`SITE_NAV`/`MENTORS` 数据）+ `script.js`（渲染顶栏、底部上一/下一章、目录页 TOC、复制按钮），页面通过 `<body data-track data-chapter data-root>` 声明层级，JS 用 `data-root` 解析相对路径（兼容 GitHub Pages 子路径部署）。内容章节全部手写 HTML，遵循导师体系 + Catppuccin 高亮约定。

**Tech Stack:** 纯 HTML5 + CSS3 + 原生 JavaScript（无框架/构建工具）；`node tools/check-links.js` 做链接自动校验。

**仓库:** `/Users/helios/work/project/lvgl-sample/kotlin-tutorial`（git remote: `git@github.com:Helioswei/kotlin-tutorial.git`）。LVGL 内容素材源：`/Users/helios/work/project/lvgl-sample/lvgl-master/`。

## Global Constraints

- **提交规范**：所有 `git commit` **不带** `Co-Authored-By: Claude <noreply@anthropic.com>` 尾注。
- **语言**：全站内容中文；页面 `<html lang="zh-CN">`。
- **技术线强调色**：Kotlin = 紫 `#7f5af0`；LVGL = 青 `#0d9488`；通过 `<body class="track-kotlin">` / `track-lvgl` 切换，CSS 中两条线**共用同一套组件**，禁止为某条线单写布局/组件。
- **导航唯一来源**：任何导航链接（顶栏、底部、目录）都来自 `SITE_NAV`，页面里**不得**再写静态导航列表。新增/改章节 = 只改 `site-nav.js`。
- **链接一律相对路径**：禁止 `/kotlin/...` 根绝对路径（GitHub Pages 部署在 `/kotlin-tutorial/` 子路径，根路径会失效）。层级由 `<body data-root="../">`（章节页/子目录）或 `./`（根目录页）声明。
- **Kotlin 章节正文零改动**：迁移只动 `<head>` 链接、导航块、底部导航、`<body>` 属性、`<script>` 引用；正文内容/样式类名不动。
- **LVGL 内容真实性**：章节中引用的 API、文件路径、代码必须来自 `lvgl-sample/lvgl-master/` 实际存在的内容，不得虚构。
- **每章结构**：导师卡片 + 章末 3-5 道折叠练习（入门/进阶/挑战，含提示与答案）+ Catppuccin 手动 `<span>` 高亮。
- **代码高亮类名**：`.kw` `.type` `.str` `.num` `.cmt` `.fn` `.ann` `.op` `.param`。
- **任务顺序**：先迁移 Kotlin 再建门户（根 `index.html` 原为 Kotlin 目录页，只能二选一；中间提交存在根目录暂无首页的短暂状态，属预期）。

---

### Task 1: 统一设计系统（style.css + site-nav.js + script.js + preview.html）

**Files:**
- Create: `style.css`（完整重写）
- Create: `site-nav.js`（SITE_NAV 数据）
- Create: `script.js`（完整重写：导航/TOC/复制渲染器）
- Create: `preview.html`（设计系统预览页，作为活体 styleguide 保留在仓库）

**Interfaces:**
- Produces: `window.SITE_NAV`（shape: `{ siteName, homeLabel, tracks: [{ id, name, accent, desc, tagline, parts: [{ title, chapters: [{ num, title, mentor, method }] }] }] }`）、`window.MENTORS`（`{ 导师名: emoji }`）。
- Produces: 页面结构约定——`<nav class="top-nav"><div class="nav-inner" id="nav-inner"></div></nav>`；章节页 `<body data-track data-chapter data-root>`；`<div class="bottom-nav" id="bottom-nav"></div>`；目录页 `<div id="toc"></div>`。Task 2-4 依赖这些接口。

- [ ] **Step 1: 写 `site-nav.js`**（导航数据单一来源）

```js
/* Helios 技术教程 · 导航数据单一来源（只改这里，全站导航同步） */
window.MENTORS = {
  "费曼": "🔬", "柯南": "🔍", "福尔摩斯": "🎩", "诸葛亮": "🪶",
  "狄仁杰": "🏛️", "达芬奇": "🎨", "鲁班": "🔨", "包青天": "⚖️"
};

window.SITE_NAV = {
  siteName: "Helios 技术教程",
  homeLabel: "首页",
  tracks: [
    {
      id: "kotlin",
      name: "Kotlin",
      accent: "#7f5af0",
      desc: "Kotlin Android 开发教程",
      tagline: "从语言特性到 Android 实战，为有编程基础的开发者打造的系统化学习路径",
      parts: [
        { title: "认识 Kotlin", chapters: [
          { num: 1, title: "Kotlin 的崛起与设计哲学", mentor: "费曼", method: "第一性原理" },
          { num: 2, title: "开发环境搭建", mentor: "鲁班", method: "工欲善其事" }
        ]},
        { title: "Kotlin 语言核心", chapters: [
          { num: 3, title: "基础语法速览", mentor: "柯南", method: "真相只有一个" },
          { num: 4, title: "面向对象编程", mentor: "诸葛亮", method: "运筹帷幄" },
          { num: 5, title: "Kotlin 的杀手级特性", mentor: "福尔摩斯", method: "排除不可能" },
          { num: 6, title: "协程入门", mentor: "费曼", method: "物理直觉" }
        ]},
        { title: "Android 开发入门", chapters: [
          { num: 7, title: "Android 应用基础", mentor: "狄仁杰", method: "系统分析" },
          { num: 8, title: "Jetpack Compose UI", mentor: "达芬奇", method: "艺术与工程" },
          { num: 9, title: "数据与网络", mentor: "柯南", method: "追踪数据流" }
        ]},
        { title: "踩坑与成长", chapters: [
          { num: 10, title: "新人成长路线与资源推荐", mentor: "费曼", method: "教是最好的学" }
        ]},
        { title: "深入进阶", chapters: [
          { num: 11, title: "泛型与异常处理", mentor: "福尔摩斯", method: "类型推理" },
          { num: 12, title: "Flow 响应式编程", mentor: "柯南", method: "链式推理" },
          { num: 13, title: "Compose 动画与副作用", mentor: "达芬奇", method: "赋予画面生命" }
        ]},
        { title: "工程实践", chapters: [
          { num: 14, title: "依赖注入实战", mentor: "诸葛亮", method: "架构如棋局" },
          { num: 15, title: "测试入门", mentor: "包青天", method: "铁面无私" },
          { num: 16, title: "综合项目实战", mentor: "狄仁杰", method: "统揽全局" }
        ]}
      ]
    },
    {
      id: "lvgl",
      name: "LVGL",
      accent: "#0d9488",
      desc: "LVGL 嵌入式图形库教程",
      tagline: "从 MCU 到桌面模拟器，系统掌握 LVGL 嵌入式图形开发",
      parts: [
        { title: "认识 LVGL", chapters: [
          { num: 1, title: "LVGL 的崛起与本仓库解剖", mentor: "费曼", method: "第一性原理" },
          { num: 2, title: "开发环境搭建与第一个程序", mentor: "鲁班", method: "工欲善其事" }
        ]},
        { title: "核心机制", chapters: [
          { num: 3, title: "对象模型与屏幕", mentor: "柯南", method: "真相只有一个" },
          { num: 4, title: "显示、输入与渲染缓冲", mentor: "鲁班", method: "工欲善其事" },
          { num: 5, title: "常用 Widgets 上手", mentor: "狄仁杰", method: "系统分析" },
          { num: 6, title: "样式系统", mentor: "达芬奇", method: "艺术与工程" }
        ]},
        { title: "交互与表现", chapters: [
          { num: 7, title: "Flex/Grid 布局引擎", mentor: "诸葛亮", method: "运筹帷幄" },
          { num: 8, title: "事件系统", mentor: "柯南", method: "真相只有一个" },
          { num: 9, title: "动画与过渡", mentor: "达芬奇", method: "赋予画面生命" }
        ]},
        { title: "资源与数据", chapters: [
          { num: 10, title: "图像与字体", mentor: "福尔摩斯", method: "排除不可能" },
          { num: 11, title: "数据绑定与 Observer", mentor: "费曼", method: "第一性原理" },
          { num: 12, title: "LVGL Pro CLI 工作流（XML→C）", mentor: "鲁班", method: "工欲善其事" }
        ]},
        { title: "深入与实战", chapters: [
          { num: 13, title: "综合实战：做一个完整界面", mentor: "狄仁杰", method: "统揽全局" },
          { num: 14, title: "性能优化与内存管理", mentor: "诸葛亮", method: "运筹帷幄" },
          { num: 15, title: "集成与多平台部署", mentor: "包青天", method: "铁面无私" },
          { num: 16, title: "生态、成长路线与资源", mentor: "费曼", method: "教是最好的学" }
        ]}
      ]
    }
  ]
};
```

- [ ] **Step 2: 写 `script.js`**（导航/TOC/复制渲染器，从 body 属性读层级）

```js
/* Helios 技术教程 · 导航渲染（依赖 site-nav.js 先加载） */

function pad(n) {
  return (n < 10 ? '0' : '') + n;
}

/* 顶栏：品牌 + 首页 + 各技术线下拉 */
function renderTopNav(root) {
  var inner = document.getElementById('nav-inner');
  if (!inner) return;
  var trackId = document.body.getAttribute('data-track');
  var chapterNum = document.body.getAttribute('data-chapter');
  var html = '<span class="brand">' + SITE_NAV.siteName + '</span>';
  html += '<a href="' + root + 'index.html"' + (trackId ? '' : ' class="active"') + '>' + SITE_NAV.homeLabel + '</a>';
  SITE_NAV.tracks.forEach(function (track) {
    html += '<div class="nav-dropdown">';
    html += '<span class="nav-dropdown-label' + (trackId === track.id ? ' active' : '') + '" tabindex="0">' + track.name + ' ▾</span>';
    html += '<div class="nav-dropdown-menu">';
    track.parts.forEach(function (part) {
      html += '<div class="nav-part-label">' + part.title + '</div>';
      part.chapters.forEach(function (ch) {
        var href = (track.id === trackId)
          ? root + 'chapter' + pad(ch.num) + '.html'
          : root + track.id + '/chapter' + pad(ch.num) + '.html';
        var isActive = (trackId === track.id && String(ch.num) === String(chapterNum));
        html += '<a href="' + href + '"' + (isActive ? ' class="active"' : '') + '>第' + ch.num + '章 ' + ch.title + '</a>';
      });
    });
    html += '</div></div>';
  });
  inner.innerHTML = html;
}

/* 底部导航：上一章 / 目录 / 下一章（自动由 SITE_NAV 推导） */
function renderBottomNav(root) {
  var el = document.getElementById('bottom-nav');
  if (!el) return;
  var trackId = document.body.getAttribute('data-track');
  if (!trackId) return;
  var track = SITE_NAV.tracks.find(function (t) { return t.id === trackId; });
  if (!track) return;
  var flat = [];
  track.parts.forEach(function (p) { p.chapters.forEach(function (c) { flat.push(c); }); });
  var idx = flat.findIndex(function (c) { return c.num === parseInt(document.body.getAttribute('data-chapter'), 10); });
  var prev = (idx > 0) ? flat[idx - 1] : null;
  var next = (idx >= 0 && idx < flat.length - 1) ? flat[idx + 1] : null;
  var html = '';
  html += prev ? '<a class="prev" href="' + root + 'chapter' + pad(prev.num) + '.html">« 上一章</a>' : '<span class="placeholder"></span>';
  html += '<a class="toc" href="' + root + trackId + '/index.html">目录</a>';
  html += next ? '<a class="next" href="' + root + 'chapter' + pad(next.num) + '.html">下一章 »</a>' : '<span class="placeholder"></span>';
  el.innerHTML = html;
}

/* 目录页 TOC：分部 → 章节（含导师标注） */
function renderTOC(root) {
  var el = document.getElementById('toc');
  if (!el) return;
  var trackId = document.body.getAttribute('data-track');
  if (!trackId) return;
  var track = SITE_NAV.tracks.find(function (t) { return t.id === trackId; });
  if (!track) return;
  var html = '';
  track.parts.forEach(function (part) {
    html += '<div class="toc-part"><h2>' + part.title + '</h2><ul class="toc-list">';
    part.chapters.forEach(function (ch) {
      var emoji = MENTORS[ch.mentor] || '📘';
      html += '<li><a href="chapter' + pad(ch.num) + '.html"><span class="chapter-num">' + pad(ch.num) + '</span>' +
        ch.title + ' <small>— ' + emoji + ' ' + ch.mentor + '·' + ch.method + '</small></a></li>';
    });
    html += '</ul></div>';
  });
  el.innerHTML = html;
}

/* 代码复制按钮 */
function initCopyButtons() {
  document.querySelectorAll('pre').forEach(function (pre) {
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = '复制';
    btn.addEventListener('click', function () {
      var code = pre.querySelector('code');
      var text = (code || pre).textContent;
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = '已复制';
        btn.classList.add('copied');
        setTimeout(function () { btn.textContent = '复制'; btn.classList.remove('copied'); }, 2000);
      });
    });
    pre.style.position = 'relative';
    pre.appendChild(btn);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var root = document.body.getAttribute('data-root') || './';
  renderTopNav(root);
  renderBottomNav(root);
  renderTOC(root);
  initCopyButtons();
});
```

- [ ] **Step 3: 写 `style.css`**（统一浅色设计系统，完整重写）

```css
/* ==========================================================
   Helios 技术教程 · 统一设计系统
   浅色阅读向（参考 Mintlify）。两条技术线共用同一套组件，
   仅强调色 accent 随 body.track-* 切换。
   ========================================================== */

/* ===== 1. Design Tokens ===== */
:root {
  --canvas: #ffffff;
  --surface: #f7f7f8;
  --surface-soft: #fafafb;
  --hairline: #e5e5e7;
  --hairline-soft: #eeeeef;
  --ink: #1a1a1e;
  --ink-secondary: #5a5a62;
  --muted: #909096;
  --code-bg: #1e1e2e;
  --code-ink: #cdd6f4;
  --code-border: #313244;

  --accent: #7f5af0;
  --accent-strong: #6d48d0;
  --accent-soft: #f0ecfd;
  --on-accent: #ffffff;

  --tip-bg: #f0f4ff;
  --tip-border: var(--accent);
  --warn-bg: #fff8e1;
  --warn-border: #f59e0b;
  --success: #16a34a;
  --success-soft: #dcfce7;

  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", "SF Mono", "Cascadia Code", Menlo, Consolas, monospace;

  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 999px;

  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 6px 20px rgba(0, 0, 0, 0.08);
}

body.track-lvgl {
  --accent: #0d9488;
  --accent-strong: #0b7c72;
  --accent-soft: #e6f5f2;
  --tip-bg: #e6f5f2;
}

/* ===== 2. Base ===== */
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.8;
  color: var(--ink);
  background: var(--canvas);
}
a { color: var(--accent-strong); }
a:hover { text-decoration: underline; }

/* ===== 3. 顶部导航 ===== */
.top-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--hairline);
}
.top-nav .nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.top-nav a, .nav-dropdown-label {
  color: var(--ink-secondary);
  padding: 14px 14px;
  font-size: 14px;
  white-space: nowrap;
  transition: color 0.15s, background 0.15s;
}
.top-nav a:hover, .nav-dropdown-label:hover { color: var(--ink); text-decoration: none; }
.top-nav a.active, .nav-dropdown-label.active { color: var(--accent); font-weight: 600; }
.top-nav .brand {
  font-weight: 700;
  font-size: 15px;
  color: var(--ink);
  padding: 14px 18px 14px 16px;
  letter-spacing: 0.5px;
}
.top-nav .brand::before { content: "▣ "; color: var(--accent); }
.nav-dropdown { position: relative; }
.nav-dropdown-label { display: block; cursor: pointer; background: none; border: none; font-family: inherit; line-height: inherit; }
.nav-dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--canvas);
  min-width: 320px;
  max-height: 70vh;
  overflow-y: auto;
  border: 1px solid var(--hairline);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  z-index: 200;
  padding: 8px 0;
}
.nav-dropdown:hover .nav-dropdown-menu,
.nav-dropdown:focus-within .nav-dropdown-menu { display: block; }
.nav-dropdown-menu .nav-part-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--muted);
  padding: 10px 16px 4px;
}
.nav-dropdown-menu a {
  display: block;
  padding: 8px 16px;
  color: var(--ink-secondary);
  font-size: 13px;
  white-space: nowrap;
  border-left: 2px solid transparent;
}
.nav-dropdown-menu a:hover { background: var(--surface); color: var(--ink); text-decoration: none; }
.nav-dropdown-menu a.active { background: var(--accent-soft); color: var(--accent-strong); border-left-color: var(--accent); font-weight: 600; }

/* ===== 4. 布局 ===== */
.container { max-width: 860px; margin: 0 auto; padding: 48px 24px 96px; }

/* ===== 5. 排版 ===== */
h1 { font-size: 2rem; color: var(--ink); margin-bottom: 8px; }
.chapter-subtitle { color: var(--muted); font-size: 1rem; margin-bottom: 40px; }
h2 { font-size: 1.5rem; color: var(--ink); margin-top: 48px; margin-bottom: 16px; padding-left: 12px; border-left: 4px solid var(--accent); }
h3 { font-size: 1.2rem; color: var(--ink); margin-top: 32px; margin-bottom: 12px; }
p { margin-bottom: 16px; }
ul, ol { margin-bottom: 16px; padding-left: 28px; }
li { margin-bottom: 6px; }
strong { color: var(--ink); }
small { color: var(--muted); }

/* ===== 6. 代码 ===== */
code { font-family: var(--font-mono); font-size: 0.9em; }
p code, li code, td code, h3 code {
  background: var(--accent-soft);
  color: var(--accent-strong);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-size: 0.85em;
}
pre {
  position: relative;
  background: var(--code-bg);
  color: var(--code-ink);
  padding: 20px 24px;
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin-bottom: 24px;
  line-height: 1.6;
  font-size: 0.9rem;
  border: 1px solid var(--code-border);
}
pre code { background: none; color: inherit; padding: 0; font-size: inherit; }

/* Catppuccin 语法高亮 */
.kw { color: #cba6f7; }
.type { color: #f9e2af; }
.str { color: #a6e3a1; }
.num { color: #fab387; }
.cmt { color: #6c7086; font-style: italic; }
.fn { color: #89b4fa; }
.ann { color: #f38ba8; }
.op { color: #89dceb; }
.param { color: #eba0ac; }

/* 复制按钮 */
.copy-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #45475a;
  color: #cdd6f4;
  border: none;
  border-radius: var(--radius-sm);
  padding: 4px 10px;
  font-size: 0.75rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s, background 0.2s;
  font-family: inherit;
}
pre:hover .copy-btn { opacity: 1; }
.copy-btn:hover { background: #585b70; }
.copy-btn.copied { background: #a6e3a1; color: #1e1e2e; }

/* ===== 7. 导师卡片 ===== */
.mentor-card {
  background: linear-gradient(135deg, var(--ink) 0%, #2a2347 100%);
  color: #e6e6ea;
  padding: 24px 28px;
  border-radius: var(--radius-lg);
  margin-bottom: 36px;
  box-shadow: var(--shadow-sm);
}
body.track-lvgl .mentor-card { background: linear-gradient(135deg, #0f3d38 0%, #0d9488 130%); }
.mentor-card .mentor-header { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
.mentor-card .mentor-icon { font-size: 2.4rem; line-height: 1; }
.mentor-card .mentor-info h3 { color: #e6e6ea; font-size: 1.1rem; margin: 0 0 2px 0; }
.mentor-card .mentor-info .mentor-method { color: #9aa0b4; font-size: 0.85rem; margin: 0; }
.mentor-quote { font-style: italic; color: #c6c9d4; line-height: 1.8; margin: 12px 0 0; padding-left: 16px; border-left: 2px solid var(--accent); }
.mentor-quote p { margin-bottom: 8px; }

/* ===== 8. 提示与警告 ===== */
.tip {
  background: var(--tip-bg);
  border-left: 4px solid var(--tip-border);
  padding: 16px 20px;
  margin: 24px 0;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}
.tip-title { font-weight: 700; color: var(--accent-strong); margin-bottom: 4px; }
.warning {
  background: var(--warn-bg);
  border-left: 4px solid var(--warn-border);
  padding: 16px 20px;
  margin: 24px 0;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}
.warning .tip-title { color: #b45309; }

/* ===== 9. 对比表格 ===== */
table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 0.95rem; border: 1px solid var(--hairline); border-radius: var(--radius-md); overflow: hidden; }
th { background: var(--ink); color: #fff; padding: 10px 16px; text-align: left; font-weight: 600; }
td { padding: 10px 16px; border-bottom: 1px solid var(--hairline-soft); }
tr:nth-child(even) td { background: var(--surface-soft); }
tr:last-child td { border-bottom: none; }

/* ===== 10. 练习 ===== */
.exercise {
  background: var(--accent-soft);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  border-radius: var(--radius-lg);
  padding: 24px 28px;
  margin: 48px 0 24px;
}
.exercise > h2 { color: var(--accent-strong); border-left: none; padding-left: 0; margin-top: 0; font-size: 1.4rem; }
.exercise-item { margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid color-mix(in srgb, var(--accent) 25%, transparent); }
.exercise-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.exercise-item h3 { margin-top: 0; }
.exercise-item .difficulty { display: inline-block; font-size: 0.75rem; font-weight: 600; padding: 2px 8px; border-radius: var(--radius-full); margin-left: 8px; vertical-align: middle; }
.difficulty-easy { background: var(--success-soft); color: var(--success); }
.difficulty-medium { background: #fef9c3; color: #854d0e; }
.difficulty-hard { background: #fce7f3; color: #9d174d; }
details { margin: 8px 0; }
details summary { cursor: pointer; color: var(--accent-strong); font-weight: 600; font-size: 0.9rem; padding: 6px 0; user-select: none; }
details summary:hover { color: var(--accent); }
details[open] summary { margin-bottom: 8px; }
details .answer-content { background: var(--canvas); padding: 16px 20px; border-radius: var(--radius-md); border: 1px solid var(--hairline); }

/* ===== 11. 底部导航 ===== */
.bottom-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 60px;
  padding-top: 24px;
  border-top: 1px solid var(--hairline);
}
.bottom-nav a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent-strong);
  font-weight: 600;
  padding: 10px 18px;
  border-radius: var(--radius-md);
  transition: background 0.15s;
}
.bottom-nav a:hover { background: var(--accent-soft); text-decoration: none; }
.bottom-nav .placeholder { width: 120px; }

/* ===== 12. 门户页 ===== */
.hero { text-align: center; padding: 72px 0 48px; }
.hero h1 { font-size: 2.6rem; margin-bottom: 12px; }
.hero .tagline { font-size: 1.15rem; color: var(--muted); margin-bottom: 48px; }
.track-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 720px;
  margin: 0 auto;
}
.track-card {
  display: block;
  background: var(--canvas);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-lg);
  padding: 32px 28px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
  color: var(--ink);
}
.track-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); text-decoration: none; }
.track-card .track-icon { font-size: 2.2rem; display: block; margin-bottom: 12px; }
.track-card h2 { font-size: 1.35rem; margin: 0 0 6px; border: none; padding: 0; color: var(--ink); }
.track-card p { color: var(--muted); font-size: 0.95rem; margin-bottom: 16px; }
.track-card .track-meta { font-size: 0.85rem; color: var(--muted); }
.track-card .track-cta { display: inline-flex; align-items: center; gap: 4px; color: var(--accent-strong); font-weight: 600; margin-top: 12px; }
.track-card.kotlin { border-top: 3px solid #7f5af0; }
.track-card.kotlin:hover { border-color: #7f5af0; }
.track-card.lvgl { border-top: 3px solid #0d9488; }
.track-card.lvgl:hover { border-color: #0d9488; }
.track-card.kotlin .track-cta { color: #6d48d0; }
.track-card.lvgl .track-cta { color: #0b7c72; }

/* ===== 13. 目录页 TOC ===== */
.track-hero { text-align: center; padding: 56px 0 8px; }
.track-hero h1 { margin-bottom: 8px; }
.track-hero .tagline { color: var(--muted); margin-bottom: 8px; }
.toc { max-width: 680px; margin: 24px auto 0; }
.toc-part { margin-bottom: 32px; }
.toc-part h2 { font-size: 1.1rem; color: var(--accent-strong); border-left: none; padding-left: 0; margin-top: 0; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
.toc-list { list-style: none; padding: 0; }
.toc-list li { margin-bottom: 0; }
.toc-list a { display: block; padding: 12px 20px; color: var(--ink); text-decoration: none; border-radius: var(--radius-md); transition: background 0.15s, transform 0.1s; }
.toc-list a:hover { background: var(--accent-soft); transform: translateX(4px); text-decoration: none; }
.toc-list .chapter-num { color: var(--accent); font-weight: 700; margin-right: 8px; }
.toc-list small { color: var(--muted); }
.toc-footer { text-align: center; margin-top: 40px; }
.start-btn {
  display: inline-block;
  margin-top: 8px;
  background: var(--accent);
  color: var(--on-accent);
  font-weight: 600;
  padding: 10px 24px;
  border-radius: var(--radius-full);
  transition: background 0.15s;
}
.start-btn:hover { background: var(--accent-strong); text-decoration: none; }

/* ===== 14. 响应式 ===== */
@media (max-width: 768px) {
  .container { padding: 28px 16px 64px; }
  h1 { font-size: 1.6rem; }
  h2 { font-size: 1.3rem; }
  pre { padding: 14px 16px; font-size: 0.82rem; }
  .top-nav a, .nav-dropdown-label { padding: 12px 10px; font-size: 13px; }
  .nav-dropdown-menu { min-width: 240px; }
  .hero h1 { font-size: 2rem; }
  table { font-size: 0.85rem; }
  th, td { padding: 8px 10px; }
}
@media (max-width: 480px) {
  .top-nav .nav-inner { justify-content: center; }
  .bottom-nav { flex-direction: column; gap: 12px; }
  .bottom-nav .placeholder { display: none; }
  .track-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4: 写 `preview.html`**（设计系统预览页，作为 styleguide 保留）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>设计系统预览 - Helios 技术教程</title>
  <link rel="stylesheet" href="style.css">
</head>
<body data-root="./">
  <nav class="top-nav"><div class="nav-inner" id="nav-inner"></div></nav>
  <div class="container">
    <h1>设计系统预览</h1>
    <p class="chapter-subtitle">统一浅色设计系统 · 组件与 tokens 一览（仅作开发参考）</p>

    <h2>标题与正文</h2>
    <p>正文 16px/1.8。这是 <strong>强调文字</strong>，<code>inline code</code>，以及普通链接 <a href="index.html">示例链接</a>。</p>
    <ul><li>列表项一</li><li>列表项二</li></ul>

    <h2>导师卡片</h2>
    <div class="mentor-card">
      <div class="mentor-header"><span class="mentor-icon">🔬</span>
        <div class="mentor-info"><h3>本章导师：费曼</h3><p class="mentor-method">核心方法论：第一性原理</p></div>
      </div>
      <div class="mentor-quote"><p>「从为什么出发。」</p></div>
    </div>

    <h2>代码</h2>
    <pre><code><span class="cmt">// Kotlin 示例</span>
<span class="kw">fun</span> <span class="fn">main</span>() {
    <span class="kw">val</span> name <span class="op">=</span> <span class="str">"Helios"</span>
    println(<span class="str">"Hello, </span>$name")
}</code></pre>

    <h2>提示 / 警告 / 表格</h2>
    <div class="tip"><div class="tip-title">提示</div><p>这是一条提示。</p></div>
    <div class="warning"><div class="tip-title">注意</div><p>这是一条警告。</p></div>
    <table><tr><th>列A</th><th>列B</th></tr><tr><td>1</td><td>2</td></tr></table>

    <h2>练习</h2>
    <div class="exercise"><h2>章末练习</h2>
      <div class="exercise-item"><h3>练习 1 <span class="difficulty difficulty-easy">入门</span></h3>
        <details><summary>参考答案</summary><div class="answer-content"><p>答案。</p></div></details>
      </div>
    </div>

    <div class="bottom-nav" id="bottom-nav"></div>
  </div>
  <script src="site-nav.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 5: 本地验证**

Run（在 `kotlin-tutorial/` 根目录）:
```bash
python3 -m http.server 8000
```
打开 `http://localhost:8000/preview.html`。Expected：顶栏渲染出 `Helios 技术教程 | 首页 | Kotlin ▾ | LVGL ▾`；两个下拉展开显示分部与章节；代码块有复制按钮；导师卡片/提示/表格/练习样式正确；`body` 切换 `track-lvgl` 类时强调色变青（可用浏览器 DevTools 临时改 class 验证）。

- [ ] **Step 6: 提交**

```bash
git -C /Users/helios/work/project/lvgl-sample/kotlin-tutorial add style.css site-nav.js script.js preview.html
git -C /Users/helios/work/project/lvgl-sample/kotlin-tutorial commit -m "feat: unify design system and JS-driven navigation"
```

---

### Task 2: 迁移 Kotlin 到子目录（kotlin/）

**Files:**
- Create/Modify: `kotlin/index.html`、`kotlin/chapter01.html` … `kotlin/chapter16.html`

**Interfaces:**
- Consumes: Task 1 的页面约定（`#nav-inner`/`#bottom-nav`/`data-*`）、`SITE_NAV`。
- Produces: 迁移完成的 Kotlin 技术线（17 个文件），正文零改动。完成后根目录暂时无 `index.html`（门户在 Task 3 建立）。

- [ ] **Step 1: 建目录并移动 17 个文件**

```bash
cd /Users/helios/work/project/lvgl-sample/kotlin-tutorial
mkdir -p kotlin
git mv index.html kotlin/index.html
for i in 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16; do
  git mv chapter$i.html kotlin/chapter$i.html
done
```

- [ ] **Step 2: 重写 `kotlin/index.html`**（原目录页 → 新 TOC 结构）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kotlin Android 开发教程 - Helios 技术教程</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body class="track-kotlin" data-track="kotlin" data-root="../">
  <nav class="top-nav"><div class="nav-inner" id="nav-inner"></div></nav>

  <div class="container">
    <div class="track-hero">
      <h1>Kotlin Android 开发教程</h1>
      <p class="tagline">从语言特性到 Android 实战，为有编程基础的开发者打造的系统化学习路径</p>
    </div>
    <div id="toc"></div>
    <div class="toc-footer"><a class="start-btn" href="chapter01.html">开始学习 &rarr;</a></div>
  </div>

  <script src="../site-nav.js"></script>
  <script src="../script.js"></script>
</body>
</html>
```

- [ ] **Step 3: 批量改造 16 个章节页**（正文零改动）

对 `kotlin/chapter01.html` … `kotlin/chapter16.html`，每个文件执行 5 处替换：
1. `<link rel="stylesheet" href="style.css">` → `<link rel="stylesheet" href="../style.css">`
2. 整段 `<nav class="top-nav">…</nav>` → `<nav class="top-nav"><div class="nav-inner" id="nav-inner"></div></nav>`
3. `<body>` → `<body class="track-kotlin" data-track="kotlin" data-chapter="N" data-root="../">`（N=对应章号，两位）
4. 整段 `<div class="bottom-nav">…</div>` → `<div class="bottom-nav" id="bottom-nav"></div>`
5. `<script src="script.js"></script>` → 两行：`<script src="../site-nav.js"></script>` 与 `<script src="../script.js"></script>`

用脚本批量替换后**人工抽查 3 个文件**（ch01、ch05、ch16）确认正文未变：

```bash
cd /Users/helios/work/project/lvgl-sample/kotlin-tutorial
# 示例（perl 多行替换需小心；稳妥做法：用编辑器/脚本按上述 5 条规则逐个文件处理）
```

- [ ] **Step 4: 内容零改动抽查**

对迁移前（git 历史 `HEAD` 根目录版）与迁移后正文做 diff，仅允许上述 5 处结构差异：

```bash
git -C /Users/helios/work/project/lvgl-sample/kotlin-tutorial show HEAD:chapter01.html | diff - <(sed -n '/<div class="container">/,/<div class="bottom-nav"/p' kotlin/chapter01.html) 
```

- [ ] **Step 5: 本地预览**

打开 `http://localhost:8000/kotlin/chapter03.html`：顶栏「Kotlin」高亮、下拉当前章高亮、底栏上一/下一章正确（ch02/ch04）。注意根目录此时无首页属预期。

- [ ] **Step 6: 提交**

```bash
git -C /Users/helios/work/project/lvgl-sample/kotlin-tutorial add kotlin/
git -C /Users/helios/work/project/lvgl-sample/kotlin-tutorial commit -m "refactor: migrate kotlin tutorials into subdirectory"
```

---

### Task 3: 门户首页（根 index.html）

**Files:**
- Create: `index.html`（新门户，根目录；Task 2 已把旧目录页移走）

**Interfaces:**
- Consumes: `SITE_NAV`（Task 1）、`<body data-root="./">` + `#nav-inner`（Task 1 约定）、Task 2 后的目录结构。
- Produces: 根目录门户 `index.html`，作为 `/` 的首页。

- [ ] **Step 1: 写门户 `index.html`**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Helios 技术教程 - Kotlin · LVGL</title>
  <link rel="stylesheet" href="style.css">
</head>
<body data-root="./">
  <nav class="top-nav"><div class="nav-inner" id="nav-inner"></div></nav>

  <div class="container">
    <div class="hero">
      <h1>Helios 技术教程</h1>
      <p class="tagline">系统化多技术学习路径：Kotlin · LVGL，从入门到深入</p>
    </div>

    <div class="track-grid">
      <a class="track-card kotlin" href="kotlin/index.html">
        <span class="track-icon">🤖</span>
        <h2>Kotlin Android 开发教程</h2>
        <p>从语言特性到 Android 实战，16 章系统学习路径。</p>
        <span class="track-meta">16 章 · 导师体系 · C++ 开发者对照</span><br>
        <span class="track-cta">进入教程 &rarr;</span>
      </a>
      <a class="track-card lvgl" href="lvgl/index.html">
        <span class="track-icon">🖥️</span>
        <h2>LVGL 嵌入式图形库教程</h2>
        <p>从 MCU 到桌面模拟器，系统掌握 LVGL 嵌入式图形开发。</p>
        <span class="track-meta">16 章 · 真实仓库案例 · Pro CLI 工作流</span><br>
        <span class="track-cta">进入教程 &rarr;</span>
      </a>
    </div>
  </div>

  <script src="site-nav.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: 验证**

本地打开 `http://localhost:8000/`。Expected：门户 hero + 两张技术卡片（紫/青顶边）；顶栏渲染正常且「首页」高亮；点卡片进入对应技术线目录。

- [ ] **Step 3: 提交**

```bash
git -C /Users/helios/work/project/lvgl-sample/kotlin-tutorial add index.html
git -C /Users/helios/work/project/lvgl-sample/kotlin-tutorial commit -m "feat: add multi-tech portal page"
```

---

### Task 4: LVGL 首章模板（lvgl/chapter01.html + lvgl/index.html）

**Files:**
- Create: `lvgl/index.html`（LVGL 目录页）
- Create: `lvgl/chapter01.html`（首章，全站内容模板基准）

**Interfaces:**
- Consumes: Task 1 的页面约定；Task 3 门户已引用 `lvgl/index.html`（本任务补齐）。
- Produces: LVGL 章节页与目录页的**完整模板**，Task 5/6 的其余章节必须严格复用此结构（仅正文与内容不同）。

- [ ] **Step 1: 写 `lvgl/index.html`**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LVGL 嵌入式图形库教程 - Helios 技术教程</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body class="track-lvgl" data-track="lvgl" data-root="../">
  <nav class="top-nav"><div class="nav-inner" id="nav-inner"></div></nav>

  <div class="container">
    <div class="track-hero">
      <h1>LVGL 嵌入式图形库教程</h1>
      <p class="tagline">从 MCU 到桌面模拟器，系统掌握 LVGL 嵌入式图形开发</p>
    </div>
    <div id="toc"></div>
    <div class="toc-footer"><a class="start-btn" href="chapter01.html">开始学习 &rarr;</a></div>
  </div>

  <script src="../site-nav.js"></script>
  <script src="../script.js"></script>
</body>
</html>
```

- [ ] **Step 2: 写 `lvgl/chapter01.html`**（完整模板 + 第一章正文）

结构如下（正文为真实 LVGL 内容，来源见注释）：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>第1章：LVGL 的崛起与本仓库解剖 - LVGL 嵌入式图形库教程</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body class="track-lvgl" data-track="lvgl" data-chapter="1" data-root="../">
  <nav class="top-nav"><div class="nav-inner" id="nav-inner"></div></nav>

  <div class="container">
    <h1>第1章：LVGL 的崛起与本仓库解剖</h1>
    <p class="chapter-subtitle">一个 C 语言的 UI 库，凭什么成为嵌入式图形的事实标准？</p>

    <div class="mentor-card">
      <div class="mentor-header">
        <span class="mentor-icon">🔬</span>
        <div class="mentor-info">
          <h3>本章导师：费曼</h3>
          <p class="mentor-method">核心方法论：第一性原理，从"为什么"出发</p>
        </div>
      </div>
      <div class="mentor-quote">
        <p>「在嵌入式世界里，屏幕上像素到 MCU 之间隔着厚厚的一层抽象。学 LVGL 之前，先问：为什么嵌入式 UI 需要一套框架？它到底解决什么痛点？把这个问题想透，后面每一个 API 你都能猜个八九不离十。」</p>
      </div>
    </div>

    <h2>1.1 嵌入式 UI 的痛点</h2>
    <p>……正文：裸写像素/状态机维护多界面的痛点；抽象出对象树与渲染引擎的意义。</p>
    <div class="tip"><div class="tip-title">费曼提示</div><p>……</p></div>

    <h2>1.2 LVGL 是什么</h2>
    <p>……正文：定位、特性（无外部依赖、小内存、跨平台、30+ widgets、样式/布局/动画/事件、多显示与输入）。来源：<code>lvgl-master/README.md</code>「Overview」「Features」。</p>
    <table>
      <tr><th>需求</th><th>最低配置</th></tr>
      <tr><td>RAM</td><td>~100 kB（典型 UI）</td></tr>
      <tr><td>Flash</td><td>~200–300 kB</td></tr>
      <tr><td>渲染缓冲</td><td>1/10 屏幕</td></tr>
    </table>

    <h2>1.3 解剖本仓库 lvgl-sample</h2>
    <p>……正文：仓库不是应用，而是「库 + 工具」工作区。两个顶层目录的作用与关系。</p>
    <pre><code><span class="cmt">/* lvgl-sample 工作区结构 */</span>
lvgl-master/                   <span class="cmt">LVGL v9.5.0 库源码</span>
LVGL_Pro_CLI-2.0.2-rc1-darwin/ <span class="cmt">设计工具 CLI（XML→C）</span></code></pre>
    <p>……正文：<code>lvgl-master</code> 顶层文件速览：<code>lv_conf_template.h</code>（配置模板）、<code>CMakeLists.txt</code>（构建）、<code>src/</code>（源码）、<code>examples/</code>、<code>demos/</code>、<code>docs/</code>。</p>

    <h2>1.4 src 子系统地图</h2>
    <p>……正文：core/widgets/draw/display/indev/layouts/libs/font/image/themes/misc 等子系统职责。来源：<code>lvgl-master/src/</code> 目录。</p>
    <table>
      <tr><th>子系统</th><th>职责</th></tr>
      <tr><td><code>core</code></td><td>对象模型与渲染管线</td></tr>
      <tr><td><code>widgets</code></td><td>30+ 内置控件</td></tr>
      <tr><td><code>draw</code></td><td>渲染引擎（sw/opengl/vg-lite…）</td></tr>
      <tr><td><code>display</code> / <code>indev</code></td><td>显示与输入抽象</td></tr>
    </table>

    <h2>1.5 版本与 API 兼容</h2>
    <p>……正文：<code>include/lvgl/lv_version.h</code>；<code>src/lv_api_map_v8.h</code> … <code>lv_api_map_v9_5.h</code> 兼容垫片。</p>
    <div class="warning"><div class="tip-title">注意</div><p>仓库内 <code>lvgl-master/lv_version.h</code> 顶部有 <code>#warning This file is deprecated</code>，请包含 <code>include/lvgl/lv_version.h</code> 或直接 <code>#include "lvgl/lvgl.h"</code>。</p></div>

    <div class="exercise">
      <h2>章末练习</h2>
      <div class="exercise-item">
        <h3>练习 1：仓库解剖 <span class="difficulty difficulty-easy">入门</span></h3>
        <p>打开 <code>lvgl-master/</code>，列出 3 个顶层文件并说明用途。</p>
        <details><summary>提示</summary><div class="answer-content"><p>从 <code>lv_conf_template.h</code>、<code>CMakeLists.txt</code>、<code>src/</code> 入手。</p></div></details>
        <details><summary>参考答案</summary><div class="answer-content"><p>……</p></div></details>
      </div>
      <!-- 练习 2（进阶）、练习 3（挑战）…… -->
    </div>

    <div class="bottom-nav" id="bottom-nav"></div>
  </div>

  <script src="../site-nav.js"></script>
  <script src="../script.js"></script>
</body>
</html>
```

**第一章内容要求**：5 个小节（1.1–1.5）、每节 ≥2 段真实正文、≥2 个代码块、≥1 个 tip、≥1 个 warning、≥1 张表格、3 道练习（入门/进阶/挑战）。所有引用的路径/版本以 `lvgl-master/` 实存文件为准。

- [ ] **Step 3: 验证**

本地打开 `http://localhost:8000/lvgl/index.html` 与 `http://localhost:8000/lvgl/chapter01.html`。Expected：目录页 TOC 由 JS 渲染出 5 个分部 16 章（青色调）；章节页顶栏「LVGL」高亮、下拉内当前章高亮、底部「上一章（占位）/目录/下一章 ch02」正确。

- [ ] **Step 4: 提交**

```bash
git -C /Users/helios/work/project/lvgl-sample/kotlin-tutorial add lvgl/index.html lvgl/chapter01.html
git -C /Users/helios/work/project/lvgl-sample/kotlin-tutorial commit -m "feat: add lvgl tutorial template (chapter01 and index)"
```

---

### Task 5: LVGL 第 2–9 章

**Files:**
- Create: `lvgl/chapter02.html` … `lvgl/chapter09.html`（8 章）

**Interfaces:**
- Consumes: Task 4 的章节页模板（head/body/导航/练习结构**逐字复用**，只换标题、正文、代码、练习）。
- Produces: 8 个完整章节页；每页 `<body data-track="lvgl" data-chapter="N" data-root="../">`。

**内容规格**（每章：导师卡片按 `SITE_NAV` 的 mentor/method、4-6 个小节、≥2 代码块、≥1 tip、表格视内容而定、章末 3-4 道练习）。素材只取自 `lvgl-sample/lvgl-master/` 实存文件：

| 章 | 标题 | 核心内容与素材来源 | 练习主题 |
|----|------|------|------|
| 02 | 开发环境搭建与第一个程序 | `lv_conf_template.h` 复制为 `lv_conf.h` 并改 `#if 0`；CMake 集成（`add_subdirectory` + link `lvgl`，`LV_BUILD_CONF_PATH`）；SDL 模拟器（`src/drivers/`）；`lv_init()` → `lv_tick_set_cb` → `lv_display_create` → flush 回调的最小程序（来源 README「Integration」） | 配环境/最小程序/改分辨率 |
| 03 | 对象模型与屏幕 | `lv_obj` 对象树、父子关系、`lv_obj_create`/`lv_obj_add_child`；display 与 screen 关系（`src/core`、`src/display`）；`lv_init()` 流程 | 建对象树/查父子 |
| 04 | 显示、输入与渲染缓冲 | 渲染缓冲三模式（`LV_DISPLAY_RENDER_MODE_PARTIAL` 等）、`lv_display_set_buffers`、flush 回调、tick；`src/display/`、README「Integration」示例；indev 输入设备回调（`src/indev/`） | 配置缓冲/模拟触摸 |
| 05 | 常用 Widgets 上手 | button/label/checkbox/slider 等（`src/widgets/`）；创建、定位、常用属性；`examples/widgets/` 作参考 | 拼一个控件面板 |
| 06 | 样式系统 | style 属性/状态/继承；`lv_obj_set_style_*`；主题（`src/themes/`）；`examples/styles/` | 样式态切换 |
| 07 | Flex/Grid 布局引擎 | `lv_layout`、flex/grid（`src/layouts/`）；`LV_FLEX_*`/`LV_GRID_*` 常量；`examples/layouts/` | 实现响应式排布 |
| 08 | 事件系统 | 事件类型、`lv_obj_add_event_cb`、事件数据、`LV_EVENT_CLICKED` 等；`src/core/lv_event*`；`examples/event/` | 事件驱动交互 |
| 09 | 动画与过渡 | `lv_anim`、`lv_anim_timeline`、easing 曲线；`src/misc/lv_anim*`；`examples/anim/` | 做按钮弹跳动画 |

- [ ] **Step 1–8: 逐章生成**（每章一次完整写入，写入后进入下一章）

对每一章 N（02→09）执行：参照 Task 4 模板写 `lvgl/chapter0N.html`，内容满足上面表格规格，代码块用手动 `<span>` 高亮类名。

- [ ] **Step 9: 全量校验链接**（若 `tools/check-links.js` 未建，先做 Task 8 Step 1）

```bash
cd /Users/helios/work/project/lvgl-sample/kotlin-tutorial && node tools/check-links.js
```
Expected：`OK: all links resolve`。

- [ ] **Step 10: 本地抽查**

打开 `http://localhost:8000/lvgl/chapter05.html`，确认底栏「上一章」→ ch04、「下一章」→ ch06 正确；顶栏下拉当前章高亮。

- [ ] **Step 11: 提交**

```bash
git -C /Users/helios/work/project/lvgl-sample/kotlin-tutorial add lvgl/chapter02.html lvgl/chapter03.html lvgl/chapter04.html lvgl/chapter05.html lvgl/chapter06.html lvgl/chapter07.html lvgl/chapter08.html lvgl/chapter09.html
git -C /Users/helios/work/project/lvgl-sample/kotlin-tutorial commit -m "feat: add lvgl chapters 02-09"
```

---

### Task 6: LVGL 第 10–16 章

**Files:**
- Create: `lvgl/chapter10.html` … `lvgl/chapter16.html`（7 章）

**Interfaces:**
- Consumes: Task 4 章节页模板；Task 5 的内容规格写法。
- Produces: 7 个完整章节页。

**内容规格**（结构同 Task 5）：

| 章 | 标题 | 核心内容与素材来源 | 练习主题 |
|----|------|------|------|
| 10 | 图像与字体 | 图像解码器（`src/image/`、`src/libs/`）、`scripts/LVGLImage.py`/`scripts/filetohex.py`、字体转换（`scripts/built_in_font`）、`lv_font_t`、`src/font/`；`examples/assets/` | 转一张图/生成字体 |
| 11 | 数据绑定与 Observer | `lv_observer`、subject、绑定 API（`src/misc/lv_observer*`）；README「Features」Data bindings；`examples/xml_project/globals.xml` 的 `<subject>` 映射 | 双向绑定一个滑块 |
| 12 | LVGL Pro CLI 工作流（XML→C） | `LVGL_Pro_CLI-2.0.2-rc1-darwin/lved-cli.js` 命令（generate/compile/validate/screenshot…）；`--token`/`LVGL_CLI_TOKEN`；`examples/xml_project/`（project.xml/globals.xml/images/fonts）；`lved generate` 产出 C 代码 | 跑通一次 generate |
| 13 | 综合实战：做一个完整界面 | 组合 widgets/样式/布局/事件/动画做一个仪表盘或控件面板；素材取 `demos/`（widgets/music/benchmark）与 `examples/` | 复刻一个 demo 界面 |
| 14 | 性能优化与内存管理 | 渲染引擎（`src/draw/` sw/opengl/vg-lite）、draw buffer 调优、`LV_MEM_CUSTOM`、内存配置（`src/misc/lv_mem*`）、`lv_conf` 裁剪 | 减内存/提帧率 |
| 15 | 集成与多平台部署 | CMake/ESP-IDF/Arduino/PlatformIO/Zephyr（`env_support/`、README「Pre-integrated」）、`CMakePresets.json`、LVGL Pro 生成工程 | 换平台集成 |
| 16 | 生态、成长路线与资源 | 官方文档/论坛/社区、LVGL Pro 工具链、贡献指南（README「Contributing」）、许可证（MIT，`LICENCE.txt`） | 制定学习计划 |

- [ ] **Step 1–7: 逐章生成**（每章一次完整写入）
- [ ] **Step 8: 全量校验链接**（`node tools/check-links.js`，Expected `OK`）
- [ ] **Step 9: 本地抽查**（ch16 底栏「下一章」应为占位）
- [ ] **Step 10: 提交**

```bash
git -C /Users/helios/work/project/lvgl-sample/kotlin-tutorial add lvgl/chapter10.html lvgl/chapter11.html lvgl/chapter12.html lvgl/chapter13.html lvgl/chapter14.html lvgl/chapter15.html lvgl/chapter16.html
git -C /Users/helios/work/project/lvgl-sample/kotlin-tutorial commit -m "feat: add lvgl chapters 10-16"
```

---

### Task 7: 更新 README.md 与 CLAUDE.md

**Files:**
- Modify: `README.md`、`CLAUDE.md`

**Interfaces:**
- Consumes: 最终目录结构、`SITE_NAV` 约定、`tools/check-links.js`。
- Produces: 与实现一致的文档。

- [ ] **Step 1: 重写 `README.md`**：站名「Helios 技术教程」；目录结构（门户/kotlin/lvgl）；两技术线章节表（直接引用 `SITE_NAV` 内容）；本地预览命令；技术栈（HTML/CSS/JS 零依赖，`site-nav.js` 单源导航）；在线地址占位。

- [ ] **Step 2: 更新 `CLAUDE.md`**：结构改为多技术站点说明；新增「导航约定」——改导航/章节只改 `site-nav.js`，页面不得写死导航；页面 `<body>` 必须声明 `data-track`/`data-chapter`/`data-root`；链接一律相对路径（GitHub Pages 子路径部署）；提交不带 Co-Authored-By 尾注；`tools/check-links.js` 校验用法；保留并沿用既有中文/高亮/练习/导师约定。

- [ ] **Step 3: 本地通读校验**：README/CLAUDE 中的路径与真实结构一致。
- [ ] **Step 4: 提交**

```bash
git -C /Users/helios/work/project/lvgl-sample/kotlin-tutorial add README.md CLAUDE.md
git -C /Users/helios/work/project/lvgl-sample/kotlin-tutorial commit -m "docs: update README and CLAUDE for multi-tech site"
```

---

### Task 8: 链接检查器与全站验收

**Files:**
- Create: `tools/check-links.js`（Node 静态链接 + SITE_NAV 导航链接校验）
- Modify: 无（如发现损坏链接则修复对应页面）

**Interfaces:**
- Consumes: `site-nav.js` 导出的 `SITE_NAV`（Node 侧以 `global.window = globalThis` 注入）。
- Produces: `node tools/check-links.js` 命令，退出码 0=通过 / 1=失败。

- [ ] **Step 1: 写 `tools/check-links.js`**

```js
#!/usr/bin/env node
/* 全站链接检查：静态 href/src + SITE_NAV 生成的导航链接 */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
global.window = globalThis;
require(path.join(root, 'site-nav.js'));
const SITE_NAV = window.SITE_NAV;

function walk(dir, out) {
  for (const f of fs.readdirSync(dir)) {
    if (['.git', 'node_modules', 'docs', 'tools'].includes(f)) continue;
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (f.endsWith('.html')) out.push(p);
  }
}
const files = [];
walk(root, files);
let errors = 0;
const fail = (file, href) => { console.log('BROKEN: ' + path.relative(root, file) + ' -> ' + href); errors++; };

/* 1) 静态链接 */
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);
  const hrefs = [...html.matchAll(/(?:href|src)="([^"#]+)"/g)].map(m => m[1])
    .filter(h => h && !h.startsWith('http') && !h.startsWith('mailto') && !h.startsWith('//'));
  for (const h of hrefs) {
    const target = path.resolve(dir, decodeURIComponent(h));
    if (!fs.existsSync(target)) fail(file, h);
  }
}

/* 2) SITE_NAV 导航链接（按页面 data-* 推导，与 script.js 逻辑一致） */
function pad(n) { return (n < 10 ? '0' : '') + n; }
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);
  const track = /data-track="([^"]+)"/.exec(html);
  const chapter = /data-chapter="([^"]+)"/.exec(html);
  const dataRoot = /data-root="([^"]+)"/.exec(html);
  if (!dataRoot) continue;
  const rootPath = dataRoot[1];
  const trackId = track ? track[1] : null;
  const chapterNum = chapter ? chapter[1] : null;
  if (trackId) {
    const t = SITE_NAV.tracks.find(x => x.id === trackId);
    if (!t) { fail(file, '[unknown track ' + trackId + ']'); continue; }
    const links = [rootPath + 'index.html', rootPath + trackId + '/index.html'];
    SITE_NAV.tracks.forEach(tk => {
      tk.parts.forEach(p => p.chapters.forEach(c => {
        const href = (tk.id === trackId)
          ? rootPath + 'chapter' + pad(c.num) + '.html'
          : rootPath + tk.id + '/chapter' + pad(c.num) + '.html';
        links.push(href);
      }));
    });
    const flat = [];
    t.parts.forEach(p => p.chapters.forEach(c => flat.push(c)));
    const idx = flat.findIndex(c => String(c.num) === String(chapterNum));
    if (idx > 0) links.push(rootPath + 'chapter' + pad(flat[idx - 1].num) + '.html');
    if (idx >= 0 && idx < flat.length - 1) links.push(rootPath + 'chapter' + pad(flat[idx + 1].num) + '.html');
    for (const l of links) {
      const target = path.resolve(dir, decodeURIComponent(l));
      if (!fs.existsSync(target)) fail(file, l);
    }
  }
}

if (errors) { console.log('FAIL: ' + errors + ' broken link(s)'); process.exit(1); }
console.log('OK: all links resolve');
```

- [ ] **Step 2: 运行检查器**

```bash
cd /Users/helios/work/project/lvgl-sample/kotlin-tutorial && node tools/check-links.js
```
Expected：`OK: all links resolve`。若出现 BROKEN，修复对应文件后重跑。

- [ ] **Step 3: 浏览器全站走查**：门户 → kotlin → lvgl 各条路径；两条技术线导航渲染一致（同组件、仅 accent 色差）；顶栏「首页/Kotlin/LVGL」高亮正确；上一/下一章闭环；移动端（DevTools 480px）下拉可展开。

- [ ] **Step 4: 提交检查器**

```bash
git -C /Users/helios/work/project/lvgl-sample/kotlin-tutorial add tools/check-links.js
git -C /Users/helios/work/project/lvgl-sample/kotlin-tutorial commit -m "chore: add link checker tool"
```

- [ ] **Step 5（可选）: 发布 GitHub Pages**

```bash
git -C /Users/helios/work/project/lvgl-sample/kotlin-tutorial push origin main
```
确认线上 `https://Helioswei.github.io/kotlin-tutorial/` 门户与两技术线可用。

---

## 自检记录

- **Spec 覆盖**：设计文档 §2 架构 → Task 2/3/4；§3 统一设计系统 → Task 1；§4 子目录导航 → Task 1/8（SITE_NAV + 检查器）；§5 门户 → Task 3；§6 Kotlin 迁移 → Task 2；§7 LVGL 大纲 → Task 4/5/6；§8 构建/工具 → 各任务 + Task 8；§9 文档 → Task 7；§10 Git/部署 → 各任务提交 + Task 8 Step 5；§11 测试验收 → Task 8。无缺口。
- **占位符扫描**：无 TBD/TODO；内容章节任务以规格表 + 模板约束覆盖，正文为创作性内容，模板已锁定结构。
- **接口一致性**：`SITE_NAV`/`MENTORS` 命名、`data-track`/`data-chapter`/`data-root` 属性、`#nav-inner`/`#bottom-nav`/`#toc` 容器、`check-links.js` 读取逻辑在各任务间一致。
