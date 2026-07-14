import { Badge } from "@/components/ui/Badge";
import { CopyableValue } from "@/components/stellar/CopyableValue";
import type { StellarNetwork } from "@/lib/stellar/horizon";

const explorerBaseUrls: Record<StellarNetwork, string> = {
  testnet: "https://stellar.expert/explorer/testnet/tx",
  mainnet: "https://stellar.expert/explorer/public/tx"
};

export interface TransactionSummary {
  hash: string;
  ledger: number;
  sourceAccount: string;
  feeCharged: string;
  createdAt: string;
  successful: boolean;
  network: StellarNetwork;
  operationCount?: number;
}

function formatFee(stroops: string) {
  const fee = Number(stroops);

  if (!Number.isFinite(fee)) {
    return `${stroops} stroops`;
  }

  return `${fee} stroops (${(fee / 10_000_000).toFixed(7)} XLM)`;
}

export function TransactionDetails({ transaction }: { transaction: TransactionSummary }) {
  const rows = [
    ["Network", transaction.network],
    ["Hash", <CopyableValue key="hash" label="transaction hash" value={transaction.hash} visible={10} />],
    ["Ledger", String(transaction.ledger)],
    ["Source account", <CopyableValue key="source" label="source account" value={transaction.sourceAccount} />],
    ["Fee charged", formatFee(transaction.feeCharged)],
    ["Created at", new Date(transaction.createdAt).toLocaleString()],
    ["Operations", String(transaction.operationCount ?? "Not loaded")]
  ] as const;
  const explorerUrl = `${explorerBaseUrls[transaction.network]}/${transaction.hash}`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">Transaction result</p>
        <Badge tone={transaction.successful ? "success" : "warning"}>
          {transaction.successful ? "Successful" : "Failed"}
        </Badge>
      </div>
      <dl className="divide-y divide-[#fff1cc]/10 rounded-[1rem] border border-[#fff1cc]/14 bg-[#0b0d16]">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 px-4 py-3 sm:grid-cols-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt>
            <dd className="break-words text-sm text-slate-200 sm:col-span-2">{value}</dd>
          </div>
        ))}
      </dl>
      <a
        href={explorerUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex rounded-md border border-stellar-cyan/35 px-3 py-2 text-sm font-extrabold text-stellar-cyan hover:bg-stellar-cyan/10"
      >
        Open in Stellar Expert
      </a>
    </div>
  );
}
