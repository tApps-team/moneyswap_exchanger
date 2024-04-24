import { Logout } from "@/features/auth";
import { paths } from "@/shared/routing";
import { Button } from "@/shared/ui";
import { Link } from "react-router-dom";
import styles from "./profilePage.module.scss";
import { LogoButtonIcon, QuestionIcon, SettingsIcon } from "@/shared/assets";

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
              <SettingsIcon color="#F6FF5F" />
              <p className="text-xl font-normal">ПАРАМЕТРЫ</p>
              <LogoButtonIcon width={26} height={26} className="-rotate-90" />
            </Link>
          </Button>
          <Button className="items-center justify-start border-none" asChild>
            <Link
              className="flex gap-4 bg-transparent"
              to={`${paths.profile}${paths.profileSettings}`}
            >
              <div className="w-[25px] h-[25px]">
                <QuestionIcon fill="#F6FF5F" />
              </div>
              <p className="text-xl font-normal text-mainColor">
                СЛУЖБА ПОДДЕРЖКИ
              </p>
              <div className="w-[26px] h-[26px]">
                <LogoButtonIcon width={26} height={26} className="-rotate-90" />
              </div>
            </Link>
          </Button>
        </div>
        <Logout />
      </div>
    </div>
  );
};
