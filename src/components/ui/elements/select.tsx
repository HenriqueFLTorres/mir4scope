"use client"

import {
  Content,
  Group,
  Icon,
  Item,
  ItemText,
  Label,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Separator,
  Trigger,
  Value,
  Viewport,
} from "@radix-ui/react-select"
import { ChevronDown, ChevronUp } from "lucide-react"
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react"

import { cn } from "@/lib/cn"

const Select = Root

const SelectGroup = Group

const SelectValue = Value

const SelectTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ className, children, ...props }, ref) => (
  <Trigger
    className={cn(
      "group flex h-10 w-full select-none items-center gap-3 rounded-md border border-black/20 bg-gradient-to-b from-black/10 to-black/0 px-3 py-2 text-sm font-medium text-white transition-[box-shadow] placeholder:text-white/60 [&>span]:line-clamp-1",
      "focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
    <Icon asChild>
      <ChevronDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity,_transform] group-data-[state=open]:rotate-180 group-data-[state=open]:opacity-100" />
    </Icon>
  </Trigger>
))
SelectTrigger.displayName = Trigger.displayName

const SelectScrollUpButton = forwardRef<
  ElementRef<typeof ScrollUpButton>,
  ComponentPropsWithoutRef<typeof ScrollUpButton>
>(({ className, ...props }, ref) => (
  <ScrollUpButton
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    ref={ref}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </ScrollUpButton>
))
SelectScrollUpButton.displayName = ScrollUpButton.displayName

const SelectScrollDownButton = forwardRef<
  ElementRef<typeof ScrollDownButton>,
  ComponentPropsWithoutRef<typeof ScrollDownButton>
>(({ className, ...props }, ref) => (
  <ScrollDownButton
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    ref={ref}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </ScrollDownButton>
))
SelectScrollDownButton.displayName = ScrollDownButton.displayName

const SelectContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content> & {
    viewportClass?: string
  }
>(
  (
    { className, children, position = "popper", viewportClass, ...props },
    ref
  ) => (
    <Portal>
      <Content
        className={cn(
          "relative z-50 max-h-96 w-[--radix-select-trigger-width] border-collapse overflow-hidden rounded-md border border-black/20 bg-gradient-to-b from-black/10 to-black/0 text-white shadow-md backdrop-blur-md",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        position={position}
        ref={ref}
        sideOffset={12}
        {...props}
      >
        <SelectScrollUpButton />
        <Viewport className={cn("p-1", viewportClass)}>{children}</Viewport>
        <SelectScrollDownButton />
      </Content>
    </Portal>
  )
)
SelectContent.displayName = Content.displayName

const SelectLabel = forwardRef<
  ElementRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => (
  <Label
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    ref={ref}
    {...props}
  />
))
SelectLabel.displayName = Label.displayName

const SelectItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item> & {
    Icon: JSX.Element
  }
>(({ className, children, Icon, ...props }, ref) => (
  <Item
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded p-2 text-sm outline-none focus:bg-white/10 focus:text-white data-[disabled]:pointer-events-none data-[state=checked]:bg-black/40 data-[disabled]:opacity-60",
      className
    )}
    ref={ref}
    {...props}
  >
    {Icon}
    <ItemText>{children}</ItemText>
  </Item>
))
SelectItem.displayName = Item.displayName

const SelectSeparator = forwardRef<
  ElementRef<typeof Separator>,
  ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    className={cn("-mx-1 my-1 h-px bg-white/20", className)}
    ref={ref}
    {...props}
  />
))
SelectSeparator.displayName = Separator.displayName

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
