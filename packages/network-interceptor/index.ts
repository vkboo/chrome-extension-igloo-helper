export function injectScript() {
  const src = chrome.runtime.getURL('page_scripts/overwriteXhrFetch.js');
  const s = document.createElement('script');
  s.src = src;
  s.onload = function () {
    s.remove();
  };
  (document.head || document.documentElement).appendChild(s);
}
