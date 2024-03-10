import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  prefix?: JSX.Element;
  wrapperClass?: string;
}

type LabeledInputProps =
  | (InputProps & { label: string; name: string })
  | (InputProps & { label?: undefined });

const Input = React.forwardRef<HTMLInputElement, LabeledInputProps>(
  (
    { className, wrapperClass, type, disabled, prefix, name, label, ...props },
    ref,
  ) => {
    const PrefixIcon = prefix;

    return (
      <div className={cn("relative flex flex-col gap-2", wrapperClass)}>
        {label && (
          <Label
            className={cn("transition-opacity", { ["opacity-50"]: disabled })}
            htmlFor={name}
          >
            {label}
          </Label>
        )}

        {PrefixIcon}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-black/20 bg-transparent bg-gradient-to-b from-black/10 to-black/0 px-3 py-2 text-sm text-white transition-[box-shadow,_opacity]",
            "placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50",
            { ["pl-10"]: PrefixIcon },
            className,
          )}
          ref={ref}
          id={name}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
