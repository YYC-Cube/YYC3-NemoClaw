#!/usr/bin/env bash
# SPDX-FileCopyrightText: Copyright (c) 2026 YYC³ Team
# SPDX-License-Identifier: MIT
#
# YYC³ i18n 服务启动脚本
#
# 在 OpenShell 沙箱启动时运行：
#   1. 将 MCP Server 配置注入 openclaw.json
#   2. 启动 AI 翻译引擎（作为后台服务）  
#
# 前提条件：
#   - Node.js ≥ 22（sandbox 镜像已满足）
#   - @yyc3/i18n-core 已安装（作为 NemoClaw 的本地依赖）
#
# 环境变量：
#   I18N_OLLAMA_ENDPOINT  Ollama API 地址（默认 http://127.0.0.1:11434）
#   I18N_OLLAMA_MODEL     翻译模型（默认 qwen3.6:35b-a3b）
#   I18N_DEBUG             设为 1 启用调试日志
#   I18N_SKIP_MCP          设为 1 跳过 MCP Server 启动
#
# === 安全设计 ===
# - 仅在 /sandbox/.openclaw 下操作（writable sandbox config dir）
# - 不触碰 /tmp/system 边界文件
# - 所有输出 → stderr（不影响 MCP stdio 传输层）
# - 进程以 sandbox 用户运行

set -euo pipefail

# ── 配置 ──────────────────────────────────────────────────────
I18N_SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OPENCLAW_CONFIG="/sandbox/.openclaw/openclaw.json"
MCP_SERVER_SCRIPT="${I18N_SCRIPT_DIR}/start-i18n-mcp-server.mjs"

# 检查是否应跳过
[ "${I18N_SKIP_MCP:-}" = "1" ] && exit 0

# ── 1. 注入 MCP Server 配置到 openclaw.json ────────────────
if [ -f "$OPENCLAW_CONFIG" ] && [ -x "$(command -v node)" ]; then
  echo "[i18n] Injecting MCP server config into openclaw.json..." >&2

  # 使用 Node.js 安全地修改 JSON（避免 sed 破坏 JSON 结构）
  node -e "
  const fs = require('fs');
  const path = '$OPENCLAW_CONFIG';
  let cfg;
  try {
    cfg = JSON.parse(fs.readFileSync(path, 'utf-8'));
  } catch {
    console.error('[i18n] Cannot read/openclaw.json, skipping MCP injection');
    process.exit(0);
  }

  // 添加 MCP Server 定义
  const mcpServer = {
    'yyc3-i18n': {
      command: 'node',
      args: ['$MCP_SERVER_SCRIPT'],
      env: {
        I18N_OLLAMA_ENDPOINT: process.env.I18N_OLLAMA_ENDPOINT || 'http://127.0.0.1:11434',
        I18N_OLLAMA_MODEL: process.env.I18N_OLLAMA_MODEL || 'qwen3.6:35b-a3b',
        I18N_DEBUG: process.env.I18N_DEBUG || '',
      },
    },
  };

  // Ensure mcpServers key exists
  cfg.mcpServers = { ...(cfg.mcpServers || {}), ...mcpServer };

  fs.writeFileSync(path, JSON.stringify(cfg, null, 2) + '\n');
  console.log('[i18n] MCP server config injected: yyc3-i18n');
  " 2>&1 | while IFS= read -r line; do echo "[i18n] $line" >&2; done

else
  echo "[i18n] Skipping MCP injection: config=$OPENCLAW_CONFIG exists=$([ -f "$OPENCLAW_CONFIG" ] && echo yes || echo no)" >&2
fi

# ── 2. 验证 MCP Server 脚本可执行 ──────────────────────────
if [ -f "$MCP_SERVER_SCRIPT" ]; then
  echo "[i18n] MCP server script found: $MCP_SERVER_SCRIPT" >&2
  node -e "
    try {
      const m = require('$MCP_SERVER_SCRIPT');
      console.log('[i18n] Module loads OK');
    } catch(e) {
      // ESM 模块不能 require，用 import 检查
      import('file://$MCP_SERVER_SCRIPT').then(() => {
        console.log('[i18n] ESM module loads OK');
      }).catch(e => {
        console.error('[i18n] Module load failed:', e.message);
      });
    }
  " 2>&1 | while IFS= read -r line; do echo "[i18n] $line" >&2; done || true
else
  echo "[i18n] WARNING: MCP server script not found at $MCP_SERVER_SCRIPT" >&2
fi

echo "[i18n] YYC³ i18n services initialized. MCP server will be spawned by OpenClaw on demand." >&2
