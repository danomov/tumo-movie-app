import { memo } from "react";
import { Badge } from "@/components/ui/badge.tsx";

interface ITagPillsProps {
  title: string,
}

function TagPills({ title }: ITagPillsProps) {
  return (
    <Badge variant="secondary" className="bg-white/20 text-white">
      {title}
    </Badge>
  );
}

export default memo(TagPills);