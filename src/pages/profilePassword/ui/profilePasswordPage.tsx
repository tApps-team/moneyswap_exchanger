import { ChangePasswordForm } from "@/features/auth";
import styles from "./profilePasswordPage.module.scss";

export const ProfilePasswordPage = () => {
  return (
    <div>
      <div className={styles.container}></div>
      <ChangePasswordForm />
    </div>
  );
};
