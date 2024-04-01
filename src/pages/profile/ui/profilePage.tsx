import { Logout } from "@/features/logout";
import { paths } from "@/shared/routing";
import { Button } from "@/shared/ui";
import { ChevronRight, CircleHelp, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export const ProfilePage = () => {
  return (
    <div className="grid gap-4">
      <Button className="items-center justify-start " asChild>
        <Link
          className="grid grid-cols-[auto,1fr,auto] gap-6 justify-between"
          to={`${paths.profile}${paths.profileSettings}`}
        >
          <Settings />
          <div>Параметры</div>
          <ChevronRight />
        </Link>
      </Button>
      <Button className="items-center justify-start " asChild>
        <Link
          className="grid grid-cols-[auto,1fr,auto] gap-6 justify-between"
          to={`${paths.profile}${paths.profileSettings}`}
        >
          <CircleHelp />
          <div>Служба поддержки</div>
          <ChevronRight />
        </Link>
      </Button>
      <Logout />
    </div>
  );
};
