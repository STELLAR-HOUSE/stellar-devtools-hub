import { validatePublicKey } from "@/lib/stellar/validateAddress";

export interface PaymentRequestInput {
  destination: string;
  amount: string;
  asset: "XLM" | "USDC" | "CUSTOM";
  memo?: string;
}

export function createPaymentUri(input: PaymentRequestInput) {
  // TODO(issue #11): Extract full form validation into a reusable schema with field-level errors.
  // TODO(issue #12): Align this URI builder with a documented Stellar payment URI format and network/asset metadata.
  // TODO(issue #17): Add validation tests for destination, amount precision, memo length, and custom asset cases.
  const validation = validatePublicKey(input.destination);

  if (!validation.valid) {
    throw new Error(validation.message);
  }

  const amount = Number(input.amount);

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Enter a positive payment amount.");
  }

  if (input.memo && input.memo.length > 28) {
    throw new Error("Memo text should be 28 characters or less for a simple Stellar text memo.");
  }

  const params = new URLSearchParams({
    destination: input.destination.trim(),
    amount: input.amount.trim(),
    asset: input.asset
  });

  if (input.memo?.trim()) {
    params.set("memo", input.memo.trim());
  }

  return `web+stellar:pay?${params.toString()}`;
}
