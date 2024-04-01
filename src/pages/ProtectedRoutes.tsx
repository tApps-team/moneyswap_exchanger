import { useAppSelector } from "@/shared/model";
import { paths } from "@/shared/routing";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return isAuth ? <Outlet /> : <Navigate to={paths.login} replace />;
};

export default ProtectedRoutes;
