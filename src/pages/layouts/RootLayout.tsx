import { BackButton } from "@/features/backButton";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  const isAuth = true;
  return (
    <div className="main_layout">
      {isAuth && <header className="container">header</header>}
      <main className="container">
        <BackButton />
        <Outlet />
      </main>
      {isAuth && <footer className="container">footer</footer>}
    </div>
  );
};
