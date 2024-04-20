import { cn } from "@/lib/utils";
import type { NFTSelectAll } from "@/types/schema";
import Image from "next/image";
import Conquest from "../icon/Conquest";
import NFTContainer from "./NFTContainer";

const BUILDING_POSITIONS = {
  Mine: { left: "3rem", top: "10rem" },
  Forge: { left: "8.5rem", top: "15rem" },
  "Sanctuary of Hydra": { left: "15.2rem", top: "16rem" },
  "Tower of Conquest": { left: "22.7rem", top: "12rem" },
  "Tower of Quintessence": { left: "28rem", top: "16rem" },
  "Millennial Tree": { left: "33rem", top: "14rem" },
  Portal: { left: "39.2rem", top: "15rem" },
  "Tower of Victory": { left: "45.5rem", top: "15rem" },
  "Training Sanctum": { left: "50.75rem", top: "17rem" },
  "Holy Shrine": { left: "57.7rem", top: "13rem" },
};

export default function NFTBuildings({
  buildings,
}: Pick<NFTSelectAll, "buildings">) {
  return (
    <NFTContainer className="relative col-span-2 items-center justify-center p-0">
      <header className="absolute top-0 flex w-full items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <Conquest className="h-8 w-8" />
          <h2 className="text-xl font-semibold">Conquest</h2>
        </div>
      </header>

      <Image
        src={"/conquest.webp"}
        alt=""
        height={1080}
        width={1920}
        className="w-full rounded-xl object-contain"
      />

      {Object.entries(buildings).map(([name, tier]) => (
        <BuildingFragment
          key={name}
          name={name}
          tier={tier}
          style={BUILDING_POSITIONS[name as NFT_BUILDINGS_ENUM]}
        />
      ))}
    </NFTContainer>
  );
}

function BuildingFragment({
  tier,
  name,
  className,
  ...props
}: {
  tier: number | string;
  name: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("absolute flex flex-col items-center gap-2", className)}
      {...props}
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center">
        <Image
          src={"/training-frame.webp"}
          alt=""
          width={56}
          height={56}
          className="absolute"
        />

        <p className="absolute mb-8 translate-x-[0.125rem] text-center text-xs font-medium tracking-[0.3em] drop-shadow-[0px_0px_2px_rgba(0,0,0,150)]">
          TIER
        </p>
        <h3 className="text-center text-sm font-extrabold drop-shadow-[0px_0px_2px_rgba(0,0,0,150)]">
          {tier}
        </h3>
      </div>
      <h4 className="absolute mt-16 text-center text-sm font-bold drop-shadow-[0px_0px_2px_rgba(0,0,0,150)]">
        {name}
      </h4>
    </div>
  );
}
