import { describe, expect, it } from "vitest";
import { Keypair } from "@stellar/stellar-sdk";
import { validatePublicKey } from "../../lib/stellar/validateAddress";

describe("validatePublicKey", () => {
  it("accepts a valid Stellar public key", () => {
    const result = validatePublicKey(Keypair.random().publicKey());

    expect(result.valid).toBe(true);
    expect(result.message).toBe("This is a valid Stellar public address.");
  });

  it("rejects empty input", () => {
    const result = validatePublicKey("   ");

    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/Enter a Stellar public address/);
  });

  it("rejects secret-key prefixes before checksum validation", () => {
    const result = validatePublicKey("SAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/start with G/);
  });

  it("rejects malformed G-address checksums", () => {
    const result = validatePublicKey("GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/checksum or length/);
  });
});
