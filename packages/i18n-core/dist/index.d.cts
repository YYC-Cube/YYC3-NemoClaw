import { Readable, Writable } from 'node:stream';

interface CacheConfig {
    maxSize?: number;
    defaultTTL?: number;
    enabled?: boolean;
}
interface CacheStats {
    size: number;
    maxSize: number;
    hits: number;
    misses: number;
    hitRate: number;
    evictions: number;
}
declare class LRUCache<T> {
    private cache;
    private hits;
    private misses;
    private evictions;
    readonly config: Required<CacheConfig>;
    constructor(config?: CacheConfig);
    get(key: string): T | null;
    set(key: string, value: T, ttl?: number): void;
    has(key: string): boolean;
    delete(key: string): boolean;
    clear(): void;
    getStats(): CacheStats;
    keys(): string[];
    values(): T[];
}

/**
 * file types.ts
 * description @yyc3/i18n-core 类型定义
 * module @yyc3/i18n-core
 * author YanYuCloudCube Team <admin@0379.email>
 * version 2.3.0
 * created 2026-04-24
 * updated 2026-04-24
 * status active
 * tags [module]
 *
 * copyright YanYuCloudCube Team
 * license MIT
 *
 * brief @yyc3/i18n-core 类型定义
 */
type TranslationMap = {
    [key: string]: string | TranslationMap;
};
type Locale = "en" | "zh-CN" | "zh-TW" | "ja" | "ko" | "fr" | "de" | "es" | "pt-BR" | "ar";
type RTLLocale = Extract<Locale, "ar">;
type TextDirection = "ltr" | "rtl" | "auto";
type HorizontalAlignment = "left" | "right";
type SpacingProperty = "marginLeft" | "marginRight" | "paddingLeft" | "paddingRight";

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
declare class PluginManager {
    private plugins;
    private hookOrder;
    register(plugin: I18nPlugin): void;
    unregister(name: string): boolean;
    getPlugin(name: string): I18nPlugin | undefined;
    getRegisteredPlugins(): string[];
    initAll(context: I18nContext): Promise<void>;
    destroyAll(): Promise<void>;
    executeBeforeTranslate(key: string, params?: Record<string, string>): {
        key: string;
        params?: Record<string, string>;
    };
    executeAfterTranslate(result: string, key: string, params?: Record<string, string>): string;
    notifyLocaleChange(newLocale: Locale, oldLocale: Locale): void;
    handleError(error: Error, context: I18nContext): void;
    handleMissingKey(key: string, locale: Locale): string | undefined;
}

type Subscriber = (locale: Locale) => void;
interface I18nEngineConfig {
    locale?: Locale;
    fallbackLocale?: Locale;
    cache?: {
        enabled?: boolean;
        maxSize?: number;
        ttl?: number;
    };
    debug?: boolean;
    onError?: (error: Error, context: {
        key: string;
        locale: Locale;
    }) => void;
    missingKeyHandler?: (key: string, locale: Locale) => string;
}
declare class I18nEngine {
    private state;
    private subscribers;
    readonly cache: LRUCache<string>;
    readonly plugins: PluginManager;
    private debugMode;
    private errorHandler?;
    private missingKeyHandler?;
    constructor(config?: I18nEngineConfig);
    private readStoredLocale;
    private persistLocale;
    private resolveInitialLocale;
    private loadInitialLocale;
    getLocale(): Locale;
    setLocale(locale: Locale): Promise<void>;
    registerTranslation(locale: Locale, map: TranslationMap): void;
    subscribe(sub: Subscriber): () => void;
    getTranslations(locale: Locale): TranslationMap | undefined;
    private notify;
    /**
     * Main translation method with caching and plugin support
     */
    t(key: string, params?: Record<string, string>): string;
    private isICUMessage;
    private compileICU;
    /**
     * Batch translate multiple keys at once
     */
    batchTranslate(keys: string[], params?: Record<string, Record<string, string>>): Record<string, string>;
    /**
     * Create a namespaced translator
     */
    createNamespace(prefix: string): {
        t: (key: string, params?: Record<string, string>) => string;
        batchTranslate: (keys: string[]) => Record<string, string>;
        getLocale: () => Locale;
    };
    private resolveTranslation;
    private interpolate;
    private handleError;
    /**
     * Enable/disable debug mode
     */
    setDebug(enabled: boolean): void;
    /**
     * Get comprehensive statistics
     */
    getStats(): {
        locale: Locale;
        cache: ReturnType<LRUCache<string>["getStats"]>;
        plugins: string[];
        subscriberCount: number;
        loadedLocales: string[];
    };
    /**
     * Destroy the engine instance (cleanup)
     */
    destroy(): Promise<void>;
}
declare const i18n: I18nEngine;
declare const t: (key: string, params?: Record<string, string>) => string;

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

/**
 * file formatter.ts
 * description 翻译格式化器
 * module @yyc3/i18n-core
 * author YanYuCloudCube Team <admin@0379.email>
 * version 2.3.0
 * created 2026-04-24
 * updated 2026-04-24
 * status active
 * tags [module]
 *
 * copyright YanYuCloudCube Team
 * license MIT
 *
 * brief 翻译格式化器
 */
interface TranslateParams {
    [key: string]: unknown;
}
declare function interpolate(template: string, params?: TranslateParams): string;
declare function pluralize(template: string, count: number): string;
declare function formatRelativeTime(timestamp: number, locale: string): string;

/**
 * file detector.ts
 * description 语言自动检测
 * module @yyc3/i18n-core
 * author YanYuCloudCube Team <admin@0379.email>
 * version 2.3.0
 * created 2026-04-24
 * updated 2026-04-24
 * status active
 * tags [module]
 *
 * copyright YanYuCloudCube Team
 * license MIT
 *
 * brief 语言自动检测
 */

interface LocaleDetectionResult {
    locale: Locale;
    source: "env" | "system" | "storage" | "default";
    confidence: number;
}
declare function detectSystemLocale(storedLocale?: string | null): LocaleDetectionResult;
declare function normalizeLocale(locale: string): Locale | null;
declare function isChineseLocale(locale: Locale): boolean;

/**
 * file rtl-utils.ts
 * description RTL 语言工具
 * module @yyc3/i18n-core
 * author YanYuCloudCube Team <admin@0379.email>
 * version 2.3.0
 * created 2026-04-24
 * updated 2026-04-24
 * status active
 * tags [module]
 *
 * copyright YanYuCloudCube Team
 * license MIT
 *
 * brief RTL 语言工具
 */

declare const RTL_LOCALES: RTLLocale[];
/**
 * Check if a locale is RTL (Right-to-Left)
 */
declare function isRTL(locale: string): boolean;
/**
 * Get text direction for a locale
 */
declare function getDirection(locale: string): TextDirection;
/**
 * Get appropriate alignment for a locale
 */
declare function getAlignment(locale: string): HorizontalAlignment;
/**
 * Get opposite alignment (for flexbox)
 */
declare function getOppositeAlignment(locale: string): HorizontalAlignment;
/**
 * Flip margin/padding properties for RTL
 */
declare function flipSpacing(locale: string, property: SpacingProperty, value: string): Record<string, string>;
/**
 * Mirror horizontal position values
 */
declare function mirrorPosition(locale: string, position: {
    left?: string;
    right?: string;
} | null | undefined): {
    left?: string;
    right?: string;
} | null | undefined;
/**
 * Transform CSS class names for RTL context
 */
declare function transformClassForRTL(locale: string, className: string): string;
/**
 * Set up document direction and language attributes
 */
declare function setupDocumentDirection(locale: string, doc?: Document): void;
/**
 * Create a mirrored layout configuration
 */
declare function createMirroredLayout<T extends Record<string, string>>(locale: string, ltrConfig: T): T;

interface MCPMessage {
    jsonrpc: "2.0";
    id?: string | number;
    method?: string;
    params?: Record<string, unknown>;
    result?: unknown;
    error?: {
        code: number;
        message: string;
        data?: unknown;
    };
}
interface MCPTool {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: Record<string, {
            type: string;
            description?: string;
            enum?: string[];
        }>;
        required?: string[];
    };
}
interface MCPResource {
    uri: string;
    name: string;
    description?: string;
    mimeType?: string;
}
interface MCPServerCapabilities {
    tools?: {
        listChanged?: boolean;
    };
    resources?: {
        subscribe?: boolean;
        listChanged?: boolean;
    };
    prompts?: {
        listChanged?: boolean;
    };
    logging?: object;
}
interface MCPTransport {
    connected: boolean;
    connect(): Promise<void>;
    send(message: MCPMessage): Promise<void>;
    onMessage(handler: (message: MCPMessage) => void): void;
    close(): Promise<void>;
}
interface MCPServerConfig {
    name: string;
    version: string;
    transport: MCPTransport;
    capabilities?: {
        tools?: boolean;
        resources?: boolean;
        prompts?: boolean;
    };
}
interface MCPToolResult {
    content: Array<{
        type: "text" | "image" | "resource";
        text?: string;
        data?: string;
        mimeType?: string;
    }>;
    isError?: boolean;
}
interface MCPServerInfo {
    name: string;
    version: string;
    protocolVersion?: string;
}

type ToolHandler = (args: Record<string, unknown>) => Promise<MCPToolResult>;
declare class MCPServer {
    private config;
    private transport;
    private toolRegistrations;
    private resources;
    constructor(config: MCPServerConfig);
    registerTool(tool: MCPTool, handler: ToolHandler): void;
    registerResource(resource: MCPResource): void;
    getTools(): MCPTool[];
    getResources(): MCPResource[];
    start(): Promise<void>;
    private handleMessage;
    private handleInitialize;
    private handleToolCall;
    private handleResourceRead;
    private sendResponse;
    private sendError;
    stop(): Promise<void>;
}

/**
 * file i18n-tools.ts
 * description MCP i18n 工具集
 * module @yyc3/i18n-core
 * author YanYuCloudCube Team <admin@0379.email>
 * version 2.3.0
 * created 2026-04-24
 * updated 2026-04-24
 * status active
 * tags [module],[mcp]
 *
 * copyright YanYuCloudCube Team
 * license MIT
 *
 * brief MCP i18n 工具集
 */

declare function registerI18nTools(server: MCPServer, engine: I18nEngine): void;

type AIProviderType = "openai" | "ollama" | "anthropic" | "azure" | "custom";
interface AIProviderConfig {
    type: AIProviderType;
    apiKey?: string;
    baseUrl?: string;
    defaultModel?: string;
}
interface TranslationRequest {
    sourceText: string;
    sourceLocale: string;
    targetLocale: string;
    context?: string;
    glossary?: Record<string, string>;
    style?: "formal" | "informal" | "technical";
}
interface TranslationResponse {
    translatedText: string;
    qualityScore: number;
    provider: AIProviderType;
    model: string;
    cached: boolean;
}
interface AIProvider {
    readonly type: AIProviderType;
    readonly isReady: boolean;
    initialize(): Promise<void>;
    translate(request: TranslationRequest): Promise<TranslationResponse>;
    batchTranslate(requests: TranslationRequest[]): Promise<TranslationResponse[]>;
    validate(): Promise<boolean>;
    dispose(): Promise<void>;
}
interface AIProviderInfo {
    type: AIProviderType;
    displayName: string;
    isAvailable: boolean;
    isLocal: boolean;
    models: string[];
    defaultModel?: string;
}
declare class AIProviderManager {
    private config?;
    private providers;
    private activeProvider;
    private cache;
    constructor(config?: {
        preferLocal?: boolean;
        autoDetect?: boolean;
    } | undefined);
    register(provider: AIProvider): void;
    autoDetect(): Promise<AIProviderInfo[]>;
    setActive(type: AIProviderType): void;
    translate(request: TranslationRequest): Promise<TranslationResponse>;
    batchTranslate(requests: TranslationRequest[]): Promise<TranslationResponse[]>;
    private getActiveProvider;
    getActiveProviderType(): AIProviderType | null;
    getRegisteredProviders(): AIProviderType[];
    clearCache(): void;
    disposeAll(): Promise<void>;
}

type QESeverity = "critical" | "warning" | "info";
interface QEIssue {
    ruleId: string;
    message: string;
    severity: QESeverity;
    position?: {
        start: number;
        end: number;
    };
}
interface QEResult {
    score: number;
    issues: QEIssue[];
    passed: boolean;
    details: {
        completeness: number;
        accuracy: number;
        fluency: number;
        consistency: number;
        glossaryCompliance: number;
    };
}
interface QERule {
    id: string;
    name: string;
    description: string;
    severity: QESeverity;
    check(ctx: QEContext): QEIssue | null;
}
interface QEContext {
    sourceText: string;
    translatedText: string;
    sourceLocale: string;
    targetLocale: string;
    glossary?: Record<string, string>;
    previousTranslations?: Map<string, string>;
}
declare class QualityEstimator {
    private rules;
    private passThreshold;
    constructor(config?: {
        passThreshold?: number;
    });
    private registerBuiltinRules;
    addRule(rule: QERule): void;
    estimate(ctx: QEContext): QEResult;
    getRules(): QERule[];
}

declare class OpenAIProvider implements AIProvider {
    readonly type: "openai";
    private apiKey;
    private baseUrl;
    private defaultModel;
    private _isReady;
    constructor(config?: AIProviderConfig);
    get isReady(): boolean;
    initialize(): Promise<void>;
    validate(): Promise<boolean>;
    translate(request: TranslationRequest): Promise<TranslationResponse>;
    batchTranslate(requests: TranslationRequest[]): Promise<TranslationResponse[]>;
    getInfo(): AIProviderInfo;
    dispose(): Promise<void>;
    private buildSystemPrompt;
    private buildUserPrompt;
}

declare class OllamaProvider implements AIProvider {
    readonly type: "ollama";
    private baseUrl;
    private defaultModel;
    private _isReady;
    constructor(config?: AIProviderConfig);
    get isReady(): boolean;
    initialize(): Promise<void>;
    validate(): Promise<boolean>;
    translate(request: TranslationRequest): Promise<TranslationResponse>;
    batchTranslate(requests: TranslationRequest[]): Promise<TranslationResponse[]>;
    getInfo(): AIProviderInfo;
    dispose(): Promise<void>;
}

interface ICULiteral {
    type: "literal";
    value: string;
}
interface ICUArgument {
    type: "argument";
    name: string;
}
interface ICUPluralClause {
    selector: string;
    content: ICUNode[];
}
interface ICUPlural {
    type: "plural";
    name: string;
    offset: number;
    clauses: ICUPluralClause[];
}
interface ICUSelectClause {
    selector: string;
    content: ICUNode[];
}
interface ICUSelect {
    type: "select";
    name: string;
    clauses: ICUSelectClause[];
}
interface ICUSelectOrdinal {
    type: "selectOrdinal";
    name: string;
    clauses: ICUSelectClause[];
}
interface ICUNumber {
    type: "number";
    name: string;
    format?: string;
}
interface ICUDate {
    type: "date";
    name: string;
    format?: "short" | "medium" | "long" | "full";
}
interface ICUTime {
    type: "time";
    name: string;
    format?: "short" | "medium" | "long" | "full";
}
type ICUNode = ICULiteral | ICUArgument | ICUPlural | ICUSelect | ICUSelectOrdinal | ICUNumber | ICUDate | ICUTime;
interface ICUParseError {
    message: string;
    position: number;
}
interface ICUParseResult {
    nodes: ICUNode[];
    errors: ICUParseError[];
}

/**
 * file parser.ts
 * description ICU MessageFormat 解析器
 * module @yyc3/i18n-core
 * author YanYuCloudCube Team <admin@0379.email>
 * version 2.3.0
 * created 2026-04-24
 * updated 2026-04-24
 * status active
 * tags [module],[i18n]
 *
 * copyright YanYuCloudCube Team
 * license MIT
 *
 * brief ICU MessageFormat 解析器
 */

declare class ICUParser {
    private pos;
    private input;
    private errors;
    parse(input: string): ICUParseResult;
    private parseMessage;
    private parseEscaped;
    private parseArgument;
    private parseFormat;
    private parsePlural;
    private parseSelect;
    private parseSelectOrdinal;
    private parseSelectLike;
    private parseNumber;
    private parseDate;
    private parseTime;
    private parseClauseContent;
    private parseArgumentInner;
    private parseSelector;
    private parseNumberLiteral;
    private parseIdentifier;
    private peek;
    private skipWhitespace;
    private match;
}

/**
 * file compiler.ts
 * description ICU MessageFormat 编译器
 * module @yyc3/i18n-core
 * author YanYuCloudCube Team <admin@0379.email>
 * version 2.3.0
 * created 2026-04-24
 * updated 2026-04-24
 * status active
 * tags [module],[i18n]
 *
 * copyright YanYuCloudCube Team
 * license MIT
 *
 * brief ICU MessageFormat 编译器
 */

interface ICUCompileContext {
    locale: string;
    params: Record<string, unknown>;
    pluralRule?: (locale: string, count: number) => string;
    formatNumber?: (locale: string, value: number, format?: string) => string;
    formatDate?: (locale: string, value: Date, format?: string) => string;
    formatTime?: (locale: string, value: Date, format?: string) => string;
}
declare class ICUCompiler {
    compile(nodes: ICUNode[], ctx: ICUCompileContext): string;
    private compileNode;
    private compilePlural;
    private compileSelect;
    private compileSelectOrdinal;
    private compileWithCount;
    private compileNumber;
    private compileDate;
    private compileTime;
}

/**
 * file stdio-transport.ts
 * description MCP 标准传输层
 * module @yyc3/i18n-core
 * author YanYuCloudCube Team <admin@0379.email>
 * version 2.3.0
 * created 2026-04-24
 * updated 2026-04-24
 * status active
 * tags [module],[mcp]
 *
 * copyright YanYuCloudCube Team
 * license MIT
 *
 * brief MCP 标准传输层
 */

declare class StdioTransport implements MCPTransport {
    private config?;
    private _connected;
    private stdin;
    private stdout;
    private messageHandler;
    private buffer;
    constructor(config?: {
        stdin?: Readable;
        stdout?: Writable;
    } | undefined);
    get connected(): boolean;
    connect(): Promise<void>;
    send(message: MCPMessage): Promise<void>;
    onMessage(handler: (message: MCPMessage) => void): void;
    close(): Promise<void>;
    private processBuffer;
}

/**
 * file chinese-detector.ts
 * description 中文检测器
 * module @yyc3/i18n-core
 * author YanYuCloudCube Team <admin@0379.email>
 * version 2.3.0
 * created 2026-04-24
 * updated 2026-04-24
 * status active
 * tags [module]
 *
 * copyright YanYuCloudCube Team
 * license MIT
 *
 * brief 中文检测器
 */
interface DetectionResult {
    file: string;
    line: number;
    column: number;
    text: string;
    type: "string-literal" | "template-literal" | "jsx-text" | "comment";
}
declare class ChineseDetector {
    private ignorePatterns;
    private fileExtensions;
    constructor(config?: {
        ignorePatterns?: RegExp[];
        extensions?: string[];
    });
    canDetect(filePath: string): boolean;
    detect(content: string, filePath: string): DetectionResult[];
    generateReport(results: DetectionResult[]): string;
}

type BackoffPolicy = {
    initialMs: number;
    maxMs: number;
    factor: number;
    jitter: number;
};
declare const DEFAULT_BACKOFF_POLICY: BackoffPolicy;
declare function computeBackoff(policy: BackoffPolicy, attempt: number): number;
declare function sleepWithAbort(ms: number, abortSignal?: AbortSignal): Promise<void>;
declare function createRetryRunner<T>(options: {
    maxAttempts?: number;
    backoffPolicy?: Partial<BackoffPolicy>;
    shouldRetry?: (error: Error, attempt: number) => boolean;
}): (fn: () => Promise<T>) => Promise<T>;

/**
 * file rate-limit.ts
 * description 速率限制器
 * module @yyc3/i18n-core
 * author YanYuCloudCube Team <admin@0379.email>
 * version 2.3.0
 * created 2026-04-24
 * updated 2026-04-24
 * status active
 * tags [module],[infra]
 *
 * copyright YanYuCloudCube Team
 * license MIT
 *
 * brief 速率限制器
 */
type FixedWindowRateLimiter = {
    consume: () => {
        allowed: boolean;
        retryAfterMs: number;
        remaining: number;
    };
    reset: () => void;
};
declare function createFixedWindowRateLimiter(params: {
    maxRequests: number;
    windowMs: number;
    now?: () => number;
}): FixedWindowRateLimiter;

/**
 * file logger.ts
 * description 日志系统
 * module @yyc3/i18n-core
 * author YanYuCloudCube Team <admin@0379.email>
 * version 2.3.0
 * created 2026-04-24
 * updated 2026-04-24
 * status active
 * tags [module],[infra]
 *
 * copyright YanYuCloudCube Team
 * license MIT
 *
 * brief 日志系统
 */
type LogLevel = "debug" | "info" | "warn" | "error" | "silent";
interface Logger {
    debug(message: string, ...args: unknown[]): void;
    info(message: string, ...args: unknown[]): void;
    warn(message: string, ...args: unknown[]): void;
    error(message: string, ...args: unknown[]): void;
}
declare function createLogger(prefix?: string): Logger;
declare function setLogLevel(level: LogLevel): void;
declare function getLogLevel(): LogLevel;
declare const logger: Logger;

declare function generateSecureUuid(): string;
declare function generateSecureToken(bytes?: number): string;
declare function generateSecureHex(bytes?: number): string;
declare function generateSecureFraction(): number;
declare function generateSecureInt(maxExclusive: number): number;
declare function generateSecureInt(minInclusive: number, maxExclusive: number): number;

/**
 * file dangerous-operations.ts
 * description 注入检测
 * module @yyc3/i18n-core
 * author YanYuCloudCube Team <admin@0379.email>
 * version 2.3.0
 * created 2026-04-24
 * updated 2026-04-24
 * status active
 * tags [module],[security]
 *
 * copyright YanYuCloudCube Team
 * license MIT
 *
 * brief 注入检测
 */
declare const DANGEROUS_OPERATION_NAMES: readonly ["exec", "spawn", "shell", "fs_write", "fs_delete", "fs_move", "apply_patch", "eval", "function_constructor"];
type DangerousOperation = (typeof DANGEROUS_OPERATION_NAMES)[number];
declare const DANGEROUS_OPERATIONS_SET: Set<string>;
declare function isDangerousOperation(operationName: string): boolean;
declare function getDangerousOperations(): readonly string[];

/**
 * file safe-regex.ts
 * description ReDoS 防护安全正则
 * module @yyc3/i18n-core
 * author YanYuCloudCube Team <admin@0379.email>
 * version 2.3.0
 * created 2026-04-24
 * updated 2026-04-24
 * status active
 * tags [module],[security]
 *
 * copyright YanYuCloudCube Team
 * license MIT
 *
 * brief ReDoS 防护安全正则
 */
type SafeRegexRejectReason = "empty" | "unsafe-nested-repetition" | "invalid-regex";
type SafeRegexCompileResult = {
    regex: RegExp;
    source: string;
    flags: string;
    reason: null;
} | {
    regex: null;
    source: string;
    flags: string;
    reason: SafeRegexRejectReason;
};
declare function compileSafeRegex(source: string, flags?: string): SafeRegexCompileResult;
declare function testSafeRegex(source: string, input: string, flags?: string): boolean;
declare function clearSafeRegexCache(): void;

declare function safeEqualSecret(provided: string | undefined | null, expected: string | undefined | null): boolean;

/**
 * file format-time.ts
 * description 时间格式化工具
 * module @yyc3/i18n-core
 * author YanYuCloudCube Team <admin@0379.email>
 * version 2.3.0
 * created 2026-04-24
 * updated 2026-04-24
 * status active
 * tags [module]
 *
 * copyright YanYuCloudCube Team
 * license MIT
 *
 * brief 时间格式化工具
 */
type FormatTimeAgoOptions = {
    suffix?: boolean;
    fallback?: string;
};
declare function formatTimeAgo(durationMs: number | null | undefined, options?: FormatTimeAgoOptions): string;
type FormatRelativeTimestampOptions = {
    dateFallback?: boolean;
    timezone?: string;
    fallback?: string;
};
declare function formatRelativeTimestamp(timestampMs: number | null | undefined, options?: FormatRelativeTimestampOptions): string;

declare function normalizeWindowsPathForComparison(input: string): string;
declare function isNodeError(value: unknown): value is NodeJS.ErrnoException;
declare function hasNodeErrorCode(value: unknown, code: string): boolean;
declare function isNotFoundPathError(value: unknown): boolean;
declare function isSymlinkOpenError(value: unknown): boolean;
declare function isPathInside(root: string, target: string): boolean;

declare function loadJsonFile<T = unknown>(pathname: string): T | undefined;
declare function saveJsonFile(pathname: string, data: unknown): void;
declare function jsonFileExists(pathname: string): boolean;
declare function deleteJsonFile(pathname: string): boolean;

export { type AIProvider, type AIProviderConfig, type AIProviderInfo, AIProviderManager, type AIProviderType, type BackoffPolicy, type CacheConfig, type CacheStats, ChineseDetector, DANGEROUS_OPERATIONS_SET, DANGEROUS_OPERATION_NAMES, DEFAULT_BACKOFF_POLICY, type DangerousOperation, type DetectionResult, type FixedWindowRateLimiter, type FormatRelativeTimestampOptions, type FormatTimeAgoOptions, type HorizontalAlignment, type I18nContext, I18nEngine, type I18nEngineConfig, type I18nPlugin, type ICUArgument, type ICUCompileContext, ICUCompiler, type ICUDate, type ICULiteral, type ICUNode, type ICUNumber, type ICUParseError, type ICUParseResult, ICUParser, type ICUPlural, type ICUPluralClause, type ICUSelect, type ICUSelectClause, type ICUSelectOrdinal, type ICUTime, LRUCache, type Locale, type LocaleDetectionResult, type LogLevel, type Logger, type MCPMessage, type MCPResource, MCPServer, type MCPServerCapabilities, type MCPServerConfig, type MCPServerInfo, type MCPTool, type MCPToolResult, type MCPTransport, MissingKeyReporter, OllamaProvider, OpenAIProvider, PerformanceTracker, PluginManager, type QEContext, type QEIssue, type QEResult, type QERule, type QESeverity, QualityEstimator, type RTLLocale, RTL_LOCALES, type SafeRegexCompileResult, type SafeRegexRejectReason, type SpacingProperty, StdioTransport, type TextDirection, type ToolHandler, type TranslateParams, type TranslationMap, type TranslationRequest, type TranslationResponse, clearSafeRegexCache, compileSafeRegex, computeBackoff, createConsoleLogger, createFixedWindowRateLimiter, createLogger, createMirroredLayout, createRetryRunner, deleteJsonFile, detectSystemLocale, flipSpacing, formatRelativeTime, formatRelativeTimestamp, formatTimeAgo, generateSecureFraction, generateSecureHex, generateSecureInt, generateSecureToken, generateSecureUuid, getAlignment, getDangerousOperations, getDirection, getLogLevel, getOppositeAlignment, hasNodeErrorCode, i18n, interpolate, isChineseLocale, isDangerousOperation, isNodeError, isNotFoundPathError, isPathInside, isRTL, isSymlinkOpenError, jsonFileExists, loadJsonFile, logger, mirrorPosition, normalizeLocale, normalizeWindowsPathForComparison, pluralize, registerI18nTools, safeEqualSecret, saveJsonFile, setLogLevel, setupDocumentDirection, sleepWithAbort, t, testSafeRegex, transformClassForRTL };
