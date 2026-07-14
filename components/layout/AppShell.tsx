import { AppHeader } from "@/components/layout/AppHeader";
import { Sidebar } from "@/components/layout/Sidebar";
import { NetworkProvider } from "@/components/stellar/NetworkProvider";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <NetworkProvider>
      <div className="min-h-screen">
        <AppHeader />
        <div className="mx-auto flex max-w-7xl">
          <Sidebar />
          <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </NetworkProvider>
  );
}
