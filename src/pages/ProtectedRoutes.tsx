import { paths } from "@/shared/routing";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isAuth = true;

  return isAuth ? <Outlet /> : <Navigate to={paths.login} replace />;
};

export default ProtectedRoutes;
