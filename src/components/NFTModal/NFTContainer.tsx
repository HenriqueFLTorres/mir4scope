import { cn, getReadableNumber } from "@/lib/utils";
import Image from "next/image";
import type { NftAssets } from "../../../prisma-types";
import { useState } from "react";

export default function NFTContainer({
  title,
  children,
  Icon,
  availableSetsIndex,
  className,
}: {
  title: string;
  children: ((currentSet: number) => React.ReactNode) | React.ReactNode;
  Icon: React.ReactNode;
  availableSetsIndex?: string[];
  className?: string;
}) {
  const [currentSet, setCurrentSet] = useState<number>(
    Number(availableSetsIndex?.[0] ?? 1),
  );

  return (
    <section className="flex flex-col gap-8 rounded-xl border border-black/20 bg-black/10 px-6 py-4">
      <header className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {Icon}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>

        {availableSetsIndex && (
          <div className="flex gap-1">
            {availableSetsIndex.map((setIndex) => (
              <button
                type="button"
                key={setIndex}
                className={cn(
                  "rounded border px-1.5 py-1 text-xs transition-colors",
                  "border-black/10 bg-black/5 hover:border-black/40 hover:bg-black/20",
                  "data-[active=true]:border-black/40 data-[active=true]:bg-black/20 data-[active=true]:hover:border-black/60 data-[active=true]:hover:bg-black/40",
                )}
                onClick={() => setCurrentSet(Number(setIndex))}
                data-active={currentSet === Number(setIndex)}
              >
                {setIndex}
              </button>
            ))}
          </div>
        )}
      </header>
      <div className={cn("flex gap-4", className)}>
        {typeof children === "function" ? children(currentSet) : children}
      </div>
    </section>
  );
}
