import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await prisma.nft.deleteMany({
      where: {
        nft_id: {
          gte: 1
        }
      }
    });

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
