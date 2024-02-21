import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const filters = (await request.json()) as {
    [key in string]: string | number;
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"}/api/lists`,
      {
        method: "POST",
        body: JSON.stringify({
          listType: "sale",
          class: filters.class,
          levMin: filters.levMin,
          levMax: filters.levMax,
          priceMin: filters.priceMin,
          priceMax: filters.priceMax,
          page: 1,
          powerMin: filters.powerMin,
          powerMax: filters.powerMax,
          sort: filters.sort,
        }),
      },
    );
    const { data } = await response.json();
    if (data.lists.length <= 0) return console.error("NFT Lists is empty");

    await Promise.all(
      data.lists.map(async (nft) => {
        const {
          seq,
          transportID,
          nftID,
          sealedDT,
          characterName,
          class: mir4Class,
          lv,
          powerScore,
          price,
          MirageScore,
          MiraX,
          Reinforce,
          stat,
        } = nft;

        const statsObject: { [key in nftStatName]: number } = {};
        stat.forEach(({ statName, statValue }) => {
          statsObject[statName as nftStatName] = statValue;
        });

        await prisma.nft.create({
          data: {
            character_name: characterName,
            class: mir4Class,
            lvl: lv,
            mirage_score: MirageScore,
            mirax: MiraX,
            nft_id: Number(nftID),
            power_score: powerScore,
            price,
            reinforce: Reinforce,
            seq,
            transport_id: transportID,
            stats: {
              create: {
                hp: statsObject.HP,
                mp: statsObject.MP,
                phys_atk: statsObject["PHYS ATK"],
                spell_atk: statsObject["Spell ATK"],
                phys_def: statsObject["PHYS DEF"],
                spell_def: statsObject["Spell DEF"],
              },
            },
          },
        });
      }),
    );

    const fromthedb = await prisma.nft.findMany();

    return NextResponse.json(
      {
        success: true,
        data: fromthedb,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500, statusText: "Server error" },
    );
  }
}
