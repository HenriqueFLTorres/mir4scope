"use client"

import * as SliderPrimitive from "@radix-ui/react-slider"
import * as React from "react"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    className={cn(
      "relative flex h-5 w-full touch-none select-none items-center",
      className
    )}
    ref={ref}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-x-hidden rounded-full bg-white/20">
      <SliderPrimitive.Range className="absolute h-full bg-white" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full bg-gradient-to-b from-white to-[#B4B4B4] ring-offset-[#7C71AA] transition-[colors,_box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C71AA] disabled:pointer-events-none disabled:opacity-60" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
