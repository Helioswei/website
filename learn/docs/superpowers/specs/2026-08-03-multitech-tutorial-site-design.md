# 多技术教程网站（Kotlin + LVGL）设计文档

- **日期**：2026-08-03（修订版）
- **状态**：已获用户认可
- **仓库**：`kotlin-tutorial`（现有 GitHub Pages 教材站，remote: `git@github.com:Helioswei/kotlin-tutorial.git`）
- **设计参考**：`/Users/helios/AIWork/AgentHelp/awesome-design-md` 中 Mintlify DESIGN.md 的浅色文档站设计语言

## 0. 提交规范

- git 提交信息**不带** `Co-Authored-By: Claude <noreply@anthropic.com>` 尾注（用户要求，已记入项目记忆）。

## 1. 目标

把现有 `kotlin-tutorial` 静态教材网站从单一 Kotlin 教程扩展为 **Kotlin + LVGL 双技术线**网站：

1. **保留并迁移**现有 16 章 Kotlin 教程（内容不变，仅调整目录结构、链接与导航）。
2. **新增**一套「LVGL 从入门到深入」教程（16 章，中文，导师体系），内容以 `lvgl-sample` 工作区（LVGL v9.5.0 库 + LVGL Pro CLI）为真实案例。
3. **根目录改造**为多技术门户首页，全站采用**统一浅色设计系统**（消除多技术线间的「分裂感」）。

## 2. 站点架构（子目录化）

```
kotlin-tutorial/  ← GitHub Pages 仓库根
├── index.html        门户首页（新）
├── style.css         统一设计系统（重构为 CSS tokens）
├── script.js         SITE_NAV 导航渲染 + 复制按钮
├── kotlin/
│   ├── index.html    Kotlin 目录页（迁移自根 index.html）
│   └── chapter01-16.html（迁移，改相对链接）
├── lvgl/
│   ├── index.html    LVGL 目录页（新）
│   └── chapter01-16.html（新）
└── README.md、CLAUDE.md  更新为多技术说明
```

## 3. 统一设计系统（核心：消除分裂感）

**一套 tokens + 一套组件 + 一个导航**，两条技术线共用；唯一差异是**强调色 accent**，从 CSS 变量派生，受控且统一。

### 3.1 设计 tokens（`style.css` 以 `:root` CSS 变量定义）

- **主题**：浅色阅读向（Mintlify/Notion 风格）——白底 `#ffffff`、浅灰 surface `#f7f7f8`、发丝线边框 `#e5e5e7`、墨色正文 `#1a1a1e`、次级文字 `#5a5a62`、弱化 `#909096`。
- **强调色**：`--accent` / `--accent-soft` / `--accent-contrast` 三件套。Kotlin = 紫 `#7f5af0`（保留现有品牌）；LVGL = 青 `#0d9488`。通过 `<body class="track-kotlin">` / `track-lvgl` 切换，布局、间距、组件完全一致。
- **代码**：保留 Catppuccin 深色代码块（`#1e1e2e` 底、`#cdd6f4` 字），与浅色页面形成阅读对比；行内代码用 accent 浅底。
- **排版**：正文 16px/1.7；h1 2rem、h2 1.5rem、h3 1.2rem；代码 JetBrains Mono / SF Mono / Menlo 栈。
- **间距**：8px 基准（8/16/24/32/48/60）。
- **圆角**：卡片 12px、代码块 8px、胶囊/按钮 999px、小徽章 6px（半径纪律）。
- **层级**：发丝线 + 轻投影 `0 1px 3px rgba(0,0,0,.06)`，扁平为主；sticky 顶栏带发丝线下边框。

### 3.2 共享组件（`style.css` 统一定义）

顶栏、门户卡片、目录页 TOC、章节页（h1+副标题+导师卡片+正文）、`tip`/`warning` 标注、对比表格、练习折叠块、代码块+复制按钮、底部上一/下一章。全部单源实现。

## 4. 子目录导航（关键机制）

- **导航单一来源**：`script.js` 维护 `SITE_NAV` 配置（两条技术线的分部→章节→标题→导师）。DOMContentLoaded 时在每个页面渲染顶栏 `品牌 | 首页 | Kotlin ▾ | LVGL ▾` 与底部 `上一章 / 下一章 / 目录`，全站结构 100% 一致，杜绝手写导航不同步。
- **相对路径自动解析**：每个页面 `<body data-track="..." data-chapter="N" data-root="../">` 声明所在层级与当前章；JS 将 `SITE_NAV` 链接按 `data-root` 前缀解析为相对路径（如 `../lvgl/chapter05.html`、`./chapter06.html`）。**不用根绝对路径**——GitHub Pages 部署在 `/kotlin-tutorial/` 子路径，根绝对路径会失效，相对路径对本地 `file://` 与线上同时成立。
- **活跃态**：JS 依据 `data-track` / `data-chapter` 高亮当前章节与所在分部。
- **目录页**（`kotlin/index.html`、`lvgl/index.html`）：同款 TOC 组件，分部→章节，标注导师；数据同样来自 `SITE_NAV`。
- **代价**：导航依赖少量 JS；内容本身（正文/代码/练习）无 JS 也可读。收益：新增章节只改一处配置，两条线导航绝不分叉。

## 5. 门户首页（根 `index.html`）

- Hero：站名（暂定「Helios 技术教程」）+ tagline（系统化学习路径）。
- 两张技术卡片：Kotlin（紫，16 章，Android 开发）、LVGL（青，16 章，嵌入式图形库），各含简介、章数、「进入教程 →」。
- 同一卡片组件，靠 accent 区分；卡片 hover 轻抬升。

## 6. Kotlin 迁移

- `index.html` → `kotlin/index.html`，内容结构转为目录页 TOC 组件。
- `chapter01-16.html` → `kotlin/chapter01-16.html`：正文/样式类**零改动**；`<link>`/`<script>` 改 `../`；移除每页手写导航与底部链接（改由 `SITE_NAV` 渲染）；`<body>` 加 `data-track="kotlin" data-chapter="N" data-root="../"`。
- **代价**：旧 URL（如 `chapter05.html`）变为 `/kotlin/chapter05.html`，已确认接受。

## 7. LVGL 教程大纲（16 章）

全部基于 `lvgl-sample/` 真实内容：`lv_conf_template.h`/`lv_conf.h` 配置、CMake 集成、SDL 模拟器、`examples/porting` 模板、`src/` 子系统（core/widgets/draw/display/indev/layouts/libs/font/image）、`examples/xml_project` + `lved generate` 的 XML→C 流程。

| 部分 | 章 | 标题 | 导师 |
|------|----|------|------|
| 认识 LVGL | 01 | LVGL 的崛起与本仓库解剖 | 费曼 |
| | 02 | 开发环境搭建与第一个程序 | 鲁班 |
| 核心机制 | 03 | 对象模型与屏幕 | 柯南 |
| | 04 | 显示、输入与渲染缓冲 | 鲁班 |
| | 05 | 常用 Widgets 上手 | 狄仁杰 |
| | 06 | 样式系统 | 达芬奇 |
| 交互与表现 | 07 | Flex/Grid 布局引擎 | 诸葛亮 |
| | 08 | 事件系统 | 柯南 |
| | 09 | 动画与过渡 | 达芬奇 |
| 资源与数据 | 10 | 图像与字体 | 福尔摩斯 |
| | 11 | 数据绑定与 Observer | 费曼 |
| | 12 | LVGL Pro CLI 工作流（XML→C） | 鲁班 |
| 深入与实战 | 13 | 综合实战：用本仓库做一个完整界面 | 狄仁杰 |
| | 14 | 性能优化与内存管理 | 诸葛亮 |
| | 15 | 集成与多平台部署 | 包青天 |
| | 16 | 生态、成长路线与资源 | 费曼 |

每章结构沿用 Kotlin 教程约定：导师人设引导、章节正文、代码块（Catppuccin 手动 `<span>` 高亮）、章末 3-5 道折叠练习（入门/进阶/挑战三档，含提示与答案）。

## 8. 构建方式与工具

- **零依赖手写 HTML**：不引入框架/构建工具；设计系统与导航为手写 CSS/JS 单源。
- **首章模板先行**：先完成 `lvgl/chapter01.html` + 新版 `style.css` + `script.js` 作为全站基准，再批量迁移 Kotlin 16 章、生成 LVGL 其余 15 章。
- **可用 skill/agent**：`frontend-design` skill 辅助打磨 portal/导航视觉；章节批量生成可用 `Agent`（Frontend Developer）并行，但以固定模板为基准。
- **实施**：通过 `superpowers:writing-plans` 产出逐步实施计划后执行。

## 9. 文档更新

- `kotlin-tutorial/CLAUDE.md`：更新为多技术站点结构、`SITE_NAV` 导航约定（改配置而非改页面）、`data-track`/`data-root` 约定、提交规范（无尾注）。
- `kotlin-tutorial/README.md`：更新为双技术线说明与新目录结构、本地预览命令。

## 10. Git 与部署

- 所有改动提交到 `kotlin-tutorial` 仓库（唯一 remote 即 GitHub Pages）；提交不带 `Co-Authored-By` 尾注。
- 部署不变：GitHub Pages；迁移后 `/` → 门户，`/kotlin/`、`/lvgl/` → 各技术线。
- `lvgl-sample` 父目录不是 git 仓库，不参与提交。

## 11. 测试与验收

- 本地 `python3 -m http.server` 预览（相对路径在 `file://` 与子路径部署下均可用）。
- 全站链接检查：门户 → 两技术线 → 章节 → 上一/下一章 闭环；两条技术线导航渲染一致、活跃态正确。
- 移动端（768/480 断点）下拉导航可用。
- Kotlin 章节正文零改动（仅链接/导航变更）。
- 提交后（可选）push 到 GitHub Pages 验证线上。

## 12. 范围外（YAGNI）

- 不引入 JS 框架、静态站点生成器或构建流水线。
- 不新增第三门技术线（架构预留，本期不做）。
- 不重写 Kotlin 章节内容；不做搜索/深色模式/评论等增强。
