"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CharacterPanel } from "@/components/ui/CharacterPanel";
import { StatusMessage } from "@/components/ui/StatusMessage";

declare global {
  interface Window {
    freighterApi?: {
      isConnected?: () => Promise<boolean>;
      getPublicKey?: () => Promise<string>;
    };
  }
}

export default function FreighterConnectPage() {
  const [available, setAvailable] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [message, setMessage] = useState({ type: "info" as "info" | "success" | "warning" | "error", text: "The wallet mascot is listening for Freighter in this browser." });

  useEffect(() => {
    // TODO(issue #7): Replace basic browser detection with Freighter API availability, permission, and rejection states.
    const timer = window.setTimeout(() => {
      const detected = Boolean(window.freighterApi);
      setAvailable(detected);
      setMessage({
        type: detected ? "info" : "warning",
        text: detected
          ? "The wallet mascot spotted Freighter. You can request the public key."
          : "The wallet mascot could not find Freighter. Install the extension to try connection examples."
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  async function connect() {
    if (!window.freighterApi?.getPublicKey) {
      setMessage({ type: "warning", text: "The wallet mascot cannot reach the Freighter API in this browser." });
      return;
    }

    try {
      const key = await window.freighterApi.getPublicKey();
      setPublicKey(key);
      setMessage({ type: "success", text: "The wallet mascot received the Freighter public key." });
    } catch {
      setMessage({ type: "error", text: "Connection request was rejected or could not be completed." });
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <CharacterPanel
        tone="wallet"
        eyebrow="Wallet mascot"
        title="Freighter Connect"
        description="The wallet mascot watches for Freighter, asks for a public key, and explains what happened without asking for secrets."
      />
      <Card className="space-y-5">
        <Button type="button" onClick={connect} disabled={!available}>
          Ask wallet mascot to connect
        </Button>
        {publicKey ? (
          <div className="rounded-[1rem] border border-[#fff1cc]/14 bg-[#0b0d16] p-4">
            <p className="text-xs font-extrabold uppercase tracking-wide text-[#f7deb0]">Connected public key</p>
            <p className="mt-2 break-all text-sm text-slate-200">{publicKey}</p>
          </div>
        ) : null}
        <a
          href="https://www.freighter.app/"
          className="inline-flex text-sm font-semibold text-stellar-cyan hover:text-cyan-200"
        >
          Install Freighter
        </a>
      </Card>
      <StatusMessage type={message.type} title="Wallet mascot status" description={message.text} />
      <StatusMessage
        type="info"
        title="Mascot training TODO"
        description="Future issues can add network detection, sign transaction demo, and a send test payment demo."
      />
      {/* TODO(issue #8): Display the active Freighter network and warn when it differs from the selected app network. */}
    </div>
  );
}
