import { getReadableNumber } from "@/lib/utils";
import { Globe, Power } from "lucide-react";
import Codex from "../icon/Codex";
import EXP from "../icon/EXP";

export default function NFTTags({
  lvl,
  power_score,
  world_name,
}: {
  lvl: number;
  power_score: number;
  world_name: string;
}) {
  return (
    <ul className="flex flex-wrap gap-2">
      <NFTChips>
        <EXP className="h-6 w-6" /> {lvl}
      </NFTChips>
      <NFTChips>
        <Codex className="h-6 w-6" /> 9,243
      </NFTChips>
      <NFTChips>
        <Power className="h-6 w-6" /> {getReadableNumber(power_score)}
      </NFTChips>
      <NFTChips>
        <Globe className="h-6 w-6" /> {world_name}
      </NFTChips>
    </ul>
  );
}

function NFTChips({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex w-max items-center gap-2 rounded-md border border-black/20 bg-black/10 px-3 py-1.5 text-lg font-medium">
      {children}
    </span>
  );
}
