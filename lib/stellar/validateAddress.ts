import { StrKey } from "@stellar/stellar-sdk";

export interface AddressValidationResult {
  valid: boolean;
  message: string;
}

export function validatePublicKey(value: string): AddressValidationResult {
  // TODO(issue #2): Return structured validation codes so the UI can show field-specific recovery guidance.
  // TODO(issue #16): Add unit tests for empty, malformed, wrong-prefix, checksum, and valid public-key cases.
  const address = value.trim();

  if (!address) {
    return {
      valid: false,
      message: "Enter a Stellar public address to validate it."
    };
  }

  if (!address.startsWith("G")) {
    return {
      valid: false,
      message: "Stellar public addresses usually start with G and are safe to share."
    };
  }

  if (!StrKey.isValidEd25519PublicKey(address)) {
    return {
      valid: false,
      message: "This does not match Stellar public key checksum or length requirements."
    };
  }

  return {
    valid: true,
    message: "This is a valid Stellar public address."
  };
}
