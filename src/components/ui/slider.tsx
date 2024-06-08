"use client"

import { Range, Root, Thumb, Track } from "@radix-ui/react-slider"
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react"

import { cn } from "@/lib/utils"

const Slider = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root
    className={cn(
      "relative flex h-5 w-full touch-none select-none items-center",
      className
    )}
    ref={ref}
    {...props}
  >
    <Track className="relative h-2 w-full grow overflow-x-hidden rounded-full bg-white/20">
      <Range className="absolute h-full bg-white" />
    </Track>
    <Thumb className="block h-5 w-5 rounded-full bg-gradient-to-b from-white to-[#B4B4B4] ring-offset-[#7C71AA] transition-[colors,_box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C71AA] disabled:pointer-events-none disabled:opacity-60" />
  </Root>
))
Slider.displayName = Root.displayName

export { Slider }
