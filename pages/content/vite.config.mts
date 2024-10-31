import { resolve } from 'node:path';
import { makeEntryPointPlugin } from '@extension/hmr';
import { isDev, withPageConfig } from '@extension/vite-config';
import makeOriginJavascriptFilePlugin from './make-origin-javascript-file-plugin';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');

const outDir = resolve(rootDir, '..', '..', 'dist', 'content');
export default withPageConfig({
  resolve: {
    alias: {
      '@src': srcDir,
    },
  },
  publicDir: resolve(rootDir, 'public'),
  plugins: [
    isDev && makeEntryPointPlugin(),
    // TODO
    // 优化: 加参数，下面的方法抽离做成公共的
    makeOriginJavascriptFilePlugin({ outDir }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['iife'],
      name: 'ContentScript',
      fileName: 'index',
    },
    outDir: outDir,
  },
});
