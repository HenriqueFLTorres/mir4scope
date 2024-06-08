import { type InputHTMLAttributes, forwardRef } from "react"
import { Label } from "./label"
import { cn } from "@/lib/cn"

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  prefix?: JSX.Element
  wrapperClass?: string
  label?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClass,
      prefix,
      spellCheck = false,
      label,
      disabled,
      name,
      id = name,
      ...props
    },
    ref
  ) => {
    const PrefixIcon = prefix

    return (
      <div className={cn("relative flex flex-col gap-2", wrapperClass)}>
        {label === undefined ? null : (
          <Label
            className={cn("transition-opacity", { "opacity-50": disabled })}
            htmlFor={name}
          >
            {label}
          </Label>
        )}

        {PrefixIcon}
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-black/20 bg-transparent bg-gradient-to-b from-black/10 to-black/0 px-3 py-2 text-sm text-white transition-[box-shadow,_opacity]",
            "placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50",
            { "pl-10": PrefixIcon },
            className
          )}
          disabled={disabled}
          id={id}
          name={name}
          ref={ref}
          spellCheck={spellCheck}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
