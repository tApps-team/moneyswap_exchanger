import { ProfileInfo } from "@/widgets/profileInfo";
import styles from "./profileInfoPage.module.scss";

export const ProfileInfoPage = () => {
  return (
    <div>
      <div className={styles.container}></div>
      <ProfileInfo />
    </div>
  );
};
