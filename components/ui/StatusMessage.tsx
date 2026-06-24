import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type StatusType = "success" | "error" | "warning" | "info";

interface StatusMessageProps {
  type: StatusType;
  title: string;
  description?: string;
}

const statusStyles: Record<StatusType, string> = {
  success: "border-[#62d79b]/32 bg-[#163223] text-[#9ff0c3]",
  error: "border-[#f8614a]/36 bg-[#351817] text-[#ffb3a8]",
  warning: "border-[#f6c85f]/36 bg-[#352a14] text-[#ffe097]",
  info: "border-[#54d2ff]/36 bg-[#10283a] text-[#8fe3ff]"
};

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: TriangleAlert,
  info: Info
};

export function StatusMessage({ type, title, description }: StatusMessageProps) {
  const Icon = icons[type];

  return (
    // TODO(issue #6): Add optional actions, ARIA live-region behavior, and reusable test coverage for async tool feedback.
    <div className={cn("flex gap-3 rounded-[1rem] border p-4 shadow-[4px_4px_0_rgba(255,241,204,0.08)]", statusStyles[type])}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fff1cc]/12">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div>
        <p className="text-sm font-extrabold">{title}</p>
        {description ? <p className="mt-1 text-sm text-slate-300">{description}</p> : null}
      </div>
    </div>
  );
}
