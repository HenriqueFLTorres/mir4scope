"use client"

import {
  Content,
  Group,
  Item,
  Label,
  Portal,
  RadioGroup,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
} from "@radix-ui/react-dropdown-menu"
import { ChevronRight } from "lucide-react"
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react"

import { cn } from "@/lib/utils"

const DropdownMenu = Root

const DropdownMenuTrigger = Trigger

const DropdownMenuGroup = Group

const DropdownMenuPortal = Portal

const DropdownMenuSub = Sub

const DropdownMenuRadioGroup = RadioGroup

const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof SubTrigger>,
  ComponentPropsWithoutRef<typeof SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <SubTrigger
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-black/20 data-[state=open]:bg-black/20",
      inset === true && "pl-8",
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </SubTrigger>
))
DropdownMenuSubTrigger.displayName = SubTrigger.displayName

const DropdownMenuSubContent = forwardRef<
  ElementRef<typeof SubContent>,
  ComponentPropsWithoutRef<typeof SubContent>
>(({ className, collisionPadding = 16, ...props }, ref) => (
  <SubContent
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border border-black/20 bg-gradient-to-b from-black/10 to-black/0 text-white shadow-md backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    collisionPadding={collisionPadding}
    ref={ref}
    {...props}
  />
))
DropdownMenuSubContent.displayName = SubContent.displayName

const DropdownMenuContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Portal>
    <Content
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border border-black/20 bg-gradient-to-b from-black/10 to-black/0 text-white shadow-md backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </Portal>
))
DropdownMenuContent.displayName = Content.displayName

const DropdownMenuItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <Item
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-black/20 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset === true && "pl-8",
      className
    )}
    ref={ref}
    {...props}
  />
))
DropdownMenuItem.displayName = Item.displayName

const DropdownMenuLabel = forwardRef<
  ElementRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <Label
    className={cn(
      "bg-black/10 px-2 py-1.5 text-sm font-semibold",
      inset === true && "pl-8",
      className
    )}
    ref={ref}
    {...props}
  />
))
DropdownMenuLabel.displayName = Label.displayName

const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof Separator>,
  ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    className={cn("-mx-1 h-px bg-black/20", className)}
    ref={ref}
    {...props}
  />
))
DropdownMenuSeparator.displayName = Separator.displayName

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}
