import fs from 'node:fs';
import { resolve, basename } from 'node:path';
import type { PluginOption } from 'vite';

const targetFilePath = resolve(__dirname, '../../', './scripts/overwriteXhrFetch.js');

export function makeJavascriptFile(config: { outDir: string }): PluginOption {
  const { outDir: _outDir } = config;
  const outDir = resolve(_outDir, 'page_scripts');
  const filename = basename(targetFilePath);

  function copyFile(filePath: string, to: string) {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to);
    }
    const targetPath = resolve(to, filename);
    fs.copyFileSync(filePath, targetPath);
  }

  return {
    name: 'make-javascript-file',
    buildStart() {
      this.addWatchFile(targetFilePath);
    },
    async writeBundle() {
      copyFile(targetFilePath, outDir);
    },
  };
}
