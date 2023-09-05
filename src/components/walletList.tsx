/** @format */

import { Wallet } from "@prisma/client";
import { useEffect, useState } from "react";
type WalletWithTxnsCount = Wallet & {
  _count: {
    transaction: number;
  };
};

export default function WalletList({ address }: { address: string }) {
  const [wallets, setWallets] = useState<WalletWithTxnsCount[]>([]);

  useEffect(() => {
    fetch(`/api/wallets?address=${address}`)
      .then((res) => res.json())
      .then((data) => setWallets(data));
  }, [address]);
}
