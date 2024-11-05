import { groupBy } from 'lodash-es';
import { Separator, Avatar, AvatarImage, AvatarFallback } from '@extension/ui';
import { cn } from '@extension/ui/lib/utils';
import type { FC } from 'react';
import * as React from 'react';
import type { Props } from './types';
import { COUNTRY_FLAGS } from './constants';

// TODO
// 键盘导航
export const SearchResult: FC<Props> = props => {
  const { className, platforms } = props;
  const groups = React.useMemo(() => {
    const groupsObj = groupBy(platforms, 'kind');
    return Object.entries(groupsObj);
  }, [platforms]);

  if (groups.length === 0) {
    return null;
  }

  const getPagePlatformList = () => {
    return Array.from(document.querySelectorAll('.igloo-platform') as NodeListOf<HTMLDivElement>).map(node => {
      const nameNode = node.querySelector('.igloo-platform-name');
      const imgNode = node.querySelector('.ant-image-img[src^="https://static.iglooinsure.com/partner"]');
      if (nameNode) {
        const name = nameNode.innerHTML.trim();
        return { name, node };
      } else {
        const src = imgNode!.getAttribute('src')!;
        return { key: extractNameFromUrl(src), node };
      }
    });
  };

  const onClickPlatform = (key: string, name: string) => {
    const list = getPagePlatformList();
    const platform = list.find(item => {
      return item?.key === key || item?.name?.toLocaleLowerCase() === name;
    });
    if (platform) {
      platform.node?.click();
    }
  };

  const groupsNode = groups.map((group, index) => {
    const [groupName, platforms] = group;
    const separatorVisible = index < groups.length - 1;
    return (
      <React.Fragment key={groupName}>
        <div className="space-y-2.5">
          <span className="text-slate-400">{groupName}</span>
          <div className="space-y-2 pl-2">
            {platforms.map(platform => (
              <div
                key={platform.key}
                className="flex items-center gap-1 text-slate-200 hover:underline cursor-pointer"
                onClick={() => {
                  onClickPlatform(platform.key, platform.name.toLocaleLowerCase());
                }}>
                <Avatar className="w-5 h-5">
                  <AvatarImage src={platform.logoUrl} alt="logo" />
                  <AvatarFallback>{platform.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="relative">
                  <span>{platform.name}</span>
                  <span className="absolute -right-4 -top-1">{COUNTRY_FLAGS[platform.country]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {separatorVisible && <Separator className="bg-slate-700" />}
      </React.Fragment>
    );
  });

  return (
    <div className={cn('text-sm px-3 pb-3 space-y-3 max-h-96 overflow-x-hidden overflow-y-auto', className)}>
      {groupsNode}
    </div>
  );
};

function extractNameFromUrl(url: string) {
  const match = url.match(/partner\/\w+\/(.+)\.svg$/);
  return match ? match[1] : '';
}
