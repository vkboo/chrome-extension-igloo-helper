import * as React from 'react';
import type { FC } from 'react';
import { Input } from '@extension/ui';
import { getOS } from '@extension/shared/lib/utils';
import { cn } from '@extension/ui/lib/utils';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useKeyPress } from 'ahooks';

type Props = {
  className?: string;
  hotKey?: string;
};

const os = getOS();

const SearchBox: FC<Props> = ({ className }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [hotKey] = React.useState(() => {
    const osKey = os === 'Windows' ? 'Win' : os === 'macOS' ? '⌘' : null;
    return osKey ? `${osKey} K` : osKey;
  });

  useKeyPress(['meta.k'], () => {
    inputRef.current?.focus();
  });

  useKeyPress(['Esc'], () => {
    inputRef.current?.blur();
  });

  return (
    <div
      className={cn(
        'group inline-flex items-center justify-center gap-1 w-72 bg-slate-800 hover:bg-slate-700 px-3 rounded-md transition-all opacity-65 focus-within:opacity-100',
        className,
      )}>
      <MagnifyingGlassIcon className="text-slate-400" width={24} height={24} />
      <Input
        ref={inputRef}
        className="peer border-none px-0 rounded-none group-hover:bg-slate-700 flex-1"
        placeholder="Quick search..."
      />
      <span
        data-focus-tip-key={hotKey}
        data-blur-tip-key="Esc"
        className="text-slate-500 text-sm after:content-[attr(data-focus-tip-key)] peer-focus:after:content-[attr(data-blur-tip-key)]"
      />
    </div>
  );
};

export default SearchBox;
