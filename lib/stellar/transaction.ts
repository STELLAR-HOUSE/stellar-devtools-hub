import { getHorizonServer } from "@/lib/stellar/horizon";
import { getResponseStatus } from "@/lib/stellar/account";
import type { TransactionSummary } from "@/components/stellar/TransactionDetails";

export function isLikelyTransactionHash(value: string) {
  return /^[a-fA-F0-9]{64}$/.test(value.trim());
}

export async function lookupTransaction(hash: string): Promise<TransactionSummary> {
  // TODO(issue #10): Fetch and normalize transaction operations for display below the transaction summary.
  if (!hash.trim()) {
    throw new Error("Enter a transaction hash.");
  }

  if (!isLikelyTransactionHash(hash)) {
    throw new Error("Transaction hashes are 64 hexadecimal characters.");
  }

  try {
    const server = getHorizonServer("testnet");
    const transaction = await server.transactions().transaction(hash.trim()).call();

    return {
      hash: transaction.hash,
      ledger: transaction.ledger_attr,
      sourceAccount: transaction.source_account,
      feeCharged: String(transaction.fee_charged),
      createdAt: transaction.created_at,
      successful: transaction.successful,
      operationCount: transaction.operation_count
    };
  } catch (error) {
    if (getResponseStatus(error) === 404) {
      throw new Error("Transaction not found on Stellar testnet.");
    }

    throw new Error("Could not load transaction from Horizon. Try again in a moment.");
  }
}
