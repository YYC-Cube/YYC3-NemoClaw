/**
 * NemoClaw i18n 国际化模块
 *
 * 基于 @yyc3/i18n-core 引擎的轻量封装，提供：
 * - 自动系统语言检测（中文/英文）
 * - 翻译函数 t() 及 tGroup()/tCommand() 便捷方法
 * - 语言切换能力
 *
 * 使用方式：
 *   import { t, isChineseLocale } from "../../lib/i18n";
 *   console.log(t("brand.tagline"));
 *
 * 特性：
 *   - 复用 @yyc3/i18n-core 引擎（LRU 缓存、插件系统、ICU 格式化）
 *   - 自动从 LANG/LC_ALL 环境变量检测语言
 *   - 支持嵌套键名（如 "help.reconfigure"）
 *   - 支持插值参数（如 "你好 {name}"）
 *   - 回退机制：缺失键按 当前语言→英文→fallback 参数→键名 顺序降级
 */

import type { Locale } from "@yyc3/i18n-core";
import { I18nEngine } from "@yyc3/i18n-core";
import { en } from "./locales/en";
import { zh_CN } from "./locales/zh-CN";

// ============================================================
// 初始化引擎
// ============================================================

/** 获取当前语言 — 映射 @yyc3/i18n-core 的 Locale 为通用 Locale 类型 */
export type { Locale } from "@yyc3/i18n-core";

const PREFERRED_LOCALE: Locale = isChineseEnv() ? "zh-CN" : "en";

// 创建引擎时不传 locale（默认 en），避免构造器异步加载框架内置词条覆盖我们的自定义词条
const engine = new I18nEngine({ cache: { enabled: true, maxSize: 500 } });

// 先注册 NemoClaw 自有翻译词条
engine.registerTranslation("en", en);
engine.registerTranslation("zh-CN", zh_CN);

// 再设置目标 locale — 此时词条已注册，引擎跳过异步懒加载，同步完成
if (PREFERRED_LOCALE !== "en") {
  void engine.setLocale(PREFERRED_LOCALE);
}

// ============================================================
// 语言检测
// ============================================================

/**
 * 检测是否为中文环境（基于环境变量）
 */
export function isChineseLocale(): boolean {
  return isChineseEnv();
}

function isChineseEnv(): boolean {
  const lang = process.env.LANG || process.env.LC_ALL || process.env.LC_MESSAGES || "";
  return /^zh/i.test(lang);
}

/**
 * 检测当前系统语言并返回标准 locale 代码
 */
export function detectSystemLocale(): Locale {
  return isChineseEnv() ? "zh-CN" : "en";
}

// ============================================================
// 语言切换
// ============================================================

/**
 * 获取当前语言
 */
export function getLocale(): Locale {
  return engine.getLocale() as Locale;
}

/**
 * 设置当前语言（异步加载翻译）
 */
export async function setLocale(locale: Locale): Promise<void> {
  await engine.setLocale(locale);
}

// ============================================================
// 翻译函数
// ============================================================

/**
 * 翻译函数
 *
 * @param key - 翻译键名，支持点号分隔的嵌套路径（如 "brand.tagline"）
 * @param params - 插值参数，如 { name: "张三" }
 * @param fallback - 找不到翻译时的回退值
 * @returns 翻译后的字符串
 *
 * @example
 *   t("brand.tagline")
 *   t("help.agentConfigNote", { product: "NemoClaw" })
 *   t("unknown.key", {}, "默认值")
 */
export function t(
  key: string,
  params?: Record<string, string | number>,
  fallback?: string,
): string {
  // 转换为引擎所需的 Record<string, string>
  const strParams =
    params && Object.keys(params).length > 0
      ? Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
      : undefined;

  const result = engine.t(key, strParams);

  // 引擎返回键名自身 = 未找到翻译 → 使用显式 fallback
  if (result === key && fallback !== undefined) {
    return fallback;
  }

  return result;
}

/**
 * 获取命令组的中文名称
 */
export function tGroup(group: string): string {
  return t(`commandGroups.${group}`, {}, group);
}

/**
 * 获取命令描述
 */
export function tCommand(
  commandId: string,
  field: "summary" | "description",
  fallback: string,
): string {
  return t(`commands.${commandId}.${field}`, {}, fallback);
}

/**
 * 获取命令 summary（便捷方法）
 */
export function tSummary(commandId: string, fallback: string): string {
  return tCommand(commandId, "summary", fallback);
}

/**
 * 获取命令 description（便捷方法）
 */
export function tDescription(commandId: string, fallback: string): string {
  return tCommand(commandId, "description", fallback);
}

/**
 * 检查翻译键是否存在
 */
export function hasKey(key: string): boolean {
  const result = engine.t(key);
  return result !== key;
}
