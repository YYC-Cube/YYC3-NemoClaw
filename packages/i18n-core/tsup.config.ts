import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: false,
    treeshake: true,
    minify: false,
    outDir: 'dist',
  },
  {
    entry: {
      'lib/cache': 'src/lib/cache.ts',
      'lib/plugins/index': 'src/lib/plugins/index.ts',
      'lib/icu/parser': 'src/lib/icu/parser.ts',
      'lib/ai/provider': 'src/lib/ai/provider.ts',
      'lib/mcp/server': 'src/lib/mcp/server.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    splitting: false,
    treeshake: true,
    minify: false,
    outDir: 'dist',
  },
])
