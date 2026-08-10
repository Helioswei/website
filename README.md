# Helios's AILab — 主站仓库（aigcwei.cn）

纯 HTML 静态主站，公开内容仓库。部署到 `aigcwei.cn`（博客根 + learn 教程模块）。
**外壳为构建时静态注入（v4）**：页面只保留两个占位符，header/footer 由 `scripts/inject.py` 构建时渲染注入。

## 目录结构

```
website/
├── index.html          ← 站点总首页（文章流 + 笔记库入口）
├── notes/              ← 技术笔记库（49 篇，纯 HTML）
│   ├── cpp/            ← C++ 编程（12 篇）
│   ├── graphics/       ← 图形与多媒体（7 篇）
│   ├── linux/          ← Linux 系统（10 篇）
│   ├── database/       ← 数据库（8 篇）
│   └── tools/          ← 开发工具（12 篇）
├── learn/              ← 技术教程模块（八线：Kotlin / LVGL / ESP32 电子墨水屏 / SF32 电子书移植 / C++ 工程实践 / 图像与视觉实战 / C++ 底层原理 / FFmpeg 音视频实战）
│   ├── index.html      ← 教程门户
│   ├── kotlin/  lvgl/  epub/  sifli/  cpp/  graphics/  cpp-internals/  ffmpeg/   ← 各线 16 章
│   ├── style.css site-nav.js script.js ← 站内导航/样式（随目录走）
│   └── CLAUDE.md       ← 章节制作规范
├── about/              ← 关于页
├── scripts/inject.py   ← 外壳静态注入脚本（构建时执行：模板版 → 注入版）
├── site-config.json    ← 配置真源（品牌/备案号/导航/社交；构建数据源，线上公开）
├── edgeone.json        ← Makers 构建配置（buildCommand + outputDirectory）
└── images/             ← 图片资源（110 个）
```

## 统一外壳（v4 构建时注入）

页面只保留两个占位符，**零脚本引用**：

```html
<link rel="stylesheet" href="https://assets.aigcwei.cn/style.css">
...
<body data-site="home">            <!-- home|learn|about：构建注入时决定导航高亮 -->
  <div id="site-header"></div>     <!-- 构建时注入最终 header HTML -->
  <main>...本站内容...</main>
  <div id="site-footer"></div>     <!-- 构建时注入最终 footer HTML（含备案号） -->
</body>
```

- 外壳由 Makers 构建时执行 `python3 scripts/inject.py` 注入（产物 `dist/`），**无运行时 JS → 无跨站跳转闪烁**
- `site-config.json` 是配置真源（品牌/备案号/导航/社交）：改一处 → push → 全站自动重建生效
- 备案号（`鄂ICP备2026041178号`）为 inject.py 内置默认强制，任何站构建产物 footer 必带
- learn 页面另有自己的站内导航（`site-nav.js` + `script.js` 渲染），与外壳并存
- 样式来自 `assets.aigcwei.cn`（website-tools 仓库），本站不复制 CSS

## 本地预览

```bash
cd ~/work/project/web && python3 website-tools/scripts/dev-server.py
# 浏览器访问 http://localhost:8000/website/
```

dev-server 动态注入外壳（复用 inject.py 逻辑，单一真源）+ 线上域名实时重写本地路径，本地预览 = 线上效果，页面文件零改动。

## 校验

```bash
cd learn && node tools/check-links.js   # 全站链接 + SITE_NAV 校验，预期 OK
python3 ../website-tools/scripts/verify_blog.py  # 博客图片引用 + 标签平衡
```

## 约定

- **不自动 push**：改动只落本地，少爷审核确认后才上传 GitHub
- 统一外壳来自 assets.aigcwei.cn（website-tools 仓库），本站不复制 CSS
- 加密文章（当年加密码锁的）不迁移，尊重隐私

## 部署

- EdgeOne Makers → 自定义域名 `aigcwei.cn`
- **构建命令：`python3 scripts/inject.py`，输出目录：`dist`**（edgeone.json 随仓库走，自动生效）
- 相关仓库：`website-tools`（assets + 脚本）→ `assets.aigcwei.cn`；`life` → `life.aigcwei.cn`

架构详见 `~/work/project/web/DESIGN.md`（v4）。
