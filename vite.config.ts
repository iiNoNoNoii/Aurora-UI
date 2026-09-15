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
    // `inline` keeps legal comments. Two obligations depend on it, so do NOT
    // set this to 'none':
    //   1. AGPL-3.0 requires everyone who receives the bundle to be able to
    //      find the source, which is what the banner below points at.
    //   2. Lit is BSD-3-Clause and is bundled into dist/. That licence requires
    //      its copyright notice to travel with binary distributions; the
    //      `@license Copyright Google LLC` headers must survive minification.
    // See THIRD-PARTY-NOTICES.md.
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
