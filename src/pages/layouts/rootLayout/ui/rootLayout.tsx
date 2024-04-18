import { Outlet } from "react-router-dom";
import styles from "./rootLayout.module.scss";
import { Toaster } from "@/shared/ui/toast";

export const RootLayout = () => {
  return (
    <div className={styles.root__container}>
      <main className={styles.root__content}>
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};
