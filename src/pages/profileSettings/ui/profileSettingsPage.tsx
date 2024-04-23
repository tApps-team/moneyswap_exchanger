import { paths } from "@/shared/routing";
import { Button } from "@/shared/ui";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./profileSettingsPage.module.scss";
import { ProfileIcon } from "@/shared/assets";

export const ProfileSettingsPage = () => {
  return (
    <div>
      <div className={styles.container}></div>
      <div className="grid grid-rows-2 gap-4">
        <Button
          className="border-none justify-start gap-4 bg-transparent cursor-pointer"
          asChild
        >
          <Link
            to={`${paths.profile}${paths.profileSettings}${paths.profileInfo}`}
          >
            <ProfileIcon width={24} height={24} />
            <div className="flex flex-col">
              <p className="text-xl font-normal">ИНФОРМАЦИЯ АККАУНТА</p>
              <p className="text-l font-light">Измените вашу информацию</p>
            </div>
          </Link>
        </Button>
        <Button
          className="border-none justify-start bg-transparent gap-4 cursor-pointer"
          asChild
        >
          <Link
            to={`${paths.profile}${paths.profileSettings}${paths.profilePassword}`}
          >
            <Eye color="#F6FF5F" />
            <div className="flex flex-col">
              <p className="text-xl font-normal">ПАРОЛЬ</p>
              <p className="text-l font-light">Измените ваш пароль</p>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
};
