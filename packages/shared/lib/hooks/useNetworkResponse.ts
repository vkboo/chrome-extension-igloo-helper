import * as React from 'react';
import { response } from '@extension/network';

export function useNetworkResponse<T extends any>(
  descriptor: string,
  filterFn: (n: any) => T = n => n,
  deps: React.DependencyList = [],
) {
  const [data, setData] = React.useState<T>();
  React.useEffect(() => {
    const unsubscribe = response.on(descriptor, (_, res) => {
      setData(filterFn?.(res.data));
    });
    return () => {
      unsubscribe();
    };
  }, deps);

  return data;
}
