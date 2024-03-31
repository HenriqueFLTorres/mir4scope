import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      success: false,
    },
    { status: 500, statusText: "Server error." },
  );

  // try {
  //   const currentNFTs = await prisma.nft.findMany({
  //     take: 20,
  //     select: {
  //       id: true,
  //       transport_id: true,
  //       class: true,
  //       inventory: true,
  //       seq: true,
  //       equipedMagicStones: {
  //         select: {
  //           setIndex: true,
  //           slotIDs: true,
  //           slot: true,
  //         },
  //       },
  //     },
  //     where: {
  //       equipedMagicStones: {
  //         every: {
  //           slotIDs: {
  //             isEmpty: true,
  //           },
  //         },
  //       },
  //     },
  //   });

  //   await Promise.all(
  //     currentNFTs.map(async (nft) => {
  //       const magicStoneSets = await getMagicStones(
  //         nft.transport_id,
  //         nft.class,
  //         nft.inventory,
  //         nft.seq,
  //       );
  //       const mysticalPieceSets = await getMysticalPieces(
  //         nft.transport_id,
  //         nft.class,
  //         nft.inventory,
  //         nft.seq,
  //       );
  //       const { spiritSets } = await getSpirits(nft.transport_id);
  //       const succession = await getSucession(nft.transport_id);
  //       const buildings = await getBuilding(nft.transport_id);

  //       const formattedMagicStoneSet: Prisma.MagicStoneSetCreateWithoutNftInput[] =
  //         await Promise.all(
  //           magicStoneSets.map(async ({ setIndex, slot }) => ({
  //             setIndex,
  //             slot: {
  //               connectOrCreate: await Promise.all(
  //                 slot.map(
  //                   async ({
  //                     tranceStep,
  //                     refineStep,
  //                     grade,
  //                     tier,
  //                     name,
  //                     itemPath,
  //                     itemID,
  //                     itemUID,
  //                     enhance,
  //                     powerScore,
  //                     stack,
  //                     tabCategory,
  //                     details,
  //                   }: any) => {
  //                     const inventoryItem =
  //                       await prisma?.inventoryItem.findFirst({
  //                         where: {
  //                           nftId: nft?.id,
  //                           itemUID,
  //                           name,
  //                         },
  //                         select: {
  //                           id: true,
  //                           itemUID: true,
  //                         },
  //                       });

  //                     if (!inventoryItem?.id)
  //                       throw new Error("Inventory item not found.");

  //                     return {
  //                       where: {
  //                         id: inventoryItem?.id,
  //                       },
  //                       create: {
  //                         enhance,
  //                         grade,
  //                         itemID: itemID,
  //                         itemPath,
  //                         itemUID: inventoryItem.itemUID,
  //                         name,
  //                         powerScore,
  //                         refineStep,
  //                         stack,
  //                         tabCategory,
  //                         tier,
  //                         tranceStep,
  //                         details: {
  //                           create: details,
  //                         },
  //                       },
  //                     };
  //                   },
  //                 ),
  //               ),
  //             },
  //           })),
  //         );

  //       const formattedEquipedSpirits: Prisma.SpiritSetCreateWithoutNftInput[] =
  //         await Promise.all(
  //           spiritSets.map(async ({ setIndex, slot }: any) => ({
  //             setIndex,
  //             slot: {
  //               connectOrCreate: await Promise.all(
  //                 slot.map(
  //                   async (
  //                     spirit: Omit<Spirit, "id" | "nftId" | "SpirtSetIDs">,
  //                   ) => {
  //                     const foundSpirit = await prisma.spirit.findFirst({
  //                       where: {
  //                         nftId: nft.id,
  //                         petName: slot.petName,
  //                       },
  //                       select: {
  //                         id: true,
  //                       },
  //                     });

  //                     if (!foundSpirit?.id)
  //                       throw new Error("Spirit not found.");

  //                     return {
  //                       where: {
  //                         id: foundSpirit?.id,
  //                         petName: spirit.petName,
  //                       },
  //                       create: spirit,
  //                     };
  //                   },
  //                 ),
  //               ),
  //             },
  //           })),
  //         );

  //       const formattedMysticalPieceSet: Prisma.MysticalPieceSetCreateWithoutNftInput[] =
  //         await Promise.all(
  //           mysticalPieceSets.map(async ({ setIndex, slot }) => ({
  //             setIndex,
  //             slot: {
  //               connectOrCreate: await Promise.all(
  //                 slot.map(
  //                   async ({
  //                     tranceStep,
  //                     refineStep,
  //                     grade,
  //                     tier,
  //                     name,
  //                     itemPath,
  //                     itemID,
  //                     itemUID,
  //                     enhance,
  //                     powerScore,
  //                     stack,
  //                     tabCategory,
  //                     details,
  //                   }: any) => {
  //                     const inventoryItem =
  //                       await prisma?.inventoryItem.findFirst({
  //                         where: {
  //                           nftId: nft?.id,
  //                           itemUID,
  //                           name,
  //                         },
  //                         select: {
  //                           id: true,
  //                           itemUID: true,
  //                         },
  //                       });

  //                     if (!inventoryItem?.id)
  //                       throw new Error("Inventory item not found.");

  //                     return {
  //                       where: {
  //                         id: inventoryItem?.id,
  //                       },
  //                       create: {
  //                         enhance,
  //                         grade,
  //                         itemID: itemID,
  //                         itemPath,
  //                         itemUID: inventoryItem.itemUID,
  //                         name,
  //                         powerScore,
  //                         refineStep,
  //                         stack,
  //                         tabCategory,
  //                         tier,
  //                         tranceStep,
  //                         details: {
  //                           create: details,
  //                         },
  //                       },
  //                     };
  //                   },
  //                 ),
  //               ),
  //             },
  //           })),
  //         );

  //       await prisma?.nft.update({
  //         where: {
  //           id: nft?.id,
  //         },
  //         data: {
  //           equipedSuccession: {
  //             create: succession,
  //           },
  //           buildings: {
  //             create: buildings,
  //           },
  //           equipedSpirits: {
  //             create: formattedEquipedSpirits,
  //           },
  //           equipedMagicStones: {
  //             create: formattedMagicStoneSet,
  //           },
  //           equipedMysticalPiece: {
  //             create: formattedMysticalPieceSet,
  //           },
  //         },
  //       });
  //     }),
  //   ).catch((err) => console.error(err));

  //   return NextResponse.json(
  //     {
  //       success: true,
  //     },
  //     { status: 200 },
  //   );
  // } catch (error) {
  //   console.error(error);
  //   return NextResponse.json(
  //     {
  //       success: false,
  //       message: error,
  //     },
  //     { status: 500, statusText: "Server error" },
  //   );
  // }
}
