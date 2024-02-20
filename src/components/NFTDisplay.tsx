import { classIndexToName, cn, getReadableNumber } from "@/lib/utils";
import millify from "millify";
import Image from "next/image";
import TEMPORARY_DATA from "./TEMPORARY_DATA.json";
import Accuracy from "./icon/Accuracy";
import Codex from "./icon/Codex";
import EVA from "./icon/EVA";
import PHYSATK from "./icon/PHYSATK";
import PHYSDEF from "./icon/PHYSDEF";
import Power from "./icon/Power";
import SPELLDEF from "./icon/SPELLDEF";
import SpellATK from "./icon/SpellATK";
import Wemix from "./icon/wemix";

function getStatIcon(stat: StatType) {
  switch (stat) {
    case "PHYS ATK":
      return PHYSATK;
    case "PHYS DEF":
      return PHYSDEF;
    case "Spell ATK":
      return SpellATK;
    case "Spell DEF":
      return SPELLDEF;
    case "EVA":
      return EVA;
    case "Accuracy":
      return Accuracy;
    default:
      throw new Error(`Unknown stat type: ${stat}`);
  }
}

function getCardRarity(powerScore: number) {
  if (powerScore >= 205000) return "legendary";
  if (powerScore >= 170000) return "epic";
  if (powerScore >= 135000) return "rare";

  return "uncommon";
}

function getNFTColor(powerScore: number) {
  if (powerScore >= 205000) return "#C5983F";
  if (powerScore >= 170000) return "#7E1315";
  if (powerScore >= 135000) return "#193148";

  return "#1B4C39";
}

function GlassChip({
  className,
  children,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded border border-white/10 bg-white/5 p-1 text-sm font-medium text-white drop-shadow-sm backdrop-blur-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

const NFTDisplay = () => {
  return (
    <section className="my-24 flex flex-col gap-8 md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {TEMPORARY_DATA.lists.map((data) => {
        return <NFTCard key={data.rowID} {...data} />;
      })}
    </section>
  );
};

function NFTCard({
  characterName,
  lv,
  class: classIndex,
  powerScore,
  price,
  stat,
}: (typeof TEMPORARY_DATA)["lists"][number]) {
  const mir4Class = classIndexToName(classIndex);

  return (
    <div
      className="h-80 w-72 overflow-hidden rounded-lg border-4 shadow-inner drop-shadow-lg duration-75"
      style={{ borderColor: getNFTColor(powerScore) }}
    >
      <Image
        fill
        src={`/${getCardRarity(powerScore)}-card.webp`}
        alt=""
        className="pointer-events-none absolute z-[-1] h-80 w-72 object-cover"
      />

      <p className="pointer-events-none absolute left-0 top-14 z-[-1] inline-block shrink-0 text-nowrap text-6xl font-bold text-white opacity-40 drop-shadow-lg">
        {characterName}
      </p>

      <div
        className={
          "absolute left-0 top-0 z-[-1] h-44 w-full bg-gradient-to-b to-white/0 opacity-75"
        }
        style={{
          backgroundImage: `linear-gradient(to bottom, ${getNFTColor(powerScore)}, rgba(0,0,0,0))`,
        }}
      />

      <div
        className={
          "absolute bottom-0 left-0 z-[-1] h-44 w-full bg-gradient-to-t to-white/0 opacity-75"
        }
        style={{
          backgroundImage: `linear-gradient(to top, ${getNFTColor(powerScore)}, rgba(0,0,0,0))`,
        }}
      />

      <Image
        width={288}
        height={540}
        src={`/class-preview/${mir4Class}.webp`}
        alt=""
        className="pointer-events-none absolute bottom-0 left-1/2 z-[-1] max-w-2xl -translate-x-1/2 rounded-md object-contain"
      />

      <ul className="flex items-center justify-between gap-1 p-1">
        {stat
          .filter(({ statName }) => !["HP", "MP"].includes(statName))
          .map(({ statName, statValue }) => {
            const StatIcon = getStatIcon(statName as StatType);

            return (
              <li
                key={statName}
                className="flex h-8 w-full items-center gap-2 rounded border border-white/10 bg-white/5 p-1 drop-shadow-sm backdrop-blur-md"
              >
                <StatIcon className="h-4 w-4 shrink-0" />
                <p className="flex w-full justify-center text-xs font-medium text-white">
                  {millify(statValue)}
                </p>
              </li>
            );
          })}
      </ul>

      <footer className="absolute bottom-0 mt-auto flex w-full flex-col gap-2 p-1">
        <div className="flex w-full items-end justify-between">
          <h2 className="leading-none drop-shadow-[0px_2px_2px_rgba(0,0,0,0.4)]">
            {characterName}
          </h2>

          <h3 className="text-base leading-none drop-shadow-[0px_2px_2px_rgba(0,0,0,0.4)]">
            LV. {lv}
          </h3>
        </div>

        <div className="flex w-full items-center justify-between">
          <GlassChip className="w-max">
            <Power className="h-4 w-4" /> {getReadableNumber(powerScore)}
          </GlassChip>

          <GlassChip className="w-max">
            <Codex className="h-4 w-4" /> FIX ME
          </GlassChip>
        </div>

        <GlassChip className="mt-auto justify-center text-base">
          <Wemix className="h-5 w-5" /> {getReadableNumber(price)}
        </GlassChip>
      </footer>
    </div>
  );
}

export default NFTDisplay;
