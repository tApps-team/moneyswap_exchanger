import { paths } from "@/shared/routing";
import { Button } from "@/shared/ui";
import { Eye, User } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./profileSettingsPage.module.scss";
import { ProfileIcon } from "@/shared/assets";

export const ProfileSettingsPage = () => {
  return (
    <div>
      <div className={styles.container}></div>
      <div className="flex flex-col gap-4">
        <Button
          className="border-none justify-start gap-4 bg-transparent cursor-pointer"
          asChild
        >
          <Link
            to={`${paths.profile}${paths.profileSettings}${paths.profileInfo}`}
            className="flex"
          >
            <ProfileIcon width={24} height={24} />
            <div className="flex flex-col">
              <div>ИНФОРМАЦИЯ АККАУНТА</div>
              <div>Измените вагу информацию</div>
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
              <div>ПАРОЛЬ</div>
              <div>Измените ваш пароль</div>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
};
