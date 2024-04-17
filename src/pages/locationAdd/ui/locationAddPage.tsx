import { LocationAddForm } from "@/widgets/locationAddForm";
import styles from "./locationAddPage.module.scss";

export const LocationAddPage = () => {
  return (
    <div>
      <div className={styles.container}></div>
      <LocationAddForm />
    </div>
  );
};
