import { useAppSelector } from "@/shared/model";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  return (
    <div className="main_layout">
      {isAuth && <header className="container">header</header>}
      <main className="container">
        <Outlet />
      </main>
      {isAuth && <footer className="container">footer</footer>}
    </div>
  );
};
