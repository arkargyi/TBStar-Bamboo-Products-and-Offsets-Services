import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { execSync } from 'node:child_process';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function tbstarBuildPrerenderPlugin(): Plugin {
  return {
    name: 'tbstar-build-prerender',
    apply: 'build',
    buildStart() {
      if (process.env.SKIP_VITE_PRERENDER === 'true') return;
      execSync('npx tsx scripts/generate-sitemap.ts', { stdio: 'inherit' });
    },
    closeBundle() {
      if (process.env.SKIP_VITE_PRERENDER === 'true') return;
      execSync('npx tsx scripts/prerender.tsx', { stdio: 'inherit' });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), tbstarBuildPrerenderPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio to prevent WebSocket connection errors and flickering.
      hmr: false,
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

