import { cn, getNumber } from '@/lib/utils';
import millify from 'millify';
import { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export interface StatusRangeProps {
  label: string;
  Icon: JSX.Element;
}

const StatusRange = ({ label, Icon }: StatusRangeProps) => {
  const [value, setValue] = useState<[number, number]>([0, 10000]);

  const [hasMin, setHasMin] = useState(false);
  const [hasMax, setHasMax] = useState(false);

  const getLabel = () => {
    if (hasMin && hasMax)
      return `(${millify(value[0])} - ${millify(value[1])})`;
    if (hasMin) return `+${millify(value[0])}`;
    if (hasMax) return `< ${millify(value[1])}`;

    return '(Any)';
  };

  return (
    <Popover>
      <PopoverTrigger
        className={cn('w-72 font-normal', {
          ['from-error-400/20 to-error-400/5 border-error-400 focus:ring-error-400']:
            value[0] > value[1] && hasMin && hasMax,
        })}
      >
        {Icon}
        <span>
          {label} <b>{getLabel()}</b>
        </span>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col py-4 px-3 items-center gap-4'>
        <div className='flex w-full items-end gap-2'>
          <Input
            label='Min'
            name='min'
            value={value[0]}
            onChange={(e) => {
              const newValue = getNumber(e.currentTarget.value);
              if (newValue === null) return;

              setValue((value) => [newValue, value[1]]);
            }}
            wrapperClass='w-full'
            className='px-2 py-1 w-full h-max'
            disabled={!hasMin}
          />

          <Checkbox
            defaultChecked={false}
            checked={hasMin}
            onCheckedChange={(value) =>
              setHasMin(value === 'indeterminate' ? false : value)
            }
            className='w-[1.875rem] h-[1.875rem]'
          />
        </div>

        <div className='flex w-full items-end gap-2'>
          <Input
            label='Max'
            name='max'
            value={value[1]}
            onChange={(e) => {
              const newValue = getNumber(e.currentTarget.value);
              if (newValue === null) return;

              setValue((value) => [value[0], newValue]);
            }}
            wrapperClass='w-full'
            className='px-2 py-1 w-full h-max'
            disabled={!hasMax}
          />

          <Checkbox
            defaultChecked={false}
            checked={hasMax}
            onCheckedChange={(value) =>
              setHasMax(value === 'indeterminate' ? false : value)
            }
            className='w-[1.875rem] h-[1.875rem]'
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { StatusRange };
