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
          <Button
            className="items-center justify-start border-none px-0"
            asChild
          >
            <Link
              className="flex gap-3 sm:gap-4 bg-transparent"
              to={`${paths.profile}${paths.profileSettings}`}
            >
              <SettingsIcon color="#F6FF5F" />
              <p className="sm:text-base text-sm font-normal">ПАРАМЕТРЫ</p>
              <LogoButtonIcon className="-rotate-90 w-[22px] h-[22px] sm:h-[26px] sm:w-[26px]" />
            </Link>
          </Button>
          <Button
            className="items-center justify-start border-none px-0"
            asChild
          >
            <Link
              className="flex gap-3 sm:gap-4 bg-transparent"
              to={`${paths.profile}${paths.profileSettings}`}
            >
              <div className="w-[25px] h-[25px]">
                <QuestionIcon fill="#F6FF5F" />
              </div>
              <p className="sm:text-base text-sm font-normal text-mainColor">
                СЛУЖБА ПОДДЕРЖКИ
              </p>
              <div className="w-[26px] h-[26px]">
                <LogoButtonIcon className="-rotate-90 w-[22px] h-[22px] sm:h-[26px] sm:w-[26px]" />
              </div>
            </Link>
          </Button>
        </div>
        <Logout />
      </div>
    </div>
  );
};
