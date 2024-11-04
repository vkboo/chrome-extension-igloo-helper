// TODO
// 需要一个抓接口与当前host的匹配表

import { response } from '@extension/network-interceptor';
import * as React from 'react';
import SearchBox from './components/search-box';
import SearchResult from './components/search-result';
import type { Platform } from './components/search-result/types';

export default function App() {
  const platforms = useNetworkResponse<Platform[]>('GET /v1/admin_account/admin/platforms', _response => {
    const getLogoUrl = (key: string) => `https://static.iglooinsure.com/partner/square/${key}.svg`;
    const platforms: any[] = _response.platforms ?? [];
    return platforms.map(p => {
      return {
        key: p.key,
        logoUrl: getLogoUrl(p.key),
        name: p.name,
        country: p?.countries?.[0],
        kind: p.kind,
      };
    });
  });

  const filterPlatforms = (keyword: string) => {
    // if (keyword.trim() === '') return [];
    const newPlatforms = (platforms ?? []).filter(e => {
      const conditionKey = e.key.toLowerCase().includes(keyword);
      const conditionName = e.name.toLowerCase().includes(keyword);
      return conditionKey || conditionName;
    });
    return newPlatforms;
  };

  // return null;

  return (
    <SearchBox className="fixed right-8 top-20 z-50">
      {keyword => <SearchResult platforms={filterPlatforms(keyword)} />}
    </SearchBox>
  );
}

// TODO: 提取到Shared里面去
function useNetworkResponse<T extends any>(descriptor: string, filterFn: (n: any) => T = n => n) {
  const [data, setData] = React.useState<T>();
  React.useEffect(() => {
    const unsubscribe = response.on(descriptor, (_, res) => {
      setData(filterFn?.(res.data));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return data;
}
