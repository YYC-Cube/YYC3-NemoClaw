/**
 * NemoClaw 英文翻译词条（默认语言）
 *
 * 所有英文原文保持不变，作为 i18n 键的默认值。
 * 当未检测到中文环境时，直接返回英文原文。
 */

import type { TranslationMap } from "./types";

export const en: TranslationMap = {
  brand: {
    tagline: "Deploy more secure, always-on AI assistants with a single command.",
    poweredBy: "Powered by NVIDIA OpenShell · Nemotron · Agent Toolkit",
    credentialsNote: "Credentials registered with the OpenShell gateway",
    website: "https://www.nvidia.com/nemoclaw",
  },

  help: {
    uninstallFlags: "Uninstall flags",
    reconfigure: "Reconfiguration (after onboard)",
    checkInference: "Check inference route",
    changeModel: "Change inference model",
    addNetworkPresets: "Add network presets",
    changeCredentials: "Change credentials",
    agentConfigNote: "Agent config is writable in the default sandbox so {product} can manage runtime state.",
    durableSettings: "Use host-side commands or re-run onboard for durable {product} settings.",
    lockConfig: "Run `{cli} <name> shields up` to lock config for sensitive workloads.",
  },

  commandGroups: {
    "Getting Started": "Getting Started",
    "Sandbox Management": "Sandbox Management",
    Skills: "Skills",
    "Policy Presets": "Policy Presets",
    "Messaging Channels": "Messaging Channels",
    "Compatibility Commands": "Compatibility Commands",
    Services: "Services",
    Troubleshooting: "Troubleshooting",
    Credentials: "Credentials",
    Backup: "Backup",
    Upgrade: "Upgrade",
    Resources: "Resources",
    Cleanup: "Cleanup",
  },

  commands: {},
  common: {},
};