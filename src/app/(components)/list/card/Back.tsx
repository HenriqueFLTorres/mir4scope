import Image from "next/image"

import { equip_order } from "@/app/@modal/(.)nft/[id]/(components)/sections/NFTEquipmentDisplay"
import { SPECIAL_ABILITIES_NAMES } from "@/lib/constants"
import { gradeToRarity } from "@/lib/utils"
import type { NFTForDisplay } from "@/types/schema"
import { memo } from "react"
import { toRoman } from "typescript-roman-numbers-converter"
import { getCardRarity, getNFTColor } from "."
import SkillFragment from "./SkillFragment"

const artifacts_order = [11, 12, 13, 14, 15]

function CardBack({ power_score, skills, inven, equip_items }: NFTForDisplay) {
  const skills_without_special = (
    Object.entries(skills) as Entries<typeof skills>
  ).filter(([name]) => !SPECIAL_ABILITIES_NAMES.includes(name))

  const orderedSpiritsInven = inven.sort((a, b) => b.grade - a.grade)

  const special_skill = (Object.entries(skills) as Entries<typeof skills>).find(
    ([name]) => SPECIAL_ABILITIES_NAMES.includes(name)
  )

  return (
    <div
      className="group-hover:rotate-y-180 rotate-y-180 backface-hidden absolute flex h-full w-full flex-col items-center gap-6 overflow-hidden rounded-lg border-4 bg-black p-4 shadow-inner drop-shadow-lg duration-500 group-hover:z-10 group-hover:h-[42rem] group-hover:w-96"
      style={{ borderColor: getNFTColor(power_score) }}
    >
      <Image
        alt=""
        className="pointer-events-none absolute z-[-1] h-[22rem] w-72 object-cover opacity-20 blur-md group-hover:h-[42rem] group-hover:w-96"
        src={`/${getCardRarity(power_score)}-card.webp`}
        fill
      />

      <section className="flex flex-col gap-2">
        <h3 className="mx-4 w-max text-xs uppercase">Equipment</h3>
        <ul className="grid w-max grid-cols-5 items-center gap-3 p-1">
          {[...equip_order, ...artifacts_order].map((key) => {
            if (equip_items.length === 0 || !(key in equip_items)) return null

            const { enhance, grade, item_path, item_name, tier, item_idx } =
              equip_items[key]

            return (
              <li
                className="relative flex h-10 w-10 items-center gap-2 p-1 text-sm font-bold text-white [&>span]:drop-shadow-[0_0_2px_rgb(0,0,0)]"
                key={item_idx}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                  <Image
                    alt=""
                    className="absolute object-contain"
                    height={40}
                    src={`/item-bg-${gradeToRarity(grade)}.webp`}
                    width={40}
                  />
                  <Image
                    alt={item_name}
                    className="absolute object-contain"
                    height={32}
                    src={item_path}
                    width={32}
                  />
                </div>
                {Number(enhance) > 0 && (
                  <span className="absolute -right-1 -top-1 text-xs">
                    +{enhance}
                  </span>
                )}
                {Number(tier) > 1 && (
                  <span className="absolute -bottom-1 -left-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#9f916c] bg-[#333] text-xs">
                    {toRoman(Number(tier))}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </section>

      <div className="flex flex-col items-center">
        <h3 className="ml-4 mr-auto w-max text-xs uppercase">Skills</h3>
        <ul className="mb-3 mt-1 flex gap-3 p-1">
          {skills_without_special.slice(1, 7).map(([name, value]) => (
            <SkillFragment key={name} name={name} value={value} />
          ))}
        </ul>
        {special_skill && (
          <SkillFragment
            name={special_skill[0]}
            value={special_skill[1]}
            large
          />
        )}
        <ul className="mt-3 flex justify-around gap-3 p-1">
          {skills_without_special.slice(6).map(([name, value]) => (
            <SkillFragment key={name} name={name} value={value} />
          ))}
        </ul>
      </div>

      <section className="flex flex-col justify-center gap-1">
        <h3 className="ml-4 mr-auto w-max text-xs uppercase">spirits</h3>
        <ul className="flex flex-wrap items-center justify-center gap-2 p-1">
          {orderedSpiritsInven.map(
            ({ grade, icon_path, pet_name, transcend }) => (
              <li
                className="relative flex h-10 w-10 items-center gap-2 p-1 text-sm font-bold text-white [&>span]:drop-shadow-[0_0_2px_rgb(0,0,0)]"
                key={pet_name}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                  <Image
                    alt=""
                    className="absolute object-contain"
                    height={40}
                    src={`/item-bg-${gradeToRarity(grade)}.webp`}
                    width={40}
                  />
                  <Image
                    alt={pet_name}
                    className="absolute object-contain"
                    height={32}
                    src={icon_path}
                    width={32}
                  />
                </div>
                {transcend > 1 ? (
                  <span className="absolute -bottom-1 -left-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#9f916c] bg-[#333] text-xs">
                    {toRoman(transcend)}
                  </span>
                ) : null}
              </li>
            )
          )}
        </ul>
      </section>
    </div>
  )
}

const NFTCardBack = memo(CardBack)

export default NFTCardBack
