"use client"

import { Indicator, Root } from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react"

import { cn } from "@/lib/cn"

const Checkbox = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root
    className={cn(
      "h-5 w-5 shrink-0 rounded-md border border-black/20 bg-gradient-to-b from-black/15 to-black/5 transition-[box-shadow,_border-color,_background-color]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border-black/60 data-[state=checked]:from-black/30 data-[state-checked]:to-black/20 data-[state=checked]:text-neutral-50",
      className
    )}
    ref={ref}
    {...props}
  >
    <Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4 drop-shadow" />
    </Indicator>
  </Root>
))
Checkbox.displayName = Root.displayName

export { Checkbox }
