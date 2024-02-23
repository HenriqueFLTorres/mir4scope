import prisma from "@/lib/prisma";
import {
  Codex,
  GenericStat,
  MagicStone,
  MysticalPiece,
  Nft,
  Potential,
  Prisma,
  Spirit,
  SpiritSet,
  Succession,
} from "@prisma/client";
import { NextResponse } from "next/server";
import dataFromAPI from './allData';

type EquipamentObject = {
  enhance: number;
  refineStep: number;
  grade: number;
  tier: number;
  itemName: string;
  itemPath: string;
};

type InventoryItem = {
  name: string;
  grade: number;
  enhance: number;
  tier: number;
  stack: number;
  mainType: number;
  subType: number;
  tabCategory: number;
  itemPath: string;
  tranceStep: number;
  refineStep: number;
  uniqueNo: string;
  limited: string;
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

  const formattedInventory: InventoryItem[] = inventory.map(
    ({
      enhance,
      stack,
      tranceStep,
      RefineStep,
      limited,
      uniqueNo,
      itemName,
      grade,
      mainType,
      subType,
      tabCategory,
      tier,
      itemPath,
    }: any) => ({
      enhance: Number(enhance),
      refineStep: Number(RefineStep),
      grade: Number(grade),
      tier: Number(tier),
      name: itemName,
      stack,
      mainType,
      subType,
      tabCategory,
      itemPath,
      tranceStep,
      uniqueNo,
      limited,
    }),
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

  const spiritSets: Omit<SpiritSet, "id" | "nftId">[] = Object.entries(
    data.equip,
  ).map(([slot, petSets]: any) => ({
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

async function getMagicStones(PROFILE_ID: number) {
  const response = await fetch(
    `https://webapi.mir4global.com/nft/character/magicstone?transportID=${PROFILE_ID}&languageCode=en`,
  );
  const { code, data } = await response.json();

  if (code !== 200) throw new Error("Mir4 magic stone API Error");

  const magicStoneSets: { setIndex: number; slot: Omit<MagicStone, "id">[] }[] =
    Object.entries(data.equipItem).map(([slot, equipItems]: any) => ({
      setIndex: Number(slot),
      slot: Object.values(equipItems).map(
        ({ tranceStep, RefineStep, grade, tier, itemName, itemPath }: any) => ({
          tranceStep,
          refineStep: RefineStep,
          grade: Number(grade),
          tier: Number(tier),
          itemName: itemName as string,
          itemPath: itemPath as string,
        }),
      ),
    }));

  return magicStoneSets;
}

async function getMysticalPieces(PROFILE_ID: number) {
  const response = await fetch(
    `https://webapi.mir4global.com/nft/character/mysticalpiece?transportID=${PROFILE_ID}&languageCode=en`,
  );
  const { code, data } = await response.json();

  if (code !== 200) throw new Error("Mir4 mystical piece API Error");

  const mysticalPieceSets: {
    setIndex: number;
    slot: Omit<MysticalPiece, "id">[];
  }[] = Object.entries(data.equipItem).map(([slot, mysticalSets]: any) => ({
    setIndex: Number(slot),
    slot: Object.values(mysticalSets).map(
      ({ tranceStep, RefineStep, grade, tier, itemName, itemPath }: any) => ({
        tranceStep,
        RefineStep,
        grade: Number(grade),
        tier: Number(tier),
        itemName: itemName as string,
        itemPath: itemPath as string,
      }),
    ),
  }));

  return mysticalPieceSets;
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
  } as Pick<
    Nft,
    | "copper"
    | "energy"
    | "darksteel"
    | "speedups"
    | "dragonjade"
    | "ancientcoins"
    | "dragonsteel"
  >;
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

export async function GET() {
  const index = 1;

  let allData: Prisma.NftCreateInput[] = []

  try {
    // const response = await fetch(
    //   `https://webapi.mir4global.com/nft/lists?listType=sale&class=0&levMin=0&levMax=0&powerMin=0&powerMax=0&priceMin=0&priceMax=0&sort=latest&page=${index}&languageCode=en`,
    // );
    // const { code, data } = await response.json();

    // if (code !== 200) throw new Error("Mir4 API Error");

    // allData = await Promise.all(
    //   data.lists.map(async (nft: any) => {
    //     const {
    //       seq,
    //       transportID,
    //       nftID,
    //       characterName,
    //       class: mir4Class,
    //       lv,
    //       powerScore,
    //       price,
    //       MirageScore,
    //       MiraX,
    //       Reinforce,
    //     } = nft;

    //     const PROFILE_ID = transportID;

    //     const { worldName, tradeType, equipamentObject } =
    //       await getSummary(seq);
    //     const inventory = await getInventory(PROFILE_ID);
    //     const stats = await getStats(PROFILE_ID);
    //     const skills = await getSkills(PROFILE_ID, mir4Class);
    //     const { spirits, spiritSets } = await getSpirits(PROFILE_ID);
    //     const magicStoneSets = await getMagicStones(PROFILE_ID);
    //     const mysticalPieceSets = await getMysticalPieces(PROFILE_ID);
    //     const succession = await getSucession(PROFILE_ID);
    //     const { constitutionLevel, collectName, collectLevel, innerForce } =
    //       await getTraining(PROFILE_ID);
    //     const buildings = await getBuilding(PROFILE_ID);
    //     const holyStuff = await getHolyStuff(PROFILE_ID);
    //     const {
    //       copper,
    //       energy,
    //       darksteel,
    //       speedups,
    //       dragonjade,
    //       ancientcoins,
    //       dragonsteel,
    //     } = await getAssets(PROFILE_ID);
    //     const potential = await getPotential(PROFILE_ID);
    //     const codex = await getCodex(PROFILE_ID);

    //     const createObject: Prisma.NftCreateInput = {
    //       character_name: characterName,
    //       class: mir4Class,
    //       lvl: lv,
    //       mirage_score: MirageScore,
    //       mirax: MiraX,
    //       nft_id: Number(nftID),
    //       power_score: powerScore,
    //       price,
    //       reinforce: Reinforce,
    //       seq,
    //       transport_id: transportID,
    //       copper,
    //       energy,
    //       darksteel,
    //       speedups,
    //       dragonjade,
    //       ancientcoins,
    //       dragonsteel,
    //       constitutionLevel,
    //       collectName,
    //       collectLevel,
    //       tradeType,
    //       worldName,
    //       equipItem: {
    //         create: equipamentObject,
    //       },
    //       innerForce: {
    //         createMany: {
    //           data: innerForce,
    //         },
    //       },
    //       codex: {
    //         createMany: {
    //           data: codex,
    //         },
    //       },
    //       buildings: {
    //         createMany: { data: buildings },
    //       },
    //       skills: {
    //         createMany: { data: skills },
    //       },
    //       stats: {
    //         createMany: { data: stats },
    //       },
    //       inventory: {
    //         createMany: { data: inventory },
    //       },
    //       potential: {
    //         create: potential,
    //       },
    //       HolyStuff: {
    //         createMany: { data: holyStuff },
    //       },
    //       spirits: {
    //         createMany: {
    //           data: spirits,
    //         },
    //       },
    //       equipedMagicStones: {
    //         create: Object.values(magicStoneSets).map(({ setIndex, slot }) => ({
    //           setIndex,
    //           slot: {
    //             create: slot,
    //           },
    //         })),
    //       },
    //       equipedMysticalPiece: {
    //         create: Object.values(mysticalPieceSets).map(
    //           ({ setIndex, slot }) => ({
    //             setIndex,
    //             slot: {
    //               create: slot,
    //             },
    //           }),
    //         ),
    //       },
    //       equipedSuccession: {
    //         createMany: {
    //           data: succession,
    //         },
    //       },
    //       equipedSpirits: {
    //         create: Object.values(spiritSets).map(({ setIndex, slot }) => ({
    //           setIndex,
    //           slot: {
    //             create: slot,
    //           },
    //         })),
    //       },
    //     };

    //     return createObject;
    //   }),
    // );

    // await Promise.all(
    //   allData.map(async (data) => {
    //     await prisma.nft.create({
    //       data: data,
    //     });
    //   }),
    // );

    return NextResponse.json(
      {
        success: true,
        data: allData,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      { status: 500, statusText: "Server error" },
    );
  }
}
