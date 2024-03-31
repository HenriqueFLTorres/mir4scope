import type {
  Assets,
  Codex,
  GenericStat,
  InventoryItem,
  Potential,
  Prisma,
  Spirit,
  SpiritSet,
  Succession,
} from "@prisma/client";
import { NextResponse } from "next/server";

type EquipamentObject = {
  enhance: number;
  refineStep: number;
  grade: number;
  tier: number;
  itemName: string;
  itemPath: string;
};

async function getSummary(PROFILE_ID: number) {
  const response = await fetch(
    `https://webapi.mir4global.com/nft/character/summary?seq=${PROFILE_ID}&languageCode=en`,
  );
  const { code, data } = await response.json();

  if (code !== 200) throw new Error("Mir4 summary API Error");

  const { character, tradeType, equipItem } = data;

  const equipamentObject: EquipamentObject[] = Object.values(equipItem).map(
    ({ enhance, refineStep, grade, tier, itemName, itemPath }: any) => ({
      enhance: Number(enhance),
      refineStep: Number(refineStep),
      grade: Number(grade),
      tier: Number(tier),
      itemName,
      itemPath,
    }),
  );

  return {
    worldName: character.worldName as string,
    tradeType: tradeType as number,
    equipamentObject,
  };
}

async function getInventory(PROFILE_ID: number) {
  const response = await fetch(
    `https://webapi.mir4global.com/nft/character/inven?transportID=${PROFILE_ID}&languageCode=en`,
  );
  const { code, data: inventory } = await response.json();

  if (code !== 200) throw new Error("Mir4 inventory API Error");

  const formattedInventory: InventoryItem[] = inventory
    .filter(({ tabCategory }: any) => tabCategory === 0 || tabCategory === 3)
    .map(
      ({
        itemUID,
        itemID,
        enhance,
        stack,
        tranceStep,
        RefineStep,
        itemName,
        grade,
        tabCategory,
        tier,
        itemPath,
      }: any) =>
        ({
          itemUID,
          itemID,
          enhance: Number(enhance),
          refineStep: Number(RefineStep),
          grade: Number(grade),
          tier: Number(tier),
          name: itemName,
          stack,
          tabCategory,
          itemPath,
          tranceStep,
          powerScore: 0,
        }) as Omit<InventoryItem, "nftId">,
    );

  return formattedInventory;
}

async function getStats(PROFILE_ID: number) {
  const response = await fetch(
    `https://webapi.mir4global.com/nft/character/stats?transportID=${PROFILE_ID}&languageCode=en`,
  );
  const { code, data } = await response.json();

  if (code !== 200) throw new Error("Mir4 stats API Error");

  const stats: GenericStat[] = data.lists.map(
    ({ statName, statValue }: any) => ({
      name: statName,
      value: statValue,
    }),
  );

  return stats;
}

async function getSkills(PROFILE_ID: number, classIndex: number) {
  const response = await fetch(
    `https://webapi.mir4global.com/nft/character/skills?transportID=${PROFILE_ID}&class=${classIndex}&languageCode=en`,
  );

  const { code, data } = await response.json();
  if (code !== 200) throw new Error("Mir4 skills API Error");

  const skills: GenericStat[] = data.map(({ skillLevel, skillName }: any) => ({
    name: skillName,
    value: skillLevel,
  }));

  return skills;
}

async function getSpirits(PROFILE_ID: number) {
  const response = await fetch(
    `https://webapi.mir4global.com/nft/character/spirit?transportID=${PROFILE_ID}&languageCode=en`,
  );
  const { code, data } = await response.json();

  if (code !== 200) throw new Error("Mir4 spirits API Error");

  const spirits: Spirit[] = data.inven.map(
    ({ transcend, grade, petName, iconPath }: any) => ({
      transcend,
      grade,
      petName,
      iconPath,
    }),
  );

  const spiritSets: Omit<SpiritSet, "id" | "nftId" | "slotIDs">[] =
    Object.entries(data.equip).map(([slot, petSets]: any) => ({
      setIndex: Number(slot),
      slot: Object.values(petSets).map(
        ({ transcend, grade, petName, iconPath }: any) =>
          ({
            transcend,
            grade,
            petName,
            iconPath,
          }) as Spirit,
      ),
    }));

  return { spirits, spiritSets };
}

async function getMagicStones(
  PROFILE_ID: number,
  mir4Class: number,
  inventory: InventoryItem[],
  seq: number,
) {
  const response = await fetch(
    `https://webapi.mir4global.com/nft/character/magicstone?transportID=${PROFILE_ID}&languageCode=en`,
  );
  const { code, data } = await response.json();

  if (code !== 200) throw new Error("Mir4 magic stone API Error");

  const magicStoneSets = Object.entries(data.equipItem).map(
    ([slot, magicStones]: any) => ({
      setIndex: Number(slot),
      slot: Object.values(magicStones).map(
        ({
          tranceStep,
          RefineStep,
          grade,
          tier,
          itemName,
          itemPath,
          itemIdx,
        }: any) => ({
          tranceStep: Number(tranceStep ?? 0),
          refineStep: RefineStep,
          grade: Number(grade),
          tier: Number(tier),
          name: itemName as string,
          itemPath: itemPath as string,
          itemIdx,
          enhance: 0,
          powerScore: 0,
          stack: 1,
          tabCategory: 3,
        }),
      ),
    }),
  );

  const formattedSets = await Promise.all(
    magicStoneSets.map(async (currentItem) => ({
      setIndex: currentItem.setIndex,
      slot: await Promise.all(
        currentItem.slot.map(async ({ itemIdx, ...restSlot }) => {
          if (!itemIdx)
            throw new Error("Magic stone without itemIdx in inventory.");

          const itemUID = inventory.find(
            (item) => item.itemID === itemIdx,
          )?.itemUID;

          if (itemUID === undefined || Number(itemUID) < 0) {
            throw new Error("Magic stone not found in inventory.");
          }

          const { powerScore, details } = await getItemDetail(
            PROFILE_ID,
            itemUID,
            mir4Class,
            seq,
          );

          return {
            ...restSlot,
            itemUID,
            itemID: itemIdx,
            powerScore,
            details,
          } as any;
        }),
      ),
    })),
  );

  return formattedSets;
}

async function getMysticalPieces(
  PROFILE_ID: number,
  mir4Class: number,
  inventory: InventoryItem[],
  seq: number,
) {
  const response = await fetch(
    `https://webapi.mir4global.com/nft/character/mysticalpiece?transportID=${PROFILE_ID}&languageCode=en`,
  );
  const { code, data } = await response.json();

  if (code !== 200) throw new Error("Mir4 mystical piece API Error");

  const mysticalPieceSets = Object.entries(data.equipItem).map(
    ([slot, mysticalPiece]: any) => ({
      setIndex: Number(slot),
      slot: Object.values(mysticalPiece).map(
        ({
          tranceStep,
          RefineStep,
          grade,
          tier,
          itemName,
          itemPath,
          itemIdx,
        }: any) => ({
          tranceStep: Number(tranceStep ?? 0),
          refineStep: RefineStep,
          grade: Number(grade),
          tier: Number(tier),
          name: itemName as string,
          itemPath: itemPath as string,
          itemIdx,
          enhance: 0,
          powerScore: 0,
          stack: 1,
          tabCategory: 3,
        }),
      ),
    }),
  );

  const formattedSets = await Promise.all(
    mysticalPieceSets.map(async (currentItem) => ({
      setIndex: currentItem.setIndex,
      slot: await Promise.all(
        currentItem.slot.map(async ({ itemIdx, ...restSlot }) => {
          if (!itemIdx)
            throw new Error("Mystical piece without itemIdx in inventory.");

          const itemUID = inventory.find(
            (item) => item.itemID === itemIdx,
          )?.itemUID;

          if (itemUID === undefined || Number(itemUID) < 0) {
            throw new Error("Mystical piece not found in inventory.");
          }

          const { powerScore, details } = await getItemDetail(
            PROFILE_ID,
            itemUID,
            mir4Class,
            seq,
          );

          return {
            ...restSlot,
            itemUID,
            itemID: itemIdx,
            powerScore,
            details,
          } as any;
        }),
      ),
    })),
  );

  return formattedSets;
}

async function getSucession(PROFILE_ID: number) {
  const response = await fetch(
    `https://webapi.mir4global.com/nft/character/succession?transportID=${PROFILE_ID}&languageCode=en`,
  );
  const { code, data } = await response.json();

  if (code !== 200) throw new Error("Mir4 succession API Error");

  const succession: Omit<Succession, "id" | "nftId">[] = Object.values(
    data.equipItem,
  ).map(
    ({
      tranceStep,
      enhance,
      RefineStep,
      grade,
      tier,
      itemName,
      itemPath,
    }: any) => ({
      tranceStep,
      enhance,
      RefineStep,
      grade: Number(grade),
      tier: Number(tier),
      itemName: itemName as string,
      itemPath: itemPath as string,
    }),
  );

  return succession;
}

async function getTraining(PROFILE_ID: number) {
  const response = await fetch(
    `https://webapi.mir4global.com/nft/character/training?transportID=${PROFILE_ID}&languageCode=en`,
  );
  const { code, data } = await response.json();

  if (code !== 200) throw new Error("Mir4 training API Error");

  const {
    consitutionLevel,
    collectName,
    collectLevel,
    consitutionName,
    ...innerForceRest
  } = data;

  const innerForce: Pick<GenericStat, "name" | "value">[] = Object.values(
    innerForceRest,
  ).map(({ forceLevel, forceName }: any) => ({
    name: forceName,
    value: forceLevel,
  }));

  return {
    constitutionLevel: consitutionLevel,
    collectName,
    collectLevel,
    innerForce,
  };
}

async function getBuilding(PROFILE_ID: number) {
  const response = await fetch(
    `https://webapi.mir4global.com/nft/character/building?transportID=${PROFILE_ID}&languageCode=en`,
  );
  const { code, data } = await response.json();

  if (code !== 200) throw new Error("Mir4 building API Error");

  const buildings: Pick<GenericStat, "name" | "value">[] = Object.values(
    data,
  ).map(({ buildingName, buildingLevel }: any) => ({
    name: buildingName,
    value: buildingLevel,
  }));

  return buildings;
}

async function getHolyStuff(PROFILE_ID: number) {
  const response = await fetch(
    `https://webapi.mir4global.com/nft/character/holystuff?transportID=${PROFILE_ID}&languageCode=en`,
  );
  const { code, data } = await response.json();

  if (code !== 200) throw new Error("Mir4 holy stuff API Error");

  const holyStuffList: Pick<GenericStat, "name" | "value">[] = Object.values(
    data,
  ).map(({ HolyStuffName, Grade }: any) => ({
    name: HolyStuffName,
    value: Grade,
  }));

  return holyStuffList;
}

async function getAssets(PROFILE_ID: number) {
  const response = await fetch(
    `https://webapi.mir4global.com/nft/character/assets?transportID=${PROFILE_ID}&languageCode=en`,
  );

  const { code, data } = await response.json();

  if (code !== 200) throw new Error("Mir4 assets API Error");

  const {
    copper,
    energy,
    darksteel,
    speedups,
    dragonjade,
    acientcoins,
    dragonsteel,
  } = data;

  return {
    copper,
    energy,
    darksteel,
    speedups,
    dragonjade: Number(dragonjade),
    ancientcoins: acientcoins,
    dragonsteel,
  } as Assets;
}

async function getPotential(PROFILE_ID: number) {
  const response = await fetch(
    `https://webapi.mir4global.com/nft/character/potential?transportID=${PROFILE_ID}&languageCode=en`,
  );
  const { code, data } = await response.json();

  if (code !== 200) throw new Error("Mir4 potential API Error");

  const {
    total,
    totalMax,
    hunting,
    huntingMax,
    pvp,
    pvpMax,
    secondary,
    secondaryMax,
  } = data;

  return {
    total,
    totalMax,
    hunting,
    huntingMax,
    pvp,
    pvpMax,
    secondary,
    secondaryMax,
  } as Omit<Potential, "id" | "nftId">;
}

async function getCodex(PROFILE_ID: number) {
  const response = await fetch(
    `https://webapi.mir4global.com/nft/character/codex?transportID=${PROFILE_ID}&languageCode=en`,
  );
  const { code, data } = await response.json();

  if (code !== 200) throw new Error("Mir4 codex API Error");

  const AllCodex: Omit<Codex, "id" | "nftId">[] = Object.values(data).map(
    ({ codexName, totalCount, completed, inprogress }: any) => ({
      codexName,
      totalCount: Number(totalCount),
      completed: Number(completed),
      inprogress: Number(inprogress),
    }),
  );

  return AllCodex;
}

async function getItemDetail(
  PROFILE_ID: number,
  ITEM_ID: string,
  mir4Class: number,
  seq: number,
) {
  try {
    const response = await fetch(
      `https://webapi.mir4global.com/nft/character/itemdetail?transportID=${PROFILE_ID}&class=${mir4Class}&itemUID=${ITEM_ID}&languageCode=en`,
    );
    const { code, data } = await response.json();

    return {
      powerScore: data.powerScore,
      details: [
        ...data.options.map((option: any) => ({
          name: option.optionName,
          value: `${option.optionValue + option.tranceValue}${
            option.optionFormat
          }`,
        })),
        ...data.addOptions.map((option: any) => ({
          name: option.optionName,
          value: `${option.optionValue + option.optionTranceStep}${
            option.optionAddFormat
          }`,
        })),
      ],
    };
  } catch (error) {
    throw new Error("Mir4 item detail API Error");
  }
}

export async function GET() {
  const index = 1;

  return NextResponse.json(
    {
      success: false,
    },
    { status: 500, statusText: "Server error." },
  );
}
