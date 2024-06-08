"use client"

import {
  Content,
  Provider,
  Root,
  TooltipPortal,
  Trigger,
} from "@radix-ui/react-tooltip"

import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react"
import { cn } from "@/lib/utils"

const TooltipProvider = Provider

const Tooltip = Root

const TooltipTrigger = Trigger

const TooltipContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, sideOffset = 12, ...props }, ref) => (
  <TooltipPortal>
    <Content
      className={cn(
        "z-50 overflow-hidden rounded-md border border-black/20 bg-black/10 px-3 py-1.5 text-sm text-white shadow-md backdrop-blur-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </TooltipPortal>
))
TooltipContent.displayName = Content.displayName

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
