import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const pkg = JSON.parse(
  readFileSync(fileURLToPath(new URL('./package.json', import.meta.url)), 'utf8')
) as { version: string };

export default defineConfig({
  define: {
    __AURORA_VERSION__: JSON.stringify(pkg.version),
  },
  esbuild: {
    // Lit 3 uses TC39-stage decorators via TypeScript's legacy decorator emit.
    // esbuild reads experimentalDecorators from tsconfig.json automatically.
    legalComments: 'none',
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    cssCodeSplit: false,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: () => 'aurora-background.js',
    },
    rollupOptions: {
      // Nothing is external: Home Assistant loads a single self-contained module.
      external: [],
      output: {
        inlineDynamicImports: true,
        banner: `/*! Aurora Background v${pkg.version} | MIT License | https://github.com/aurora-ui/aurora-background */`,
      },
    },
  },
});
