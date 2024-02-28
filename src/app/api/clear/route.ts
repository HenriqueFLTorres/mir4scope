import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await prisma.nft.deleteMany();
    await prisma.assets.deleteMany();
    await prisma.spirit.deleteMany();
    await prisma.genericStat.deleteMany();
    await prisma.potential.deleteMany();

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500, statusText: "Server error." },
    );
  }
}
