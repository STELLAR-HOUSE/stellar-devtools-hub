"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CharacterPanel } from "@/components/ui/CharacterPanel";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { AddressInput } from "@/components/stellar/AddressInput";
import { BalanceList, type DisplayBalance } from "@/components/stellar/BalanceList";
import { getAccountBalances } from "@/lib/stellar/account";

export default function BalanceViewerPage() {
  const [address, setAddress] = useState("");
  const [balances, setBalances] = useState<DisplayBalance[]>([]);
  const [message, setMessage] = useState<{ type: "info" | "success" | "error"; text: string }>({
    type: "info",
    text: "The moon wallet is waiting for a funded testnet account address."
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO(issue #24): Replace button-only loading feedback with skeleton rows and preserved layout height.
    setLoading(true);
    setBalances([]);

    try {
      const nextBalances = await getAccountBalances(address);
      setBalances(nextBalances);
      setMessage({ type: "success", text: "The moon wallet opened and counted balances from testnet Horizon." });
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Unexpected error." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <CharacterPanel
        tone="moon"
        eyebrow="Moon wallet"
        title="Balance Viewer"
        description="The moon wallet opens its pockets and shows native XLM plus issued assets from Stellar testnet Horizon."
      />
      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <AddressInput value={address} onChange={setAddress} />
          <Button type="submit" disabled={loading}>
            {loading ? "Counting..." : "Open moon wallet"}
          </Button>
        </form>
      </Card>
      <StatusMessage type={message.type} title={message.type === "success" ? "Wallet opened" : "Moon wallet status"} description={message.text} />
      {balances.length > 0 ? <BalanceList balances={balances} /> : null}
    </div>
  );
}
