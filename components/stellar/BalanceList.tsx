import { Badge } from "@/components/ui/Badge";
import { truncateMiddle } from "@/lib/utils";

export interface DisplayBalance {
  assetCode: string;
  issuer?: string;
  amount: string;
}

export function BalanceList({ balances }: { balances: DisplayBalance[] }) {
  return (
    <div className="space-y-3">
      {/* TODO(issue #4): Improve asset grouping, precision formatting, and empty/liquidity-pool display states. */}
      {balances.map((balance) => (
        <div
          key={`${balance.assetCode}-${balance.issuer ?? "native"}`}
          className="rounded-[1rem] border border-[#fff1cc]/14 bg-[#0b0d16] p-4 shadow-[4px_4px_0_rgba(84,210,255,0.12)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">{balance.assetCode}</p>
              <p className="mt-1 text-xs text-slate-500">
                {/* TODO(issue #23): Replace simple truncation with a copyable issuer display helper. */}
                {balance.issuer ? truncateMiddle(balance.issuer) : "Native Stellar asset in the moon wallet"}
              </p>
            </div>
            <Badge tone="info">{balance.amount}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
