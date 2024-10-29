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
