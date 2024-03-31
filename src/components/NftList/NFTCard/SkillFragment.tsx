import { cn } from "@/lib/utils";
import Image from "next/image";

export default function SkillFragment({
  name,
  value,
  large = false,
}: {
  name: string;
  value: string | null;
  large?: boolean;
}) {
  return (
    <li
      className={cn(
        "relative flex h-10 w-10 items-center gap-2 rounded-full border-2 border-[#9f916c] text-sm font-bold text-white [&>span]:drop-shadow-[0_0_2px_rgb(0,0,0)]",
        { "h-14 w-14 border-4": large },
      )}
    >
      <Image
        width={large ? 56 : 40}
        height={large ? 56 : 40}
        src={`/skills/${name
          .replace(/\'/g, "")
          .toLowerCase()
          .replace(/\s/g, "-")}.webp`}
        alt={name}
        className="object-contain"
      />
      <span
        className={cn(
          "absolute -bottom-1 -left-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#9f916c] bg-[#333] text-xs",
          { "-bottom-2 -left-2 h-7 w-7 text-sm": large },
        )}
      >
        {value}
      </span>
    </li>
  );
}
