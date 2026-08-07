# CLAUDE.md

本文件为 Claude Code（claude.ai/code）在操作本仓库时提供指引。

## 项目概览

**Helios 技术教程** — 多技术静态教程站：**Kotlin**（Android 开发）、**LVGL**（嵌入式图形库）、**ESP32 电子墨水屏**（电子书阅读器实战）、**SF32 电子书移植实战**（SiFli 跨平台移植）四条技术线，各 16 章。纯 HTML + CSS + 原生 JavaScript，零框架、零构建工具，直接以静态文件部署到 GitHub Pages（仓库根）。

- Kotlin 线：从语言特性到 Android 实战（语法、协程、Jetpack Compose、架构等）。
- LVGL 线：基于真实 `lvgl-master` 源码仓库（版本 **9.6.0-dev**）的嵌入式图形教程。
- ESP32 电子墨水屏线：基于真实 `diy-esp32-epub-reader` 项目的电子书阅读器实战（EPUB 解析、EPDiy 渲染、低功耗）。
- SF32 电子书移植实战线：基于真实 `EPD_Reader-main` 项目的跨平台移植实战（ESP32 → SiFli SF32，中文字体、触控、电量管理，含「已实现/未实现」盘点）。

## 目录结构

- `index.html` — 门户首页（各技术线入口）
- `style.css` — 统一浅色设计系统：顶部 `:root` 定义 design tokens（颜色 / 字体 / 圆角 / 阴影），`body.track-lvgl` / `body.track-epub` / `body.track-sifli` 覆盖各线强调色（Kotlin 朱砂红 · LVGL 墨藏蓝 · ESP32 琥珀金 · SF32 藤紫）；改全站观感只改这里
- `site-nav.js` — **导航数据单一来源**：`window.MENTORS`（导师 → emoji）+ `window.SITE_NAV`（站名、技术线、分部、章节、导师、方法论）
- `script.js` — 依赖 `site-nav.js`，负责顶栏导航、底部上一章/下一章、目录页 TOC、代码复制按钮的渲染
- `preview.html` — 设计系统预览页（组件与 tokens 一览，仅作开发参考）
- `kotlin/` — `index.html`（目录页）+ `chapter01-16.html`
- `lvgl/` — `index.html`（目录页）+ `chapter01-16.html`
- `epub/` — `index.html`（目录页）+ `chapter01-16.html`
- `sifli/` — `index.html`（目录页）+ `chapter01-16.html`
- `tools/check-links.js` — 全站链接 + SITE_NAV 导航校验脚本（Node，由 Task 8 建立；用法见「校验」）
- `docs/` — superpowers 设计与计划文档（非站点内容）

## 导航约定（关键）

- **改导航 / 章节 / 导师 → 只改 `site-nav.js` 的 `SITE_NAV` / `MENTORS`**。禁止在页面 HTML 里写死导航——顶栏、目录、上一章/下一章均由 `script.js` 依据 `SITE_NAV` 自动渲染。
- 每个页面 `<body>` 必须声明：
  - `class="track-*"` — 技术线标识（`track-kotlin` / `track-lvgl` / `track-epub` / `track-sifli`），决定强调色
  - `data-track` — 技术线 id（`kotlin` / `lvgl` / `epub` / `sifli`）；门户与 preview 页可省略
  - `data-chapter` — 章节页编号（章节页必填）；Kotlin 用两位补零（如 `"01"`），LVGL 用非补零（如 `"1"`），`script.js` 用 `parseInt` 解析，两者均可
  - `data-root` — 相对根：子目录章节/目录页用 `"../"`，根目录页面（门户、preview）用 `"./"`
- **链接一律相对路径**。GitHub Pages 部署在 `/learn/` 子路径，以 `/` 开头的根绝对路径会失效。
- **脚本顺序**：`site-nav.js` 必须在 `script.js` 之前加载。

## 提交规范

- git 提交信息**不带** `Co-Authored-By: Claude <noreply@anthropic.com>` 尾注。

## 内容约定

- **语言**：全站中文（zh-CN）。正文、UI 标签、HTML 注释一律中文。
- **导师体系**：每章一位导师（费曼、柯南、福尔摩斯、诸葛亮、狄仁杰、达芬奇、鲁班、包青天），以 `mentor-card` 区块 + 人设引言开场，章末按导师方法论收束。
- **代码高亮**：手动 `<span>` 类标记（无 JS 高亮库），类名：`.kw`、`.type`、`.str`、`.num`、`.cmt`、`.fn`、`.ann`、`.op`、`.param`。
- **组件**：`.tip`（含 `.tip-title`）、`.warning`、`.exercise`（章末练习，入门/进阶/挑战三档 + 折叠提示/答案）、`.cpp-note`（C++ 开发者对照，Kotlin 线）。

## 新增技术线与章节制作规范

站点设计为「一条技术线一个目录」，加新教程请严格按此流程，保证各技术线格式统一。已有三线的做法即范本：Kotlin（朱砂红 `#b3402f`）、LVGL（墨藏蓝 `#35536b`）、ESP32 电子墨水屏（琥珀金 `#9a6a1f`），每线 16 章。

### 新增技术线（6 步）

1. **`site-nav.js`** — 在 `SITE_NAV.tracks` 追加一条：`{ id, name, accent, desc, tagline, parts: [{ title, chapters: [{ num, title, mentor, method }] }] }`。导师名必须能在 `MENTORS` 中找到；每线 16 章、分 4-6 个分部。
2. **`style.css`** — 加 `body.track-<id> { --accent / --accent-strong / --accent-soft / --tip-bg }`，并加 `.track-card.<id> { --accent }`。新强调色须与现有三色在纸面色板上和谐（偏印刷暖色系，避免高饱和撞色）。
3. **门户 `index.html`** — 加一张 `track-card`：`track-vol`（卷 N · 技术线名）+ 图标 + 标题 + 描述 + `track-meta` + `track-cta`「翻到目录 →」。
4. **目录页 `<track>/index.html`** — 复制现有某线目录页，改 `track-eyebrow`（卷 N · …）、`<h1>`、tagline、`data-track`。
5. **章节 `<track>/chapter01-16.html`** — 先写第 1 章确立模板，其余章节严格复用其结构，只换内容。
6. **更新文档** — `README.md`（引言 bullet、目录树、章节表）与 `CLAUDE.md`（本文件的概览 / 结构 / 技术线清单）。

### 章节格式（每章必须）

- `<body class="track-<id>" data-track="<id>" data-chapter="N" data-root="../">`
- `<title>第N章：<标题> - <技术线名></title>`；`<link rel="stylesheet" href="../style.css">`；脚本 `../site-nav.js` 先、`../script.js` 后
- 结构顺序：`<h1>` 章标题 + `.chapter-subtitle` → `.mentor-card`（导师 emoji + 姓名 + 方法论 + 引言）→ 若干 `<h2>` 小节（编号 N.N）→ 章末 `.exercise`
- 每个 `h2` 小节：≥2 段正文 + ≥2 个代码块（Catppuccin 手动 `<span>` 高亮）+ 视内容加 `.tip` / `.warning` / 表格
- 章末 3-4 道练习：`.exercise-item` + `.difficulty-easy/medium/hard` + `<details>` 提示与参考答案
- 代码块只允许 `.kw .type .str .num .cmt .fn .ann .op .param` 九个高亮类

### 内容真实性（硬性要求）

- 引用的 API / 宏 / 类名 / 文件路径 / 常量，必须真实存在于该技术线对应的源码仓库（先读或 `grep` 核实再写），禁止虚构。
- 版本号、数值以源码为准；README / 文档与代码不一致时以代码为准——差异可如实写成教学点。
- 引用的外部链接只描述其文字内容，不编造 URL 细节。
- **术语与零基础铺垫**：教程面向可能零基础的新人——专业术语（如 EPUB、PSRAM、SPI、GPIO）**首次出现时用一句话说人话解释**，之后不再重复；每条技术线**开头（第 1-2 章）要有一节「领域基础与资源现状」铺垫**，讲清本领域为什么这么做、资源为什么受限（嵌入式为何 RAM/Flash 宝贵等），让读者带着概念进入正文。

### 提交与验收

- 提交不带 `Co-Authored-By` 尾注；章节按批次提交（如 `feat: add <track> chapters 01-02`）。
- 写完所有章节后必须通过：`node --check site-nav.js script.js`、`node tools/check-links.js`（预期 `OK`）。
- 提交前自查：`data-chapter` 每页唯一、脚本顺序正确、HTML 标签平衡、span 类名合法。

## 校验

全站链接校验（Node；`tools/check-links.js` 由 Task 8 建立——若 `tools/` 尚不存在，则先执行 Task 8，本说明记录最终用法）：

```bash
cd /Users/helios/work/project/lvgl-sample/learn && node tools/check-links.js
```

预期输出 `OK: all links resolve`，退出码 0=通过 / 1=失败；出现 `BROKEN` 时修复对应页面后重跑。

## 本地预览

```bash
python3 -m http.server 8000
```

浏览器访问 `http://localhost:8000`（若 8000 被其他服务占用，改用空闲端口如 `8090`）；或直接用浏览器打开 `index.html`。
