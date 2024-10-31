export default function injectScript(src: string) {
  const s = document.createElement('script');
  s.src = chrome.runtime.getURL(src);
  s.onload = function () {
    s.remove();
  };
  (document.head || document.documentElement).appendChild(s);
}
