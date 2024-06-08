"use client"

import { Content, List, Root, Trigger } from "@radix-ui/react-tabs"
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
  forwardRef,
} from "react"

import { cn } from "@/lib/utils"

const Tabs = Root

const TabsList = forwardRef<
  ElementRef<typeof List>,
  ComponentPropsWithoutRef<typeof List>
>(({ className, ...props }, ref) => (
  <List
    className={cn("inline-flex items-center justify-center gap-1", className)}
    ref={ref}
    {...props}
  />
))
TabsList.displayName = List.displayName

const TabsTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger> & {
    children: ReactNode | ReactNode[]
  }
>(({ className, ...props }, ref) => (
  <Trigger
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded border border-transparent px-1.5 py-1 text-xs font-medium ring-offset-white transition-colors",
      "bg-black/10 data-[state=active]:border-black/40 data-[state=active]:bg-black/20",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-black/40 data-[state=active]:shadow-sm",
      className
    )}
    ref={ref}
    {...props}
  />
))
TabsTrigger.displayName = Trigger.displayName

const TabsContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <Content
    className={cn(
      "flex flex-row gap-4 rounded ring-offset-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2",
      className
    )}
    ref={ref}
    {...props}
  />
))
TabsContent.displayName = Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
