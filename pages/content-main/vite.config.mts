import { resolve } from 'node:path';
import { makeEntryPointPlugin } from '@extension/hmr';
import { isDev, withPageConfig } from '@extension/vite-config';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');

const outDirDist = resolve(rootDir, '..', '..', 'dist');
const outDirContent = resolve(outDirDist, 'content-main');

export default withPageConfig({
  resolve: {
    alias: {
      '@src': srcDir,
    },
  },
  publicDir: resolve(rootDir, 'public'),
  plugins: [
    isDev && makeEntryPointPlugin(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      formats: ['iife'],
      name: 'ContentScriptMain',
      fileName: 'index',
    },
    outDir: outDirContent,
  },
});
