// TODO
// 没有hmr的watch,这个package里面的其他文件可能也存在类似的问题

export function injectScript() {
  const src = chrome.runtime.getURL('page_scripts/overwriteXhrFetch.js');
  const s = document.createElement('script');
  s.src = src;
  s.onload = function () {
    s.remove();
  };
  (document.head || document.documentElement).appendChild(s);
}
