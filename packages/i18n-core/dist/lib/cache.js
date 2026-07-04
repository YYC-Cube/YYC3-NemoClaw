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

export { LRUCache };
//# sourceMappingURL=cache.js.map
//# sourceMappingURL=cache.js.map