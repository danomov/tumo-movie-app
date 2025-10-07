import Button from "@/components/ui/button.tsx";
import { Sun, Moon } from "lucide-react";
import useTheme from "@/hooks/useTheme.ts";

function Header() {
  const { toggleTheme } = useTheme();

  return (
    <header className="w-full top-0 left-0 fixed p-4 backdrop-blur-sm grid grid-cols-3 z-10">
      <span></span>
      <h1 className="font-bold text-2xl text-center">Movio</h1>
      <div className="flex justify-end">
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
      </div>
    </header>
  );
}

export default Header;