"use client"

import Enhance from "@/app/@modal/(.)nft/[id]/(components)/Enhance"
import ItemDetailTooltip from "@/app/@modal/(.)nft/[id]/(components)/ItemDetailTooltip"
import NFTContainer from "@/app/@modal/(.)nft/[id]/(components)/container"
import { Backpack, Crafting, Spirit, Traddable } from "@/components/other"
import { gradeToRarity } from "@/lib/utils"
import { ArrowDownWideNarrow, Gem, Layers, Plus, Search } from "lucide-react"
import Image from "next/image"
import { useMemo, useState } from "react"
import { toRoman } from "typescript-roman-numbers-converter"
import { Input } from "../../../../../../components/ui/elements/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../../../../../components/ui/elements/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../../components/ui/elements/tabs"

type InventoryTabs =
  | "Equipment"
  | "Material"
  | "Magic Stone"
  | "Spirit"
  | "Sundry"
  | "Secondary Equipment"
  | "Tradable Items"

const INVENTORY_TABS = [
  "Equipment",
  "Material",
  "Magic Stone",
  "Spirit",
  "Sundry",
  "Secondary Equipment",
  "Tradable Items",
] as const

type InventorySortingTypes =
  | "RARITY_ASC"
  | "RARITY_DESC"
  | "TIER_ASC"
  | "TIER_DESC"
  | "ENHANCE_ASC"
  | "ENHANCE_DESC"
  | "QUANTITY_ASC"
  | "QUANTITY_DESC"

export default function NFTInventory({
  inventory,
}: {
  inventory: NFT_INVENTORY_ITEM[]
}) {
  const [itemSearch, setItemSearch] = useState("")
  const [currentTab, setCurrentTab] = useState("equipment")
  const [inventorySorting, setInventorySorting] =
    useState<InventorySortingTypes>("RARITY_DESC")

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const formattedInventory = useMemo(() => {
    const countingObject: {
      [key in InventoryTabs]: { count: number; items: NFT_INVENTORY_ITEM[] }
    } = {
      Equipment: {
        count: 0,
        items: [],
      },
      Material: {
        count: 0,
        items: [],
      },
      "Magic Stone": {
        count: 0,
        items: [],
      },
      Spirit: {
        count: 0,
        items: [],
      },
      Sundry: {
        count: 0,
        items: [],
      },
      "Secondary Equipment": {
        count: 0,
        items: [],
      },
      "Tradable Items": {
        count: 0,
        items: [],
      },
    }

    for (const item of inventory) {
      if (item.is_tradable) {
        countingObject["Tradable Items"].count += 1
        countingObject["Tradable Items"].items.push(item)
      }

      const itemTab = getItemTab(item.main_type)

      countingObject[itemTab].count += 1
      countingObject[itemTab].items.push(item)
    }

    for (const tab of Object.values(countingObject)) {
      tab.items.sort((itemA, itemB) =>
        getSortingComparasion(inventorySorting, itemA, itemB)
      )
    }

    return countingObject
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventorySorting])

  return (
    <NFTContainer className="col-span-2">
      <header className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Backpack className="h-8 w-8" />
          <h2 className="text-xl font-semibold">Inventory</h2>
        </div>
      </header>

      <Tabs
        className="flex flex-col items-start"
        defaultValue="equipment"
        value={currentTab}
        onValueChange={setCurrentTab}
      >
        <TabsList className="mb-6 flex-wrap justify-start gap-4">
          {INVENTORY_TABS.map((tab) => {
            const Icon = getTabIcon(tab)

            return (
              <TabsTrigger
                className="items-center gap-4 p-3 text-xs"
                key={tab}
                value={tab.toLowerCase().replace(/\s/g, "_")}
              >
                <Icon className="h-4 w-4" /> {tab}
                <strong>{formattedInventory[tab].count}</strong>
              </TabsTrigger>
            )
          })}

          <Select
            value={inventorySorting}
            onValueChange={(value) =>
              setInventorySorting(value as InventorySortingTypes)
            }
          >
            <SelectTrigger className="w-72">
              <ArrowDownWideNarrow className="h-5 w-5" />
              Sort By
            </SelectTrigger>
            <SelectContent align="end" className="w-52">
              <SelectItem
                className="gap-2"
                Icon={<Gem className="h-5 w-5" />}
                value={"RARITY_DESC"}
              >
                Rarity Highest
              </SelectItem>
              <SelectItem
                className="gap-2"
                Icon={<Gem className="h-5 w-5" />}
                value={"RARITY_ASC"}
              >
                Rarity Lowest
              </SelectItem>
              <SelectItem
                className="gap-2"
                Icon={<Crafting className="h-5 w-5" />}
                value={"TIER_DESC"}
              >
                Tier Highest
              </SelectItem>
              <SelectItem
                className="gap-2"
                Icon={<Crafting className="h-5 w-5" />}
                value={"TIER_ASC"}
              >
                Tier Lowest
              </SelectItem>
              <SelectItem
                className="gap-2"
                Icon={<Plus className="h-5 w-5" />}
                value={"ENHANCE_DESC"}
              >
                Enhance Highest
              </SelectItem>
              <SelectItem
                className="gap-2"
                Icon={<Plus className="h-5 w-5" />}
                value={"ENHANCE_ASC"}
              >
                Enhance Lowest
              </SelectItem>
              <SelectItem
                className="gap-2"
                Icon={<Layers className="h-5 w-5" />}
                value={"QUANTITY_DESC"}
              >
                Quantity Highest
              </SelectItem>
              <SelectItem
                className="gap-2"
                Icon={<Layers className="h-5 w-5" />}
                value={"QUANTITY_ASC"}
              >
                Quantity Lowest
              </SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Search by item name"
            prefix={<Search className="absolute bottom-2 left-2 h-6 w-6" />}
            spellCheck={false}
            value={itemSearch}
            onChange={(e) => setItemSearch(e.target.value)}
          />
        </TabsList>
        {INVENTORY_TABS.map((tab) => (
          <TabsContent
            className="items-start data-[state=active]:min-h-[30rem]"
            key={tab}
            value={tab.toLowerCase().replace(/\s/g, "_")}
          >
            <ul className="flex flex-wrap gap-3">
              {formattedInventory[tab].items
                .filter((item) =>
                  itemSearch.length > 0
                    ? item.item_name.toLowerCase().includes(itemSearch)
                    : true
                )
                .map((item) => (
                  <ItemDetailTooltip
                    add_option={item?.add_option ?? []}
                    item_name={item.item_name}
                    item_path={item.item_path}
                    key={item.item_uid}
                    options={item?.options ?? []}
                    power_score={item?.power_score}
                    no_detail
                  >
                    <InventoryItem {...item} />
                  </ItemDetailTooltip>
                ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </NFTContainer>
  )
}

function InventoryItem({
  enhance,
  grade,
  item_name,
  item_path,
  stack,
  tier,
  is_tradable,
}: NFT_INVENTORY_ITEM) {
  return (
    <li className="relative flex h-24 w-24 items-center justify-center">
      <Image
        alt=""
        className="absolute z-[-1] object-contain"
        height={96}
        src={`/inventory/bg-${gradeToRarity(grade)}.webp`}
        width={96}
      />
      <Image
        alt={item_name}
        className="absolute z-[0] object-contain"
        height={82}
        src={item_path}
        width={82}
      />

      {is_tradable ? (
        <Traddable className="absolute left-0 top-0 h-8 w-8 drop-shadow-[0px_0px_2px_rgba(0,0,0,0.8)]" />
      ) : null}

      {stack > 0 && (
        <p className="absolute bottom-1.5 right-1.5 text-end font-bold leading-none drop-shadow-[0px_0px_2px_rgba(0,0,0,0.8)]">
          {stack}
        </p>
      )}

      <Enhance
        className="right-1.5 top-1.5 h-auto w-auto text-end leading-none drop-shadow-[0px_0px_2px_rgba(0,0,0,0.8)]"
        value={enhance}
      />

      {Number(tier) > 1 && (
        <p className="absolute bottom-1.5 left-1.5 font-bold leading-none drop-shadow-[0px_0px_2px_rgba(0,0,0,0.8)]">
          {toRoman(Number(tier))}
        </p>
      )}
    </li>
  )
}

function getTabIcon(tab: InventoryTabs) {
  switch (tab) {
    case "Spirit":
      return Spirit
    case "Equipment":
    case "Magic Stone":
    case "Material":
    case "Secondary Equipment":
    case "Sundry":
      return Crafting
    case "Tradable Items":
      return Crafting
    default:
      throw new Error(`Unknown inventory tab: ${tab}`)
  }
}

function getItemTab(main_type: number): InventoryTabs {
  switch (main_type) {
    case 2: // Weapon
    case 3: // Armor
    case 4: // Accessories
    case 20: // Legendary weapon
    case 22: // Artifact
      return "Equipment"
    case 5: // Pills, enhancement, crafting materials
    case 7: // Constitution upgrade materials
    case 9: // BUNCH OF RANDOM MATERIALS
    case 12: // Skill tomes
      return "Material"
    case 17: // Treasuers
      return "Spirit"
    case 8: // Magic Stone
      return "Magic Stone"
    case 6: // Buff potions, scrolls, boxes, tickets
    case 11: // Costumes?
    case 13: // Gear codex
    case 14: // Badges, crystal and tickets
    case 18: // Tickets, summoning tickets and badges
      return "Sundry"
    case 21: // Mystical Piece
    case 23: // Soul orb
    case 24: // Transference equipment
      return "Secondary Equipment"
    default:
      return "Secondary Equipment"
  }
}

function getSortingComparasion(
  inventorySorting: InventorySortingTypes,
  itemA: NFT_INVENTORY_ITEM,
  itemB: NFT_INVENTORY_ITEM
) {
  const RARITY_ASC = Number(itemA.grade) - Number(itemB.grade)
  const RARITY_DESC = Number(itemB.grade) - Number(itemA.grade)

  const ENHANCE_ASC = itemA.enhance - itemB.enhance
  const ENHANCE_DESC = itemB.enhance - itemA.enhance

  const TIER_ASC = Number(itemA.tier) - Number(itemB.tier)
  const TIER_DESC = Number(itemB.tier) - Number(itemA.tier)

  switch (inventorySorting) {
    case "RARITY_ASC":
      return RARITY_ASC + TIER_ASC * 0.1 + ENHANCE_ASC * 0.1
    case "RARITY_DESC":
      return RARITY_DESC + TIER_DESC * 0.1 + ENHANCE_DESC * 0.1
    case "QUANTITY_ASC":
      return (
        itemA.stack -
        itemB.stack +
        RARITY_ASC * 0.5 +
        ENHANCE_ASC * 0.1 +
        TIER_ASC * 0.1
      )
    case "QUANTITY_DESC":
      return (
        itemB.stack -
        itemA.stack +
        RARITY_DESC * 0.5 +
        ENHANCE_DESC * 0.1 +
        TIER_DESC * 0.1
      )
    case "ENHANCE_ASC":
      return ENHANCE_ASC + RARITY_ASC * 0.1 + TIER_ASC * 0.1
    case "ENHANCE_DESC":
      return ENHANCE_DESC + RARITY_DESC * 0.1 + TIER_DESC * 0.1
    case "TIER_ASC":
      return TIER_ASC + RARITY_ASC * 0.1 + ENHANCE_ASC * 0.1
    case "TIER_DESC":
      return TIER_DESC + RARITY_DESC * 0.1 + ENHANCE_DESC * 0.1
    default:
      throw new Error(`Unknown inventory sorting type: ${inventorySorting}`)
  }
}
