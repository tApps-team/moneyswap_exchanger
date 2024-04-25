import { DirectionAddForm } from "@/widgets/directionAddForm";
import styles from "./directionAddPage.module.scss";

export const DirectionAddPage = () => {
  return (
    <div>
      <div className={styles.container}></div>
      <DirectionAddForm />
    </div>
  );
};
