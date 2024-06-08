"use client"

import { Content, Portal, Root, Trigger } from "@radix-ui/react-popover"
import { Icon } from "@radix-ui/react-select"
import { ChevronDown } from "lucide-react"
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react"

import { cn } from "@/lib/utils"

const Popover = Root

const PopoverTrigger = ({
  className,
  children,
  noIcon = false,
  ...props
}: ComponentPropsWithoutRef<typeof Trigger> & {
  noIcon?: boolean
}) => (
  <Trigger
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
  </Trigger>
)

const PopoverContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, align = "center", sideOffset = 12, ...props }, ref) => (
  <Portal>
    <Content
      align={align}
      className={cn(
        "relative z-50 max-h-96 w-[--radix-popover-trigger-width] border-collapse overflow-hidden rounded-md border border-black/20 bg-gradient-to-b from-black/10 to-black/0 text-white shadow-md backdrop-blur-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </Portal>
))
PopoverContent.displayName = Content.displayName

export { Popover, PopoverContent, PopoverTrigger }
