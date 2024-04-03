import { paths } from "@/shared/routing";
import { Button } from "@/shared/ui";
import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";

export const CreateDirection = () => {
  return (
    <Button className="flex justify-center h-16 rounded-xl" asChild>
      <Link to={paths.directionAdd}>
        <CirclePlus />
      </Link>
    </Button>
  );
};
