import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from './label';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: JSX.Element;
  wrapperClass?: string;
}

type LabeledInputProps =
  | (InputProps & { label: string; name: string })
  | (InputProps & { label?: undefined });

const Input = React.forwardRef<HTMLInputElement, LabeledInputProps>(
  (
    { className, wrapperClass, type, disabled, prefix, name, label, ...props },
    ref
  ) => {
    const PrefixIcon = prefix;

    return (
      <div className={cn('flex flex-col gap-2 relative', wrapperClass)}>
        {label && (
          <Label
            className={cn('transition-opacity', { ['opacity-50']: disabled })}
            htmlFor={name}
          >
            {label}
          </Label>
        )}

        {PrefixIcon}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md px-3 py-2 text-white text-sm border bg-transparent border-white/20 bg-gradient-to-b from-white/10 to-white/0 transition-[box-shadow,_opacity]',
            'placeholder:text-white/60 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            { ['pl-10']: PrefixIcon },
            className
          )}
          ref={ref}
          id={name}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
