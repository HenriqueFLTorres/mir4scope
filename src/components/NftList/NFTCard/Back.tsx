"use client";

import type { NftFromMongo } from "@/app/api/get-nfts/route";
import { SPECIAL_ABILITIES_NAMES } from "@/lib/contants";
import { gradeToRarity, handleTierValue } from "@/lib/utils";
import Image from "next/image";

import { getCardRarity, getNFTColor } from ".";
import type {
  NftEquipItem,
  NftSkills,
  NftSpirit,
  NftStats,
} from "../../../../prisma-types";
import SkillFragment from "./SkillFragment";

export default function NFTCardBack({
  power_score,
  skills,
  spirits,
  equip_items,
}: NftFromMongo) {
  const equip_items_values = Object.values(equip_items) as NftEquipItem[];

  const skills_without_special = Object.entries(skills).filter(
    ([name]) => !SPECIAL_ABILITIES_NAMES.includes(name),
  ) as [keyof NftSkills, string][];
  const special_skill = Object.entries(skills).find(([name]) =>
    SPECIAL_ABILITIES_NAMES.includes(name),
  ) as [keyof NftSkills, string];

  return (
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
          {equip_items_values.map(
            ({ enhance, grade, item_path, item_name, tier, item_idx }) => (
              <li
                key={item_idx}
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
                    src={item_path}
                    alt={item_name}
                    className="absolute object-contain"
                  />
                </div>
                {Number(enhance) > 0 ? (
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
          {skills_without_special.slice(1, 7).map(([name, value]) => (
            <SkillFragment key={name} name={name} value={value} />
          ))}
        </ul>
        <SkillFragment name={special_skill[0]} value={special_skill[1]} large />
        <ul className="mt-3 flex justify-around gap-3 p-1">
          {skills_without_special.slice(6).map(([name, value]) => (
            <SkillFragment key={name} name={name} value={value} />
          ))}
        </ul>
      </div>

      <section className="flex flex-col justify-center gap-1">
        <h3 className="ml-4 mr-auto w-max text-xs uppercase">Spirits</h3>
        <ul className="flex flex-wrap items-center justify-center gap-2 p-1">
          {(spirits.inven as unknown as NftSpirit[]).map(
            ({ grade, icon_path, pet_name, transcend }) => (
              <li
                key={pet_name}
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
                    src={icon_path}
                    alt={pet_name}
                    className="absolute object-contain"
                  />
                </div>
                {transcend > 1 ? (
                  <span className="absolute -bottom-1 -left-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#9f916c] bg-[#333] text-xs">
                    {transcend}
                  </span>
                ) : null}
              </li>
            ),
          )}
        </ul>
      </section>
    </div>
  );
}
