'use strict';

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
function createLogger(prefix) {
  {
    return new SilentLogger();
  }
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

exports.MissingKeyReporter = MissingKeyReporter;
exports.PerformanceTracker = PerformanceTracker;
exports.createConsoleLogger = createConsoleLogger;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map