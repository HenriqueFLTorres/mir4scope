import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: JSX.ElementType;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, ...props }, ref) => {
    const PrefixIcon = prefix;

    return (
      <div className='flex w-full relative'>
        {PrefixIcon ? (
          <PrefixIcon className='absolute w-6 h-6 left-2 top-2' />
        ) : null}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md px-3 py-2 text-white text-sm border bg-transparent border-white/20 bg-gradient-to-b from-white/10 to-white/0 transition-[border-color]',
            'placeholder:text-white/60 focus-visible:border-white focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            { ['pl-10']: PrefixIcon },
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
