import { BackButton } from "@/features/backButton";
import { Outlet } from "react-router-dom";
import styles from "./rootLayout.module.scss";

export const RootLayout = () => {
  return (
    <div className={styles.root__container}>
      <header className={styles.root__header}>
        header <BackButton />
      </header>
      <main className={styles.root__content}>
        <Outlet />
      </main>
    </div>
  );
};
