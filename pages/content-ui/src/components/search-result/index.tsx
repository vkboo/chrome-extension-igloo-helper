import { Separator, Avatar, AvatarImage, AvatarFallback } from '@extension/ui';
import { cn } from '@extension/ui/lib/utils';
import * as React from 'react';
import type { FC } from 'react';

type Props = {
  className?: string;
  keyword: string;
};

// TODO
// 键盘导航
// 需要一个抓接口与当前host的匹配表
const SearchResult: FC<Props> = props => {
  const { className, keyword } = props;
  return (
    <div className={cn(className, 'px-3 pb-3 text-sm space-y-3')}>
      <div className="space-y-1">
        <span className="text-slate-400">UAP</span>
        <div className="space-y-1.5 pl-2">
          <div
            className="flex items-center gap-1 text-slate-200 hover:underline cursor-pointer"
            tabIndex={0}
            onClick={() => {
              console.log('click');
            }}>
            <Avatar className="w-auto h-5">
              <AvatarImage src={'https://static.iglooinsure.com/partner/square/foodpanda-th.svg'} alt="logo" />
              <AvatarFallback>
                {/* TODO substring(0,2).toUpperCase() */}
                CT
              </AvatarFallback>
            </Avatar>
            <div className="relative">
              <span>LAZADA PH GADGET</span>
              <span className="absolute -right-4 -top-1">🇻🇳</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-slate-200" tabIndex={1}>
            <span>(logo)</span>
            <span>LAZADA PH GADGET</span>
          </div>
          <div className="flex items-center gap-1 text-slate-200" tabIndex={2}>
            <span>(logo)</span>
            <span>LAZADA PH GADGET</span>
          </div>
        </div>
      </div>

      <Separator className="bg-slate-700" />

      <div className="space-y-1">
        <span className="text-slate-400">UAP</span>
        <div className="space-y-1.5 pl-2">
          <div className="flex items-center gap-1 text-slate-200">
            <span>(logo)</span>
            <span>LAZADA PH GADGET</span>
          </div>
          <div className="flex items-center gap-1 text-slate-200">
            <span>(logo)</span>
            <span>LAZADA PH GADGET</span>
          </div>
          <div className="flex items-center gap-1 text-slate-200">
            <span>(logo)</span>
            <span>LAZADA PH GADGET</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
