/** @format */

import { prisma } from "@/utils/db";
import { isAddress } from "ethers/lib/utils";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const walletAddress = searchParams.get("WalletAddress");

    if (!walletAddress) {
      throw new Error("Missing or invalid address");
    }
    if (!isAddress(walletAddress)) {
      throw new Error("Invalid address");
    }

    const wallets = await prisma.wallet.findMany({
      where: {
        signers: {
          has: walletAddress.toLowerCase(),
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
    return NextResponse.json(wallets);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
