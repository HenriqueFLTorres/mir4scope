"use client"

import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Icon } from "@radix-ui/react-select"
import { ChevronDown } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = ({
  className,
  children,
  noIcon = false,
  ...props
}: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> & {
  noIcon?: boolean
}) => (
  <PopoverPrimitive.Trigger
    className={cn(
      "group flex h-10 w-full select-none items-center gap-3 rounded-md border border-black/20 bg-gradient-to-b from-black/10 to-black/0 px-3 py-2 text-sm font-medium text-white transition-[box-shadow] placeholder:text-white/60 [&>span]:line-clamp-1",
      "focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    {noIcon ? (
      <></>
    ) : (
      <Icon asChild>
        <ChevronDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity,_transform] group-data-[state=open]:rotate-180 group-data-[state=open]:opacity-100" />
      </Icon>
    )}
  </PopoverPrimitive.Trigger>
)

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      className={cn(
        "relative z-50 max-h-96 w-[--radix-popover-trigger-width] border-collapse overflow-hidden rounded-md border border-black/20 bg-gradient-to-b from-black/10 to-black/0 text-white shadow-md backdrop-blur-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      ref={ref}
      sideOffset={12}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverContent, PopoverTrigger }
