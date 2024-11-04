import { resolve } from 'node:path';
import { makeEntryPointPlugin } from '@extension/hmr';
import { isDev, withPageConfig } from '@extension/vite-config';
import { makeJavascriptFile } from '@extension/network-interceptor/plugins';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');


const outDirDist = resolve(rootDir, '..', '..', 'dist');
const outDirContent = resolve(outDirDist, 'content');

export default withPageConfig({
  resolve: {
    alias: {
      '@src': srcDir,
    },
  },
  publicDir: resolve(rootDir, 'public'),
  plugins: [
    isDev && makeEntryPointPlugin(),
    makeJavascriptFile({ outDir: outDirDist }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['iife'],
      name: 'ContentScript',
      fileName: 'index',
    },
    outDir: outDirContent,
  },
});
