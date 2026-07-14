import { describe, expect, it } from "vitest";
import { isLikelyTransactionHash } from "../../lib/stellar/transaction";

describe("isLikelyTransactionHash", () => {
  it("accepts 64-character hexadecimal hashes", () => {
    expect(isLikelyTransactionHash("a".repeat(64))).toBe(true);
    expect(isLikelyTransactionHash("ABCDEF0123456789".repeat(4))).toBe(true);
  });

  it("rejects hashes with invalid length or characters", () => {
    expect(isLikelyTransactionHash("a".repeat(63))).toBe(false);
    expect(isLikelyTransactionHash("z".repeat(64))).toBe(false);
  });
});
