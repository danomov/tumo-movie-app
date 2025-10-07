import { ArrowUp } from "lucide-react";
import Button from "@/components/ui/button.tsx";

function ScrollTopButton() {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleScrollTop}
      className="fixed bottom-4 right-4 bg-primary p-2 rounded-full shadow-lg backdrop-blur-xs hover:animate-pulse"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  );
}

export default ScrollTopButton;