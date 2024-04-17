import { paths } from "@/shared/routing";
import { Button } from "@/shared/ui";
import { Eye, User } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./profileSettingsPage.module.scss";

export const ProfileSettingsPage = () => {
  return (
    <div>
      <div className={styles.container}></div>
      <div className="flex flex-col gap-4">
        <Button className="justify-start gap-4 cursor-pointer" asChild>
          <Link
            to={`${paths.profile}${paths.profileSettings}${paths.profileInfo}`}
          >
            <User />
            <div className="flex flex-col">
              <div>Информация аккаунта</div>
              <div>Измените вашу информацию</div>
            </div>
          </Link>
        </Button>
        <Button className="justify-start gap-4 cursor-pointer" asChild>
          <Link
            to={`${paths.profile}${paths.profileSettings}${paths.profilePassword}`}
          >
            <Eye />
            <div className="flex flex-col">
              <div>Пароль</div>
              <div>Измените ваш пароль</div>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
};
