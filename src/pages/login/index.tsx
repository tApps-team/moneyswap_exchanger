import { paths } from "@shared/routing";
import { Navigate } from "react-router-dom";

export const LoginPage = () => {
  const isAuth = false;

  return (
    <div>Login Page {isAuth && <Navigate to={paths.profile} replace />}</div>
  );
};
