import * as React from 'react';
import { addLocationChangeCallback } from '../utils';

export const useWebsiteLocation = () => {
  const getLocation = () => ({
    href: window.location.href,
    hostname: window.location.hostname,
    pathname: window.location.pathname,
  });
  const [location, setLocation] = React.useState(() => getLocation());
  React.useEffect(() => {
    const { disconnect } = addLocationChangeCallback(() => {
      setLocation(getLocation);
    });
    return () => {
      disconnect();
    };
  }, []);
  return location;
};
