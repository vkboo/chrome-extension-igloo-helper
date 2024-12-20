import type { FC, PropsWithChildren } from 'react';
import { useWebsiteLocation } from '@extension/shared/lib/hooks';

type AccessPageProps = {
  matches: string[];
};

export const AccessPage: FC<PropsWithChildren<AccessPageProps>> = props => {
  const { children, matches } = props;
  const { href } = useWebsiteLocation();

  const matched = matches.some(pattern => {
    const regex = new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
    return regex.test(href);
  });

  return matched ? children : null;
};
