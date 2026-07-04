# NemoClaw macOS Desktop

YYC³ NemoClaw 的 macOS 原生桌面应用。

## 功能

- 🔹 **菜单栏图标** — 系统托盘常驻，沙箱状态一目了然
- 🔹 **Dashbboard 内嵌** — WKWebView 直接加载 OpenClaw Gateway 面板
- 🔹 **SSH 隧道管理** — 一键开启/关闭到 DGX 的隧道
- 🔹 **状态监控** — 沙箱健康、Gateway 版本、模型名称实时显示
- 🔹 **模型管理** — 查看所有可用模型（本地 + 远程）
- 🔹 **预认证 Dashboard** — Token 注入实现免登录访问

## 构建

```bash
# Debug 构建
./build.sh

# Release 构建
./build.sh release

# 构建并启动
./build.sh run
```

## 系统要求

- macOS 15 (Sequoia) 或更高
- Apple Silicon (M 系列) 或 Intel
- NemoClaw CLI 已安装（`/opt/homebrew/bin/nemoclaw`）
- SSH 可访问 DGX（`yyc3-n1`）

## 技术栈

- SwiftUI 6 + WKWebView
- 原生 macOS 菜单栏应用 (MenuBarExtra)
- Process 管理 SSH 隧道及 NemoClaw CLI
