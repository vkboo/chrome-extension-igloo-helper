import fs from 'node:fs';
import { GLOBAL_MATCHES } from '@extension/shared';

const packageJson = JSON.parse(fs.readFileSync('../package.json', 'utf8'));

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  name: 'Igloo Helper for staff use',
  version: packageJson.version,
  description: 'Chrome extension boilerplate developed with Vite, React and Typescript',
  host_permissions: ['<all_urls>'],
  permissions: ['storage', 'scripting', 'tabs', 'notifications'],
  options_page: 'options/index.html',
  background: {
    service_worker: 'background.iife.js',
    type: 'module',
  },
  icons: {
    128: 'icon-128.png',
  },
  content_scripts: [
    {
      matches: GLOBAL_MATCHES,
      js: ['content-ui/index.iife.js'],
    },
    {
      matches: GLOBAL_MATCHES,
      js: ['content-main/index.iife.js'],
      run_at: 'document_start',
      all_frames: true,
      world: 'MAIN',
    },
  ],
  web_accessible_resources: [
    {
      resources: ['*.js', '*.css', '*.svg', 'icon-128.png', 'icon-34.png'],
      matches: ['*://*/*'],
    },
  ],
};

export default manifest;
