import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from './label';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: JSX.Element;
}

type LabeledInputProps =
  | (InputProps & { label: string; name: string })
  | (InputProps & { label?: undefined });

const Input = React.forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ className, type, prefix, name, label, ...props }, ref) => {
    const PrefixIcon = prefix;

    return (
      <div className='flex flex-col gap-2 relative'>
        {label && <Label htmlFor={name}>{label}</Label>}

        {PrefixIcon}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md px-3 py-2 text-white text-sm border bg-transparent border-white/20 bg-gradient-to-b from-white/10 to-white/0 transition-[box-shadow]',
            'placeholder:text-white/60 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            { ['pl-10']: PrefixIcon },
            className
          )}
          ref={ref}
          id={name}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
