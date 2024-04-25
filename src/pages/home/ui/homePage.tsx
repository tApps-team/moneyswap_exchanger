import { MyDirections } from "@/widgets/myDirections";
import styles from "./homePage.module.scss";

export const HomePage = () => {
  return (
    <div>
      <div className={styles.container}></div>
      <MyDirections />
    </div>
  );
};
