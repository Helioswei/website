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
      accent: "#b3402f",
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
      accent: "#35536b",
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
    },
    {
      id: "epub",
      name: "ESP32 电子墨水屏",
      accent: "#9a6a1f",
      desc: "ESP32 电子墨水屏电子书实战",
      tagline: "从零解剖一个 ESP32 电子书阅读器：EPUB 解析、电子墨水屏渲染、低功耗",
      parts: [
        { title: "认识项目", chapters: [
          { num: 1, title: "项目概览：DIY ESP32 电子书阅读器", mentor: "费曼", method: "第一性原理" },
          { num: 2, title: "开发环境搭建（PlatformIO + ESP-IDF）", mentor: "鲁班", method: "工欲善其事" }
        ]},
        { title: "硬件与底层", chapters: [
          { num: 3, title: "电子墨水屏与 EPDiy", mentor: "鲁班", method: "工欲善其事" },
          { num: 4, title: "板级抽象：Board 工厂", mentor: "诸葛亮", method: "运筹帷幄" },
          { num: 5, title: "输入控制：三按键导航", mentor: "狄仁杰", method: "系统分析" },
          { num: 6, title: "存储：SD 卡与 SPIFFS", mentor: "鲁班", method: "工欲善其事" }
        ]},
        { title: "EPUB 解析", chapters: [
          { num: 7, title: "EPUB 格式解密（zip + miniz）", mentor: "柯南", method: "真相只有一个" },
          { num: 8, title: "XML 解析：content.opf（TinyXML2）", mentor: "柯南", method: "真相只有一个" },
          { num: 9, title: "HTML 解析器 RubbishHtmlParser", mentor: "福尔摩斯", method: "排除不可能" },
          { num: 10, title: "文本换行布局（动态规划）", mentor: "费曼", method: "第一性原理" },
          { num: 11, title: "分页算法", mentor: "诸葛亮", method: "运筹帷幄" }
        ]},
        { title: "渲染与体验", chapters: [
          { num: 12, title: "渲染到电子墨水屏", mentor: "达芬奇", method: "艺术与工程" },
          { num: 13, title: "图像处理与缩放", mentor: "达芬奇", method: "艺术与工程" },
          { num: 14, title: "字体生成", mentor: "鲁班", method: "工欲善其事" }
        ]},
        { title: "低功耗与实战", chapters: [
          { num: 15, title: "深睡眠与低功耗（ULP/EXT1）", mentor: "包青天", method: "铁面无私" },
          { num: 16, title: "移植、优化与展望", mentor: "费曼", method: "教是最好的学" }
        ]}
      ]
    },
    {
      id: "sifli",
      name: "SF32 电子书移植实战",
      accent: "#6a4f7a",
      desc: "SF32 电子书移植实战（SiFli SF32-OED-EPD）",
      tagline: "从 ESP32 到 SiFli：一个 EPUB 阅读器的跨平台移植实战，含中文字体、触控、电量管理与完成度盘点",
      parts: [
        { title: "认识项目", chapters: [
          { num: 1, title: "项目概览：从 ESP32 到 SiFli 的移植", mentor: "费曼", method: "第一性原理" },
          { num: 2, title: "平台与构建：SiFli SDK + SCons", mentor: "鲁班", method: "工欲善其事" }
        ]},
        { title: "硬件平台", chapters: [
          { num: 3, title: "板级配置：v11 / v12 / SPI 多板", mentor: "鲁班", method: "工欲善其事" },
          { num: 4, title: "显示驱动：DBI 与 SPI 墨水屏", mentor: "达芬奇", method: "艺术与工程" },
          { num: 5, title: "输入控制：按键 + 触控", mentor: "狄仁杰", method: "系统分析" },
          { num: 6, title: "电池与低功耗", mentor: "包青天", method: "铁面无私" }
        ]},
        { title: "解析与渲染", chapters: [
          { num: 7, title: "EPUB 解析：继承与中文适配", mentor: "柯南", method: "真相只有一个" },
          { num: 8, title: "中文字体与动态字体加载", mentor: "鲁班", method: "工欲善其事" },
          { num: 9, title: "阅读设置与持久化", mentor: "诸葛亮", method: "运筹帷幄" },
          { num: 10, title: "渲染器与页面绘制", mentor: "达芬奇", method: "艺术与工程" }
        ]},
        { title: "UI 与状态机", chapters: [
          { num: 11, title: "UI 状态机总览", mentor: "诸葛亮", method: "运筹帷幄" },
          { num: 12, title: "书库、目录与阅读流程", mentor: "狄仁杰", method: "系统分析" },
          { num: 13, title: "覆盖操作层与触控区域", mentor: "柯南", method: "真相只有一个" }
        ]},
        { title: "现状与展望", chapters: [
          { num: 14, title: "已实现功能盘点", mentor: "包青天", method: "铁面无私" },
          { num: 15, title: "未实现与待完善", mentor: "费曼", method: "第一性原理" },
          { num: 16, title: "二次开发与移植新屏", mentor: "鲁班", method: "工欲善其事" }
        ]}
      ]
    }
  ]
};
