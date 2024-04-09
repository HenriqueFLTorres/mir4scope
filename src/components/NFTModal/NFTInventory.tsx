"use client";

import { gradeToRarity } from "@/lib/utils";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toRoman } from "typescript-roman-numbers-converter";
import type { NftInventoryItem } from "../../../prisma-types";
import Backpack from "../icon/Backpack";
import Crafting from "../icon/Crafting";
import Spirit from "../icon/Spirit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Enhance from "./Enhance";
import NFTContainer from "./NFTContainer";

type InventoryTabs =
  | "Equipment"
  | "Material"
  | "Magic Stone"
  | "Spirit"
  | "Sundry"
  | "Secondary Equipment";

const INVENTORY_TABS = [
  "Equipment",
  "Material",
  "Magic Stone",
  "Spirit",
  "Sundry",
  "Secondary Equipment",
] as const;

export default function NFTInventory({
  inventory,
}: {
  inventory: NftInventoryItem[];
}) {
  const [currentTab, setCurrentTab] = useState("equipment");

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const formattedInventory = useMemo(() => {
    const countingObject: {
      [key in InventoryTabs]: { count: number; items: NftInventoryItem[] };
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
    };

    for (const item of inventory) {
      const itemTab = getItemTab(item.main_type);

      countingObject[itemTab].count += 1;
      countingObject[itemTab].items.push(item);
    }

    return countingObject;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NFTContainer className="col-span-2">
      <header className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Backpack className="h-8 w-8" />
          <h2 className="text-xl font-semibold">Inventory</h2>
        </div>
      </header>

      <Tabs
        value={currentTab}
        onValueChange={setCurrentTab}
        defaultValue="equipment"
        className="flex flex-col items-start"
      >
        <TabsList className="mb-6">
          {INVENTORY_TABS.map((tab) => {
            const Icon = getTabIcon(tab);

            return (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase().replace(/\s/g, "_")}
                className="items-center gap-4 p-3 text-xs"
              >
                <Icon className="h-4 w-4" /> {tab}
                <strong>{formattedInventory[tab].count}</strong>
              </TabsTrigger>
            );
          })}
        </TabsList>
        {INVENTORY_TABS.map((tab) => (
          <TabsContent key={tab} value={tab.toLowerCase().replace(/\s/g, "_")}>
            <ul className="flex flex-wrap gap-3">
              {formattedInventory[tab].items.map((item) => (
                <InventoryItem key={item.item_uid} {...item} />
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </NFTContainer>
  );
}

function InventoryItem({
  enhance,
  grade,
  item_name,
  item_path,
  refine_step,
  stack,
  tier,
}: NftInventoryItem) {
  return (
    <li className="relative flex h-24 w-24 items-center justify-center">
      <Image
        src={`/inventory/bg-${gradeToRarity(grade)}.webp`}
        alt=""
        width={96}
        height={96}
        className="absolute z-[-1] object-contain"
      />
      <Image
        src={item_path}
        alt={item_name}
        width={82}
        height={82}
        className="absolute z-[0] object-contain"
      />

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
  );
}

function getTabIcon(tab: InventoryTabs) {
  switch (tab) {
    case "Spirit":
      return Spirit;
    case "Equipment":
    case "Magic Stone":
    case "Material":
    case "Secondary Equipment":
    case "Sundry":
      return Crafting;
    default:
      throw new Error(`Unknown inventory tab: ${tab}`);
  }
}

function getItemTab(main_type: number): InventoryTabs {
  switch (main_type) {
    case 2: // Weapon
    case 3: // Armor
    case 4: // Accessories
    case 20: // Legendary weapon
    case 22: // Artifact
      return "Equipment";
    case 5: // Pills, enhancement, crafting materials
    case 7: // Constitution upgrade materials
    case 9: // BUNCH OF RANDOM MATERIALS
    case 12: // Skill tomes
      return "Material";
    case 17: // Treasuers
      return "Spirit";
    case 8: // Magic Stone
      return "Magic Stone";
    case 6: // Buff potions, scrolls, boxes, tickets
    case 11: // Costumes?
    case 13: // Gear codex
    case 14: // Badges, crystal and tickets
    case 18: // Tickets, summoning tickets and badges
      return "Sundry";
    case 21: // Mystical Piece
    case 23: // Soul orb
    case 24: // Transference equipment
      return "Secondary Equipment";
    default:
      return "Secondary Equipment";
  }
}
