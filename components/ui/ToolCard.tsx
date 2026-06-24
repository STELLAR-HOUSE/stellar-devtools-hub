import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { ToolStatus } from "@/lib/constants";

interface ToolCardProps {
  title: string;
  description: string;
  character: string;
  href: string;
  status: ToolStatus;
  icon: React.ComponentType<{ className?: string }>;
}

const statusTone: Record<ToolStatus, "success" | "info" | "warning"> = {
  Working: "success",
  MVP: "info",
  "Coming Soon": "warning"
};

export function ToolCard({ title, description, character, href, status, icon: Icon }: ToolCardProps) {
  return (
    <Link href={href} className="group block">
      {/* TODO(issue #1): Extend tool cards with richer status metadata, grouped categories, and accessible hover/focus states. */}
      <Card className="h-full overflow-hidden transition hover:-translate-y-0.5 hover:border-[#f8614a]/50">
        <div className="flex items-start justify-between gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-[1rem] border border-stellar-cyan/25 bg-stellar-cyan/12 text-stellar-cyan shadow-[5px_5px_0_rgba(248,97,74,0.24)]">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <Badge tone={statusTone[status]}>{status}</Badge>
        </div>
        <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
        <p className="mt-4 rounded-md border border-white/10 bg-[#fff1cc]/8 px-3 py-2 text-xs leading-5 text-[#f7deb0]">
          {character}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-stellar-cyan">
          Meet helper
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
        </span>
      </Card>
    </Link>
  );
}
