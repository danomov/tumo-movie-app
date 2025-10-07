import { memo } from "react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";

interface IFilterItemProps {
  name: string,
  id: number,
  isActive: boolean,
  onGenreChange: (checked: string | boolean, targetGenreId: number) => void,
}

function FilterItem({ name, id, isActive, onGenreChange }: IFilterItemProps) {
  return (
    <div key={name} className="flex items-center gap-3">
      <Checkbox
        id={name}
        checked={isActive}
        onCheckedChange={(checked) => onGenreChange(checked, id)}
        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      <Label htmlFor={name} className="text-sm cursor-pointer flex-1 leading-relaxed">
        {name}
      </Label>
    </div>
  );
}

export default memo(FilterItem);