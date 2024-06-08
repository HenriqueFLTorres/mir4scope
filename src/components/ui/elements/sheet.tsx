"use client"

import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  forwardRef,
} from "react"

import { cn } from "@/lib/cn"

const Sheet = Root

const SheetTrigger = Trigger

const SheetClose = Close

const SheetPortal = Portal

const SheetOverlay = forwardRef<
  ElementRef<typeof Overlay>,
  ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => (
  <Overlay
    className={cn(
      "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = Overlay.displayName

interface SheetContentProps extends ComponentPropsWithoutRef<typeof Content> {}

const SheetContent = forwardRef<ElementRef<typeof Content>, SheetContentProps>(
  ({ className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <Content
        className={cn(
          "fixed z-50 gap-4 border-l border-black/50 bg-black/30 p-6 text-neutral-100 shadow-lg backdrop-blur-3xl transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=closed]:animate-out",
          "inset-y-0 right-0 h-full w-full max-w-[70rem] data-[state=closed]:slide-out-to-right",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        <Close className="focus:ring-200 absolute right-4 top-4 rounded-sm opacity-70 ring-offset-neutral-950 transition-opacity hover:opacity-100 focus:outline-none focus:ring-neutral-300 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-neutral-800">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Close>
      </Content>
    </SheetPortal>
  )
)
SheetContent.displayName = Content.displayName

const SheetHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = forwardRef<
  ElementRef<typeof Title>,
  ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
  <Title
    className={cn(
      "text-lg font-semibold text-neutral-950 dark:text-neutral-50",
      className
    )}
    ref={ref}
    {...props}
  />
))
SheetTitle.displayName = Title.displayName

const SheetDescription = forwardRef<
  ElementRef<typeof Description>,
  ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description
    className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)}
    ref={ref}
    {...props}
  />
))
SheetDescription.displayName = Description.displayName

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
}
