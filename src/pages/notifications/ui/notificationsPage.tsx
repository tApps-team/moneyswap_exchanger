import { FC } from "react";
import styles from "./notificationsPage.module.scss";
import { ComingSoonIcon } from "@/shared/assets";

export const NotificationsPage: FC = () => {
  return (
    <div>
      <div className={styles.container}></div>
      <div className={styles.coming_soon}>
        <ComingSoonIcon />
      </div>
    </div>
  );
};
