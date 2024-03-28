import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import { useAppSelector } from "@/shared/model";

export const Routing = () => {
  const { isAuth } = useAppSelector((state) => state.exchangerReducer);

  return (
    <Routes>
      {isAuth &&
        privateRoutes.map((route) => (
          <Route
            path={route.path}
            element={<route.component />}
            key={route.path}
          />
        ))}
      {publicRoutes.map((route) => (
        <Route
          path={route.path}
          element={<route.component />}
          key={route.path}
        />
      ))}
    </Routes>
  );
};
