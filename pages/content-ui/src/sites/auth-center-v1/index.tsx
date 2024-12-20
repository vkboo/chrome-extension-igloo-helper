import * as React from 'react';
import type { FC } from 'react';
import { SearchBox, SearchResult } from '../../components';
import { useRequest as useAxios } from '@extension/shared';
import { useRequest } from 'ahooks';

export const AuthCenterV1: FC<{ request?: Request }> = props => {
  const request = useAxios();

  const { data: scope } = useRequest(async () => {
    const response: any = await request('/v1/admin_account/account/platform/admin/permissions');
    const _scope = {} as Record<string, boolean>;
    response?.permissions?.forEach(({ key }: any) => {
      _scope[key] = true;
    });
    return _scope;
  });

  const { data: allPlatforms } = useRequest(async () => {
    const response: any = await request('/v1/admin_account/admin/platforms');
    const getLogoUrl = (key: string) => `https://static.iglooinsure.com/partner/square/${key}.svg`;
    const plats: any[] = response.platforms ?? [];
    return plats.map(p => {
      return {
        key: p.key,
        logoUrl: getLogoUrl(p.key),
        name: p.name,
        country: p?.countries?.[0],
        kind: p.kind,
      };
    });
  });

  const platforms = React.useMemo(
    () =>
      allPlatforms?.filter(e => {
        const { key } = e;
        if (key !== 'admin') {
          return scope?.[`${key}_permission`] || scope?.[`${key}_role`] || scope?.[`${key}_account`];
        }
        return scope?.admin;
      }),
    [allPlatforms, scope],
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
};
