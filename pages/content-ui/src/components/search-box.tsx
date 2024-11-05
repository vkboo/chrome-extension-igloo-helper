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
  children: (keyword: string) => React.ReactNode;
};

const os = getOS();

const SearchBox: FC<Props> = props => {
  const { className, children } = props;
  const [keyword, setKeyword] = React.useState<string>('');
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

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeyword(value);
  };

  return (
    // TODO
    // opacity-65 focus-within:opacity-100 hover:bg-slate-700
    <div className={cn('w-72 rounded-md bg-slate-800 overflow-hidden', className)}>
      <div className="group flex items-center justify-center gap-1 px-3  transition-all">
        <MagnifyingGlassIcon className="text-slate-400" width={24} height={24} />
        {/* TODO group-hover:bg-slate-700  */}
        <Input
          ref={inputRef}
          className="peer border-none px-0 rounded-none flex-1"
          placeholder="Quick search..."
          value={keyword}
          onChange={onInputChange}
        />
        <span
          data-focus-tip-key={hotKey}
          data-blur-tip-key="Esc"
          className="text-slate-500 text-sm after:content-[attr(data-focus-tip-key)] peer-focus:after:content-[attr(data-blur-tip-key)]"
        />
      </div>
      {children(keyword)}
    </div>
  );
};

export default SearchBox;
