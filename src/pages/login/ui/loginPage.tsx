import { AuthByUserNameForm } from "@/features/auth";
import { useAppSelector } from "@/shared/model";
import { paths } from "@/shared/routing";
import { Navigate } from "react-router-dom";
import styles from "./loginPage.module.scss";

export const LoginPage = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return (
    <div>
      <div className={styles.container}></div>
      <AuthByUserNameForm /> {isAuth && <Navigate to={paths.home} replace />}
    </div>
  );
};
