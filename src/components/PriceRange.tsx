import { getNumber } from '@/lib/utils';
import millify from 'millify';
import { useState } from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectTrigger } from './ui/select';
import Wemix from './icon/wemix';

const MAX_VALUE = 150000;

const PriceRange = () => {
  const [value, setValue] = useState<[number, number | undefined]>([
    0,
    undefined,
  ]);

  const minValueBlur = () =>
    setValue((value) => [Math.min(value[0], value[1] ?? MAX_VALUE), value[1]]);

  const maxValueBlur = () =>
    setValue((value) => [
      value[0],
      Math.min(MAX_VALUE, Math.max(value[0] + 10, value[1] || value[0] + 10)),
    ]);

  const hasValues = Number.isInteger(value[0]) && Number.isInteger(value[1]);

  return (
    <Select
      onOpenChange={() => {
        minValueBlur();
        maxValueBlur();
      }}
    >
      <SelectTrigger className='w-72'>
        <Wemix className='w-5 h-5' />
        Price{' '}
        {hasValues ? `(${millify(value[0])} - ${millify(value[1]!)})` : '(Any)'}
      </SelectTrigger>
      <SelectContent viewportClass='flex flex-row py-4 px-3 items-center gap-2'>
        <Input
          label='From'
          name='from'
          prefix={<Wemix className='absolute w-4 h-4 left-2 bottom-2' />}
          value={value[0]}
          onChange={(e) => {
            const newValue = getNumber(e.currentTarget.value);
            if (newValue === null) return;

            setValue((value) => [newValue, value[1]]);
          }}
          onBlur={minValueBlur}
          className='px-2 py-1 pl-8 w-full h-max'
        />

        <Input
          label='To'
          name='to'
          prefix={<Wemix className='absolute w-4 h-4 left-2 bottom-2' />}
          value={value[1]}
          onChange={(e) => {
            const newValue = getNumber(e.currentTarget.value);
            if (newValue === null) return;

            setValue((value) => [value[0], newValue]);
          }}
          onBlur={maxValueBlur}
          className='px-2 py-1 pl-8 w-full h-max'
        />
      </SelectContent>
    </Select>
  );
};

export { PriceRange };
