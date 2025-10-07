import { useState } from "react";
import Button from "@/components/ui/button.tsx";
import { Play } from "lucide-react";
import TrailerDialog from "@/components/custom/trailer-dialog.tsx";

interface ITrailerActionProps {
  id: number,
  title: string,
}

function TrailerAction({ id, title }: ITrailerActionProps) {
  const [isTrailerDialogOpen, setIsTrailerDialogOpen] = useState(false);

  const toggleTrailerDialog = () => {
    setIsTrailerDialogOpen(open => !open);
  };

  return (
    <>
      <Button size="lg" className="gap-2" onClick={toggleTrailerDialog}>
        <Play className="h-5 w-5"/>
        Watch Trailer
      </Button>
      <TrailerDialog
        movieId={id}
        title={title}
        open={isTrailerDialogOpen}
        onOpenChange={toggleTrailerDialog}
      />
    </>
  );
}

export default TrailerAction;