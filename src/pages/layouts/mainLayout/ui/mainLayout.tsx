import { ReactNode } from "react";
import styles from "./mainLayout.module.scss";
import { PathFooter } from "@/widgets/pathFooter";
import { Toaster } from "@/shared/ui/toast";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.main__container}>
      <div className={styles.main__content}>{children}</div>
      <footer className={styles.main__footer}>
        <PathFooter />
      </footer>
    </div>
  );
};
