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
    },
    {
      id: "cpp",
      name: "C++ 工程实践",
      accent: "#4a6b5d",
      desc: "C++ 工程实践教程（工具链 / 包管理 / 测试 / 调试）",
      tagline: "从工具链到工程化：GCC、CMake、vcpkg、测试、调试，一条把 C++ 写出生产级的路径",
      parts: [
        { title: "工程准备", chapters: [
          { num: 1, title: "C++ 生态与开发环境全景", mentor: "费曼", method: "第一性原理" },
          { num: 2, title: "构建系统入门：CMake 核心概念", mentor: "鲁班", method: "工欲善其事" },
          { num: 3, title: "编译器与工具链：GCC 源码安装", mentor: "狄仁杰", method: "系统分析" },
          { num: 4, title: "环境变量与多版本 GCC 切换", mentor: "柯南", method: "真相只有一个" }
        ]},
        { title: "包管理与第三方库", chapters: [
          { num: 5, title: "包管理工具 vcpkg 入门", mentor: "鲁班", method: "工欲善其事" },
          { num: 6, title: "JSON 处理：jsoncpp 实战", mentor: "柯南", method: "追踪数据流" },
          { num: 7, title: "日志库：从 printf 到 spdlog", mentor: "福尔摩斯", method: "排除不可能" },
          { num: 8, title: "REST 服务：pistache 实战", mentor: "诸葛亮", method: "运筹帷幄" }
        ]},
        { title: "测试与通信", chapters: [
          { num: 9, title: "单元测试：gtest 与覆盖率", mentor: "包青天", method: "铁面无私" },
          { num: 10, title: "远程调用：gRPC 入门", mentor: "达芬奇", method: "艺术与工程" },
          { num: 11, title: "通用库：POCO 集成", mentor: "狄仁杰", method: "系统分析" },
          { num: 12, title: "文档与代码分析：Doxygen", mentor: "福尔摩斯", method: "排除不可能" }
        ]},
        { title: "深入工程实践", chapters: [
          { num: 13, title: "库的集成模式：静态库 / 动态库 / 链接", mentor: "费曼", method: "第一性原理" },
          { num: 14, title: "调试实战：GDB 与断点", mentor: "包青天", method: "铁面无私" },
          { num: 15, title: "性能分析入门", mentor: "诸葛亮", method: "运筹帷幄" },
          { num: 16, title: "生态收尾：工具链全景回顾", mentor: "鲁班", method: "工欲善其事" }
        ]}
      ]
    },
    {
      id: "graphics",
      name: "图像与视觉实战",
      accent: "#8a6d3b",
      desc: "图像与视觉实战教程（格式 / 图像库 / OpenCV / CUDA）",
      tagline: "从像素到视觉：RAW 解析、图像处理库、OpenCV、CUDA 加速，一条吃透服务端图像处理的路径",
      parts: [
        { title: "图像基础与格式", chapters: [
          { num: 1, title: "图像处理全景：像素与资源现状", mentor: "费曼", method: "第一性原理" },
          { num: 2, title: "图像文件格式：从 JPEG/PNG 到 TIFF", mentor: "达芬奇", method: "艺术与工程" },
          { num: 3, title: "相机底片解析：RAW 与 DNG", mentor: "狄仁杰", method: "系统分析" },
          { num: 4, title: "图像元数据：EXIF 与 XMP", mentor: "柯南", method: "追踪数据流" }
        ]},
        { title: "图像处理库实战", chapters: [
          { num: 5, title: "图像库选型全景：六库对比", mentor: "诸葛亮", method: "运筹帷幄" },
          { num: 6, title: "LibRaw：RAW 解码实战", mentor: "鲁班", method: "工欲善其事" },
          { num: 7, title: "libvips：高性能图像处理", mentor: "狄仁杰", method: "系统分析" },
          { num: 8, title: "OpenCV 入门：源码安装", mentor: "鲁班", method: "工欲善其事" }
        ]},
        { title: "计算机视觉与 GPU 加速", chapters: [
          { num: 9, title: "OpenCV 第一个程序与 Mat 核心", mentor: "费曼", method: "第一性原理" },
          { num: 10, title: "特征检测实战：Harris 与 Canny", mentor: "达芬奇", method: "艺术与工程" },
          { num: 11, title: "CUDA 入门：GPU 加速环境", mentor: "鲁班", method: "工欲善其事" },
          { num: 12, title: "CUDA 图像处理：内核与内存模型", mentor: "费曼", method: "第一性原理" }
        ]},
        { title: "深入工程实践", chapters: [
          { num: 13, title: "图像库的依赖与链接排错", mentor: "福尔摩斯", method: "排除不可能" },
          { num: 14, title: "调试实战：版本与崩溃", mentor: "包青天", method: "铁面无私" },
          { num: 15, title: "性能优化：多线程、内存与缓存", mentor: "诸葛亮", method: "运筹帷幄" },
          { num: 16, title: "生态收尾：图像工具链全景回顾", mentor: "达芬奇", method: "融会贯通" }
        ]}
      ]
    },
    {
      id: "cpp-internals",
      name: "C++ 底层原理",
      accent: "#8a5a44",
      desc: "C++ 底层原理教程（编译 / 链接 / 内存 / 对象模型）",
      tagline: "从编译到内存：程序如何被构建、加载与运行，一条吃透 C++ 背后机制的路径",
      parts: [
        { title: "编译与链接", chapters: [
          { num: 1, title: "从源码到可执行文件：编译四阶段全景", mentor: "费曼", method: "第一性原理" },
          { num: 2, title: "手动走一遍编译：-E / -S / -c", mentor: "鲁班", method: "工欲善其事" },
          { num: 3, title: "目标文件与 ELF：可重定位目标文件解剖", mentor: "狄仁杰", method: "系统分析" },
          { num: 4, title: "链接的职责：符号解析与重定位", mentor: "福尔摩斯", method: "排除不可能" },
          { num: 5, title: "库与动态链接：.a / .so / dlopen 插件化", mentor: "鲁班", method: "工欲善其事" }
        ]},
        { title: "内存与数据表示", chapters: [
          { num: 6, title: "虚拟地址空间：进程内存布局全景", mentor: "狄仁杰", method: "系统分析" },
          { num: 7, title: "字节序与数据表示：大小端与基本类型", mentor: "柯南", method: "真相只有一个" },
          { num: 8, title: "整数与浮点数的存储：原码/反码/补码与 IEEE 754", mentor: "费曼", method: "第一性原理" },
          { num: 9, title: "数组与指针：地址计算与指针运算", mentor: "柯南", method: "追踪数据流" }
        ]},
        { title: "C++ 对象的内存模型", chapters: [
          { num: 10, title: "内存对齐：为什么结构体大小不是成员之和", mentor: "达芬奇", method: "艺术与工程" },
          { num: 11, title: "对齐控制实战：#pragma pack 与联合体", mentor: "鲁班", method: "工欲善其事" },
          { num: 12, title: "类的大小：空类、成员函数与虚函数指针", mentor: "包青天", method: "铁面无私" },
          { num: 13, title: "继承体系的内存布局：单继承与多态代价", mentor: "狄仁杰", method: "系统分析" }
        ]},
        { title: "对象生命周期与内存控制", chapters: [
          { num: 14, title: "栈与堆：对象创建的两种方式", mentor: "费曼", method: "第一性原理" },
          { num: 15, title: "限制创建位置：只在堆上 / 只在栈上", mentor: "诸葛亮", method: "运筹帷幄" },
          { num: 16, title: "综合实战：内存控制与安全收尾", mentor: "诸葛亮", method: "融会贯通" }
        ]}
      ]
    },
    {
      id: "ffmpeg",
      name: "FFmpeg 音视频实战",
      accent: "#3f7d76",
      desc: "FFmpeg 音视频处理教程（命令行 / 编译 / GPU 加速 / C API）",
      tagline: "从命令行到 API：转码、滤镜与硬件加速，一条吃透音视频处理管线的路径",
      parts: [
        { title: "入门与命令行", chapters: [
          { num: 1, title: "FFmpeg 全家桶：ffmpeg / ffprobe / ffplay", mentor: "费曼", method: "第一性原理" },
          { num: 2, title: "命令行转码入门：-i / -c / -b / -vf", mentor: "鲁班", method: "工欲善其事" },
          { num: 3, title: "ffprobe 探针：读懂视频的体检报告", mentor: "狄仁杰", method: "系统分析" },
          { num: 4, title: "音视频基础：容器、编码与时间基", mentor: "费曼", method: "第一性原理" }
        ]},
        { title: "源码编译与硬件加速", chapters: [
          { num: 5, title: "源码编译准备：configure / make 流程", mentor: "鲁班", method: "工欲善其事" },
          { num: 6, title: "依赖库逐个击破：x264 / opus / gnutls", mentor: "包青天", method: "铁面无私" },
          { num: 7, title: "启用 GPU 硬编解码：configure 与版本匹配", mentor: "诸葛亮", method: "运筹帷幄" },
          { num: 8, title: "GPU 转码实战与容器部署", mentor: "狄仁杰", method: "系统分析" }
        ]},
        { title: "C API 核心流程", chapters: [
          { num: 9, title: "编码器 API：从打开输出到创建流", mentor: "包青天", method: "铁面无私" },
          { num: 10, title: "编码器配置：参数设置的艺术", mentor: "柯南", method: "追踪数据流" },
          { num: 11, title: "send/receive 模式：告别丢帧", mentor: "福尔摩斯", method: "排除不可能" },
          { num: 12, title: "flush 与时间基：收尾的艺术", mentor: "达芬奇", method: "艺术与工程" },
          { num: 13, title: "自定义 IO：内存与流式输入输出", mentor: "诸葛亮", method: "运筹帷幄" }
        ]},
        { title: "滤镜与工程收尾", chapters: [
          { num: 14, title: "滤镜图原理：buffer → filters → buffersink", mentor: "达芬奇", method: "艺术与工程" },
          { num: 15, title: "视频滤镜实战：水印、缩放与截图", mentor: "福尔摩斯", method: "排除不可能" },
          { num: 16, title: "转码工程全景：把管线串起来", mentor: "柯南", method: "追踪数据流" }
        ]}
      ]
    }
  ]
};
