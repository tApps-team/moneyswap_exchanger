import { paths } from "@/shared/routing";
import { MyCustomLogin } from "@/widgets/myCustomLogin/ui/myCustomLogin";
import { Navigate } from "react-router-dom";

export const LoginPage = () => {
  const isAuth = false;

  return (
    <div>
      <MyCustomLogin /> {isAuth && <Navigate to={paths.profile} replace />}
    </div>
  );
};
