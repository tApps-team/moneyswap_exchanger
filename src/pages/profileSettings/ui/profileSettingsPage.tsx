import { paths } from "@/shared/routing";
import { Button } from "@/shared/ui";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./profileSettingsPage.module.scss";
import { ProfileIcon } from "@/shared/assets";
import { LanguageSwitcher } from "@/features/languageSwitch";
import { useTranslation } from "react-i18next";

export const ProfileSettingsPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className={styles.container}></div>
      <div className="grid grid-rows-3 gap-4 justify-items">
        <Button
          className="border-none justify-start gap-4 px-0 bg-transparent cursor-pointer"
          asChild
        >
          <Link
            to={`${paths.profile}${paths.profileSettings}${paths.profileInfo}`}
          >
            <ProfileIcon width={22} height={22} />
            <div className="flex flex-col">
              <p className="text-sm sm:text-base font-normal uppercase">
                {t("Информация аккаунта")}
              </p>
              <p className="text-xs sm:text-sm font-light">
                {t("Измените вашу информацию")}
              </p>
            </div>
          </Link>
        </Button>
        <Button
          className="border-none justify-start bg-transparent gap-4 px-0 cursor-pointer"
          asChild
        >
          <Link
            to={`${paths.profile}${paths.profileSettings}${paths.profilePassword}`}
          >
            <Eye color="#F6FF5F" />
            <div className="flex flex-col">
              <p className="text-sm sm:text-base font-normal uppercase">
                {t("Пароль")}
              </p>
              <p className="text-xs sm:text-sm font-light">
                {t("Измените ваш пароль")}
              </p>
            </div>
          </Link>
        </Button>
        <LanguageSwitcher />
      </div>
    </div>
  );
};
