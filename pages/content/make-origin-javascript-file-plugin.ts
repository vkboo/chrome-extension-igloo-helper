import fs from 'node:fs';
import { resolve } from 'node:path';
import type { PluginOption } from 'vite';

const rootDir = resolve(__dirname);
const targetFilePath = resolve(rootDir, 'src/overwriteXhrFetch.js');

export default function makeOriginJavascriptFilePlugin(config: { outDir: string }): PluginOption {
  function copyFile(filePath: string, to: string) {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to);
    }
    const targetPath = resolve(to, 'overwriteXhrFetch.js');
    fs.copyFileSync(filePath, targetPath);
  }

  return {
    name: 'make-javascript-file',
    buildStart() {
      this.addWatchFile(targetFilePath);
    },
    async writeBundle() {
      const outDir = config.outDir;
      copyFile(targetFilePath, outDir);
    },
  };
}
