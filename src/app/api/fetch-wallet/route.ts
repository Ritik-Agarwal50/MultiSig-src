/** @format */

import { prisma } from "@/utils/db";
import { isAddress } from "ethers/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");

    if (!address) {
      throw new Error("Missing or invalid address");
    }
    if (!isAddress(address)) {
      throw new Error("Invalid address");
    }

    const wallet = await prisma.wallet.findMany({
      where: {
        signer: {
          has: address.toLowerCase(),
        },
      },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });
    return NextResponse.json(wallet);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
