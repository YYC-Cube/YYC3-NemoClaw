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

export { type CacheConfig, type CacheStats, LRUCache };
