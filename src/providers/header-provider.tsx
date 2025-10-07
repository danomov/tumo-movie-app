import type { ReactNode } from "react";
import Header from "@/components/custom/header.tsx";
import { ThemeProvider } from "@/providers/theme-provider.tsx";
import { ETheme } from "@/types.ts";

function HeaderProvider({ children }: { children: ReactNode, }) {
  return (
    <div className="grid grid-rows-[70px_1fr] justify-items-center min-h-screen pb-20 px-[2%] md:px-[10%]">
      <ThemeProvider defaultTheme={ETheme.Dark} storageKey="vite-ui-theme">
        <Header />
      </ThemeProvider>
      <main className="flex flex-col row-start-2 w-full">
        {children}
      </main>
    </div>
  );
}

export default HeaderProvider;