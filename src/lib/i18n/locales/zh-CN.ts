/**
 * NemoClaw 中文（简体）翻译词条
 *
 * 覆盖 NemoClaw CLI 所有用户可见的字符串，包括：
 * - 命令 summary/description
 * - 帮助文本
 * - 品牌信息
 * - 错误与提示
 */

import type { TranslationMap } from "./types";

export const zh_CN: TranslationMap = {
  // ============================================================
  // 品牌信息
  // ============================================================
  brand: {
    tagline: "一条命令部署更安全、全天候的 AI 助手。",
    poweredBy: "由 NVIDIA OpenShell · Nemotron · Agent Toolkit 提供支持",
    credentialsNote: "凭证已注册到 OpenShell 网关",
    website: "https://www.nvidia.com/nemoclaw",
  },

  // ============================================================
  // 帮助输出
  // ============================================================
  help: {
    uninstallFlags: "卸载选项",
    reconfigure: "重新配置（onboard 之后）",
    checkInference: "检查推理路由",
    changeModel: "更改推理模型",
    addNetworkPresets: "添加网络预设：在沙箱上使用 policy-add 命令",
    changeCredentials: "更改凭证",
    agentConfigNote: "Agent 配置在默认沙箱中可写，以便 {product} 管理运行时状态。",
    durableSettings: "使用主机端命令或重新运行 onboard 来持久化 {product} 设置。",
    lockConfig: "运行 `{cli} <name> shields up` 以锁定配置用于敏感工作负载。",
  },

  // ============================================================
  // 命令组标题
  // ============================================================
  commandGroups: {
    "Getting Started": "快速入门",
    "Sandbox Management": "沙箱管理",
    Skills: "技能",
    "Policy Presets": "策略预设",
    "Messaging Channels": "消息通道",
    "Compatibility Commands": "兼容命令",
    Services: "服务",
    Troubleshooting: "故障排查",
    Credentials: "凭证",
    Backup: "备份",
    Upgrade: "升级",
    Resources: "资源",
    Cleanup: "清理",
  },

  // ============================================================
  // 命令描述
  // ============================================================
  commands: {
    // 全局命令
    "onboard": {
      summary: "配置推理终端和凭证",
      description: "配置推理、凭证和沙箱设置。",
    },
    "list": {
      summary: "列出所有沙箱",
      description: "列出所有注册的沙箱，包含模型、提供商和策略预设。",
    },
    "backup-all": {
      summary: "升级前备份所有沙箱状态",
      description: "升级前备份已注册、运行中的沙箱状态。",
    },
    "status": {
      summary: "显示沙箱列表和服务状态",
      description: "显示注册的沙箱、实时推理、服务和消息通道健康状态。",
    },
    "update": {
      summary: "运行 {display} 安装器更新流程",
      description: "检查 {display} CLI 更新并运行维护的安装器流程。",
    },
    "uninstall": {
      summary: "运行卸载脚本",
      description: "运行本地 uninstall.sh 脚本；远程回退已禁用。",
    },
    "setup": {
      summary: "已弃用别名：nemoclaw onboard",
      description: "onboard 的已弃用别名。",
    },
    "setup-spark": {
      summary: "已弃用别名：nemoclaw onboard",
      description: "onboard 的已弃用别名。",
    },
    "start": {
      summary: "已弃用别名：tunnel start",
      description: "tunnel start 的已弃用别名。",
    },
    "stop": {
      summary: "已弃用别名：tunnel stop",
      description: "tunnel stop 的已弃用别名。",
    },
    "upgrade-sandboxes": {
      summary: "检测并重建过时的沙箱",
      description: "检测过时的沙箱并可选择重建它们。",
    },
    credentials: {
      summary: "管理提供商凭证",
      description: "列出或重置在 OpenShell 网关注册的提供商凭证。",
    },
    "credentials list": {
      summary: "列出提供商凭证",
      description: "列出在 OpenShell 网关注册的提供商凭证。",
    },
    "credentials reset": {
      summary: "重置提供商凭证",
      description: "重置在 OpenShell 网关注册的提供商凭证。",
    },
    "inference get": {
      summary: "获取推理配置",
      description: "获取当前推理配置。",
    },
    "inference set": {
      summary: "设置推理配置",
      description: "设置推理模型和提供商。",
    },
    tunnel: {
      summary: "管理 cloudflared 公网 URL 隧道",
      description: "管理默认沙箱面板的 cloudflared 公网 URL 隧道。",
    },
    "tunnel start": {
      summary: "启动 cloudflared 公网 URL 隧道",
      description: "启动默认沙箱面板的 cloudflared 公网 URL 隧道。",
    },
    "tunnel stop": {
      summary: "停止 cloudflared 公网 URL 隧道",
      description: "停止默认沙箱面板的 cloudflared 公网 URL 隧道。",
    },

    // 沙箱命令
    "sandbox": {
      summary: "沙箱操作",
      description: "沙箱管理操作。",
    },
    "sandbox connect": {
      summary: "连接到沙箱",
      description: "通过 SSH 连接到运行中的沙箱。",
    },
    "sandbox destroy": {
      summary: "销毁沙箱",
      description: "销毁一个沙箱及其所有数据。",
    },
    "sandbox doctor": {
      summary: "诊断沙箱和网关健康状态",
      description: "运行主机、网关、沙箱、推理、消息和本地服务诊断。",
    },
    "sandbox rebuild": {
      summary: "升级沙箱到当前 Agent 版本",
      description: "使用当前 Agent 镜像备份、重建和恢复沙箱。",
    },
    "sandbox recover": {
      summary: "重启沙箱网关和面板端口转发",
      description: "重启沙箱网关和面板端口转发。",
    },
    "sandbox status": {
      summary: "沙箱健康和 NIM 状态",
      description: "显示沙箱健康、OpenShell 网关状态和本地 NIM 状态。",
    },
    "sandbox config get": {
      summary: "获取沙箱配置",
      description: "获取沙箱配置值。",
    },
    "sandbox config set": {
      summary: "设置沙箱配置",
      description: "设置沙箱配置值。",
    },
    "sandbox snapshot": {
      summary: "显示快照用法",
      description: "显示 create、list 和 restore 子命令的快照用法。",
    },
    "sandbox snapshot create": {
      summary: "创建沙箱状态快照",
      description: "创建沙箱工作区状态的自动版本化快照。",
    },
    "sandbox snapshot list": {
      summary: "列出可用快照",
      description: "列出沙箱的可用快照。",
    },
    "sandbox snapshot restore": {
      summary: "从快照恢复状态",
      description: "从快照恢复沙箱工作区状态。",
    },
    "sandbox shields": {
      summary: "安全防护管理",
      description: "管理沙箱安全防护。",
    },
    "sandbox shields up": {
      summary: "升起沙箱安全防护",
      description: "从保存的快照恢复沙箱防护。",
    },
    "sandbox shields down": {
      summary: "降低沙箱安全防护",
      description: "临时降低沙箱防护。",
    },
    "sandbox shields status": {
      summary: "显示当前防护状态",
      description: "显示当前沙箱防护状态。",
    },
    "sandbox share": {
      summary: "通过 SSHFS 挂载/卸载沙箱文件系统到主机",
      description: "使用 OpenShell SSH 代理的 SSHFS 在主机和沙箱之间共享文件。",
    },
    "sandbox share mount": {
      summary: "在主机上挂载沙箱文件系统",
      description: "使用 SSHFS 通过 OpenShell 的 SSH 代理在主机上挂载沙箱路径。",
    },
    "sandbox share unmount": {
      summary: "卸载共享的沙箱文件系统",
      description: "从主机卸载之前挂载的沙箱文件系统。",
    },
    "sandbox share status": {
      summary: "显示沙箱共享挂载状态",
      description: "检查沙箱文件系统共享当前是否在主机上挂载。",
    },
    "sandbox sessions": {
      summary: "列出沙箱中的会话",
      description: "列出沙箱中的 OpenClaw 对话会话。",
    },
    "sandbox sessions list": {
      summary: "列出沙箱中的会话",
      description: "列出沙箱中的 OpenClaw 对话会话。",
    },
    "sandbox sessions reset": {
      summary: "通过网关重置会话",
      description: "通过网关重置 OpenClaw 对话会话。",
    },
    "sandbox sessions delete": {
      summary: "通过网关删除会话",
      description: "通过网关删除 OpenClaw 对话会话。",
    },
    "sandbox policy": {
      summary: "策略管理",
      description: "管理沙箱策略预设。",
    },
    "sandbox policy list": {
      summary: "列出策略预设",
      description: "列出沙箱的策略预设。",
    },
    "sandbox policy add": {
      summary: "添加策略预设",
      description: "向沙箱添加策略预设。",
    },
    "sandbox policy remove": {
      summary: "移除策略预设",
      description: "从沙箱移除策略预设。",
    },
    "sandbox skill": {
      summary: "显示技能命令用法",
      description: "显示技能安装/移除用法或报告未知技能子命令。",
    },
    "sandbox skill install": {
      summary: "部署技能目录到沙箱",
      description: "验证本地 SKILL.md 目录并上传到运行中的沙箱。",
    },
    "sandbox skill remove": {
      summary: "从沙箱移除已安装的技能",
      description: "从运行中的沙箱移除已安装的 SKILL.md Agent 技能。",
    },
    "sandbox agents": {
      summary: "管理子 Agent",
      description: "管理沙箱子 Agent。",
    },
    "sandbox agents add": {
      summary: "添加子 Agent",
      description: "向沙箱添加子 Agent。",
    },
    "sandbox channels": {
      summary: "管理消息通道",
      description: "管理沙箱消息通道。",
    },
    "sandbox channels add": {
      summary: "添加消息通道",
      description: "向沙箱添加消息通道。",
    },

    // 内部命令
    gc: {
      summary: "垃圾回收",
      description: "清理未使用的 Docker 镜像和资源。",
    },
    deploy: {
      summary: "部署",
      description: "部署沙箱实例。",
    },
    resources: {
      summary: "显示资源使用情况",
      description: "显示沙箱资源使用情况。",
    },
    debug: {
      summary: "调试模式",
      description: "运行调试诊断。",
    },
  },

  // ============================================================
  // 通用消息
  // ============================================================
  common: {
    yes: "是",
    no: "否",
    confirm: "确认",
    cancel: "取消",
    skip: "跳过",
    done: "完成",
    error: "错误",
    warning: "警告",
    info: "信息",
    loading: "加载中...",
    success: "成功",
    failed: "失败",
    unknown: "未知",
    none: "无",
    enabled: "已启用",
    disabled: "已禁用",
    running: "运行中",
    stopped: "已停止",
    healthy: "健康",
    unhealthy: "不健康",
    online: "在线",
    offline: "离线",
    deprecated: "已弃用",
    required: "必填",
    optional: "可选",
    default: "默认",
    custom: "自定义",
    auto: "自动",
    manual: "手动",
    version: "版本",
    name: "名称",
    status: "状态",
    provider: "提供商",
    model: "模型",
    sandbox: "沙箱",
    agent: "智能体",
    gateway: "网关",
    inference: "推理",
    credential: "凭证",
    policy: "策略",
    skill: "技能",
    channel: "通道",
    session: "会话",
    snapshot: "快照",
    backup: "备份",
    restore: "恢复",
    rebuild: "重建",
    connect: "连接",
    disconnect: "断开",
    mount: "挂载",
    unmount: "卸载",
    install: "安装",
    remove: "移除",
    create: "创建",
    delete: "删除",
    update: "更新",
    upgrade: "升级",
    reset: "重置",
    start: "启动",
    stop: "停止",
    restart: "重启",
    pause: "暂停",
    resume: "恢复",
    onboard: "初始化",
    "no-ollama-autostart": "跳过 Ollama 自动启动的向导",
    gpu: "GPU",
    "non-interactive": "非交互模式",
    "recreate-sandbox": "删除并重建现有沙箱",
    "control-ui-port": "本地控制 UI 的主机端口",
  },
};