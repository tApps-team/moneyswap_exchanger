import { FC } from "react";
import styles from "./notificationsPage.module.scss";

export const NotificationsPage: FC = () => {
  return (
    <div>
      <div className={styles.container}></div>
      <div className={styles.coming_soon}>
        {/* <ComingSoonIcon /> */}
        <img src="/comingSoon.svg" />
      </div>
    </div>
  );
};
