import { FC } from "react";
import styles from "./statisticsPage.module.scss";
import { ComingSoonIcon } from "@/shared/assets";

export const StatisticsPage: FC = () => {
  return (
    <div>
      <div className={styles.container}></div>
      <div className={styles.coming_soon}>
        <ComingSoonIcon />
      </div>
    </div>
  );
};
