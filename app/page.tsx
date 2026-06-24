import Image from "next/image";
import { Activity, GitPullRequest, Rocket, SmilePlus, Wand2 } from "lucide-react";
import { ToolCard } from "@/components/ui/ToolCard";
import { Card } from "@/components/ui/Card";
import { tools } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-center">
        <div>
          <p className="inline-flex rounded-full border border-[#fff1cc]/20 bg-[#fff1cc]/10 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-[#f7deb0]">
            Anthropomorphic Stellar toolkit
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-normal text-white sm:text-5xl">
            Stellar DevTools Hub, with tools that behave like helpful characters.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            A lightweight dashboard for validating addresses, inspecting testnet
            balances, generating payment QR codes, checking trustlines, and
            exploring developer workflows through a playful cast of human-like
            Stellar mascots.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
              <SmilePlus className="mt-0.5 h-5 w-5 text-[#f8614a]" aria-hidden />
              <p className="text-sm leading-6 text-slate-300">
                Expressive faces, gestures, and small roles make each utility easier to remember.
              </p>
            </div>
            <div className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
              <Wand2 className="mt-0.5 h-5 w-5 text-stellar-cyan" aria-hidden />
              <p className="text-sm leading-6 text-slate-300">
                Complex Stellar actions stay approachable without faking blockchain data.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["7", "tool modules"],
              ["Testnet", "default network"],
              ["25", "issue ideas"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-sm text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-4 top-5 h-full w-full rounded-[1.5rem] bg-[#f8614a]" aria-hidden />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-[#fff1cc]/30 bg-[#fff1cc] p-3 shadow-glow">
            <Image
              src="/anthropomorphic-stellar-hero.png"
              alt="Anthropomorphic Stellar tool characters including a star engineer, moon wallet, and rocket assistant"
              width={1024}
              height={1536}
              priority
              className="h-auto w-full rounded-[1.1rem]"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Rocket className="h-5 w-5 text-stellar-cyan" aria-hidden />
              <h2 className="text-lg font-semibold text-white">GrantFox MVP focus</h2>
            </div>
            <p className="text-sm leading-6 text-slate-300">
              This project is prepared as a modular, contributor-friendly Stellar
              open-source demo. Working tools are prioritized, while advanced
              integrations are split into small future issues.
            </p>
            <div className="grid gap-3">
              <div className="flex gap-3 text-sm text-slate-300">
                <Activity className="mt-0.5 h-4 w-4 text-stellar-green" aria-hidden />
                Real Horizon and Friendbot calls on testnet
              </div>
              <div className="flex gap-3 text-sm text-slate-300">
                <GitPullRequest className="mt-0.5 h-4 w-4 text-stellar-violet" aria-hidden />
                Roadmap and issues designed for contributors
              </div>
            </div>
          </div>
        </Card>
        <Card className="border-[#fff1cc]/20 bg-[#fff1cc]/10">
          <h2 className="text-lg font-semibold text-white">Theme direction</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Anthropomorphic design turns stars, wallets, rockets, and utility
            objects into friendly helpers with clear emotions, posture, and purpose.
          </p>
        </Card>
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-white">Developer tools</h2>
            <p className="mt-2 text-sm text-slate-400">
              Working modules are demo-ready; MVP pages include clear extension points.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
