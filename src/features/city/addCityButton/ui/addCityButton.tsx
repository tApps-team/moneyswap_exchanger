import { Button } from "@/shared/ui";
import { CirclePlus } from "lucide-react";

export const AddCityButton = () => {
  return (
    <Button className="w-14 h-16 rounded-xl flex items-center">
      <CirclePlus />
    </Button>
  );
};
