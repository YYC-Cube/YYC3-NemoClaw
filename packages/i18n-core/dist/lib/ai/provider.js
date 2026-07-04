// src/lib/infra/logger.ts
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

export { AIProviderManager };
//# sourceMappingURL=provider.js.map
//# sourceMappingURL=provider.js.map