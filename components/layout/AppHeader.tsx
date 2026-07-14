"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Network } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useNetwork } from "@/components/stellar/NetworkProvider";

export function AppHeader() {
  const { network, setNetwork } = useNetwork();

  return (
    <header className="sticky top-0 z-30 border-b border-[#fff1cc]/15 bg-surface-950/88 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative h-12 w-12 overflow-hidden rounded-[1rem] border border-[#fff1cc]/50 bg-[#fff1cc] shadow-[4px_4px_0_#f8614a]">
            <Image
              src="/devtool-profile.png"
              alt="Stellar DevTools Hub profile character"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </span>
          <span>
            <span className="block text-sm font-semibold text-white">Stellar DevTools Hub</span>
            <span className="block text-xs text-[#f7deb0]">Anthropomorphic testnet helpers</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <label className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/10 bg-[#0b0d16] px-3 text-sm font-semibold text-slate-200">
            <Network className="h-4 w-4 text-stellar-cyan" aria-hidden />
            <span className="sr-only sm:not-sr-only">Network</span>
            <select
              value={network}
              onChange={(event) => setNetwork(event.target.value === "mainnet" ? "mainnet" : "testnet")}
              className="bg-transparent text-sm font-extrabold uppercase text-white outline-none"
              aria-label="Select Stellar network"
            >
              <option className="bg-[#0b0d16]" value="testnet">
                Testnet
              </option>
              <option className="bg-[#0b0d16]" value="mainnet">
                Mainnet
              </option>
            </select>
          </label>
          <Badge tone={network === "testnet" ? "info" : "warning"}>{network}</Badge>
          <a
            href="https://github.com/STELLAR-HOUSE/stellar-devtools-hub"
            className="hidden items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-stellar-cyan/40 hover:text-white sm:inline-flex"
          >
            <Github className="h-4 w-4" aria-hidden />
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
