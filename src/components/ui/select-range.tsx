import { getNumber } from '@/lib/utils';
import * as SliderPrimitive from '@radix-ui/react-slider';
import millify from 'millify';
import { useState } from 'react';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface SelectRangeProps
  extends Omit<
    SliderPrimitive.SliderProps,
    'defaultValue' | 'min' | 'max' | 'step'
  > {
  label: string;
  Icon: JSX.Element;
  defaultValue: number[];
  min: number;
  max: number;
  showInput?: boolean;
  step: number;
}

const thumbStyling =
  'block h-5 w-5 rounded-full bg-gradient-to-b from-white to-[#B4B4B4] ring-offset-white transition-[colors,_box-shadow] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60';

const SelectRange = ({
  label,
  Icon,
  min,
  max,
  defaultValue,
  showInput = true,
  step,
  ...props
}: SelectRangeProps) => {
  const [value, setValue] = useState(defaultValue);

  const minValueBlur = () =>
    setValue((value) => [Math.min(value[0], value[1] - step), value[1]]);

  const maxValueBlur = () =>
    setValue((value) => [
      value[0],
      Math.min(max, Math.max(value[0] + step, value[1])),
    ]);

  return (
    <Popover
      onOpenChange={() => {
        minValueBlur();
        maxValueBlur();
      }}
    >
      <PopoverTrigger className='w-72'>
        {Icon}
        {label} {`(${millify(value[0])} - ${millify(value[1])})`}
      </PopoverTrigger>
      <PopoverContent className='flex flex-row py-4 px-3 items-center gap-2'>
        {showInput && (
          <Input
            value={value[0]}
            onChange={(e) => {
              const newValue = getNumber(e.currentTarget.value);
              if (newValue === null) return;

              setValue((value) => [newValue, value[1]]);
            }}
            onBlur={minValueBlur}
            className='px-2 py-1 w-14 text-center h-max'
          />
        )}

        <SliderPrimitive.Root
          className={
            'relative flex w-full h-5 touch-none select-none items-center'
          }
          value={value}
          onValueChange={(val) => setValue(val)}
          defaultValue={defaultValue}
          max={max}
          min={min}
          step={step}
          {...props}
        >
          <SliderPrimitive.Track className='relative h-2 w-full grow overflow-x-hidden rounded-full bg-white/20'>
            <SliderPrimitive.Range className='absolute h-full bg-white' />
          </SliderPrimitive.Track>

          <SliderPrimitive.Thumb className={thumbStyling} />
          <SliderPrimitive.Thumb className={thumbStyling} />
        </SliderPrimitive.Root>

        {showInput && (
          <Input
            value={value[1]}
            onChange={(e) => {
              const newValue = getNumber(e.currentTarget.value);
              if (newValue === null) return;

              setValue((value) => [value[0], newValue]);
            }}
            onBlur={maxValueBlur}
            className='px-2 py-1 w-14 text-center h-max'
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export { SelectRange };
