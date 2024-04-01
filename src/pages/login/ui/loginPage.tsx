import { AuthByUserNameForm } from "@/features/auth";
import { useAppSelector } from "@/shared/model";
import { paths } from "@/shared/routing";
import { Navigate } from "react-router-dom";

export const LoginPage = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return (
    <div>
      <AuthByUserNameForm /> {isAuth && <Navigate to={paths.profile} replace />}
    </div>
  );
};
