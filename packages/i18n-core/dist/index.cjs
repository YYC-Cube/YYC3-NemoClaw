'use strict';

var promises = require('timers/promises');
var crypto = require('crypto');
var path = require('path');
var fs = require('fs');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var path__default = /*#__PURE__*/_interopDefault(path);
var fs__default = /*#__PURE__*/_interopDefault(fs);

var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/locales/zh-CN.ts
var zh_CN_exports = {};
__export(zh_CN_exports, {
  zh_CN: () => zh_CN
});
var zh_CN;
var init_zh_CN = __esm({
  "src/locales/zh-CN.ts"() {
    zh_CN = {
      common: {
        health: "\u5065\u5EB7\u72B6\u51B5",
        online: "\u5728\u7EBF",
        offline: "\u79BB\u7EBF",
        welcome: "\u6B22\u8FCE",
        save: "\u4FDD\u5B58",
        cancel: "\u53D6\u6D88",
        loading: "\u52A0\u8F7D\u4E2D...",
        error: "\u9519\u8BEF",
        success: "\u6210\u529F",
        version: "v2.0.0"
      },
      nav: {
        home: "\u9996\u9875",
        about: "\u5173\u4E8E",
        contact: "\u8054\u7CFB\u6211\u4EEC"
      },
      overview: {
        stats: {
          cronNext: "\u4E0B\u6B21\u5524\u9192 {time}"
        }
      },
      welcome: {
        message: "\u4F60\u597D {name}",
        title: "\u6B22\u8FCE\u4F7F\u7528 YYC\xB3 i18n Core"
      }
    };
  }
});

// src/locales/zh-TW.ts
var zh_TW_exports = {};
__export(zh_TW_exports, {
  zh_TW: () => zh_TW
});
var zh_TW;
var init_zh_TW = __esm({
  "src/locales/zh-TW.ts"() {
    zh_TW = {
      common: {
        health: "\u5065\u5EB7\u72C0\u614B",
        online: "\u7DDA\u4E0A",
        offline: "\u96E2\u7DDA",
        welcome: "\u6B61\u8FCE",
        save: "\u5132\u5B58",
        cancel: "\u53D6\u6D88",
        loading: "\u8F09\u5165\u4E2D...",
        error: "\u932F\u8AA4",
        success: "\u6210\u529F",
        version: "v2.0.0"
      },
      nav: {
        home: "\u9996\u9801",
        about: "\u95DC\u65BC",
        contact: "\u806F\u7D61\u6211\u5011"
      },
      overview: {
        stats: {
          cronNext: "\u4E0B\u6B21\u559A\u9192 {time}"
        }
      },
      welcome: {
        message: "\u4F60\u597D {name}",
        title: "\u6B61\u8FCE\u4F7F\u7528 YYC\xB3 i18n Core"
      }
    };
  }
});

// src/locales/ja.ts
var ja_exports = {};
__export(ja_exports, {
  default: () => ja_default
});
var ja_default;
var init_ja = __esm({
  "src/locales/ja.ts"() {
    ja_default = {};
  }
});

// src/locales/ko.ts
var ko_exports = {};
__export(ko_exports, {
  default: () => ko_default
});
var ko_default;
var init_ko = __esm({
  "src/locales/ko.ts"() {
    ko_default = {};
  }
});

// src/locales/fr.ts
var fr_exports = {};
__export(fr_exports, {
  default: () => fr_default
});
var fr_default;
var init_fr = __esm({
  "src/locales/fr.ts"() {
    fr_default = {};
  }
});

// src/locales/de.ts
var de_exports = {};
__export(de_exports, {
  default: () => de_default
});
var de_default;
var init_de = __esm({
  "src/locales/de.ts"() {
    de_default = {};
  }
});

// src/locales/es.ts
var es_exports = {};
__export(es_exports, {
  default: () => es_default
});
var es_default;
var init_es = __esm({
  "src/locales/es.ts"() {
    es_default = {};
  }
});

// src/locales/pt-BR.ts
var pt_BR_exports = {};
__export(pt_BR_exports, {
  pt_BR: () => pt_BR
});
var pt_BR;
var init_pt_BR = __esm({
  "src/locales/pt-BR.ts"() {
    pt_BR = {
      common: {
        health: "Sa\xFAde",
        online: "Online",
        offline: "Offline",
        welcome: "Bem-vindo",
        save: "Salvar",
        cancel: "Cancelar",
        loading: "Carregando...",
        error: "Erro",
        success: "Sucesso",
        version: "v2.0.0"
      },
      nav: {
        home: "In\xEDcio",
        about: "Sobre",
        contact: "Contato"
      },
      overview: {
        stats: {
          cronNext: "Pr\xF3xima ativa\xE7\xE3o {time}"
        }
      },
      welcome: {
        message: "Ol\xE1 {name}",
        title: "Bem-vindo ao YYC\xB3 i18n Core"
      }
    };
  }
});

// src/locales/ar.ts
var ar_exports = {};
__export(ar_exports, {
  default: () => ar_default
});
var ar_default;
var init_ar = __esm({
  "src/locales/ar.ts"() {
    ar_default = {};
  }
});

// src/locales/en.ts
var en = {
  common: {
    health: "Health",
    online: "Online",
    offline: "Offline",
    welcome: "Welcome",
    save: "Save",
    cancel: "Cancel",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    version: "v2.0.0"
  },
  nav: {
    home: "Home",
    about: "About",
    contact: "Contact"
  },
  overview: {
    stats: {
      cronNext: "Next wake {time}"
    }
  },
  welcome: {
    message: "Hello {name}",
    title: "Welcome to YYC\xB3 i18n Core"
  }
};

// src/lib/cache.ts
var LRUCache = class {
  cache = /* @__PURE__ */ new Map();
  hits = 0;
  misses = 0;
  evictions = 0;
  config;
  constructor(config = {}) {
    this.config = {
      maxSize: config.maxSize ?? 1e3,
      defaultTTL: config.defaultTTL ?? 5 * 60 * 1e3,
      // 5 minutes
      enabled: config.enabled ?? true
    };
  }
  get(key) {
    if (!this.config.enabled) return null;
    const entry = this.cache.get(key);
    if (!entry) {
      this.misses++;
      return null;
    }
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }
    this.cache.delete(key);
    this.cache.set(key, entry);
    this.hits++;
    return entry.value;
  }
  set(key, value, ttl) {
    if (!this.config.enabled) return;
    if (this.cache.size >= this.config.maxSize && !this.cache.has(key)) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== void 0) {
        this.cache.delete(firstKey);
        this.evictions++;
      }
    }
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl: ttl ?? this.config.defaultTTL
    });
  }
  has(key) {
    return this.get(key) !== null;
  }
  delete(key) {
    return this.cache.delete(key);
  }
  clear() {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
    this.evictions = 0;
  }
  getStats() {
    const total = this.hits + this.misses;
    return {
      size: this.cache.size,
      maxSize: this.config.maxSize,
      hits: this.hits,
      misses: this.misses,
      hitRate: total > 0 ? this.hits / total * 100 : 0,
      evictions: this.evictions
    };
  }
  keys() {
    return Array.from(this.cache.keys());
  }
  values() {
    return Array.from(this.cache.values()).map((entry) => entry.value);
  }
};

// src/lib/icu/compiler.ts
var PLURAL_RULES = {
  en: (n) => {
    const abs = Math.abs(n);
    if (abs === 0) return "zero";
    if (abs === 1) return "one";
    if (abs === 2) return "two";
    return "other";
  },
  zh: () => "other",
  ja: () => "other",
  ko: () => "other",
  fr: (n) => {
    if (n === 0 || n === 1) return "one";
    return "other";
  },
  de: (n) => {
    if (n === 1) return "one";
    return "other";
  },
  es: (n) => {
    if (n === 1) return "one";
    return "other";
  },
  pt: (n) => {
    if (n >= 0 && n <= 2) return n === 2 ? "two" : "one";
    return "other";
  },
  ar: (n) => {
    const abs = Math.abs(n);
    if (abs === 0) return "zero";
    if (abs === 1) return "one";
    if (abs === 2) return "two";
    if (abs >= 3 && abs <= 10) return "few";
    if (abs >= 11 && abs <= 99) return "many";
    return "other";
  }
};
function defaultPluralRule(locale, count) {
  const prefix = locale.split("-")[0]?.toLowerCase() ?? "en";
  const rule = PLURAL_RULES[prefix];
  if (!rule) {
    const fallback = PLURAL_RULES["en"];
    return fallback ? fallback(count) : "other";
  }
  return rule(count);
}
var ICUCompiler = class {
  compile(nodes, ctx) {
    return nodes.map((node) => this.compileNode(node, ctx)).join("");
  }
  compileNode(node, ctx) {
    switch (node.type) {
      case "literal":
        return node.value;
      case "argument":
        return String(ctx.params[node.name] ?? "");
      case "plural":
        return this.compilePlural(node, ctx);
      case "select":
        return this.compileSelect(node, ctx);
      case "selectOrdinal":
        return this.compileSelectOrdinal(node, ctx);
      case "number":
        return this.compileNumber(node, ctx);
      case "date":
        return this.compileDate(node, ctx);
      case "time":
        return this.compileTime(node, ctx);
      default:
        return "";
    }
  }
  compilePlural(node, ctx) {
    const rawCount = ctx.params[node.name];
    const count = Number(rawCount) || 0;
    const displayCount = count - node.offset;
    for (const clause of node.clauses) {
      if (clause.selector.startsWith("=")) {
        const exactValue = parseInt(clause.selector.substring(1), 10);
        if (displayCount === exactValue) {
          return this.compileWithCount(clause.content, displayCount, ctx);
        }
      }
    }
    const pluralRule = ctx.pluralRule ?? defaultPluralRule;
    const category = pluralRule(ctx.locale, displayCount);
    for (const clause of node.clauses) {
      if (clause.selector === category) {
        return this.compileWithCount(clause.content, displayCount, ctx);
      }
    }
    const otherClause = node.clauses.find((c) => c.selector === "other");
    if (otherClause) {
      return this.compileWithCount(otherClause.content, displayCount, ctx);
    }
    return String(displayCount);
  }
  compileSelect(node, ctx) {
    const value = String(ctx.params[node.name] ?? "");
    for (const clause of node.clauses) {
      if (clause.selector === value) {
        return this.compile(clause.content, ctx);
      }
    }
    const otherClause = node.clauses.find((c) => c.selector === "other");
    if (otherClause) {
      return this.compile(otherClause.content, ctx);
    }
    return value;
  }
  compileSelectOrdinal(node, ctx) {
    const rawCount = ctx.params[node.name];
    const count = Number(rawCount) || 0;
    const pluralRule = ctx.pluralRule ?? defaultPluralRule;
    const category = pluralRule(ctx.locale, count);
    for (const clause of node.clauses) {
      if (clause.selector === category || clause.selector === String(count)) {
        return this.compileWithCount(clause.content, count, ctx);
      }
    }
    const otherClause = node.clauses.find((c) => c.selector === "other");
    if (otherClause) {
      return this.compileWithCount(otherClause.content, count, ctx);
    }
    return String(count);
  }
  compileWithCount(nodes, count, ctx) {
    return nodes.map((node) => {
      if (node.type === "argument" && node.name === "#") {
        return String(count);
      }
      return this.compileNode(node, ctx);
    }).join("");
  }
  compileNumber(node, ctx) {
    const value = Number(ctx.params[node.name]);
    if (isNaN(value)) return String(ctx.params[node.name] ?? "");
    if (ctx.formatNumber) {
      return ctx.formatNumber(ctx.locale, value, node.format);
    }
    try {
      return new Intl.NumberFormat(ctx.locale).format(value);
    } catch {
      return String(value);
    }
  }
  compileDate(node, ctx) {
    const raw = ctx.params[node.name];
    const value = raw instanceof Date ? raw : new Date(String(raw));
    if (isNaN(value.getTime())) return String(raw ?? "");
    if (ctx.formatDate) {
      return ctx.formatDate(ctx.locale, value, node.format);
    }
    try {
      return new Intl.DateTimeFormat(ctx.locale, { dateStyle: node.format ?? "medium" }).format(value);
    } catch {
      return value.toLocaleDateString(ctx.locale);
    }
  }
  compileTime(node, ctx) {
    const raw = ctx.params[node.name];
    const value = raw instanceof Date ? raw : new Date(String(raw));
    if (isNaN(value.getTime())) return String(raw ?? "");
    if (ctx.formatTime) {
      return ctx.formatTime(ctx.locale, value, node.format);
    }
    try {
      return new Intl.DateTimeFormat(ctx.locale, { timeStyle: node.format ?? "medium" }).format(value);
    } catch {
      return value.toLocaleTimeString(ctx.locale);
    }
  }
};

// src/lib/icu/parser.ts
var ICUParser = class {
  pos = 0;
  input = "";
  errors = [];
  parse(input) {
    this.pos = 0;
    this.input = input;
    this.errors = [];
    const nodes = this.parseMessage();
    return { nodes, errors: this.errors };
  }
  parseMessage() {
    const nodes = [];
    let literal = "";
    while (this.pos < this.input.length) {
      const ch = this.input[this.pos];
      if (ch === "{") {
        if (literal) {
          nodes.push({ type: "literal", value: literal });
          literal = "";
        }
        this.pos++;
        const argNode = this.parseArgument();
        if (argNode) nodes.push(argNode);
      } else if (ch === "'") {
        this.pos++;
        const escaped = this.parseEscaped();
        literal += escaped;
      } else {
        literal += ch;
        this.pos++;
      }
    }
    if (literal) {
      nodes.push({ type: "literal", value: literal });
    }
    return nodes;
  }
  parseEscaped() {
    if (this.pos < this.input.length && this.input[this.pos] === "'") {
      this.pos++;
      return "'";
    }
    let result = "";
    while (this.pos < this.input.length && this.input[this.pos] !== "'") {
      result += this.input[this.pos];
      this.pos++;
    }
    if (this.pos >= this.input.length) {
      return "'" + result;
    }
    if (this.pos < this.input.length) this.pos++;
    return result;
  }
  parseArgument() {
    this.skipWhitespace();
    const name = this.parseIdentifier();
    if (!name) {
      this.errors.push({ message: "Expected argument name", position: this.pos });
      return null;
    }
    this.skipWhitespace();
    if (this.peek() === "}") {
      this.pos++;
      return { type: "argument", name };
    }
    if (this.peek() === ",") {
      this.pos++;
      this.skipWhitespace();
      return this.parseFormat(name);
    }
    this.errors.push({ message: `Unexpected character: ${this.peek()}`, position: this.pos });
    return null;
  }
  parseFormat(name) {
    const formatType = this.parseIdentifier();
    if (!formatType) {
      this.errors.push({ message: "Expected format type", position: this.pos });
      return null;
    }
    this.skipWhitespace();
    if (this.peek() === ",") {
      this.pos++;
    }
    this.skipWhitespace();
    switch (formatType) {
      case "plural":
        return this.parsePlural(name);
      case "select":
        return this.parseSelect(name);
      case "selectOrdinal":
        return this.parseSelectOrdinal(name);
      case "number":
        return this.parseNumber(name);
      case "date":
        return this.parseDate(name);
      case "time":
        return this.parseTime(name);
      default:
        this.errors.push({ message: `Unknown format type: ${formatType}`, position: this.pos });
        return null;
    }
  }
  parsePlural(name) {
    let offset = 0;
    const clauses = [];
    this.skipWhitespace();
    if (this.match("offset:")) {
      this.skipWhitespace();
      const offsetStr = this.parseNumberLiteral();
      offset = parseInt(offsetStr, 10) || 0;
      this.skipWhitespace();
    }
    while (this.pos < this.input.length && this.peek() !== "}") {
      const selector = this.parseSelector();
      if (!selector) break;
      this.skipWhitespace();
      if (this.peek() !== "{") {
        this.errors.push({ message: "Expected '{' after selector", position: this.pos });
        break;
      }
      this.pos++;
      const content = this.parseClauseContent();
      if (this.peek() === "}") this.pos++;
      clauses.push({ selector, content });
      this.skipWhitespace();
    }
    if (this.peek() === "}") this.pos++;
    return { type: "plural", name, offset, clauses };
  }
  parseSelect(name) {
    return this.parseSelectLike(name, "select");
  }
  parseSelectOrdinal(name) {
    return this.parseSelectLike(name, "selectOrdinal");
  }
  parseSelectLike(name, kind) {
    const clauses = [];
    while (this.pos < this.input.length && this.peek() !== "}") {
      const selector = this.parseSelector();
      if (!selector) break;
      this.skipWhitespace();
      if (this.peek() !== "{") {
        this.errors.push({ message: "Expected '{' after selector", position: this.pos });
        break;
      }
      this.pos++;
      const content = this.parseClauseContent();
      if (this.peek() === "}") this.pos++;
      clauses.push({ selector, content });
      this.skipWhitespace();
    }
    if (this.peek() === "}") this.pos++;
    return { type: kind === "selectOrdinal" ? "selectOrdinal" : "select", name, clauses };
  }
  parseNumber(name) {
    this.skipWhitespace();
    let format;
    if (this.peek() !== "}") {
      format = this.parseIdentifier();
    }
    this.skipWhitespace();
    if (this.peek() === "}") this.pos++;
    return { type: "number", name, format };
  }
  parseDate(name) {
    this.skipWhitespace();
    let format;
    if (this.peek() !== "}") {
      format = this.parseIdentifier();
    }
    this.skipWhitespace();
    if (this.peek() === "}") this.pos++;
    return { type: "date", name, format };
  }
  parseTime(name) {
    this.skipWhitespace();
    let format;
    if (this.peek() !== "}") {
      format = this.parseIdentifier();
    }
    this.skipWhitespace();
    if (this.peek() === "}") this.pos++;
    return { type: "time", name, format };
  }
  parseClauseContent() {
    const nodes = [];
    let literal = "";
    while (this.pos < this.input.length) {
      const ch = this.input[this.pos];
      if (ch === "'") {
        this.pos++;
        literal += this.parseEscaped();
      } else if (ch === "#") {
        if (literal) {
          nodes.push({ type: "literal", value: literal });
          literal = "";
        }
        this.pos++;
        nodes.push({ type: "argument", name: "#" });
      } else if (ch === "{") {
        if (literal) {
          nodes.push({ type: "literal", value: literal });
          literal = "";
        }
        this.pos++;
        const arg = this.parseArgumentInner();
        if (arg) nodes.push(arg);
      } else if (ch === "}") {
        break;
      } else {
        literal += ch;
        this.pos++;
      }
    }
    if (literal) {
      nodes.push({ type: "literal", value: literal });
    }
    return nodes;
  }
  parseArgumentInner() {
    this.skipWhitespace();
    if (this.peek() === "#") {
      this.pos++;
      if (this.peek() === "}") this.pos++;
      return { type: "argument", name: "#" };
    }
    const name = this.parseIdentifier();
    if (!name) return null;
    this.skipWhitespace();
    if (this.peek() === "}") {
      this.pos++;
      return { type: "argument", name };
    }
    if (this.peek() === ",") {
      this.pos++;
      this.skipWhitespace();
      return this.parseFormat(name);
    }
    return { type: "argument", name };
  }
  parseSelector() {
    this.skipWhitespace();
    if (this.peek() === "=") {
      this.pos++;
      return "=" + this.parseNumberLiteral();
    }
    return this.parseIdentifier();
  }
  parseNumberLiteral() {
    let result = "";
    if (this.peek() === "-") {
      result += "-";
      this.pos++;
    }
    while (this.pos < this.input.length && /\d/.test(this.input[this.pos])) {
      result += this.input[this.pos];
      this.pos++;
    }
    return result;
  }
  parseIdentifier() {
    let result = "";
    while (this.pos < this.input.length && /[a-zA-Z0-9_-]/.test(this.input[this.pos])) {
      result += this.input[this.pos];
      this.pos++;
    }
    return result;
  }
  peek() {
    return this.input[this.pos] ?? "";
  }
  skipWhitespace() {
    while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
      this.pos++;
    }
  }
  match(s) {
    if (this.input.substring(this.pos, this.pos + s.length) === s) {
      this.pos += s.length;
      return true;
    }
    return false;
  }
};

// src/lib/infra/logger.ts
var LOG_LEVEL_PRIORITY = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4
};
var ConsoleLogger = class {
  constructor(prefix = "[i18n]", minLevel = "silent") {
    this.prefix = prefix;
    this.minLevel = minLevel;
  }
  prefix;
  minLevel;
  debug(message, ...args) {
    if (this.isLevelEnabled("debug")) {
      console.log(`${this.prefix} ${message}`, ...args);
    }
  }
  info(message, ...args) {
    if (this.isLevelEnabled("info")) {
      console.log(`${this.prefix} ${message}`, ...args);
    }
  }
  warn(message, ...args) {
    if (this.isLevelEnabled("warn")) {
      console.warn(`${this.prefix} ${message}`, ...args);
    }
  }
  error(message, ...args) {
    if (this.isLevelEnabled("error")) {
      console.error(`${this.prefix} ${message}`, ...args);
    }
  }
  isLevelEnabled(level) {
    return LOG_LEVEL_PRIORITY[level] <= LOG_LEVEL_PRIORITY[this.minLevel];
  }
};
var SilentLogger = class {
  debug() {
  }
  info() {
  }
  warn() {
  }
  error() {
  }
};
var globalLogLevel = "silent";
function createLogger(prefix) {
  if (globalLogLevel === "silent") {
    return new SilentLogger();
  }
  return new ConsoleLogger(prefix ?? "[i18n]", globalLogLevel);
}
function setLogLevel(level) {
  globalLogLevel = level;
}
function getLogLevel() {
  return globalLogLevel;
}
var logger = new Proxy({}, {
  get(_target, prop) {
    const current = createLogger();
    const fn = current[prop];
    if (typeof fn === "function") {
      return fn.bind(current);
    }
    return void 0;
  }
});

// src/lib/local-storage.ts
function getSafeLocalStorage() {
  if (typeof window === "undefined") return null;
  try {
    const testKey = "__yyc3_test__";
    window.localStorage.setItem(testKey, "test");
    window.localStorage.removeItem(testKey);
    return window.localStorage;
  } catch (e) {
    return null;
  }
}

// src/lib/plugins.ts
var PluginManager = class {
  plugins = /* @__PURE__ */ new Map();
  hookOrder = [];
  register(plugin) {
    if (this.plugins.has(plugin.name)) {
      logger.warn(`Plugin "${plugin.name}" is already registered. Overwriting.`);
    }
    this.plugins.set(plugin.name, plugin);
    if (!this.hookOrder.includes(plugin.name)) {
      this.hookOrder.push(plugin.name);
    }
    logger.info(`\u2705 Plugin "${plugin.name}" registered${plugin.version ? ` v${plugin.version}` : ""}`);
  }
  unregister(name) {
    const plugin = this.plugins.get(name);
    if (!plugin) return false;
    if (plugin.destroy) {
      plugin.destroy();
    }
    this.plugins.delete(name);
    this.hookOrder = this.hookOrder.filter((n) => n !== name);
    logger.info(`\u{1F5D1}\uFE0F Plugin "${name}" unregistered`);
    return true;
  }
  getPlugin(name) {
    return this.plugins.get(name);
  }
  getRegisteredPlugins() {
    return [...this.hookOrder];
  }
  async initAll(context) {
    for (const name of this.hookOrder) {
      const plugin = this.plugins.get(name);
      if (plugin?.init) {
        await plugin.init(context);
      }
    }
  }
  async destroyAll() {
    for (const name of this.hookOrder) {
      const plugin = this.plugins.get(name);
      if (plugin?.destroy) {
        await plugin.destroy();
      }
    }
    this.plugins.clear();
    this.hookOrder = [];
  }
  executeBeforeTranslate(key, params) {
    let currentKey = key;
    let currentParams = params;
    for (const name of this.hookOrder) {
      const plugin = this.plugins.get(name);
      if (plugin?.beforeTranslate) {
        const result = plugin.beforeTranslate(currentKey, currentParams);
        if (result) {
          currentKey = result.key;
          currentParams = result.params;
        }
      }
    }
    return { key: currentKey, params: currentParams };
  }
  executeAfterTranslate(result, key, params) {
    let currentResult = result;
    for (const name of this.hookOrder) {
      const plugin = this.plugins.get(name);
      if (plugin?.afterTranslate) {
        const modified = plugin.afterTranslate(currentResult, key, params);
        if (modified !== void 0) {
          currentResult = modified;
        }
      }
    }
    return currentResult;
  }
  notifyLocaleChange(newLocale, oldLocale) {
    for (const name of this.hookOrder) {
      const plugin = this.plugins.get(name);
      plugin?.onLocaleChange?.(newLocale, oldLocale);
    }
  }
  handleError(error, context) {
    for (const name of this.hookOrder) {
      const plugin = this.plugins.get(name);
      const handler = plugin?.onError;
      if (handler) {
        handler(error, context);
      }
    }
  }
  handleMissingKey(key, locale) {
    let fallback;
    for (const name of this.hookOrder) {
      const plugin = this.plugins.get(name);
      const handler = plugin?.onMissingKey;
      if (handler) {
        const result = handler(key, locale);
        if (result !== void 0) {
          fallback = result;
        }
      }
    }
    return fallback;
  }
};

// src/lib/registry.ts
var DEFAULT_LOCALE = "en";
var LAZY_LOCALES = [
  "zh-CN",
  "zh-TW",
  "ja",
  "ko",
  "fr",
  "de",
  "es",
  "pt-BR",
  "ar"
];
var LAZY_LOCALE_REGISTRY = {
  "zh-CN": {
    exportName: "zh_CN",
    loader: () => Promise.resolve().then(() => (init_zh_CN(), zh_CN_exports))
  },
  "zh-TW": {
    exportName: "zh_TW",
    loader: () => Promise.resolve().then(() => (init_zh_TW(), zh_TW_exports))
  },
  ja: {
    exportName: "ja",
    loader: () => Promise.resolve().then(() => (init_ja(), ja_exports))
  },
  ko: {
    exportName: "ko",
    loader: () => Promise.resolve().then(() => (init_ko(), ko_exports))
  },
  fr: {
    exportName: "fr",
    loader: () => Promise.resolve().then(() => (init_fr(), fr_exports))
  },
  de: {
    exportName: "de",
    loader: () => Promise.resolve().then(() => (init_de(), de_exports))
  },
  es: {
    exportName: "es",
    loader: () => Promise.resolve().then(() => (init_es(), es_exports))
  },
  "pt-BR": {
    exportName: "pt_BR",
    loader: () => Promise.resolve().then(() => (init_pt_BR(), pt_BR_exports))
  },
  ar: {
    exportName: "ar",
    loader: () => Promise.resolve().then(() => (init_ar(), ar_exports))
  }
};
var SUPPORTED_LOCALES = [DEFAULT_LOCALE, ...LAZY_LOCALES];
function isSupportedLocale(locale) {
  return SUPPORTED_LOCALES.includes(locale);
}
async function loadLazyLocaleTranslation(locale) {
  const registration = LAZY_LOCALE_REGISTRY[locale];
  if (!registration) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  const module = await registration.loader();
  return module[registration.exportName];
}
function resolveNavigatorLocale() {
  if (typeof navigator === "undefined") return null;
  const browserLocales = navigator.languages || [navigator.language];
  for (const locale of browserLocales) {
    if (isSupportedLocale(locale)) {
      return locale;
    }
    const baseLang = locale.split("-")[0];
    if (baseLang && isSupportedLocale(baseLang)) {
      return baseLang;
    }
  }
  return null;
}

// src/lib/engine.ts
var I18nEngine = class {
  state;
  subscribers = /* @__PURE__ */ new Set();
  // New v2.0 features
  cache;
  plugins;
  debugMode = false;
  errorHandler;
  missingKeyHandler;
  constructor(config = {}) {
    this.state = {
      locale: config.locale ?? DEFAULT_LOCALE,
      translations: { [DEFAULT_LOCALE]: en }
    };
    this.cache = new LRUCache({
      enabled: config.cache?.enabled ?? true,
      maxSize: config.cache?.maxSize ?? 1e3,
      defaultTTL: config.cache?.ttl ?? 5 * 60 * 1e3
      // 5 minutes
    });
    this.plugins = new PluginManager();
    this.errorHandler = config.onError;
    this.missingKeyHandler = config.missingKeyHandler;
    this.debugMode = config.debug ?? false;
    this.loadInitialLocale();
    if (this.debugMode) {
      logger.info("\u{1F310} I18n Engine v2.0 Initialized");
      logger.info(`   Locale: ${this.state.locale}`);
      logger.info(`   Cache: ${this.cache.config.enabled ? "\u2705 Enabled" : "\u274C Disabled"}`);
      logger.info(`   Plugins: ${this.plugins.getRegisteredPlugins().length} registered`);
    }
  }
  readStoredLocale() {
    const storage = getSafeLocalStorage();
    if (!storage) return null;
    try {
      return storage.getItem("yyc3.i18n.locale");
    } catch {
      return null;
    }
  }
  persistLocale(locale) {
    const storage = getSafeLocalStorage();
    if (!storage) return;
    try {
      storage.setItem("yyc3.i18n.locale", locale);
    } catch {
    }
  }
  resolveInitialLocale() {
    const saved = this.readStoredLocale();
    if (saved && isSupportedLocale(saved)) {
      return saved;
    }
    const detected = resolveNavigatorLocale();
    return detected ?? DEFAULT_LOCALE;
  }
  loadInitialLocale() {
    const initialLocale = this.resolveInitialLocale();
    if (initialLocale === DEFAULT_LOCALE) {
      this.state.locale = DEFAULT_LOCALE;
      return;
    }
    void this.setLocale(initialLocale);
  }
  getLocale() {
    return this.state.locale;
  }
  async setLocale(locale) {
    const needsTranslationLoad = locale !== DEFAULT_LOCALE && !this.state.translations[locale];
    if (this.state.locale === locale && !needsTranslationLoad) {
      return;
    }
    const oldLocale = this.state.locale;
    if (needsTranslationLoad) {
      try {
        const translation = await loadLazyLocaleTranslation(locale);
        if (!translation) {
          const error = new Error(`Failed to load translation for locale: ${locale}`);
          this.handleError(error, { key: "", locale });
          return;
        }
        this.state.translations[locale] = translation;
      } catch (e) {
        const error = e instanceof Error ? e : new Error(String(e));
        this.handleError(error, { key: "", locale });
        return;
      }
    }
    this.state.locale = locale;
    this.persistLocale(locale);
    this.cache.clear();
    this.plugins.notifyLocaleChange(locale, oldLocale);
    this.notify();
    if (this.debugMode) {
      logger.debug(`\u{1F30D} Locale changed: ${oldLocale} \u2192 ${locale}`);
    }
  }
  registerTranslation(locale, map) {
    this.state.translations[locale] = map;
    this.cache.clear();
    if (this.debugMode) {
      logger.debug(`\u{1F4E6} Translation registered for locale: ${locale}`);
    }
  }
  subscribe(sub) {
    this.subscribers.add(sub);
    return () => this.subscribers.delete(sub);
  }
  getTranslations(locale) {
    return this.state.translations[locale];
  }
  notify() {
    for (const sub of this.subscribers) {
      sub(this.state.locale);
    }
  }
  /**
   * Main translation method with caching and plugin support
   */
  t(key, params) {
    try {
      const cached = this.cache.get(`${this.state.locale}:${key}`);
      if (cached !== null) {
        return params ? this.interpolate(cached, params) : cached;
      }
      const { key: modifiedKey, params: modifiedParams } = this.plugins.executeBeforeTranslate(key, params);
      let value = this.resolveTranslation(modifiedKey);
      if (value === void 0 || value === modifiedKey) {
        const fallback = this.plugins.handleMissingKey(modifiedKey, this.state.locale) ?? this.missingKeyHandler?.(modifiedKey, this.state.locale) ?? modifiedKey;
        if (this.debugMode && fallback === modifiedKey) {
          logger.warn(`Missing translation key: "${modifiedKey}"`);
        }
        value = fallback;
      }
      this.cache.set(`${this.state.locale}:${key}`, value);
      const afterPluginValue = this.plugins.executeAfterTranslate(value, modifiedKey, params);
      if (params || modifiedParams) {
        const mergedParams = { ...params, ...modifiedParams };
        if (this.isICUMessage(afterPluginValue)) {
          return this.compileICU(afterPluginValue, mergedParams);
        }
        return this.interpolate(afterPluginValue, mergedParams);
      }
      return afterPluginValue;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.handleError(err, { key, locale: this.state.locale });
      return key;
    }
  }
  isICUMessage(value) {
    return value.includes("{") && (value.includes(", plural") || value.includes(", select") || value.includes(", selectOrdinal"));
  }
  compileICU(template, params) {
    try {
      const parser = new ICUParser();
      const { nodes, errors } = parser.parse(template);
      if (errors.length > 0) {
        logger.warn(`ICU parse errors: ${JSON.stringify(errors)}`);
        return this.interpolate(template, params);
      }
      const compiler = new ICUCompiler();
      return compiler.compile(nodes, { locale: this.state.locale, params });
    } catch {
      return this.interpolate(template, params);
    }
  }
  /**
   * Batch translate multiple keys at once
   */
  batchTranslate(keys, params) {
    const results = {};
    for (const key of keys) {
      results[key] = this.t(key, params?.[key]);
    }
    return results;
  }
  /**
   * Create a namespaced translator
   */
  createNamespace(prefix) {
    return {
      t: (key, params) => this.t(`${prefix}.${key}`, params),
      batchTranslate: (keys) => Object.fromEntries(keys.map((k) => [k, this.t(`${prefix}.${k}`)])),
      getLocale: () => this.getLocale()
    };
  }
  resolveTranslation(key) {
    const keys = key.split(".");
    let value = this.state.translations[this.state.locale] ?? this.state.translations[DEFAULT_LOCALE];
    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k];
      } else {
        value = void 0;
        break;
      }
    }
    if (value === void 0 && this.state.locale !== DEFAULT_LOCALE) {
      value = this.state.translations[DEFAULT_LOCALE];
      for (const k of keys) {
        if (value && typeof value === "object") {
          value = value[k];
        } else {
          value = void 0;
          break;
        }
      }
    }
    return typeof value === "string" ? value : void 0;
  }
  interpolate(template, params) {
    return template.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? `{${k}}`);
  }
  handleError(error, context) {
    this.errorHandler?.(error, context);
    this.plugins.handleError(error, context);
    if (this.debugMode) {
      logger.error("Error:", error.message, context);
    }
  }
  /**
   * Enable/disable debug mode
   */
  setDebug(enabled) {
    this.debugMode = enabled;
    if (enabled) {
      logger.info("\u{1F527} i18n Debug Mode ENABLED");
      globalThis.__i18n_debug__ = {
        engine: this,
        getStats: () => this.getStats(),
        clearCache: () => this.cache.clear(),
        getPlugins: () => this.plugins.getRegisteredPlugins(),
        testTranslation: (key) => this.t(key)
      };
    } else {
      delete globalThis.__i18n_debug__;
    }
  }
  /**
   * Get comprehensive statistics
   */
  getStats() {
    return {
      locale: this.state.locale,
      cache: this.cache.getStats(),
      plugins: this.plugins.getRegisteredPlugins(),
      subscriberCount: this.subscribers.size,
      loadedLocales: Object.keys(this.state.translations)
    };
  }
  /**
   * Destroy the engine instance (cleanup)
   */
  async destroy() {
    await this.plugins.destroyAll();
    this.cache.clear();
    this.subscribers.clear();
    if (this.debugMode) {
      logger.debug("\u{1F5D1}\uFE0F I18n Engine destroyed");
    }
  }
};
var i18n = new I18nEngine();
var t = (key, params) => i18n.t(key, params);

// src/lib/plugins/console-logger.ts
function createConsoleLogger(config = {}) {
  const {
    logTranslations = false,
    logMissingKeys = true,
    logLocaleChanges = true,
    logPerformance = true,
    colors = {
      translate: "#0099ff",
      missing: "#ff9900",
      localeChange: "#00ff00",
      performance: "#9966ff"
    }
  } = config;
  const timingMap = /* @__PURE__ */ new Map();
  return {
    name: "console-logger",
    version: "1.0.0",
    beforeTranslate(key) {
      if (logPerformance) {
        timingMap.set(key, performance.now());
      }
      if (logTranslations) {
        console.log(
          `%c[i18n] \u2192 Translating: "${key}"`,
          `color: ${colors.translate};`
        );
      }
    },
    afterTranslate(_result, key) {
      if (logPerformance && timingMap.has(key)) {
        const start = timingMap.get(key);
        const duration = performance.now() - start;
        if (duration > 10) {
          console.log(
            `%c\u26A0\uFE0F Slow translation (${duration.toFixed(2)}ms): "${key}"`,
            `color: ${colors.performance}; font-weight: bold;`
          );
        }
        timingMap.delete(key);
      }
    },
    onLocaleChange(newLocale, oldLocale) {
      if (logLocaleChanges) {
        console.log(
          `%c\u{1F30D} Locale changed: ${oldLocale} \u2192 ${newLocale}`,
          `color: ${colors.localeChange}; font-weight: bold;`
        );
      }
    },
    onMissingKey(key, locale) {
      if (logMissingKeys) {
        console.warn(
          `%c\u274C Missing translation [${locale}]: "${key}"`,
          `color: ${colors.missing}; font-weight: bold;`
        );
      }
      return void 0;
    },
    onError(error, context) {
      console.error(
        `%c\u{1F4A5} Translation error: ${error.message}`,
        `color: #ff0000; font-weight: bold;`,
        context
      );
    }
  };
}

// src/lib/plugins/missing-key-reporter.ts
var MissingKeyReporter = class {
  entries = /* @__PURE__ */ new Map();
  config;
  exportTimer;
  constructor(config = {}) {
    this.config = {
      maxEntries: config.maxEntries ?? 1e3,
      autoExport: config.autoExport ?? false,
      exportInterval: config.exportInterval ?? 60 * 1e3,
      // 1 minute
      onReport: config.onReport ?? (() => {
      })
    };
    if (this.config.autoExport) {
      this.startAutoExport();
    }
  }
  createPlugin() {
    const self = this;
    return {
      name: "missing-key-reporter",
      version: "1.0.0",
      onMissingKey(key, locale) {
        const entryKey = `${locale}:${key}`;
        if (self.entries.has(entryKey)) {
          const existing = self.entries.get(entryKey);
          existing.count++;
          existing.timestamp = Date.now();
        } else {
          if (self.entries.size >= self.config.maxEntries) {
            let oldestKey = "";
            let oldestTime = Infinity;
            for (const [k, v] of self.entries) {
              if (v.timestamp < oldestTime) {
                oldestTime = v.timestamp;
                oldestKey = k;
              }
            }
            if (oldestKey) {
              self.entries.delete(oldestKey);
            }
          }
          self.entries.set(entryKey, {
            key,
            locale,
            timestamp: Date.now(),
            count: 1
          });
        }
        return void 0;
      }
    };
  }
  getMissingKeys() {
    return Array.from(this.entries.values()).sort((a, b) => b.count - a.count);
  }
  getUniqueMissingCount() {
    return this.entries.size;
  }
  getTotalMisses() {
    let total = 0;
    for (const entry of this.entries.values()) {
      total += entry.count;
    }
    return total;
  }
  getByLocale(locale) {
    return this.getMissingKeys().filter((e) => e.locale === locale);
  }
  generateReport() {
    const entries = this.getMissingKeys();
    const uniqueCount = entries.length;
    const totalMisses = this.getTotalMisses();
    let output = `
${"=".repeat(80)}
`;
    output += `\u{1F4CA} MISSING TRANSLATION KEYS REPORT
`;
    output += `${"=".repeat(80)}

`;
    output += `Summary:
`;
    output += `  \u2022 Unique missing keys: ${uniqueCount}
`;
    output += `  \u2022 Total misses: ${totalMisses}
`;
    output += `  \u2022 Report time: ${(/* @__PURE__ */ new Date()).toISOString()}

`;
    if (entries.length > 0) {
      output += `Top Missing Keys (by frequency):
`;
      output += `${"-".repeat(80)}

`;
      const topEntries = entries.slice(0, 20);
      for (const entry of topEntries) {
        output += `  \u274C [${entry.locale}] "${entry.key}" (${entry.count}x)
`;
      }
      if (entries.length > 20) {
        output += `
  ... and ${entries.length - 20} more
`;
      }
    } else {
      output += `\u2705 No missing keys detected!
`;
    }
    output += `${"=".repeat(80)}
`;
    return output;
  }
  clear() {
    this.entries.clear();
  }
  exportJSON() {
    return JSON.stringify(this.getMissingKeys(), null, 2);
  }
  startAutoExport() {
    this.exportTimer = setInterval(() => {
      const report = this.generateReport();
      logger.info(report);
      this.config.onReport(this.getMissingKeys());
    }, this.config.exportInterval);
  }
  stopAutoExport() {
    if (this.exportTimer) {
      clearInterval(this.exportTimer);
      this.exportTimer = void 0;
    }
  }
  destroy() {
    this.stopAutoExport();
    this.clear();
  }
};

// src/lib/plugins/performance-tracker.ts
var PerformanceTracker = class {
  entries = [];
  config;
  timingMap = /* @__PURE__ */ new Map();
  constructor(config = {}) {
    this.config = {
      slowThreshold: config.slowThreshold ?? 10,
      maxSlowEntries: config.maxSlowEntries ?? 100,
      samplingRate: config.samplingRate ?? 1
    };
  }
  createPlugin() {
    const self = this;
    return {
      name: "performance-tracker",
      version: "1.0.0",
      beforeTranslate(key) {
        if (Math.random() <= self.config.samplingRate) {
          self.timingMap.set(key, performance.now());
        }
      },
      afterTranslate(_result, key) {
        const startTime = self.timingMap.get(key);
        if (startTime !== void 0) {
          const duration = performance.now() - startTime;
          self.timingMap.delete(key);
          const entry = {
            key,
            duration,
            timestamp: Date.now(),
            cached: duration < 1
            // Assume <1ms means cached
          };
          self.entries.push(entry);
          if (duration > self.config.slowThreshold) {
            self.trackSlowTranslation(entry);
          }
          if (self.entries.length > 1e4) {
            self.entries = self.entries.slice(-5e3);
          }
        }
        return void 0;
      }
    };
  }
  trackSlowTranslation(entry) {
    const slowEntries = this.getMetrics().slowTranslations;
    if (slowEntries.length >= this.config.maxSlowEntries) {
      slowEntries.shift();
    }
    slowEntries.push(entry);
    slowEntries.sort((a, b) => b.duration - a.duration);
  }
  getMetrics() {
    const totalCalls = this.entries.length;
    if (totalCalls === 0) {
      return {
        totalCalls: 0,
        cacheHits: 0,
        cacheMisses: 0,
        averageDuration: 0,
        maxDuration: 0,
        slowTranslations: []
      };
    }
    const cacheHits = this.entries.filter((e) => e.cached).length;
    const cacheMisses = totalCalls - cacheHits;
    const totalDuration = this.entries.reduce((sum, e) => sum + e.duration, 0);
    const averageDuration = totalDuration / totalCalls;
    const maxDuration = Math.max(...this.entries.map((e) => e.duration));
    const slowTranslations = this.entries.filter((e) => e.duration > this.config.slowThreshold).sort((a, b) => b.duration - a.duration).slice(0, this.config.maxSlowEntries);
    return {
      totalCalls,
      cacheHits,
      cacheMisses,
      averageDuration,
      maxDuration,
      slowTranslations
    };
  }
  getCacheHitRate() {
    const metrics = this.getMetrics();
    return metrics.totalCalls > 0 ? metrics.cacheHits / metrics.totalCalls * 100 : 0;
  }
  getPercentile(percentile) {
    if (this.entries.length === 0) return 0;
    const sorted = [...this.entries].sort((a, b) => a.duration - b.duration);
    const index = Math.ceil(percentile / 100 * sorted.length) - 1;
    return sorted[Math.max(0, index)]?.duration ?? 0;
  }
  generateReport() {
    const metrics = this.getMetrics();
    const hitRate = this.getCacheHitRate();
    let output = `
${"=".repeat(80)}
`;
    output += `\u26A1 PERFORMANCE METRICS REPORT
`;
    output += `${"=".repeat(80)}

`;
    output += `Overview:
`;
    output += `  \u2022 Total translation calls: ${metrics.totalCalls}
`;
    output += `  \u2022 Cache hits: ${metrics.cacheHits} (${hitRate.toFixed(1)}%)
`;
    output += `  \u2022 Cache misses: ${metrics.cacheMisses}
`;
    output += `  \u2022 Average duration: ${metrics.averageDuration.toFixed(3)}ms
`;
    output += `  \u2022 Max duration: ${metrics.maxDuration.toFixed(3)}ms
`;
    output += `  \u2022 P50 (median): ${this.getPercentile(50).toFixed(3)}ms
`;
    output += `  \u2022 P95: ${this.getPercentile(95).toFixed(3)}ms
`;
    output += `  \u2022 P99: ${this.getPercentile(99).toFixed(3)}ms

`;
    if (metrics.slowTranslations.length > 0) {
      output += `Slow Translations (>${this.config.slowThreshold}ms):
`;
      output += `${"-".repeat(80)}

`;
      for (const entry of metrics.slowTranslations.slice(0, 10)) {
        output += `  \u26A0\uFE0F "${entry.key}" - ${entry.duration.toFixed(2)}ms
`;
      }
      if (metrics.slowTranslations.length > 10) {
        output += `
  ... and ${metrics.slowTranslations.length - 10} more
`;
      }
    } else {
      output += `\u2705 No slow translations detected!
`;
    }
    output += `${"=".repeat(80)}
`;
    return output;
  }
  clear() {
    this.entries = [];
    this.timingMap.clear();
  }
  exportJSON() {
    return JSON.stringify({
      metrics: this.getMetrics(),
      entries: this.entries
    }, null, 2);
  }
};

// src/lib/formatter.ts
function interpolate(template, params) {
  if (!params || Object.keys(params).length === 0) {
    return template;
  }
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    const value = params[key];
    if (value === void 0 || value === null) {
      return match;
    }
    return String(value);
  });
}
function pluralize(template, count) {
  return template.replace(/\(s\)/g, count === 1 ? "" : "s").replace(/\{count\}/g, String(count));
}
var RELATIVE_TIME_MESSAGES = {
  zh: {
    justNow: "\u521A\u521A",
    minutes: (n) => `${n}\u5206\u949F\u524D`,
    hours: (n) => `${n}\u5C0F\u65F6\u524D`,
    days: (n) => `${n}\u5929\u524D`,
    dateFormat: "zh-CN"
  },
  ja: {
    justNow: "\u305F\u3063\u305F\u4ECA",
    minutes: (n) => `${n}\u5206\u524D`,
    hours: (n) => `${n}\u6642\u9593\u524D`,
    days: (n) => `${n}\u65E5\u524D`,
    dateFormat: "ja-JP"
  },
  ko: {
    justNow: "\uBC29\uAE08",
    minutes: (n) => `${n}\uBD84 \uC804`,
    hours: (n) => `${n}\uC2DC\uAC04 \uC804`,
    days: (n) => `${n}\uC77C \uC804`,
    dateFormat: "ko-KR"
  },
  pt: {
    justNow: "agora mesmo",
    minutes: (n) => `${n}min atr\xE1s`,
    hours: (n) => `${n}h atr\xE1s`,
    days: (n) => `${n}d atr\xE1s`,
    dateFormat: "pt-BR"
  },
  fr: {
    justNow: "\xE0 l'instant",
    minutes: (n) => `il y a ${n} min`,
    hours: (n) => `il y a ${n} h`,
    days: (n) => `il y a ${n} j`,
    dateFormat: "fr-FR"
  },
  de: {
    justNow: "gerade eben",
    minutes: (n) => `vor ${n} Min.`,
    hours: (n) => `vor ${n} Std.`,
    days: (n) => `vor ${n} Tag${n > 1 ? "en" : ""}`,
    dateFormat: "de-DE"
  },
  es: {
    justNow: "ahora mismo",
    minutes: (n) => `hace ${n} min`,
    hours: (n) => `hace ${n} h`,
    days: (n) => `hace ${n} d`,
    dateFormat: "es-ES"
  },
  ar: {
    justNow: "\u0627\u0644\u0622\u0646",
    minutes: (n) => `\u0645\u0646\u0630 ${n} \u062F\u0642\u064A\u0642\u0629`,
    hours: (n) => `\u0645\u0646\u0630 ${n} \u0633\u0627\u0639\u0629`,
    days: (n) => `\u0645\u0646\u0630 ${n} \u064A\u0648\u0645`,
    dateFormat: "ar-SA"
  },
  en: {
    justNow: "just now",
    minutes: (n) => `${n}m ago`,
    hours: (n) => `${n}h ago`,
    days: (n) => `${n}d ago`,
    dateFormat: "en-US"
  }
};
var LOCALE_FAMILIES = Object.keys(RELATIVE_TIME_MESSAGES);
function resolveLocaleFamily(locale) {
  const prefix = locale.split("-")[0]?.toLowerCase() ?? "en";
  if (LOCALE_FAMILIES.includes(prefix)) return prefix;
  return "en";
}
function formatRelativeTime(timestamp, locale) {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1e3);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const family = resolveLocaleFamily(locale);
  const msgs = RELATIVE_TIME_MESSAGES[family];
  if (seconds < 60) return msgs.justNow;
  if (minutes < 60) return msgs.minutes(minutes);
  if (hours < 24) return msgs.hours(hours);
  if (days < 7) return msgs.days(days);
  return new Date(timestamp).toLocaleDateString(msgs.dateFormat);
}

// src/lib/detector.ts
var LOCALE_ALIASES = {
  zh: "zh-CN",
  "zh-cn": "zh-CN",
  zh_cn: "zh-CN",
  "zh-hans": "zh-CN",
  "zh-hans-cn": "zh-CN",
  "zh-tw": "zh-TW",
  zh_hk: "zh-TW",
  "zh-hant": "zh-TW",
  en: "en",
  "en-us": "en",
  en_gb: "en",
  ja: "ja",
  "ja-jp": "ja",
  ko: "ko",
  "ko-kr": "ko",
  fr: "fr",
  "fr-fr": "fr",
  de: "de",
  de_de: "de",
  es: "es",
  "es-es": "es",
  pt: "pt-BR",
  "pt-br": "pt-BR",
  ar: "ar",
  "ar-sa": "ar"
};
function detectSystemLocale(storedLocale) {
  const envResult = detectFromEnvironment();
  if (envResult && envResult.confidence > 0.8) {
    return envResult;
  }
  if (storedLocale) {
    const normalized = normalizeLocale(storedLocale);
    if (normalized) {
      return { locale: normalized, source: "storage", confidence: 0.95 };
    }
  }
  const systemResult = detectFromSystem();
  if (systemResult) {
    return systemResult;
  }
  return { locale: "en", source: "default", confidence: 0.5 };
}
function detectFromEnvironment() {
  const envVars = [
    process.env?.LANGUAGE,
    process.env?.LANG,
    process.env?.LC_ALL,
    process.env?.LC_MESSAGES
  ].filter(Boolean);
  for (const envVar of envVars) {
    const normalized = normalizeLocale(envVar);
    if (normalized) {
      return { locale: normalized, source: "env", confidence: 0.95 };
    }
  }
  return null;
}
function detectFromSystem() {
  try {
    if (typeof Intl !== "undefined" && typeof navigator !== "undefined") {
      const languages = Intl.getCanonicalLocales?.(navigator.languages || []);
      for (const lang of languages) {
        const normalized = normalizeLocale(lang);
        if (normalized) {
          return { locale: normalized, source: "system", confidence: 0.85 };
        }
      }
      if (navigator.language) {
        const normalized = normalizeLocale(navigator.language);
        if (normalized) {
          return { locale: normalized, source: "system", confidence: 0.8 };
        }
      }
    }
  } catch {
  }
  return null;
}
function normalizeLocale(locale) {
  const lower = locale.toLowerCase().trim();
  if (lower in LOCALE_ALIASES) {
    return LOCALE_ALIASES[lower] ?? null;
  }
  const parts = lower.split(".");
  const firstPart = parts.length > 0 ? parts[0] : "";
  if (!firstPart) return null;
  const withoutEncoding = firstPart.replace("-", "_");
  if (withoutEncoding in LOCALE_ALIASES) {
    return LOCALE_ALIASES[withoutEncoding] ?? null;
  }
  const langParts = lower.split(/[-_]/);
  const primaryLang = langParts.length > 0 ? langParts[0] : "";
  if (!primaryLang) return null;
  const aliasMap = {
    zh: "zh-CN",
    en: "en",
    ja: "ja",
    ko: "ko",
    fr: "fr",
    de: "de",
    es: "es",
    pt: "pt-BR",
    ar: "ar"
  };
  return aliasMap[primaryLang] ?? null;
}
function isChineseLocale(locale) {
  return locale.startsWith("zh");
}

// src/lib/rtl-utils.ts
var RTL_LOCALES = ["ar"];
function isRTL(locale) {
  return RTL_LOCALES.includes(locale);
}
function getDirection(locale) {
  return isRTL(locale) ? "rtl" : "ltr";
}
function getAlignment(locale) {
  return isRTL(locale) ? "right" : "left";
}
function getOppositeAlignment(locale) {
  return isRTL(locale) ? "left" : "right";
}
function flipSpacing(locale, property, value) {
  if (!isRTL(locale)) {
    return { [property]: value };
  }
  const propertyMap = {
    marginLeft: "marginRight",
    marginRight: "marginLeft",
    paddingLeft: "paddingRight",
    paddingRight: "paddingLeft"
  };
  return { [propertyMap[property]]: value };
}
function mirrorPosition(locale, position) {
  if (!isRTL(locale) || !position) {
    return position;
  }
  return {
    left: position.right,
    right: position.left
  };
}
function transformClassForRTL(locale, className) {
  if (!isRTL(locale)) {
    return className;
  }
  const classMappings = {
    "ml-": "mr-",
    "mr-": "ml-",
    "pl-": "pr-",
    "pr-": "pl-",
    "rounded-l": "rounded-r",
    "rounded-r": "rounded-l",
    "text-left": "text-right",
    "text-right": "text-left",
    "float-left": "float-right",
    "float-right": "float-left"
  };
  let transformed = className;
  for (const [ltr, rtl] of Object.entries(classMappings)) {
    if (className.startsWith(ltr)) {
      transformed = className.replace(ltr, rtl);
      break;
    }
  }
  return transformed;
}
function setupDocumentDirection(locale, doc = document) {
  const dir = getDirection(locale);
  doc.documentElement.setAttribute("dir", dir);
  doc.documentElement.setAttribute("lang", locale);
  if (isRTL(locale)) {
    doc.documentElement.classList.add("rtl");
  } else {
    doc.documentElement.classList.remove("rtl");
  }
}
function createMirroredLayout(locale, ltrConfig) {
  if (!isRTL(locale)) {
    return ltrConfig;
  }
  const mirrorKeys = [
    "marginLeft",
    "marginRight",
    "paddingLeft",
    "paddingRight",
    "borderLeft",
    "borderRight",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius"
  ];
  const mirrored = { ...ltrConfig };
  for (const key of mirrorKeys) {
    if (key in mirrored) {
      const oppositeKey = key.replace(
        /Left|Right/,
        (match) => match === "Left" ? "Right" : "Left"
      );
      const record = mirrored;
      record[oppositeKey] = record[key];
      delete record[key];
    }
  }
  return mirrored;
}

// src/lib/mcp/i18n-tools.ts
function flattenTranslations(obj, prefix = "") {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object") {
      Object.assign(result, flattenTranslations(value, fullKey));
    } else {
      result[fullKey] = String(value);
    }
  }
  return result;
}
function registerI18nTools(server, engine) {
  const tools = [
    {
      tool: {
        name: "search_translations",
        description: "Fuzzy search translation keys across all locales",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "Search query (key or value)" },
            locale: { type: "string", description: "Optional locale filter" }
          },
          required: ["query"]
        }
      },
      handler: async (args) => {
        const query = String(args.query).toLowerCase();
        const stats = engine.getStats();
        const matches = [];
        for (const loadedLocale of stats.loadedLocales) {
          if (args.locale && loadedLocale !== String(args.locale)) continue;
          const translations = engine.getTranslations(loadedLocale);
          if (!translations) continue;
          const flat = flattenTranslations(translations);
          for (const [key, value] of Object.entries(flat)) {
            if (key.toLowerCase().includes(query) || value.toLowerCase().includes(query)) {
              matches.push({ key, value, locale: loadedLocale });
            }
          }
        }
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ query, matches, count: matches.length }, null, 2)
          }]
        };
      }
    },
    {
      tool: {
        name: "add_translation_key",
        description: "Add a new translation key with value",
        inputSchema: {
          type: "object",
          properties: {
            key: { type: "string", description: "Translation key" },
            value: { type: "string", description: "Translation value" },
            locale: { type: "string", description: "Target locale" }
          },
          required: ["key", "value", "locale"]
        }
      },
      handler: async (args) => {
        const key = String(args.key);
        const value = String(args.value);
        const locale = String(args.locale);
        engine.registerTranslation(locale, { [key]: value });
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ success: true, key, value, locale })
          }]
        };
      }
    },
    {
      tool: {
        name: "translate_key",
        description: "Get translation for a specific key",
        inputSchema: {
          type: "object",
          properties: {
            key: { type: "string", description: "Translation key" },
            locale: { type: "string", description: "Target locale" },
            params: { type: "object", description: "Interpolation parameters" }
          },
          required: ["key"]
        }
      },
      handler: async (args) => {
        const key = String(args.key);
        const params = args.params;
        const result = engine.t(key, params);
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ key, value: result, locale: engine.getLocale() })
          }]
        };
      }
    },
    {
      tool: {
        name: "check_missing_keys",
        description: "Check for missing translation keys across locales",
        inputSchema: {
          type: "object",
          properties: {
            locale: { type: "string", description: "Locale to check" }
          },
          required: ["locale"]
        }
      },
      handler: async (args) => {
        const targetLocale = String(args.locale);
        const stats = engine.getStats();
        const missingKeys = [];
        const sourceTranslations = engine.getTranslations(stats.locale);
        const targetTranslations = engine.getTranslations(targetLocale);
        if (sourceTranslations && targetTranslations) {
          const flatSource = flattenTranslations(sourceTranslations);
          const flatTarget = flattenTranslations(targetTranslations);
          for (const key of Object.keys(flatSource)) {
            if (!(key in flatTarget)) {
              missingKeys.push({ key, inLocale: stats.locale, missingIn: targetLocale });
            }
          }
        }
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              sourceLocale: stats.locale,
              targetLocale,
              loadedLocales: stats.loadedLocales,
              missingKeys,
              missingCount: missingKeys.length
            })
          }]
        };
      }
    },
    {
      tool: {
        name: "get_locale_stats",
        description: "Get translation statistics for all locales",
        inputSchema: {
          type: "object",
          properties: {}
        }
      },
      handler: async () => {
        const stats = engine.getStats();
        return {
          content: [{
            type: "text",
            text: JSON.stringify(stats, null, 2)
          }]
        };
      }
    },
    {
      tool: {
        name: "set_locale",
        description: "Change the active locale",
        inputSchema: {
          type: "object",
          properties: {
            locale: { type: "string", description: "New locale to set" }
          },
          required: ["locale"]
        }
      },
      handler: async (args) => {
        const locale = String(args.locale);
        const oldLocale = engine.getLocale();
        await engine.setLocale(locale);
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ previousLocale: oldLocale, currentLocale: engine.getLocale() })
          }]
        };
      }
    },
    {
      tool: {
        name: "quality_report",
        description: "Generate translation quality report",
        inputSchema: {
          type: "object",
          properties: {
            keys: {
              type: "string",
              description: "JSON array of keys to check"
            }
          }
        }
      },
      handler: async (args) => {
        const keys = args.keys ?? [];
        const results = keys.map((key) => ({
          key,
          value: engine.t(key),
          locale: engine.getLocale(),
          hasFallback: engine.t(key) === key
        }));
        const missingCount = results.filter((r) => r.hasFallback).length;
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              total: results.length,
              missing: missingCount,
              coverage: results.length > 0 ? ((1 - missingCount / results.length) * 100).toFixed(1) + "%" : "N/A",
              results
            }, null, 2)
          }]
        };
      }
    }
  ];
  for (const { tool, handler } of tools) {
    server.registerTool(tool, handler);
  }
}

// src/lib/mcp/server.ts
var MCPServer = class {
  config;
  transport;
  toolRegistrations = /* @__PURE__ */ new Map();
  resources = [];
  constructor(config) {
    this.config = config;
    this.transport = config.transport;
  }
  registerTool(tool, handler) {
    this.toolRegistrations.set(tool.name, { tool, handler });
    logger.info(`MCP tool registered: "${tool.name}"`);
  }
  registerResource(resource) {
    this.resources.push(resource);
  }
  getTools() {
    return Array.from(this.toolRegistrations.values()).map((r) => r.tool);
  }
  getResources() {
    return [...this.resources];
  }
  async start() {
    this.transport.onMessage((message) => {
      this.handleMessage(message).catch((error) => {
        logger.error(`MCP message handling error: ${error}`);
      });
    });
    await this.transport.connect();
    logger.info(`MCP Server "${this.config.name}" v${this.config.version} started`);
  }
  async handleMessage(message) {
    if (message.method) {
      switch (message.method) {
        case "initialize":
          await this.handleInitialize(message);
          break;
        case "notifications/initialized":
          break;
        case "tools/list":
          await this.sendResponse(message.id, { tools: this.getTools() });
          break;
        case "tools/call":
          await this.handleToolCall(message);
          break;
        case "resources/list":
          await this.sendResponse(message.id, { resources: this.resources });
          break;
        case "resources/read":
          await this.handleResourceRead(message);
          break;
        case "ping":
          await this.sendResponse(message.id, {});
          break;
        default:
          await this.sendError(message.id, -32601, `Method not found: ${message.method}`);
      }
    }
  }
  async handleInitialize(message) {
    const serverInfo = {
      name: this.config.name,
      version: this.config.version,
      protocolVersion: "2024-11-05"
    };
    const capabilities = {
      tools: { listChanged: false },
      resources: { subscribe: false, listChanged: false }
    };
    await this.sendResponse(message.id, {
      protocolVersion: "2024-11-05",
      capabilities,
      serverInfo
    });
  }
  async handleToolCall(message) {
    const params = message.params ?? {};
    const toolName = params.name;
    const args = params.arguments ?? {};
    const registration = this.toolRegistrations.get(toolName);
    if (!registration) {
      await this.sendError(message.id, -32602, `Unknown tool: ${toolName}`);
      return;
    }
    try {
      const result = await registration.handler(args);
      await this.sendResponse(message.id, result);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      await this.sendResponse(message.id, {
        content: [{ type: "text", text: `Error: ${err.message}` }],
        isError: true
      });
    }
  }
  async handleResourceRead(message) {
    const params = message.params ?? {};
    const uri = params.uri;
    const resource = this.resources.find((r) => r.uri === uri);
    if (!resource) {
      await this.sendError(message.id, -32602, `Resource not found: ${uri}`);
      return;
    }
    await this.sendResponse(message.id, {
      contents: [{ uri, mimeType: resource.mimeType ?? "text/plain", text: "" }]
    });
  }
  async sendResponse(id, result) {
    if (id === void 0) return;
    const response = { jsonrpc: "2.0", id, result };
    await this.transport.send(response);
  }
  async sendError(id, code, message) {
    if (id === void 0) return;
    const response = {
      jsonrpc: "2.0",
      id,
      error: { code, message }
    };
    await this.transport.send(response);
  }
  async stop() {
    await this.transport.close();
    logger.info(`MCP Server "${this.config.name}" stopped`);
  }
};

// src/lib/ai/provider.ts
var AIProviderManager = class {
  constructor(config) {
    this.config = config;
  }
  config;
  providers = /* @__PURE__ */ new Map();
  activeProvider = null;
  cache = /* @__PURE__ */ new Map();
  register(provider) {
    this.providers.set(provider.type, provider);
    if (!this.activeProvider) {
      this.activeProvider = provider.type;
    }
    logger.info(`AI provider "${provider.type}" registered`);
  }
  async autoDetect() {
    const results = [];
    for (const [type, provider] of this.providers) {
      try {
        const isValid = await provider.validate();
        if (isValid) {
          await provider.initialize();
          results.push({
            type,
            displayName: type,
            isAvailable: true,
            isLocal: type === "ollama",
            models: []
          });
        }
      } catch {
        logger.warn(`AI provider "${type}" not available`);
      }
    }
    if (results.length > 0 && this.config?.preferLocal) {
      const local = results.find((r) => r.isLocal);
      if (local) this.activeProvider = local.type;
    }
    return results;
  }
  setActive(type) {
    if (!this.providers.has(type)) {
      throw new Error(`AI provider "${type}" not registered`);
    }
    this.activeProvider = type;
  }
  async translate(request) {
    const cacheKey = `${request.sourceLocale}:${request.targetLocale}:${request.sourceText}`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return { ...cached, cached: true };
    }
    const provider = this.getActiveProvider();
    const result = await provider.translate(request);
    this.cache.set(cacheKey, result);
    return result;
  }
  async batchTranslate(requests) {
    const provider = this.getActiveProvider();
    return provider.batchTranslate(requests);
  }
  getActiveProvider() {
    if (!this.activeProvider) {
      throw new Error("No AI provider registered");
    }
    const provider = this.providers.get(this.activeProvider);
    if (!provider || !provider.isReady) {
      throw new Error(`AI provider "${this.activeProvider}" not ready`);
    }
    return provider;
  }
  getActiveProviderType() {
    return this.activeProvider;
  }
  getRegisteredProviders() {
    return Array.from(this.providers.keys());
  }
  clearCache() {
    this.cache.clear();
  }
  async disposeAll() {
    for (const provider of this.providers.values()) {
      await provider.dispose();
    }
    this.providers.clear();
    this.activeProvider = null;
    this.cache.clear();
  }
};

// src/lib/ai/quality-estimator.ts
var QualityEstimator = class {
  rules = [];
  passThreshold;
  constructor(config) {
    this.passThreshold = config?.passThreshold ?? 85;
    this.registerBuiltinRules();
  }
  registerBuiltinRules() {
    this.rules.push(
      {
        id: "empty-translation",
        name: "Empty Translation",
        description: "Translation must not be empty",
        severity: "critical",
        check: (ctx) => {
          if (!ctx.translatedText || ctx.translatedText.trim().length === 0) {
            return { ruleId: "empty-translation", message: "Translation is empty", severity: "critical" };
          }
          return null;
        }
      },
      {
        id: "source-leak",
        name: "Source Language Leak",
        description: "Translation should not contain untranslated source text",
        severity: "warning",
        check: (ctx) => {
          if (ctx.sourceText === ctx.translatedText && ctx.sourceLocale !== ctx.targetLocale) {
            return { ruleId: "source-leak", message: "Translation identical to source", severity: "warning" };
          }
          return null;
        }
      },
      {
        id: "placeholder-mismatch",
        name: "Placeholder Mismatch",
        description: "All placeholders in source must appear in translation",
        severity: "critical",
        check: (ctx) => {
          const sourcePlaceholders = ctx.sourceText.match(/\{[^}]+\}/g) ?? [];
          for (const ph of sourcePlaceholders) {
            if (!ctx.translatedText.includes(ph)) {
              return {
                ruleId: "placeholder-mismatch",
                message: `Missing placeholder: ${ph}`,
                severity: "critical"
              };
            }
          }
          return null;
        }
      },
      {
        id: "glossary-violation",
        name: "Glossary Violation",
        description: "Translation must comply with glossary terms",
        severity: "warning",
        check: (ctx) => {
          if (!ctx.glossary) return null;
          for (const [term, required] of Object.entries(ctx.glossary)) {
            if (ctx.sourceText.toLowerCase().includes(term.toLowerCase())) {
              if (!ctx.translatedText.includes(required)) {
                return {
                  ruleId: "glossary-violation",
                  message: `Glossary term "${term}" should be translated as "${required}"`,
                  severity: "warning"
                };
              }
            }
          }
          return null;
        }
      },
      {
        id: "length-anomaly",
        name: "Length Anomaly",
        description: "Translation length should be reasonably proportional to source",
        severity: "info",
        check: (ctx) => {
          const ratio = ctx.translatedText.length / Math.max(ctx.sourceText.length, 1);
          if (ratio > 3 || ratio < 0.2) {
            return {
              ruleId: "length-anomaly",
              message: `Translation length ratio ${ratio.toFixed(2)} is unusual`,
              severity: "info"
            };
          }
          return null;
        }
      },
      {
        id: "html-tag-preservation",
        name: "HTML Tag Preservation",
        description: "HTML tags in source must be preserved in translation",
        severity: "critical",
        check: (ctx) => {
          const sourceTags = ctx.sourceText.match(/<[^>]+>/g) ?? [];
          for (const tag of sourceTags) {
            if (!ctx.translatedText.includes(tag)) {
              return {
                ruleId: "html-tag-preservation",
                message: `Missing HTML tag: ${tag}`,
                severity: "critical"
              };
            }
          }
          return null;
        }
      }
    );
  }
  addRule(rule) {
    this.rules.push(rule);
  }
  estimate(ctx) {
    const issues = [];
    let penalty = 0;
    for (const rule of this.rules) {
      const issue = rule.check(ctx);
      if (issue) {
        issues.push(issue);
        switch (issue.severity) {
          case "critical":
            penalty += 25;
            break;
          case "warning":
            penalty += 10;
            break;
          case "info":
            penalty += 2;
            break;
        }
      }
    }
    const score = Math.max(0, 100 - penalty);
    const passed = score >= this.passThreshold;
    if (!passed) {
      logger.warn(`QE failed: score=${score}, threshold=${this.passThreshold}`);
    }
    return {
      score,
      issues,
      passed,
      details: {
        completeness: issues.some((i) => i.ruleId === "empty-translation") ? 0 : 100,
        accuracy: issues.some((i) => i.ruleId === "source-leak") ? 40 : 90,
        fluency: issues.some((i) => i.ruleId === "length-anomaly") ? 60 : 90,
        consistency: issues.some((i) => i.ruleId === "glossary-violation") ? 50 : 95,
        glossaryCompliance: issues.some((i) => i.ruleId === "glossary-violation") ? 0 : 100
      }
    };
  }
  getRules() {
    return [...this.rules];
  }
};

// src/lib/ai/openai-provider.ts
var OpenAIProvider = class {
  type = "openai";
  apiKey;
  baseUrl;
  defaultModel;
  _isReady = false;
  constructor(config) {
    this.apiKey = config?.apiKey ?? (typeof process !== "undefined" ? process.env?.OPENAI_API_KEY ?? "" : "");
    this.baseUrl = config?.baseUrl ?? "https://api.openai.com/v1";
    this.defaultModel = config?.defaultModel ?? "gpt-4o-mini";
  }
  get isReady() {
    return this._isReady && !!this.apiKey;
  }
  async initialize() {
    if (!this.apiKey) {
      throw new Error("OpenAI API Key not configured. Set OPENAI_API_KEY or pass apiKey.");
    }
    this._isReady = true;
    logger.info("OpenAI provider initialized");
  }
  async validate() {
    return !!this.apiKey;
  }
  async translate(request) {
    if (!this.isReady) await this.initialize();
    const systemPrompt = this.buildSystemPrompt(request);
    const userPrompt = this.buildUserPrompt(request);
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.defaultModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 1024
      })
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
    }
    const data = await response.json();
    const translatedText = data.choices[0]?.message?.content?.trim() ?? "";
    return {
      translatedText,
      qualityScore: 85,
      provider: "openai",
      model: data.model ?? this.defaultModel,
      cached: false
    };
  }
  async batchTranslate(requests) {
    const results = [];
    for (const req of requests) {
      results.push(await this.translate(req));
    }
    return results;
  }
  getInfo() {
    return {
      type: "openai",
      displayName: "OpenAI",
      isAvailable: this.isReady,
      isLocal: false,
      models: [this.defaultModel],
      defaultModel: this.defaultModel
    };
  }
  async dispose() {
    this._isReady = false;
  }
  buildSystemPrompt(request) {
    let prompt = `You are a professional translator. Translate from ${request.sourceLocale} to ${request.targetLocale}. Output ONLY the translated text, nothing else.`;
    if (request.style === "formal") prompt += " Use formal language.";
    if (request.style === "technical") prompt += " Use technical terminology accurately.";
    return prompt;
  }
  buildUserPrompt(request) {
    let prompt = `Translate: ${request.sourceText}`;
    if (request.context) prompt += `
Context: ${request.context}`;
    if (request.glossary) {
      const terms = Object.entries(request.glossary).map(([k, v]) => `${k} \u2192 ${v}`).join(", ");
      prompt += `
Glossary: ${terms}`;
    }
    return prompt;
  }
};

// src/lib/ai/ollama-provider.ts
var OllamaProvider = class {
  type = "ollama";
  baseUrl;
  defaultModel;
  _isReady = false;
  constructor(config) {
    this.baseUrl = config?.baseUrl ?? "http://localhost:11434";
    this.defaultModel = config?.defaultModel ?? "qwen2.5:3b";
  }
  get isReady() {
    return this._isReady;
  }
  async initialize() {
    const available = await this.validate();
    if (!available) {
      throw new Error(`Ollama not available at ${this.baseUrl}. Start with: ollama serve`);
    }
    this._isReady = true;
    logger.info(`Ollama provider initialized (model: ${this.defaultModel})`);
  }
  async validate() {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: "GET",
        signal: AbortSignal.timeout(5e3)
      });
      return response.ok;
    } catch {
      return false;
    }
  }
  async translate(request) {
    if (!this.isReady) await this.initialize();
    const systemPrompt = `You are a professional translator. Translate from ${request.sourceLocale} to ${request.targetLocale}. Output ONLY the translated text.`;
    let userPrompt = `Translate: ${request.sourceText}`;
    if (request.context) userPrompt += `
Context: ${request.context}`;
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: this.defaultModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        stream: false,
        options: { temperature: 0.3 }
      })
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ollama API error (${response.status}): ${errorText}`);
    }
    const data = await response.json();
    const translatedText = (data.message?.content ?? "").trim();
    return {
      translatedText,
      qualityScore: 75,
      provider: "ollama",
      model: data.model ?? this.defaultModel,
      cached: false
    };
  }
  async batchTranslate(requests) {
    const results = [];
    for (const req of requests) {
      results.push(await this.translate(req));
    }
    return results;
  }
  getInfo() {
    return {
      type: "ollama",
      displayName: "Ollama (Local)",
      isAvailable: this.isReady,
      isLocal: true,
      models: [this.defaultModel],
      defaultModel: this.defaultModel
    };
  }
  async dispose() {
    this._isReady = false;
  }
};

// src/lib/mcp/stdio-transport.ts
var StdioTransport = class {
  constructor(config) {
    this.config = config;
  }
  config;
  _connected = false;
  stdin = null;
  stdout = null;
  messageHandler = null;
  buffer = "";
  get connected() {
    return this._connected;
  }
  async connect() {
    this.stdin = this.config?.stdin ?? process.stdin;
    this.stdout = this.config?.stdout ?? process.stdout;
    this._connected = true;
    this.stdin.on("data", (chunk) => {
      this.buffer += chunk.toString("utf-8");
      this.processBuffer();
    });
    this.stdin.on("end", () => {
      this._connected = false;
    });
    logger.info("Stdio transport connected");
  }
  async send(message) {
    if (!this.stdout) throw new Error("Transport not connected");
    const json = JSON.stringify(message);
    const content = `Content-Length: ${Buffer.byteLength(json)}\r
\r
${json}`;
    this.stdout.write(content);
  }
  onMessage(handler) {
    this.messageHandler = handler;
  }
  async close() {
    this._connected = false;
    this.stdin = null;
    this.stdout = null;
    this.buffer = "";
    logger.info("Stdio transport closed");
  }
  processBuffer() {
    while (this.buffer.length > 0) {
      const headerEnd = this.buffer.indexOf("\r\n\r\n");
      if (headerEnd === -1) break;
      const header = this.buffer.substring(0, headerEnd);
      const match = header.match(/Content-Length:\s*(\d+)/i);
      if (!match) {
        this.buffer = this.buffer.substring(headerEnd + 4);
        continue;
      }
      const contentLength = parseInt(match[1], 10);
      const bodyStart = headerEnd + 4;
      const bodyEnd = bodyStart + contentLength;
      if (this.buffer.length < bodyEnd) break;
      const body = this.buffer.substring(bodyStart, bodyEnd);
      this.buffer = this.buffer.substring(bodyEnd);
      try {
        const message = JSON.parse(body);
        if (this.messageHandler) {
          this.messageHandler(message);
        }
      } catch (error) {
        logger.warn(`Failed to parse MCP message: ${error}`);
      }
    }
  }
};

// src/lib/cli/chinese-detector.ts
var CJK_PATTERN = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/;
var STRING_LITERAL_PATTERNS = [
  /(['"`])([^'"`]*[\u4e00-\u9fff][^'"`]*)\1/g,
  /`([^`]*[\u4e00-\u9fff][^`]*)`/g
];
var IGNORE_PATTERNS = [
  /^[\s]*\/\/.*$/,
  /^[\s]*\*.*$/,
  /^[\s]*<!--.*-->$/,
  /console\.(log|warn|error|info|debug)\s*\(/,
  /import\s+/,
  /export\s+/,
  /\/\/\s*@/,
  /\/\//
];
var ChineseDetector = class {
  ignorePatterns;
  fileExtensions;
  constructor(config) {
    this.ignorePatterns = config?.ignorePatterns ?? IGNORE_PATTERNS;
    this.fileExtensions = new Set(
      config?.extensions ?? [".ts", ".tsx", ".js", ".jsx", ".vue", ".svelte"]
    );
  }
  canDetect(filePath) {
    const ext = filePath.substring(filePath.lastIndexOf("."));
    return this.fileExtensions.has(ext);
  }
  detect(content, filePath) {
    const results = [];
    const lines = content.split("\n");
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      const line = lines[lineIdx];
      if (!line) continue;
      if (!CJK_PATTERN.test(line)) continue;
      const shouldIgnore = this.ignorePatterns.some((p) => p.test(line));
      if (shouldIgnore) continue;
      for (const pattern of STRING_LITERAL_PATTERNS) {
        pattern.lastIndex = 0;
        let match;
        while ((match = pattern.exec(line)) !== null) {
          const text = match[2] ?? match[1] ?? match[0] ?? "";
          if (!CJK_PATTERN.test(text)) continue;
          results.push({
            file: filePath,
            line: lineIdx + 1,
            column: match.index + 1,
            text: text.trim(),
            type: match[0].startsWith("`") ? "template-literal" : "string-literal"
          });
        }
      }
    }
    return results;
  }
  generateReport(results) {
    if (results.length === 0) {
      return "\u2705 No hardcoded Chinese strings detected.";
    }
    const grouped = /* @__PURE__ */ new Map();
    for (const r of results) {
      const existing = grouped.get(r.file) ?? [];
      existing.push(r);
      grouped.set(r.file, existing);
    }
    let report = `\u{1F50D} Found ${results.length} hardcoded Chinese string(s) in ${grouped.size} file(s):

`;
    for (const [file, detections] of grouped) {
      report += `\u{1F4C4} ${file}
`;
      for (const d of detections) {
        report += `   Line ${d.line}:${d.column} \u2014 "${d.text}" (${d.type})
`;
      }
      report += "\n";
    }
    report += `
\u{1F4A1} Tip: Extract these to translation keys using t('key')`;
    return report;
  }
};
var DEFAULT_BACKOFF_POLICY = {
  initialMs: 1e3,
  maxMs: 3e4,
  factor: 2,
  jitter: 0.1
};
function computeBackoff(policy, attempt) {
  const base = policy.initialMs * policy.factor ** Math.max(attempt - 1, 0);
  const jitter = base * policy.jitter * Math.random();
  return Math.min(policy.maxMs, Math.round(base + jitter));
}
async function sleepWithAbort(ms, abortSignal) {
  if (ms <= 0) {
    return;
  }
  try {
    await promises.setTimeout(ms, void 0, { signal: abortSignal });
  } catch (err) {
    if (abortSignal?.aborted) {
      throw new Error("aborted", { cause: err });
    }
    throw err;
  }
}
function createRetryRunner(options) {
  const maxAttempts = options.maxAttempts ?? 3;
  const policy = { ...DEFAULT_BACKOFF_POLICY, ...options.backoffPolicy };
  const shouldRetry = options.shouldRetry ?? ((_, attempt) => attempt < maxAttempts);
  return async function retryRunner(fn) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        if (!shouldRetry(lastError, attempt)) {
          throw lastError;
        }
        if (attempt < maxAttempts) {
          const delayMs = computeBackoff(policy, attempt);
          await sleepWithAbort(delayMs);
        }
      }
    }
    throw lastError;
  };
}

// src/lib/infra/rate-limit.ts
function createFixedWindowRateLimiter(params) {
  const maxRequests = Math.max(1, Math.floor(params.maxRequests));
  const windowMs = Math.max(1, Math.floor(params.windowMs));
  const now = params.now ?? Date.now;
  let count = 0;
  let windowStartMs = 0;
  return {
    consume() {
      const nowMs = now();
      if (nowMs - windowStartMs >= windowMs) {
        windowStartMs = nowMs;
        count = 0;
      }
      if (count >= maxRequests) {
        return {
          allowed: false,
          retryAfterMs: Math.max(0, windowStartMs + windowMs - nowMs),
          remaining: 0
        };
      }
      count += 1;
      return {
        allowed: true,
        retryAfterMs: 0,
        remaining: Math.max(0, maxRequests - count)
      };
    },
    reset() {
      count = 0;
      windowStartMs = 0;
    }
  };
}
function generateSecureUuid() {
  return crypto.randomUUID();
}
function generateSecureToken(bytes = 16) {
  return crypto.randomBytes(bytes).toString("base64url");
}
function generateSecureHex(bytes = 16) {
  return crypto.randomBytes(bytes).toString("hex");
}
function generateSecureFraction() {
  return crypto.randomBytes(4).readUInt32BE(0) / 4294967296;
}
function generateSecureInt(a, b) {
  return typeof b === "number" ? crypto.randomInt(a, b) : crypto.randomInt(a);
}

// src/lib/security/dangerous-operations.ts
var DANGEROUS_OPERATION_NAMES = [
  "exec",
  "spawn",
  "shell",
  "fs_write",
  "fs_delete",
  "fs_move",
  "apply_patch",
  "eval",
  "function_constructor"
];
var DANGEROUS_OPERATIONS_SET = new Set(DANGEROUS_OPERATION_NAMES);
function isDangerousOperation(operationName) {
  return DANGEROUS_OPERATIONS_SET.has(operationName.toLowerCase());
}
function getDangerousOperations() {
  return DANGEROUS_OPERATION_NAMES;
}

// src/lib/security/safe-regex.ts
var SAFE_REGEX_CACHE_MAX = 256;
var safeRegexCache = /* @__PURE__ */ new Map();
function hasUnsafeNestedRepetition(source) {
  let depth = 0;
  let lastWasQuantifier = false;
  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (char === void 0) continue;
    if (char === "(") {
      depth++;
      lastWasQuantifier = false;
    } else if (char === ")") {
      depth--;
      lastWasQuantifier = false;
    } else if ("*+?{".includes(char)) {
      if (lastWasQuantifier && depth > 0) {
        return true;
      }
      lastWasQuantifier = true;
      if (char === "{") {
        const closeIndex = source.indexOf("}", i);
        if (closeIndex === -1) continue;
        i = closeIndex;
      }
    } else if (char === "\\") {
      i++;
      lastWasQuantifier = false;
    } else {
      lastWasQuantifier = false;
    }
  }
  return false;
}
function compileSafeRegex(source, flags) {
  const key = `${source}::${flags ?? ""}`;
  if (safeRegexCache.has(key)) {
    return safeRegexCache.get(key);
  }
  if (!source) {
    const result = { regex: null, source, flags: flags ?? "", reason: "empty" };
    cacheResult(key, result);
    return result;
  }
  if (hasUnsafeNestedRepetition(source)) {
    const result = { regex: null, source, flags: flags ?? "", reason: "unsafe-nested-repetition" };
    cacheResult(key, result);
    return result;
  }
  try {
    const regex = new RegExp(source, flags);
    const result = { regex, source, flags: flags ?? "", reason: null };
    cacheResult(key, result);
    return result;
  } catch {
    const result = { regex: null, source, flags: flags ?? "", reason: "invalid-regex" };
    cacheResult(key, result);
    return result;
  }
}
function testSafeRegex(source, input, flags) {
  const result = compileSafeRegex(source, flags);
  if (!result.regex) {
    return false;
  }
  return result.regex.test(input);
}
function clearSafeRegexCache() {
  safeRegexCache.clear();
}
function cacheResult(key, result) {
  if (safeRegexCache.size >= SAFE_REGEX_CACHE_MAX) {
    const firstKey = safeRegexCache.keys().next().value;
    if (firstKey !== void 0) {
      safeRegexCache.delete(firstKey);
    }
  }
  safeRegexCache.set(key, result);
}
function safeEqualSecret(provided, expected) {
  if (typeof provided !== "string" || typeof expected !== "string") {
    return false;
  }
  const hash = (s) => crypto.createHash("sha256").update(s).digest();
  return crypto.timingSafeEqual(hash(provided), hash(expected));
}

// src/lib/utils/format-time.ts
function formatTimeAgo(durationMs, options) {
  const suffix = options?.suffix !== false;
  const fallback = options?.fallback ?? "unknown";
  if (durationMs == null || !Number.isFinite(durationMs) || durationMs < 0) {
    return fallback;
  }
  const totalSeconds = Math.round(durationMs / 1e3);
  const minutes = Math.round(totalSeconds / 60);
  if (minutes < 1) {
    return suffix ? "just now" : `${totalSeconds}s`;
  }
  if (minutes < 60) {
    return suffix ? `${minutes}m ago` : `${minutes}m`;
  }
  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return suffix ? `${hours}h ago` : `${hours}h`;
  }
  const days = Math.round(hours / 24);
  return suffix ? `${days}d ago` : `${days}d`;
}
function formatRelativeTimestamp(timestampMs, options) {
  const fallback = options?.fallback ?? "n/a";
  if (timestampMs == null || !Number.isFinite(timestampMs)) {
    return fallback;
  }
  const diff = Date.now() - timestampMs;
  const absDiff = Math.abs(diff);
  const isPast = diff >= 0;
  const sec = Math.round(absDiff / 1e3);
  if (sec < 60) {
    return isPast ? "just now" : "in <1m";
  }
  const min = Math.round(sec / 60);
  if (min < 60) {
    return isPast ? `${min}m ago` : `in ${min}m`;
  }
  const hr = Math.round(min / 60);
  if (hr < 24) {
    return isPast ? `${hr}h ago` : `in ${hr}h`;
  }
  const day = Math.round(hr / 24);
  if (!options?.dateFallback || day <= 7) {
    return isPast ? `${day}d ago` : `in ${day}d`;
  }
  const date = new Date(timestampMs);
  try {
    return date.toLocaleDateString(options?.timezone ?? void 0, {
      month: "short",
      day: "numeric",
      timeZone: options?.timezone
    });
  } catch {
    return date.toLocaleDateString();
  }
}
var NOT_FOUND_CODES = /* @__PURE__ */ new Set(["ENOENT", "ENOTDIR"]);
var SYMLINK_OPEN_CODES = /* @__PURE__ */ new Set(["ELOOP", "EINVAL", "ENOTSUP"]);
function normalizeWindowsPathForComparison(input) {
  let normalized = path__default.default.win32.normalize(input);
  if (normalized.startsWith("\\\\?\\")) {
    normalized = normalized.slice(4);
    if (normalized.toUpperCase().startsWith("UNC\\")) {
      normalized = `\\\\${normalized.slice(4)}`;
    }
  }
  return normalized.replaceAll("/", "\\").toLowerCase();
}
function isNodeError(value) {
  return Boolean(
    value && typeof value === "object" && "code" in value
  );
}
function hasNodeErrorCode(value, code) {
  return isNodeError(value) && value.code === code;
}
function isNotFoundPathError(value) {
  return isNodeError(value) && typeof value.code === "string" && NOT_FOUND_CODES.has(value.code);
}
function isSymlinkOpenError(value) {
  return isNodeError(value) && typeof value.code === "string" && SYMLINK_OPEN_CODES.has(value.code);
}
function isPathInside(root, target) {
  if (process.platform === "win32") {
    const rootForCompare = normalizeWindowsPathForComparison(path__default.default.win32.resolve(root));
    const targetForCompare = normalizeWindowsPathForComparison(path__default.default.win32.resolve(target));
    const relative2 = path__default.default.win32.relative(rootForCompare, targetForCompare);
    return relative2 === "" || !relative2.startsWith("..") && !path__default.default.win32.isAbsolute(relative2);
  }
  const resolvedRoot = path__default.default.resolve(root);
  const resolvedTarget = path__default.default.resolve(target);
  const relative = path__default.default.relative(resolvedRoot, resolvedTarget);
  return relative === "" || !relative.startsWith("..") && !path__default.default.isAbsolute(relative);
}
function loadJsonFile(pathname) {
  try {
    if (!fs__default.default.existsSync(pathname)) {
      return void 0;
    }
    const raw = fs__default.default.readFileSync(pathname, "utf8");
    return JSON.parse(raw);
  } catch {
    return void 0;
  }
}
function saveJsonFile(pathname, data) {
  const dir = path__default.default.dirname(pathname);
  if (!fs__default.default.existsSync(dir)) {
    fs__default.default.mkdirSync(dir, { recursive: true, mode: 448 });
  }
  fs__default.default.writeFileSync(pathname, `${JSON.stringify(data, null, 2)}
`, "utf8");
  fs__default.default.chmodSync(pathname, 384);
}
function jsonFileExists(pathname) {
  try {
    return fs__default.default.existsSync(pathname);
  } catch {
    return false;
  }
}
function deleteJsonFile(pathname) {
  try {
    if (fs__default.default.existsSync(pathname)) {
      fs__default.default.unlinkSync(pathname);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

exports.AIProviderManager = AIProviderManager;
exports.ChineseDetector = ChineseDetector;
exports.DANGEROUS_OPERATIONS_SET = DANGEROUS_OPERATIONS_SET;
exports.DANGEROUS_OPERATION_NAMES = DANGEROUS_OPERATION_NAMES;
exports.DEFAULT_BACKOFF_POLICY = DEFAULT_BACKOFF_POLICY;
exports.I18nEngine = I18nEngine;
exports.ICUCompiler = ICUCompiler;
exports.ICUParser = ICUParser;
exports.LRUCache = LRUCache;
exports.MCPServer = MCPServer;
exports.MissingKeyReporter = MissingKeyReporter;
exports.OllamaProvider = OllamaProvider;
exports.OpenAIProvider = OpenAIProvider;
exports.PerformanceTracker = PerformanceTracker;
exports.PluginManager = PluginManager;
exports.QualityEstimator = QualityEstimator;
exports.RTL_LOCALES = RTL_LOCALES;
exports.StdioTransport = StdioTransport;
exports.clearSafeRegexCache = clearSafeRegexCache;
exports.compileSafeRegex = compileSafeRegex;
exports.computeBackoff = computeBackoff;
exports.createConsoleLogger = createConsoleLogger;
exports.createFixedWindowRateLimiter = createFixedWindowRateLimiter;
exports.createLogger = createLogger;
exports.createMirroredLayout = createMirroredLayout;
exports.createRetryRunner = createRetryRunner;
exports.deleteJsonFile = deleteJsonFile;
exports.detectSystemLocale = detectSystemLocale;
exports.flipSpacing = flipSpacing;
exports.formatRelativeTime = formatRelativeTime;
exports.formatRelativeTimestamp = formatRelativeTimestamp;
exports.formatTimeAgo = formatTimeAgo;
exports.generateSecureFraction = generateSecureFraction;
exports.generateSecureHex = generateSecureHex;
exports.generateSecureInt = generateSecureInt;
exports.generateSecureToken = generateSecureToken;
exports.generateSecureUuid = generateSecureUuid;
exports.getAlignment = getAlignment;
exports.getDangerousOperations = getDangerousOperations;
exports.getDirection = getDirection;
exports.getLogLevel = getLogLevel;
exports.getOppositeAlignment = getOppositeAlignment;
exports.hasNodeErrorCode = hasNodeErrorCode;
exports.i18n = i18n;
exports.interpolate = interpolate;
exports.isChineseLocale = isChineseLocale;
exports.isDangerousOperation = isDangerousOperation;
exports.isNodeError = isNodeError;
exports.isNotFoundPathError = isNotFoundPathError;
exports.isPathInside = isPathInside;
exports.isRTL = isRTL;
exports.isSymlinkOpenError = isSymlinkOpenError;
exports.jsonFileExists = jsonFileExists;
exports.loadJsonFile = loadJsonFile;
exports.logger = logger;
exports.mirrorPosition = mirrorPosition;
exports.normalizeLocale = normalizeLocale;
exports.normalizeWindowsPathForComparison = normalizeWindowsPathForComparison;
exports.pluralize = pluralize;
exports.registerI18nTools = registerI18nTools;
exports.safeEqualSecret = safeEqualSecret;
exports.saveJsonFile = saveJsonFile;
exports.setLogLevel = setLogLevel;
exports.setupDocumentDirection = setupDocumentDirection;
exports.sleepWithAbort = sleepWithAbort;
exports.t = t;
exports.testSafeRegex = testSafeRegex;
exports.transformClassForRTL = transformClassForRTL;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map