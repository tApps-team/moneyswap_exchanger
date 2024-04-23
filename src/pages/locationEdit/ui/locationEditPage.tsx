import { LocationEditForm } from "@/widgets/locationEditForm";
import styles from "./locationEditPage.module.scss";
export const LocationEditPage = () => {
  return (
    <div>
      <div className={styles.container}></div>
      <LocationEditForm />;
    </div>
  );
};
