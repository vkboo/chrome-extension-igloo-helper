/**
 * Ensure `callback` is called every time window.location changes
 * Code derived from https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
 *
 * @export
 * @param {function} callback - function to be called when URL changes
 * @returns {MutationObserver} - MutationObserver that watches the URL
 */
export function addLocationChangeCallback(callback: () => void) {
  // Run the callback once right at the start
  window.setTimeout(callback, 0);

  // Set up a `MutationObserver` to watch for changes in the URL
  let oldHref = window.location.href;
  const body = document.querySelector('body')!;
  const observer = new MutationObserver(mutations => {
    if (mutations.some(() => oldHref !== document.location.href)) {
      oldHref = document.location.href;
      callback();
    }
  });

  observer.observe(body, { childList: true, subtree: true });
  return observer;
}

/**
 * Awaits for an element with the specified `selector` to be found
 * and then returns the selected dom node.
 * This is used to delay rendering a widget until its parent appears.
 *
 * @export
 * @param {string} selector
 * @returns {DOMNode}
 */
export async function awaitElement(selector: string) {
  const MAX_TRIES = 60;
  let tries = 0;
  return new Promise((resolve, reject) => {
    function probe() {
      tries++;
      return document.querySelector(selector);
    }

    function delayedProbe() {
      if (tries >= MAX_TRIES) {
        console.log("Can't find element with selector", selector);
        reject();
        return;
      }
      const elm = probe();
      if (elm) {
        resolve(elm);
        return;
      }

      window.setTimeout(delayedProbe, 250);
    }

    delayedProbe();
  });
}

type SystemOS = 'macOS' | 'iOS' | 'Windows' | 'Android' | 'Linux' | 'unknown';
export function getOS(): SystemOS {
  const userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  let os: SystemOS = 'unknown';
  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'macOS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (/Linux/.test(platform)) {
    os = 'Linux';
  }
  return os;
}
