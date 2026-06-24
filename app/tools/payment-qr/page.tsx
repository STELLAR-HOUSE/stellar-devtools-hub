"use client";

import QRCode from "qrcode";
import { Copy } from "lucide-react";
import { useState } from "react";
import { AddressInput } from "@/components/stellar/AddressInput";
import { QRPreview } from "@/components/stellar/QRPreview";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CharacterPanel } from "@/components/ui/CharacterPanel";
import { Input } from "@/components/ui/Input";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { createPaymentUri } from "@/lib/stellar/paymentUri";

export default function PaymentQrPage() {
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [asset, setAsset] = useState<"XLM" | "USDC" | "CUSTOM">("XLM");
  const [memo, setMemo] = useState("");
  const [uri, setUri] = useState("");
  const [qr, setQr] = useState("");
  const [message, setMessage] = useState({ type: "info" as "info" | "success" | "warning" | "error", text: "The rocket assistant can turn payment details into a demo QR poster." });

  async function handleGenerate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const nextUri = createPaymentUri({ destination, amount, asset, memo });
      const nextQr = await QRCode.toDataURL(nextUri, { margin: 1, width: 256 });
      setUri(nextUri);
      setQr(nextQr);
      setMessage({ type: "success", text: "The rocket assistant finished the QR poster." });
    } catch (error) {
      setUri("");
      setQr("");
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Unexpected error." });
    }
  }

  async function copyUri() {
    // TODO(issue #22): Replace direct clipboard calls with a shared copy utility that handles permission failures.
    if (!uri) return;
    await navigator.clipboard.writeText(uri);
    setMessage({ type: "success", text: "Payment URI copied from the rocket assistant." });
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <CharacterPanel
        tone="rocket"
        eyebrow="Rocket assistant"
        title="Payment QR Generator"
        description="The rocket assistant frames destination, amount, asset, and memo into a readable demo payment poster."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <form onSubmit={handleGenerate} className="space-y-5">
            <AddressInput value={destination} onChange={setDestination} label="Destination address" />
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Amount</span>
              <Input value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="10" inputMode="decimal" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Asset</span>
              <select
                value={asset}
                onChange={(event) => setAsset(event.target.value as "XLM" | "USDC" | "CUSTOM")}
                className="min-h-12 w-full rounded-[0.95rem] border border-[#fff1cc]/16 bg-[#0b0d16] px-4 text-sm text-white outline-none focus:border-[#fff1cc]/70 focus:ring-2 focus:ring-[#f8614a]/28"
              >
                <option value="XLM">XLM</option>
                <option value="USDC">USDC placeholder</option>
                <option value="CUSTOM">Custom asset placeholder</option>
              </select>
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Memo optional</span>
              <Input value={memo} onChange={(event) => setMemo(event.target.value)} placeholder="Invoice 1001" />
            </label>
            <Button type="submit">Ask rocket to draw QR</Button>
          </form>
        </Card>
        <div className="space-y-4">
          <StatusMessage type={message.type} title="Rocket desk status" description={message.text} />
          {qr ? <QRPreview dataUrl={qr} /> : null}
          {uri ? (
            <Card className="space-y-3">
              <p className="break-all text-xs text-slate-300">{uri}</p>
              <Button type="button" variant="secondary" onClick={copyUri}>
                <Copy className="h-4 w-4" aria-hidden />
                Copy URI
              </Button>
            </Card>
          ) : null}
          <StatusMessage type="warning" title="Rocket safety note" description="This tool does not submit payments. Users must verify destination, amount, asset, and memo in their wallet." />
        </div>
      </div>
    </div>
  );
}
