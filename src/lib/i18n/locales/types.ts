/**
 * NemoClaw i18n 类型定义
 *
 * 基于 @yyc3/i18n-core 的类型系统，确保与引擎兼容。
 * 翻译词条为嵌套对象，叶节点为字符串。
 */

/** 翻译词条映射表（递归：键映射到字符串或子映射表） */
export type TranslationMap = {
  [key: string]: string | TranslationMap;
};
