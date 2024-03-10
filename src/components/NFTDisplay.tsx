"use client";

import { SPECIAL_ABILITIES_NAMES } from "@/lib/contants";
import {
  classIndexToName,
  cn,
  getReadableNumber,
  getStatIcon,
  gradeToRarity,
  handleTierValue,
} from "@/lib/utils";
import {
  Codex as CodexType,
  EquipItem,
  GenericStat,
  Nft,
  Spirit,
} from "@prisma/client";
import Image from "next/image";
import Codex from "./icon/Codex";
import Power from "./icon/Power";
import Wemix from "./icon/wemix";

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
        "flex items-center gap-2 rounded border border-black/10 bg-black/40 p-1 text-sm font-medium text-white drop-shadow-sm backdrop-blur-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type NftData = Nft & {
  stats: Pick<GenericStat, "name" | "value">[];
  codex: Pick<CodexType, "completed">[];
  equipItem: Pick<
    EquipItem,
    "enhance" | "itemPath" | "grade" | "refineStep" | "tier" | "itemName"
  >[];
  skills: Pick<GenericStat, "name" | "value">[];
  spirits: Pick<Spirit, "grade" | "petName" | "transcend" | "iconPath">[];
};

const NFTDisplay = ({ nftData }: { nftData: NftData[] }) => {
  return (
    <section className="mb-24 flex flex-col gap-8 md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {nftData.map((data) => {
        return <NFTCard key={data.id} {...data} />;
      })}
    </section>
  );
};

function NFTCard({
  character_name,
  power_score,
  class: classIndex,
  price,
  lvl,
  stats,
  codex,
  equipItem,
  skills,
  spirits,
  nft_id,
  seq,
}: NftData) {
  const mir4Class = classIndexToName(classIndex);

  return (
    <button className="preserve-3d group group relative flex h-[25rem] w-72 hover:z-10">
      <div className="preserve-3d group-hover:rotate-y-180 relative flex h-[25rem] w-72 duration-500">
        <div
          className="backface-hidden absolute h-full w-full overflow-hidden rounded-lg border-4 shadow-inner drop-shadow-lg"
          style={{ borderColor: getNFTColor(power_score) }}
        >
          <Image
            fill
            src={`/${getCardRarity(power_score)}-card.webp`}
            alt=""
            className="pointer-events-none absolute z-[-1] h-[22rem] w-72 object-cover"
          />

          <p className="pointer-events-none absolute left-0 top-14 z-[-1] inline-block shrink-0 text-nowrap text-6xl font-bold text-white opacity-40 drop-shadow-lg">
            {character_name}
          </p>

          <div
            className={
              "absolute left-0 top-0 z-[-1] h-44 w-full bg-gradient-to-b to-black/0 opacity-75"
            }
            style={{
              backgroundImage: `linear-gradient(to bottom, ${getNFTColor(power_score)}, rgba(0,0,0,0))`,
            }}
          />

          <div
            className={
              "absolute bottom-0 left-0 z-[-1] h-44 w-full bg-gradient-to-t to-black/0 opacity-75"
            }
            style={{
              backgroundImage: `linear-gradient(to top, ${getNFTColor(power_score)}, rgba(0,0,0,0))`,
            }}
          />

          <Image
            width={288}
            height={540}
            src={`/class-preview/${mir4Class}.webp`}
            alt=""
            className="pointer-events-none absolute bottom-0 left-1/2 z-[-1] max-w-2xl -translate-x-1/2 rounded-md object-contain"
          />

          <ul className="grid grid-cols-3 items-center justify-between gap-1 p-1">
            {stats
              .filter(({ name }) => !["HP", "MP"].includes(name))
              .map(({ name, value }) => {
                const StatIcon = getStatIcon(name as StatType);
                if (value == undefined) return null;

                return (
                  <li
                    key={name}
                    className="flex h-8 w-full items-center gap-2 rounded border border-black/10 bg-black/40 p-1 drop-shadow-sm backdrop-blur-md"
                  >
                    <StatIcon className="h-4 w-4 shrink-0" />
                    <p className="flex w-full justify-center text-xs font-medium text-white">
                      {value}
                    </p>
                  </li>
                );
              })}
          </ul>

          <footer className="absolute bottom-0 mt-auto flex w-full flex-col gap-2 p-1">
            <div className="flex w-full items-end justify-between">
              <h2 className="leading-none drop-shadow-[0px_2px_2px_rgba(0,0,0,0.4)]">
                {character_name}
              </h2>

              <h3 className="text-base leading-none drop-shadow-[0px_2px_2px_rgba(0,0,0,0.4)]">
                LV. {lvl}
              </h3>
            </div>

            <div className="flex w-full items-center justify-between">
              <GlassChip className="w-max">
                <Power className="h-4 w-4" /> {getReadableNumber(power_score)}
              </GlassChip>

              <GlassChip className="w-max">
                <Codex className="h-4 w-4" />{" "}
                {codex.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.completed,
                  0,
                )}
              </GlassChip>
            </div>

            <GlassChip className="mt-auto justify-center text-base">
              <Wemix className="h-5 w-5" /> {getReadableNumber(price)}
            </GlassChip>
          </footer>
        </div>
        <div
          className="group-hover:rotate-y-180 rotate-y-180 backface-hidden absolute flex h-full w-full flex-col items-center gap-6 overflow-hidden rounded-lg border-4 bg-black p-4 shadow-inner drop-shadow-lg duration-500 group-hover:z-10 group-hover:h-[42rem] group-hover:w-96"
          style={{ borderColor: getNFTColor(power_score) }}
        >
          <Image
            fill
            src={`/${getCardRarity(power_score)}-card.webp`}
            alt=""
            className="pointer-events-none absolute z-[-1] h-[22rem] w-72 object-cover opacity-20 blur-md group-hover:h-[42rem] group-hover:w-96"
          />

          <section className="flex flex-col gap-2">
            <h3 className="mx-4 w-max text-xs uppercase">Equipment</h3>
            <ul className="grid w-max grid-cols-5 items-center gap-3 p-1">
              {equipItem
                .filter(({ itemName }) => !itemName.includes("Dragon Majestic"))
                .map(
                  (
                    { enhance, grade, itemPath, refineStep, itemName, tier },
                    index,
                  ) => (
                    <li
                      key={index}
                      className="relative flex h-10 w-10 items-center gap-2 p-1 text-sm font-bold text-white [&>span]:drop-shadow-[0_0_2px_rgb(0,0,0)]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                        <Image
                          width={40}
                          height={40}
                          src={`/item-bg-${gradeToRarity(grade)}.webp`}
                          alt=""
                          className="absolute object-contain"
                        />
                        <Image
                          width={32}
                          height={32}
                          src={itemPath}
                          alt={itemName}
                          className="absolute object-contain"
                        />
                      </div>
                      {enhance > 0 ? (
                        <span className="absolute -right-1 -top-1 text-xs">
                          +{enhance}
                        </span>
                      ) : null}
                      <span className="absolute -bottom-1 -left-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#9f916c] bg-[#333] text-xs">
                        {handleTierValue(tier)}
                      </span>
                    </li>
                  ),
                )}
            </ul>

            <h3 className="mx-4 w-max text-xs uppercase">Artifacts</h3>
            <ul className="grid w-max grid-cols-5 items-center gap-3 p-1">
              {equipItem
                .filter(({ itemName }) => itemName.includes("Dragon Majestic"))
                .map(
                  (
                    { enhance, grade, itemPath, refineStep, itemName, tier },
                    index,
                  ) => (
                    <li
                      key={index}
                      className="relative flex h-10 w-10 items-center gap-2 p-1 text-sm font-bold text-white [&>span]:drop-shadow-[0_0_2px_rgb(0,0,0)]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                        <Image
                          width={40}
                          height={40}
                          src={`/item-bg-${gradeToRarity(grade)}.webp`}
                          alt=""
                          className="absolute object-contain"
                        />
                        <Image
                          width={32}
                          height={32}
                          src={itemPath}
                          alt={itemName}
                          className="absolute object-contain"
                        />
                      </div>
                      {enhance > 0 ? (
                        <span className="absolute -right-1 -top-1 text-xs">
                          +{enhance}
                        </span>
                      ) : null}
                      <span className="absolute -bottom-1 -left-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#9f916c] bg-[#333] text-xs">
                        {handleTierValue(tier)}
                      </span>
                    </li>
                  ),
                )}
            </ul>
          </section>

          <div className="flex flex-col items-center">
            <h3 className="ml-4 mr-auto w-max text-xs uppercase">Skills</h3>
            <ul className="mb-3 mt-1 flex gap-3 p-1">
              {skills
                .filter(({ name }) => !SPECIAL_ABILITIES_NAMES.includes(name))
                .slice(1, 7)
                .map(({ name, value }, index) => (
                  <SkillFragment key={index} name={name} value={value} />
                ))}
            </ul>
            <SkillFragment
              name={
                skills.find(({ name }) =>
                  SPECIAL_ABILITIES_NAMES.includes(name),
                )?.name ?? ""
              }
              value={
                skills.find(({ name }) =>
                  SPECIAL_ABILITIES_NAMES.includes(name),
                )?.value ?? null
              }
              large
            />
            <ul className="mt-3 flex justify-around gap-3 p-1">
              {skills
                .filter(({ name }) => !SPECIAL_ABILITIES_NAMES.includes(name))
                .slice(6)
                .map(({ name, value }, index) => (
                  <SkillFragment key={index} name={name} value={value} />
                ))}
            </ul>
          </div>

          <section className="flex flex-col justify-center gap-1">
            <h3 className="ml-4 mr-auto w-max text-xs uppercase">Spirits</h3>
            <ul className="flex flex-wrap items-center justify-center gap-2 p-1">
              {spirits.map(({ grade, iconPath, petName, transcend }, index) => (
                <li
                  key={index}
                  className="relative flex h-10 w-10 items-center gap-2 p-1 text-sm font-bold text-white [&>span]:drop-shadow-[0_0_2px_rgb(0,0,0)]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                    <Image
                      width={40}
                      height={40}
                      src={`/item-bg-${gradeToRarity(grade)}.webp`}
                      alt=""
                      className="absolute object-contain"
                    />
                    <Image
                      width={32}
                      height={32}
                      src={iconPath}
                      alt={petName}
                      className="absolute object-contain"
                    />
                  </div>
                  {transcend > 1 ? (
                    <span className="absolute -bottom-1 -left-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#9f916c] bg-[#333] text-xs">
                      {transcend}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </button>
  );
}

export default NFTDisplay;

function SkillFragment({
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
        { ["h-14 w-14 border-4"]: large },
      )}
    >
      <Image
        width={large ? 56 : 40}
        height={large ? 56 : 40}
        src={`/skills/${name.replace(/\'/g, "").toLowerCase().replace(/\s/g, "-")}.webp`}
        alt={name}
        className="object-contain"
      />
      <span
        className={cn(
          "absolute -bottom-1 -left-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#9f916c] bg-[#333] text-xs",
          { ["-bottom-2 -left-2 h-7 w-7 text-sm"]: large },
        )}
      >
        {value}
      </span>
    </li>
  );
}
