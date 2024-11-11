import * as React from 'react';
import { useKeyPress } from 'ahooks';
import { Platform } from './types';

type UseKeyboardNav = (
  groups: [string, Platform[]][],
  onKeyupEnterEvent: (platform: Platform) => void,
) => {
  currentPlatformKey: string | undefined;
  currentRef: React.RefObject<HTMLDivElement>;
  reset: () => void;
};

const useKeyboardNav: UseKeyboardNav = (groups, onKeyupEnterEvent) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const currentRef = React.useRef<HTMLDivElement>(null);

  const platforms = React.useMemo(
    () =>
      groups.reduce((prev: Platform[], cur) => {
        const [, _platforms] = cur;
        return [...prev, ..._platforms];
      }, []),
    [groups],
  );
  const currentPlatform = platforms[currentIndex];

  React.useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'nearest' });
  }, [currentIndex]);

  useKeyPress('uparrow', event => {
    event.preventDefault();
    setCurrentIndex(i => (i > 0 ? i - 1 : i));
  });
  useKeyPress('downarrow', event => {
    event.preventDefault();
    const maxIndex = platforms.length - 1;
    setCurrentIndex(i => (i < maxIndex ? i + 1 : i));
  });
  useKeyPress('enter', () => {
    if (!currentPlatform) return;
    onKeyupEnterEvent(currentPlatform);
  });

  const reset = () => setCurrentIndex(0);

  return {
    currentPlatformKey: currentPlatform?.key,
    currentRef,
    reset,
  };
};

export default useKeyboardNav;
