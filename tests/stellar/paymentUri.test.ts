import { describe, expect, it } from "vitest";
import { Keypair } from "@stellar/stellar-sdk";
import { createPaymentUri } from "../../lib/stellar/paymentUri";

describe("createPaymentUri", () => {
  const destination = Keypair.random().publicKey();

  it("creates a payment URI for a valid native XLM request", () => {
    const uri = createPaymentUri({
      destination,
      amount: "10.5",
      asset: "XLM",
      memo: "Invoice 1001"
    });

    expect(uri).toContain("web+stellar:pay?");
    expect(uri).toContain(`destination=${encodeURIComponent(destination)}`);
    expect(uri).toContain("amount=10.5");
    expect(uri).toContain("asset=XLM");
    expect(uri).toContain("memo=Invoice+1001");
  });

  it("rejects invalid destination addresses", () => {
    expect(() =>
      createPaymentUri({
        destination: "not-a-stellar-address",
        amount: "10",
        asset: "XLM"
      })
    ).toThrow(/start with G/);
  });

  it("rejects non-positive and non-numeric amounts", () => {
    expect(() => createPaymentUri({ destination, amount: "0", asset: "XLM" })).toThrow(
      /positive payment amount/
    );

    expect(() => createPaymentUri({ destination, amount: "ten", asset: "XLM" })).toThrow(
      /positive payment amount/
    );
  });

  it("rejects memo text longer than Stellar memo text limits", () => {
    expect(() =>
      createPaymentUri({
        destination,
        amount: "10",
        asset: "XLM",
        memo: "this memo is intentionally too long"
      })
    ).toThrow(/28 characters or less/);
  });
});
