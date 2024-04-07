import { cn } from "@/lib/utils";

export default function Enhance({
  value,
  className,
  ...props
}: { value: string | number } & React.HTMLAttributes<HTMLParagraphElement>) {
  if (Number(value) < 1) return null;

  return (
    <p
      className={cn(
        "absolute -right-1 -top-1 flex h-7 w-7 shrink-0 items-center justify-center font-bold drop-shadow",
        className,
      )}
      {...props}
    >
      +{value}
    </p>
  );
}
