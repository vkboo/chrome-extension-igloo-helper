import { resolve } from 'node:path';
import { makeEntryPointPlugin } from '@extension/hmr';
import { isDev, withPageConfig } from '@extension/vite-config';
import { makeJavascriptFile } from '@extension/network-interceptor/plugins';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');


// TODO
// 这个应该可以继续集成在 '@extension/network-interceptor/plugins' 中
const targetFilePath = resolve(
  rootDir,
  'node_modules',
  '@extension/network-interceptor/scripts/overwriteXhrFetch.js'
);



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
    makeJavascriptFile({
      outDir: outDirDist,
      targetFilePath,
    }),
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
