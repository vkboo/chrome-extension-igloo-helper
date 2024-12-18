import { useNetworkResponse } from '@extension/shared/lib/hooks';
import { SearchBox, SearchResult } from '../../components';
import type { Platform } from '../../components/search-result/types';

export function AuthCenterV1() {
  const scope = useNetworkResponse<Record<string, boolean>>(
    '/v1/admin_account/account/platform/admin/permissions',
    _response => {
      const _scope = {} as Record<string, boolean>;
      _response?.permissions?.forEach(({ key }: any) => {
        _scope[key] = true;
      });
      return _scope;
    },
  );

  const platforms = useNetworkResponse<Platform[]>(
    'GET /v1/admin_account/admin/platforms',
    _response => {
      const getLogoUrl = (key: string) => `https://static.iglooinsure.com/partner/square/${key}.svg`;
      const platforms: any[] = _response.platforms ?? [];
      return platforms
        .map(p => {
          return {
            key: p.key,
            logoUrl: getLogoUrl(p.key),
            name: p.name,
            country: p?.countries?.[0],
            kind: p.kind,
          };
        })
        .filter(({ key }) => {
          if (key !== 'admin') {
            return scope?.[`${key}_permission`] || scope?.[`${key}_role`] || scope?.[`${key}_account`];
          }
          return scope?.admin;
        });
    },
    [scope],
  );

  const filterPlatforms = (keyword: string) => {
    const keywordLower = keyword.toLowerCase();
    const newPlatforms = (platforms ?? []).filter(e => {
      const conditionKey = e.key.toLowerCase().includes(keywordLower);
      const conditionName = e.name.toLowerCase().includes(keywordLower);
      return conditionKey || conditionName;
    });
    return newPlatforms;
  };

  return (
    <SearchBox className="fixed right-8 top-20 z-50">
      {keyword => <SearchResult platforms={filterPlatforms(keyword)} />}
    </SearchBox>
  );
}
