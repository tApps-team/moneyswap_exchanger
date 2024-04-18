import styles from "./profileInfoPage.module.scss";
import { ProfileInfo } from "@/widgets/profileInfo";

export const ProfileInfoPage = () => {
  return (
    <div>
      <div className={styles.container}></div>
      <ProfileInfo />
    </div>
  );
};
