import { ReactNode } from "react";
import styles from "./secondLayout.module.scss";
import { BackButton } from "@/features/backButton";
import { LogoBig, LogoIcon } from "@/shared/assets";
import { useLocation } from "react-router-dom";
import { Pathnames, paths } from "@/shared/routing";
import { useTranslation } from "react-i18next";

export const SecondLayout = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentPathname = Pathnames.find(
    (item) => item.path === location.pathname
  );

  return (
    <div className={styles.second__container}>
      <header
        className={`${styles.second__header} ${
          !currentPathname?.title && styles.is_empty_title
        }`}
      >
        {location.pathname === paths.login ? (
          <div className={styles.logo_big}>
            <LogoBig />
          </div>
        ) : (
          <div className={styles.logo_small}>
            <LogoIcon />
          </div>
        )}
        <div className={styles.back}>
          {location.pathname !== paths.profile &&
            location.pathname !== paths.login && (
              <div className={styles.back__icon}>
                <BackButton />
              </div>
            )}
          <p>{currentPathname?.title && t(`${currentPathname?.title}`)}</p>
        </div>
      </header>
      {children}
    </div>
  );
};
