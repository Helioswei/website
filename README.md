# 赫利俄斯的AI实验室 — 主站仓库（aigcwei.cn）

纯 HTML 博客主站。内容分两块：

```
blog/
├── index.html          ← 首页（文章流 + 笔记库入口）
├── notes/              ← 技术笔记库（P2 已迁移 44 篇）
│   ├── cpp/            ← C++ 编程（11 篇）
│   ├── graphics/       ← 图形与多媒体（6 篇）
│   ├── linux/          ← Linux 系统（9 篇）
│   ├── database/       ← 数据库（7 篇）
│   └── tools/          ← 开发工具（11 篇）
├── about/              ← 关于页（P5）
├── images/             ← 图片资源（从原博客迁移，110 个）
└── index.html
```

## 内容管线

- 源：`../Helioswei.github.io/docs/**/*.md`（原 VitePress 博客）
- 转换：`../scripts/md2html.py`（md → 统一 HTML，含 SEO meta）
- 批量：`../scripts/batch_migrate.py`（分类迁移 + 图片路径改写 + 索引生成）
- 校验：`../scripts/verify_blog.py`（图片引用 + 标签平衡）

## 约定

- **不自动 push**：少爷本地审核确认后才上传 GitHub
- 统一外壳（header/footer/样式）来自 assets.aigcwei.cn，本站不复制 CSS
- 加密文章（当年加密码锁的）不迁移，尊重隐私
- 体系化教程内容（菜鸟回炉/ffmpeg 系列）迁往 learn 仓库，不在本站

## 部署

- EdgeOne Makers → 自定义域名 `aigcwei.cn`
- 纯静态：构建命令留空，输出目录 `/`
