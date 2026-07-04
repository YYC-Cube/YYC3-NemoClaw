#!/usr/bin/env node
/**
 * YYC³ i18n MCP Server — OpenClaw Agent 翻译技能入口
 *
 * 基于 @yyc3/i18n-core 提供 MCP (Model Context Protocol) 翻译工具集，
 * 供 OpenClaw Agent 通过 stdio 传输层直接调用。
 *
 * 工具能力：
 *   1. translate_key       — 查询已有翻译词条
 *   2. search_translations — 模糊搜索翻译键/值
 *   3. ai_translate        — 通过 qwen3.6:35b-a3b 进行 LLM 翻译
 *   4. estimate_quality    — 评估翻译质量
 *   5. detect_locale       — 检测语言环境
 *   6. list_locales        — 列出支持的语言
 *
 * 启动方式：
 *   作为 OpenClaw MCP Server 自动被 spawn（通过 openclaw.json 的 mcpServers）
 *   或手动测试：echo '{"jsonrpc":"2.0","id":1,"method":"ping"}' | node scripts/start-i18n-mcp-server.js
 *
 * @module @yyc3/i18n-core/scripts
 * @author YYC³ Team
 */

import { I18nEngine, MCPServer, OllamaProvider, QualityEstimator, registerI18nTools, StdioTransport } from "@yyc3/i18n-core";

// ============================================================
// 配置 — 可通过环境变量覆盖
// ============================================================

const OLLAMA_ENDPOINT = process.env.I18N_OLLAMA_ENDPOINT || "http://127.0.0.1:11434";
const OLLAMA_MODEL = process.env.I18N_OLLAMA_MODEL || "qwen3.6:35b-a3b";
const FALLBACK_MODEL = process.env.I18N_FALLBACK_MODEL || "qwen3.6:35b-a3b";
const MCP_SERVER_NAME = process.env.I18N_MCP_SERVER_NAME || "yyc3-i18n";
const MCP_SERVER_VERSION = process.env.I18N_MCP_SERVER_VERSION || "1.0.0";

// ============================================================
// 初始化引擎
// ============================================================

const engine = new I18nEngine({
  cache: { enabled: true, maxSize: 500 },
  locale: "en",
  debug: process.env.I18N_DEBUG === "1",
});

// ============================================================
// 初始化 AI 翻译提供者
// ============================================================

let aiProvider = null;
let qualityEstimator = null;
let providerReady = false;

async function initAIProvider() {
  if (providerReady) return;

  aiProvider = new OllamaProvider({
    baseUrl: OLLAMA_ENDPOINT,
    defaultModel: OLLAMA_MODEL,
  });

  qualityEstimator = new QualityEstimator({ passThreshold: 75 });

  try {
    await aiProvider.initialize();
    providerReady = true;
    console.error(`[i18n-mcp] AI provider ready: ${OLLAMA_MODEL} @ ${OLLAMA_ENDPOINT}`);
  } catch (err) {
    console.error(`[i18n-mcp] AI provider unavailable (Ollama?): ${err.message}`);
    console.error(`[i18n-mcp] Translation tools will fall back to dictionary mode`);
  }
}

// ============================================================
// 创建 MCP Server
// ============================================================

const transport = new StdioTransport();
const server = new MCPServer({
  name: MCP_SERVER_NAME,
  version: MCP_SERVER_VERSION,
  transport,
  capabilities: { tools: true },
});

// ── 注册 @yyc3/i18n-core 标准翻译工具 ──
registerI18nTools(server, engine);

// ── 注册 AI 翻译工具（LLM 驱动） ──
server.registerTool(
  {
    name: "ai_translate",
    description: "使用 AI 模型进行文本翻译（源语言 → 目标语言）",
    inputSchema: {
      type: "object",
      properties: {
        text: { type: "string", description: "待翻译的文本" },
        sourceLocale: { type: "string", description: "源语言代码（如 en, zh-CN）" },
        targetLocale: { type: "string", description: "目标语言代码（如 zh-CN, en）" },
        context: { type: "string", description: "可选的上下文信息，帮助提高翻译质量" },
        style: {
          type: "string",
          description: "翻译风格",
          enum: ["formal", "informal", "technical"],
        },
      },
      required: ["text", "sourceLocale", "targetLocale"],
    },
  },
  async (args) => {
    await initAIProvider();
    if (!providerReady || !aiProvider) {
      // Fallback: use dictionary translation
      const result = engine.t(args.text);
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            translatedText: result,
            qualityScore: 50,
            provider: "dictionary",
            model: "built-in",
            cached: false,
            warning: "AI provider unavailable, used dictionary fallback",
          }, null, 2),
        }],
      };
    }

    try {
      const response = await aiProvider.translate({
        sourceText: String(args.text),
        sourceLocale: String(args.sourceLocale),
        targetLocale: String(args.targetLocale),
        context: args.context ? String(args.context) : undefined,
        style: args.style,
      });

      return {
        content: [{
          type: "text",
          text: JSON.stringify(response, null, 2),
        }],
      };
    } catch (err) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            error: err.message,
            translatedText: String(args.text),
            qualityScore: 0,
            provider: "error",
            model: "none",
            cached: false,
          }, null, 2),
        }],
      };
    }
  },
);

server.registerTool(
  {
    name: "estimate_quality",
    description: "评估翻译质量并返回分数和问题列表",
    inputSchema: {
      type: "object",
      properties: {
        sourceText: { type: "string", description: "原文" },
        translatedText: { type: "string", description: "译文" },
        sourceLocale: { type: "string", description: "源语言" },
        targetLocale: { type: "string", description: "目标语言" },
      },
      required: ["sourceText", "translatedText", "sourceLocale", "targetLocale"],
    },
  },
  async (args) => {
    if (!qualityEstimator) {
      qualityEstimator = new QualityEstimator({ passThreshold: 75 });
    }

    const result = qualityEstimator.estimate({
      sourceText: String(args.sourceText),
      translatedText: String(args.translatedText),
      sourceLocale: String(args.sourceLocale),
      targetLocale: String(args.targetLocale),
    });

    return {
      content: [{
        type: "text",
        text: JSON.stringify(result, null, 2),
      }],
    };
  },
);

server.registerTool(
  {
    name: "detect_locale",
    description: "检测文本的语言环境",
    inputSchema: {
      type: "object",
      properties: {
        text: { type: "string", description: "待检测的文本" },
      },
      required: ["text"],
    },
  },
  async (args) => {
    const text = String(args.text);
    const chineseChars = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
    const japaneseChars = (text.match(/[\u3040-\u309f\u30a0-\u30ff]/g) || []).length;
    const koreanChars = (text.match(/[\uac00-\ud7af]/g) || []).length;
    const latinChars = (text.match(/[a-zA-Z]/g) || []).length;
    const totalChars = text.length || 1;

    const result = {
      detectedLocale: "en",
      confidence: 0,
      scores: /** @type {Record<string, number>} */ ({}),
    };

    result.scores.zh = chineseChars / totalChars;
    result.scores.ja = japaneseChars / totalChars;
    result.scores.ko = koreanChars / totalChars;
    result.scores.en = latinChars / totalChars;

    const entries = Object.entries(result.scores).sort((a, b) => b[1] - a[1]);
    if (entries.length > 0) {
      result.detectedLocale = entries[0][0];
      result.confidence = entries[0][1];
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify(result, null, 2),
      }],
    };
  },
);

server.registerTool(
  {
    name: "list_locales",
    description: "列出所有支持的语言",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  async () => {
    const locales = {
      supported: ["en", "zh-CN", "zh-TW", "ja", "ko", "fr", "de", "es", "pt-BR", "ar"],
      default: engine.getLocale(),
      loaded: engine.getStats().loadedLocales,
      names: {
        en: "English",
        "zh-CN": "简体中文",
        "zh-TW": "繁體中文",
        ja: "日本語",
        ko: "한국어",
        fr: "Français",
        de: "Deutsch",
        es: "Español",
        "pt-BR": "Português (Brasil)",
        ar: "العربية",
      },
    };

    return {
      content: [{
        type: "text",
        text: JSON.stringify(locales, null, 2),
      }],
    };
  },
);

// ============================================================
// 启动服务器
// ============================================================

// 异步初始化 AI provider（失败不阻塞启动）
initAIProvider().catch(() => { });

server.start().then(() => {
  console.error(`[i18n-mcp] YYC³ i18n MCP Server running (stdio transport)`);
  console.error(`[i18n-mcp] Tools: ${server.getTools().map(t => t.name).join(", ")}`);
  if (process.env.I18N_OLLAMA_ENDPOINT) {
    console.error(`[i18n-mcp] Ollama: ${OLLAMA_MODEL} @ ${OLLAMA_ENDPOINT}`);
  }
}).catch((err) => {
  console.error(`[i18n-mcp] Failed to start: ${err.message}`);
  process.exit(1);
});
