import { getNumber } from '@/lib/utils';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { useState } from 'react';
import { Input } from './input';
import { Select, SelectContent, SelectTrigger } from './select';

export interface SelectRangeProps
  extends Omit<SliderPrimitive.SliderProps, 'defaultValue' | 'min' | 'max'> {
  label: string;
  Icon: JSX.Element;
  defaultValue: number[];
  min: number;
  max: number;
}

const thumbStyling =
  'block h-5 w-5 rounded-full bg-gradient-to-b from-white to-[#B4B4B4] ring-offset-white transition-[colors,_box-shadow] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60';

const SelectRange = ({
  label,
  Icon,
  min,
  max,
  defaultValue,
  ...props
}: SelectRangeProps) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <Select>
      <SelectTrigger className='w-72'>
        {Icon}
        {label} {`(${value[0]} - ${value[1]})`}
      </SelectTrigger>
      <SelectContent viewportClass='flex flex-row items-center gap-2'>
        <Input
          value={value[0]}
          onChange={(e) => {
            const newValue = getNumber(e.currentTarget.value);
            if (newValue === null) return;

            setValue((value) => [newValue, value[1]]);
          }}
          onBlur={() =>
            setValue((value) => [Math.min(value[0], value[1] - 5), value[1]])
          }
          className='px-2 py-1 w-12 text-center h-max'
        />

        <SliderPrimitive.Root
          className={
            'relative flex w-full h-5 touch-none select-none items-center'
          }
          value={value}
          onValueChange={(val) => setValue(val)}
          defaultValue={defaultValue}
          max={max}
          min={min}
          {...props}
        >
          <SliderPrimitive.Track className='relative h-2 w-full grow overflow-x-hidden rounded-full bg-white/20'>
            <SliderPrimitive.Range className='absolute h-full bg-white' />
          </SliderPrimitive.Track>

          <SliderPrimitive.Thumb className={thumbStyling} />
          <SliderPrimitive.Thumb className={thumbStyling} />
        </SliderPrimitive.Root>

        <Input
          value={value[1]}
          onChange={(e) => {
            const newValue = getNumber(e.currentTarget.value);
            if (newValue === null) return;

            setValue((value) => [value[0], newValue]);
          }}
          onBlur={() =>
            setValue((value) => [
              value[0],
              Math.min(max, Math.max(value[0] + 5, value[1])),
            ])
          }
          className='px-2 py-1 w-12 text-center h-max'
        />
      </SelectContent>
    </Select>
  );
};

export { SelectRange };
