import { Logout } from "@/features/auth";
import { paths } from "@/shared/routing";
import { Button } from "@/shared/ui";
import { CircleHelp, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./profilePage.module.scss";
import { LogoButtonIcon } from "@/shared/assets";

export const ProfilePage = () => {
  return (
    <div>
      <div className={styles.container}></div>
      <div className="grid gap-56">
        <div className="grid grid-row-2 gap-6">
          <Button className="items-center justify-start border-none" asChild>
            <Link
              className="flex gap-4 bg-transparent"
              to={`${paths.profile}${paths.profileSettings}`}
            >
              <Settings color="#F6FF5F" />
              <div>ПАРАМЕТРЫ</div>
              <LogoButtonIcon width={20} height={20} className="-rotate-90" />
            </Link>
          </Button>
          <Button className="items-center justify-start border-none" asChild>
            <Link
              className="flex gap-4 bg-transparent"
              to={`${paths.profile}${paths.profileSettings}`}
            >
              <CircleHelp color="#F6FF5F" />
              <div>СЛУЖБА ПОДДЕРЖКИ</div>
              <LogoButtonIcon width={20} height={20} className="-rotate-90" />
            </Link>
          </Button>
        </div>
        <Logout />
      </div>
    </div>
  );
};
