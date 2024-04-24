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
      <div className="grid justify-between">
        <div className="grid grid-row-2 gap-0">
          <Button className="items-center justify-start border-none" asChild>
            <Link
              className="flex gap-4 bg-transparent"
              to={`${paths.profile}${paths.profileSettings}`}
            >
              <Settings color="#F6FF5F" />
              <p className="text-xl font-normal">ПАРАМЕТРЫ</p>
              <LogoButtonIcon width={26} height={26} className="-rotate-90" />
            </Link>
          </Button>
          <Button className="items-center justify-start border-none" asChild>
            <Link
              className="flex gap-4 bg-transparent"
              to={`${paths.profile}${paths.profileSettings}`}
            >
              <CircleHelp color="#F6FF5F" />
              <p className="text-xl font-normal text-mainColor">
                СЛУЖБА ПОДДЕРЖКИ
              </p>
              <LogoButtonIcon width={26} height={26} className="-rotate-90" />
            </Link>
          </Button>
        </div>
        <Logout />
      </div>
    </div>
  );
};
