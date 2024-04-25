import { FC } from "react";
import styles from "./statisticsPage.module.scss";

export const StatisticsPage: FC = () => {
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
