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
    //
    // `inline` keeps `/*! … */` comments: AGPL-3.0 requires everyone who
    // receives the bundle to be able to find the source, so the banner must
    // survive minification. Do not set this to 'none'.
    legalComments: 'inline',
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
      fileName: () => 'aurora-ui.js',
    },
    rollupOptions: {
      // Nothing is external: Home Assistant loads a single self-contained module.
      external: [],
      output: {
        inlineDynamicImports: true,
        // AGPL-3.0 requires recipients to be pointed at the source, so the
        // banner survives minification (esbuild keeps a leading `/*!`).
        banner:
          `/*! Aurora UI v${pkg.version} | AGPL-3.0-or-later | Source: https://github.com/iiNoNoNoii/Aurora-UI */`,
      },
    },
  },
});
