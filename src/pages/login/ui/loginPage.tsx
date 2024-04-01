import { AuthByUserNameForm } from "@/features/auth";
import { paths } from "@/shared/routing";
import { Navigate } from "react-router-dom";

export const LoginPage = () => {
  const isAuth = false;

  return (
    <div>
      <AuthByUserNameForm /> {isAuth && <Navigate to={paths.profile} replace />}
      {/* <MyCustomLogin /> {isAuth && <Navigate to={paths.profile} replace />} */}
    </div>
  );
};
