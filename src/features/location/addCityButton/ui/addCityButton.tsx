import { paths } from "@/shared/routing";
import { Button } from "@/shared/ui";
import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";

export const AddCityButton = () => {
  return (
    <Button className="w-14 h-16 rounded-xl flex items-center">
      <Link to={paths.locationAdd}>
        <CirclePlus />
      </Link>
    </Button>
  );
};
