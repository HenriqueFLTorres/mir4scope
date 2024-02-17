'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icon } from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = ({
  className,
  children,
  noIcon = false,
  ...props
}: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> & {
  noIcon?: boolean;
}) => (
  <PopoverPrimitive.Trigger
    className={cn(
      'flex group h-10 w-full select-none text-white font-medium items-center gap-3 rounded-md border bg-gradient-to-b from-white/10 to-white/0 border-white/20 px-3 py-2 text-sm placeholder:text-white/60 transition-[box-shadow] [&>span]:line-clamp-1',
      'focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    {children}
    {noIcon ? (
      <></>
    ) : (
      <Icon asChild>
        <ChevronDown className='h-4 ml-auto w-4 opacity-60 group-data-[state=open]:opacity-100 transition-[opacity,_transform] group-data-[state=open]:rotate-180' />
      </Icon>
    )}
  </PopoverPrimitive.Trigger>
);

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 backdrop-blur-md w-[--radix-popover-trigger-width] border max-h-96 bg-gradient-to-b from-white/10 to-white/0 border-white/20 overflow-hidden rounded-md border-collapse text-white shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      align={align}
      sideOffset={12}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverContent, PopoverTrigger };
