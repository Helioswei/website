# Helios's AILab — 主站仓库（aigcwei.cn）

纯 HTML 静态主站，公开内容仓库。部署到 `aigcwei.cn`（博客根 + learn 教程模块）。

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
├── learn/              ← 技术教程模块（六线：Kotlin / LVGL / ESP32 电子墨水屏 / SF32 电子书移植 / C++ 工程实践 / 图像与视觉实战）
│   ├── index.html      ← 教程门户
│   ├── kotlin/  lvgl/  epub/  sifli/  cpp/  graphics/   ← 各线 16 章
│   ├── style.css site-nav.js script.js ← 站内导航/样式（随目录走）
│   └── CLAUDE.md       ← 章节制作规范
├── about/              ← 关于页
└── images/             ← 图片资源（110 个）
```

## 统一外壳

所有页面引用 `assets.aigcwei.cn` 三件套（共享资源，本站不复制 CSS）：

```html
<link rel="stylesheet" href="https://assets.aigcwei.cn/style.css?v=1">
...
<div id="site-header"></div>  <!-- body 开头 -->
<div id="site-footer"></div>  <!-- body 末尾 -->
<script src="https://assets.aigcwei.cn/site-config.js"></script>
<script src="https://assets.aigcwei.cn/site-shell.js"></script>
```

- `site-config.js` 是全站配置唯一真源（站名 / 备案号 / 导航 / 社交链接），改一处全站生效
- learn 页面另有自己的站内导航（`site-nav.js` + `script.js` 渲染），与外壳并存

## 本地预览

```bash
cd ~/work/project/web && python3 website-tools/scripts/dev-server.py
# 浏览器访问 http://localhost:8000/website/
```

页面文件永远写线上域名，本地预览由 dev-server 实时重写为本地路径，上线零改动。

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
- 纯静态：构建命令留空，输出目录 `/`
- 相关仓库：`website-tools`（assets + 脚本）→ `assets.aigcwei.cn`；`life` → `life.aigcwei.cn`

架构详见 `~/work/project/web/DESIGN.md`。
