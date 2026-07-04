type Locale = "en" | "zh-CN" | "zh-TW" | "ja" | "ko" | "fr" | "de" | "es" | "pt-BR" | "ar";

type I18nContext = {
    locale: Locale;
    key: string;
    params?: Record<string, string>;
    result?: string;
};
type I18nPlugin = {
    name: string;
    version?: string;
    init?: (context: I18nContext) => void | Promise<void>;
    destroy?: () => void | Promise<void>;
    beforeTranslate?: (key: string, params?: Record<string, string>) => {
        key: string;
        params?: Record<string, string>;
    } | void;
    afterTranslate?: (result: string, key: string, params?: Record<string, string>) => string | void;
    onLocaleChange?: (newLocale: Locale, oldLocale: Locale) => void;
    onError?: (error: Error, context: I18nContext) => void;
    onMissingKey?: (key: string, locale: Locale) => string | void;
};

/**
 * file console-logger.ts
 * description 控制台日志插件
 * module @yyc3/i18n-core
 * author YanYuCloudCube Team <admin@0379.email>
 * version 2.3.0
 * created 2026-04-24
 * updated 2026-04-24
 * status active
 * tags [module],[plugin]
 *
 * copyright YanYuCloudCube Team
 * license MIT
 *
 * brief 控制台日志插件
 */

interface ConsoleLoggerConfig {
    logTranslations?: boolean;
    logMissingKeys?: boolean;
    logLocaleChanges?: boolean;
    logPerformance?: boolean;
    colors?: {
        translate?: string;
        missing?: string;
        localeChange?: string;
        performance?: string;
    };
}
declare function createConsoleLogger(config?: ConsoleLoggerConfig): I18nPlugin;

interface MissingKeyEntry {
    key: string;
    locale: Locale;
    timestamp: number;
    count: number;
}
interface MissingKeyReporterConfig {
    maxEntries?: number;
    autoExport?: boolean;
    exportInterval?: number;
    onReport?: (entries: MissingKeyEntry[]) => void;
}
declare class MissingKeyReporter {
    private entries;
    private config;
    private exportTimer?;
    constructor(config?: MissingKeyReporterConfig);
    createPlugin(): I18nPlugin;
    getMissingKeys(): MissingKeyEntry[];
    getUniqueMissingCount(): number;
    getTotalMisses(): number;
    getByLocale(locale: Locale): MissingKeyEntry[];
    generateReport(): string;
    clear(): void;
    exportJSON(): string;
    private startAutoExport;
    stopAutoExport(): void;
    destroy(): void;
}

/**
 * file performance-tracker.ts
 * description 性能追踪插件
 * module @yyc3/i18n-core
 * author YanYuCloudCube Team <admin@0379.email>
 * version 2.3.0
 * created 2026-04-24
 * updated 2026-04-24
 * status active
 * tags [module],[plugin]
 *
 * copyright YanYuCloudCube Team
 * license MIT
 *
 * brief 性能追踪插件
 */

interface PerformanceEntry {
    key: string;
    duration: number;
    timestamp: number;
    cached: boolean;
}
interface PerformanceMetrics {
    totalCalls: number;
    cacheHits: number;
    cacheMisses: number;
    averageDuration: number;
    maxDuration: number;
    slowTranslations: PerformanceEntry[];
}
interface PerformanceTrackerConfig {
    slowThreshold?: number;
    maxSlowEntries?: number;
    samplingRate?: number;
}
declare class PerformanceTracker {
    private entries;
    private config;
    private timingMap;
    constructor(config?: PerformanceTrackerConfig);
    createPlugin(): I18nPlugin;
    private trackSlowTranslation;
    getMetrics(): PerformanceMetrics;
    getCacheHitRate(): number;
    getPercentile(percentile: number): number;
    generateReport(): string;
    clear(): void;
    exportJSON(): string;
}

export { type ConsoleLoggerConfig, MissingKeyReporter, type MissingKeyReporterConfig, type PerformanceMetrics, PerformanceTracker, type PerformanceTrackerConfig, createConsoleLogger };
